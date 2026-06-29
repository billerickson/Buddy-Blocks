import { randomId } from '../lib/auth';
import { calculateCurrentStreak } from '../lib/streak';

export type CompletionEnv = {
  DB: D1Database;
  TIME_ZONE?: string;
};

export type CompletionChild = {
  id: string;
};

export type CompletionLesson = {
  id: string;
  unit_id: string;
  slug: string;
  title: string;
  track_id: string;
  track_slug: string;
  track_subject: string;
  track_grade_level: number;
  track_title: string;
  unit_title: string;
  unit_slug: string;
};

export type CompletionQuestionAttempt = {
  questionId: string;
  isCorrect: boolean;
  answer: unknown;
};

export type CompletionProgress = {
  status: 'locked' | 'available' | 'completed';
  completed_at: string | null;
  best_score_correct: number;
  best_score_total: number;
};

export type CompleteLessonOptions = {
  env: CompletionEnv;
  child: CompletionChild;
  lesson: CompletionLesson;
  startedAt: string;
  scoreCorrect: number;
  scoreTotal: number;
  xpAwarded: number;
  heartsRemaining: number;
  questionAttempts?: CompletionQuestionAttempt[];
  bestScoreTotalStrategy: 'latest' | 'best-score-attempt';
};

const SEQUENTIAL_SUBJECTS = new Set(['spanish']);

export async function completeLesson({
  env,
  child,
  lesson,
  startedAt,
  scoreCorrect,
  scoreTotal,
  xpAwarded,
  heartsRemaining,
  questionAttempts = [],
  bestScoreTotalStrategy,
}: CompleteLessonOptions) {
  const completedAt = new Date();
  const completedIso = completedAt.toISOString();
  const lessonAttemptId = randomId('attempt_');

  const inserts = [
    env.DB.prepare(
      `INSERT INTO lesson_attempts
       (id, child_profile_id, lesson_id, started_at, completed_at, score_correct, score_total, xp_awarded, hearts_remaining)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    ).bind(lessonAttemptId, child.id, lesson.id, startedAt || completedIso, completedIso, scoreCorrect, scoreTotal, xpAwarded, heartsRemaining),
    ...questionAttempts.map((attempt) =>
      env.DB.prepare(
        `INSERT INTO question_attempts
         (id, lesson_attempt_id, question_id, is_correct, answer_json, attempted_at)
         VALUES (?, ?, ?, ?, ?, ?)`,
      ).bind(
        randomId('qa_'),
        lessonAttemptId,
        attempt.questionId,
        attempt.isCorrect ? 1 : 0,
        JSON.stringify(attempt.answer ?? null),
        completedIso,
      ),
    ),
  ];
  await env.DB.batch(inserts);

  await upsertLessonProgress(env, {
    childId: child.id,
    lessonId: lesson.id,
    completedIso,
    scoreCorrect,
    scoreTotal,
    bestScoreTotalStrategy,
  });

  const nextLesson = await getNextLesson(env, lesson);
  if (nextLesson) await unlockNextLesson(env, child.id, nextLesson.id);

  const lessonsCompleted = await countCompletedTrackLessons(env, child.id, lesson.track_id);
  const nextSequentialLesson = nextLesson ? null : await unlockNextSequentialTrack(env, child.id, lesson, lessonsCompleted, completedIso);
  await updateTrackProgress(env, {
    childId: child.id,
    lesson,
    nextLesson,
    lessonsCompleted,
    xpAwarded,
    completedIso,
  });

  const today = localDate(completedAt, env.TIME_ZONE);
  await updateDailyActivity(env, child.id, today, xpAwarded);

  await env.DB.prepare('UPDATE child_profiles SET hearts_remaining = ?, updated_at = ? WHERE id = ?')
    .bind(heartsRemaining, completedIso, child.id)
    .run();

  const activityDates = await getActivityDates(env, child.id);
  const streak = calculateCurrentStreak(activityDates, today);
  const lessonProgress = await getLessonProgress(env, child.id, lesson.id);

  return {
    lessonAttemptId,
    completedAt: completedIso,
    xpAwarded,
    heartsRemaining,
    streak,
    nextLesson: nextLesson ?? nextSequentialLesson,
    lessonProgress,
  };
}

async function upsertLessonProgress(
  env: CompletionEnv,
  {
    childId,
    lessonId,
    completedIso,
    scoreCorrect,
    scoreTotal,
    bestScoreTotalStrategy,
  }: {
    childId: string;
    lessonId: string;
    completedIso: string;
    scoreCorrect: number;
    scoreTotal: number;
    bestScoreTotalStrategy: CompleteLessonOptions['bestScoreTotalStrategy'];
  },
) {
  const bestScoreTotalUpdate =
    bestScoreTotalStrategy === 'best-score-attempt'
      ? `CASE
           WHEN excluded.best_score_correct >= child_lesson_progress.best_score_correct THEN excluded.best_score_total
           ELSE child_lesson_progress.best_score_total
         END`
      : 'excluded.best_score_total';

  await env.DB.prepare(
    `INSERT INTO child_lesson_progress
     (id, child_profile_id, lesson_id, status, completed_at, best_score_correct, best_score_total)
     VALUES (?, ?, ?, 'completed', ?, ?, ?)
     ON CONFLICT(child_profile_id, lesson_id) DO UPDATE SET
       status = 'completed',
       completed_at = COALESCE(child_lesson_progress.completed_at, excluded.completed_at),
       best_score_correct = max(child_lesson_progress.best_score_correct, excluded.best_score_correct),
       best_score_total = ${bestScoreTotalUpdate}`,
  )
    .bind(`lesson_progress_${childId}_${lessonId}`, childId, lessonId, completedIso, scoreCorrect, scoreTotal)
    .run();
}

async function unlockNextLesson(env: CompletionEnv, childId: string, lessonId: string) {
  await env.DB.prepare(
    `INSERT INTO child_lesson_progress
     (id, child_profile_id, lesson_id, status, completed_at, best_score_correct, best_score_total)
     VALUES (?, ?, ?, 'available', NULL, 0, 0)
     ON CONFLICT(child_profile_id, lesson_id) DO UPDATE SET
       status = CASE WHEN child_lesson_progress.status = 'locked' THEN 'available' ELSE child_lesson_progress.status END`,
  )
    .bind(`lesson_progress_${childId}_${lessonId}`, childId, lessonId)
    .run();
}

async function updateTrackProgress(
  env: CompletionEnv,
  {
    childId,
    lesson,
    nextLesson,
    lessonsCompleted,
    xpAwarded,
    completedIso,
  }: {
    childId: string;
    lesson: CompletionLesson;
    nextLesson: CompletionLesson | null;
    lessonsCompleted: number;
    xpAwarded: number;
    completedIso: string;
  },
) {
  await env.DB.prepare(
    `INSERT INTO child_track_progress
     (id, child_profile_id, track_id, current_unit_id, current_lesson_id, lessons_completed, xp_total, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(child_profile_id, track_id) DO UPDATE SET
       current_unit_id = excluded.current_unit_id,
       current_lesson_id = excluded.current_lesson_id,
       lessons_completed = excluded.lessons_completed,
       xp_total = child_track_progress.xp_total + excluded.xp_total,
       updated_at = excluded.updated_at`,
  )
    .bind(
      `track_progress_${childId}_${lesson.track_id}`,
      childId,
      lesson.track_id,
      nextLesson?.unit_id ?? lesson.unit_id,
      nextLesson?.id ?? lesson.id,
      lessonsCompleted,
      xpAwarded,
      completedIso,
    )
    .run();
}

async function updateDailyActivity(env: CompletionEnv, childId: string, today: string, xpAwarded: number) {
  await env.DB.prepare(
    `INSERT INTO child_daily_activity
     (id, child_profile_id, activity_date, lessons_completed, xp_earned)
     VALUES (?, ?, ?, 1, ?)
     ON CONFLICT(child_profile_id, activity_date) DO UPDATE SET
       lessons_completed = child_daily_activity.lessons_completed + 1,
       xp_earned = child_daily_activity.xp_earned + excluded.xp_earned`,
  )
    .bind(`activity_${childId}_${today}`, childId, today, xpAwarded)
    .run();
}

async function countCompletedTrackLessons(env: CompletionEnv, childId: string, trackId: string) {
  const row = await env.DB.prepare(
    `SELECT count(*) as total
     FROM child_lesson_progress
     JOIN lessons ON lessons.id = child_lesson_progress.lesson_id
     JOIN units ON units.id = lessons.unit_id
     WHERE child_lesson_progress.child_profile_id = ?
       AND units.track_id = ?
       AND child_lesson_progress.status = 'completed'`,
  )
    .bind(childId, trackId)
    .first<{ total: number }>();
  return row?.total ?? 0;
}

async function getLessonProgress(env: CompletionEnv, childId: string, lessonId: string) {
  return env.DB.prepare('SELECT * FROM child_lesson_progress WHERE child_profile_id = ? AND lesson_id = ? LIMIT 1')
    .bind(childId, lessonId)
    .first<CompletionProgress>();
}

async function getNextLesson(env: CompletionEnv, lesson: CompletionLesson) {
  const lessons = await all<CompletionLesson>(
    env.DB.prepare(
      `SELECT lessons.*, units.title as unit_title, units.slug as unit_slug,
              tracks.id as track_id, tracks.slug as track_slug, tracks.subject as track_subject,
              tracks.grade_level as track_grade_level, tracks.title as track_title
       FROM lessons
       JOIN units ON units.id = lessons.unit_id
       JOIN tracks ON tracks.id = units.track_id
       WHERE tracks.id = ?
       ORDER BY units.sort_order, lessons.sort_order`,
    ).bind(lesson.track_id),
  );
  const index = lessons.findIndex((item) => item.id === lesson.id);
  return index >= 0 ? (lessons[index + 1] ?? null) : null;
}

async function unlockNextSequentialTrack(
  env: CompletionEnv,
  childId: string,
  lesson: CompletionLesson,
  lessonsCompleted: number,
  completedIso: string,
) {
  if (!SEQUENTIAL_SUBJECTS.has(lesson.track_subject)) return null;

  const totalLessons = await countTrackLessons(env, lesson.track_id);
  if (totalLessons === 0 || lessonsCompleted < totalLessons) return null;

  const nextTrack = await env.DB.prepare(
    `SELECT *
     FROM tracks
     WHERE subject = ?
       AND grade_level = ?
     LIMIT 1`,
  )
    .bind(lesson.track_subject, lesson.track_grade_level + 1)
    .first<{ id: string }>();
  if (!nextTrack) return null;

  const firstLesson = await getFirstLessonForTrack(env, nextTrack.id);
  if (!firstLesson) return null;

  await env.DB.prepare(
    `INSERT INTO child_track_progress
     (id, child_profile_id, track_id, current_unit_id, current_lesson_id, lessons_completed, xp_total, updated_at)
     VALUES (?, ?, ?, ?, ?, 0, 0, ?)
     ON CONFLICT(child_profile_id, track_id) DO NOTHING`,
  )
    .bind(`track_progress_${childId}_${firstLesson.track_id}`, childId, firstLesson.track_id, firstLesson.unit_id, firstLesson.id, completedIso)
    .run();

  await unlockNextLesson(env, childId, firstLesson.id);

  return firstLesson;
}

async function countTrackLessons(env: CompletionEnv, trackId: string) {
  const row = await env.DB.prepare(
    `SELECT count(lessons.id) as total
     FROM units
     JOIN lessons ON lessons.unit_id = units.id
     WHERE units.track_id = ?`,
  )
    .bind(trackId)
    .first<{ total: number }>();
  return row?.total ?? 0;
}

async function getFirstLessonForTrack(env: CompletionEnv, trackId: string) {
  return env.DB.prepare(
    `SELECT lessons.*, units.title as unit_title, units.slug as unit_slug,
            tracks.id as track_id, tracks.slug as track_slug, tracks.subject as track_subject,
            tracks.grade_level as track_grade_level, tracks.title as track_title
     FROM lessons
     JOIN units ON units.id = lessons.unit_id
     JOIN tracks ON tracks.id = units.track_id
     WHERE tracks.id = ?
     ORDER BY units.sort_order, lessons.sort_order
     LIMIT 1`,
  )
    .bind(trackId)
    .first<CompletionLesson>();
}

async function getActivityDates(env: CompletionEnv, childId: string) {
  const rows = await all<{ activity_date: string }>(
    env.DB.prepare(
      'SELECT activity_date FROM child_daily_activity WHERE child_profile_id = ? AND lessons_completed > 0 ORDER BY activity_date DESC',
    ).bind(childId),
  );
  return rows.map((row) => row.activity_date);
}

async function all<T>(statement: D1PreparedStatement) {
  const result = await statement.all<T>();
  return result.results ?? [];
}

function localDate(date: Date, timeZone = 'America/Chicago') {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);
  const value = (type: string) => parts.find((part) => part.type === type)?.value ?? '01';
  return `${value('year')}-${value('month')}-${value('day')}`;
}
