import { z } from 'zod';
import {
  CHILD_COOKIE,
  SESSION_COOKIE,
  childCookie,
  clearChildCookie,
  clearSessionCookie,
  parseCookies,
  randomId,
  sessionCookie,
  verifyPassword,
} from './lib/auth';
import { calculateXp, evaluateAnswer, type ExerciseType, type LessonQuestion, type QuestionPayload } from './lib/lesson-engine';
import { calculateCurrentStreak } from './lib/streak';

type ParentRow = {
  id: string;
  username: string;
  email: string;
  password_hash: string;
  password_salt: string;
  status: 'active' | 'archived';
  created_at: string;
  updated_at: string;
};

type SessionParent = Omit<ParentRow, 'password_hash' | 'password_salt'>;

type ChildRow = {
  id: string;
  parent_id: string;
  slug: string;
  display_name: string;
  avatar_key: string;
  level_band: string | null;
  hearts_remaining: number;
  created_at: string;
  updated_at: string;
};

type TrackRow = {
  id: string;
  slug: string;
  title: string;
  description: string;
  color: string;
  accent: string;
  sort_order: number;
};

type UnitRow = {
  id: string;
  track_id: string;
  slug: string;
  title: string;
  description: string;
  sort_order: number;
};

type LessonRow = {
  id: string;
  unit_id: string;
  slug: string;
  title: string;
  sort_order: number;
  xp_base: number;
};

type LessonDetailRow = LessonRow & {
  unit_title: string;
  unit_slug: string;
  track_id: string;
  track_slug: string;
  track_title: string;
  track_color: string;
  track_accent: string;
};

type QuestionRow = {
  id: string;
  lesson_id: string;
  type: ExerciseType;
  prompt: string;
  payload_json: string;
  explanation: string | null;
  sort_order: number;
};

type LessonProgressRow = {
  status: 'locked' | 'available' | 'completed';
  completed_at: string | null;
  best_score_correct: number;
  best_score_total: number;
};

type TrackProgressRow = {
  current_unit_id: string | null;
  current_lesson_id: string | null;
  lessons_completed: number;
  xp_total: number;
  updated_at: string;
};

type CountRow = {
  total: number;
};

type Env = {
  ASSETS: { fetch(request: Request): Promise<Response> };
  DB: D1Database;
  TIME_ZONE?: string;
};

const SESSION_DAYS = 14;
const PROTECTED_PAGE_PREFIXES = ['/profiles', '/kid', '/parent'];
const PUBLIC_FILE_PREFIXES = ['/icons/', '/assets/', '/_astro/'];
const PARENT_GATE_PATH = '/parent-gate/';

const AttemptSubmissionSchema = z.object({
  startedAt: z.string().optional(),
  attempts: z.array(
    z.object({
      questionId: z.string(),
      answer: z.unknown(),
    }),
  ),
});

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/') return rootRedirect(request, env);
    if (isPublicAsset(url.pathname)) return env.ASSETS.fetch(request);

    if (url.pathname === '/login' || url.pathname === '/login/') {
      if (request.method === 'POST') return login(request, env);
      return serveAsset(request, env, '/login/');
    }

    if (url.pathname === '/logout' || url.pathname === '/logout/') return logout(request, env);
    if (url.pathname === '/parent-gate' || url.pathname === '/parent-gate/') return parentGate(request, env);
    if (url.pathname.startsWith('/api/')) return apiRouter(request, env);

    if (PROTECTED_PAGE_PREFIXES.some((prefix) => url.pathname === prefix || url.pathname.startsWith(`${prefix}/`))) {
      return protectedAsset(request, env);
    }

    return env.ASSETS.fetch(request);
  },
};

async function rootRedirect(request: Request, env: Env) {
  const parent = await getParentFromRequest(request, env);
  if (!parent) return redirect(new URL('/login/', request.url));

  const childSlug = getChildModeSlug(request);
  return redirect(new URL(childSlug ? `/kid/${encodeURIComponent(childSlug)}/` : '/profiles/', request.url));
}

async function login(request: Request, env: Env) {
  const form = await request.formData();
  const identifier = String(form.get('identifier') || form.get('email') || '')
    .trim()
    .toLowerCase();
  const password = String(form.get('password') || '');
  const failure = () => redirect(new URL('/login/?error=1', request.url), 303);

  if (!identifier || !password) return failure();

  const parent = await env.DB.prepare(
    'SELECT * FROM parents WHERE lower(username) = ? OR lower(email) = ? LIMIT 1',
  )
    .bind(identifier, identifier)
    .first<ParentRow>();

  if (!parent || parent.status !== 'active') return failure();
  const valid = await verifyPassword(password, parent.password_salt, parent.password_hash);
  if (!valid) return failure();

  const sessionId = randomId('sess_');
  const now = new Date();
  const expires = new Date(now.getTime() + SESSION_DAYS * 24 * 60 * 60 * 1000);

  await env.DB.prepare('INSERT INTO sessions (id, parent_id, expires_at, created_at) VALUES (?, ?, ?, ?)')
    .bind(sessionId, parent.id, expires.toISOString(), now.toISOString())
    .run();

  const response = redirect(new URL('/profiles/', request.url), 303);
  response.headers.append('Set-Cookie', sessionCookie(sessionId, expires));
  response.headers.append('Set-Cookie', clearChildCookie());
  return response;
}

async function logout(request: Request, env: Env) {
  const sessionId = parseCookies(request.headers.get('Cookie')).get(SESSION_COOKIE);
  if (sessionId) await env.DB.prepare('DELETE FROM sessions WHERE id = ?').bind(sessionId).run();

  const response = redirect(new URL('/login/', request.url), 303);
  response.headers.append('Set-Cookie', clearSessionCookie());
  response.headers.append('Set-Cookie', clearChildCookie());
  return response;
}

async function parentGate(request: Request, env: Env) {
  const parent = await getParentFromRequest(request, env);
  if (!parent) return redirect(new URL('/login/', request.url), 303);

  if (request.method === 'GET' || request.method === 'HEAD') return serveAsset(request, env, PARENT_GATE_PATH);
  if (request.method !== 'POST') return json({ error: 'method_not_allowed' }, 405);
  if (!sameOrigin(request)) return json({ error: 'invalid_origin' }, 403);

  const form = await request.formData();
  const password = String(form.get('password') || '');
  const next = safeNextPath(String(form.get('next') || ''), '/parent/');

  const credentials = await env.DB.prepare(
    'SELECT password_hash, password_salt, status FROM parents WHERE id = ? LIMIT 1',
  )
    .bind(parent.id)
    .first<Pick<ParentRow, 'password_hash' | 'password_salt' | 'status'>>();
  const valid =
    credentials?.status === 'active' && password.length > 0
      ? await verifyPassword(password, credentials.password_salt, credentials.password_hash)
      : false;

  if (!valid) {
    const url = new URL(PARENT_GATE_PATH, request.url);
    url.searchParams.set('error', '1');
    url.searchParams.set('next', next);
    return redirect(url, 303);
  }

  const response = redirect(new URL(next, request.url), 303);
  response.headers.append('Set-Cookie', clearChildCookie());
  return response;
}

async function protectedAsset(request: Request, env: Env) {
  const parent = await getParentFromRequest(request, env);
  if (!parent) return redirect(new URL('/login/', request.url), 303);

  const url = new URL(request.url);
  const childModeSlug = getChildModeSlug(request);

  if (isParentPage(url.pathname)) {
    if (childModeSlug) return parentGateRedirect(request, url.pathname);
    return serveAsset(request, env, url.pathname);
  }

  const requestedChildSlug = childSlugFromKidPath(url.pathname);
  if (!requestedChildSlug) return serveAsset(request, env, url.pathname);

  const child = await getChildForParent(parent, env, requestedChildSlug);
  if (!child) {
    const response = redirect(new URL('/profiles/', request.url), 303);
    response.headers.append('Set-Cookie', clearChildCookie());
    return response;
  }

  if (childModeSlug && childModeSlug !== child.slug) return parentGateRedirect(request, url.pathname);

  const response = await serveAsset(request, env, url.pathname);
  return childModeSlug === child.slug ? response : withCookie(response, childCookie(child.slug, childCookieExpiry()));
}

async function apiRouter(request: Request, env: Env) {
  const parent = await getParentFromRequest(request, env);
  if (!parent) return json({ error: 'not_authenticated' }, 401);
  if (!['GET', 'HEAD', 'OPTIONS'].includes(request.method) && !sameOrigin(request)) {
    return json({ error: 'invalid_origin' }, 403);
  }

  const url = new URL(request.url);
  const pathname = stripTrailingSlash(url.pathname);
  const childModeSlug = getChildModeSlug(request);

  if (pathname === '/api/me') {
    if (childModeSlug) return parentReauthResponse();
    return apiMe(parent, env);
  }
  if (pathname === '/api/children') {
    if (childModeSlug) return parentReauthResponse();
    return apiChildren(parent, env);
  }
  if (pathname === '/api/parent/dashboard') {
    if (childModeSlug) return parentReauthResponse();
    return apiParentDashboard(parent, env);
  }

  const childHomeMatch = pathname.match(/^\/api\/children\/([^/]+)\/home$/);
  if (childHomeMatch) return apiChildHome(parent, env, decodeURIComponent(childHomeMatch[1]), childModeSlug);

  const trackMatch = pathname.match(/^\/api\/children\/([^/]+)\/tracks\/([^/]+)$/);
  if (trackMatch) {
    return apiChildTrack(parent, env, decodeURIComponent(trackMatch[1]), decodeURIComponent(trackMatch[2]), childModeSlug);
  }

  const lessonMatch = pathname.match(/^\/api\/children\/([^/]+)\/lessons\/([^/]+)$/);
  if (lessonMatch) {
    const childKey = decodeURIComponent(lessonMatch[1]);
    const lessonId = decodeURIComponent(lessonMatch[2]);
    if (request.method === 'GET') return apiLesson(parent, env, childKey, lessonId, childModeSlug);
    if (request.method === 'POST') return apiSubmitLesson(parent, env, request, childKey, lessonId, childModeSlug);
  }

  return json({ error: 'not_found' }, 404);
}

async function apiMe(parent: SessionParent, env: Env) {
  return json({
    parent: parentResponse(parent),
    children: (await getChildren(parent, env)).map(childResponse),
  });
}

async function apiChildren(parent: SessionParent, env: Env) {
  const children = await getChildren(parent, env);
  return json({ children: children.map(childResponse) });
}

async function apiChildHome(parent: SessionParent, env: Env, childKey: string, childModeSlug: string | null) {
  const child = await getChildForParent(parent, env, childKey);
  if (!child) return json({ error: 'child_not_found' }, 404);
  if (!canAccessChild(childModeSlug, child)) return childLockedResponse();

  const tracks = await all<TrackRow>(env.DB.prepare('SELECT * FROM tracks ORDER BY sort_order'));
  const trackCards = [];
  let recommendedLesson = null;

  for (const track of tracks) {
    const progress = await getTrackProgress(env, child.id, track.id);
    const totalLessons = await countTrackLessons(env, track.id);
    const completedLessons = await countCompletedTrackLessons(env, child.id, track.id);
    const currentLesson = progress?.current_lesson_id ? await getLessonDetail(env, progress.current_lesson_id) : null;

    if (!recommendedLesson && currentLesson) {
      recommendedLesson = lessonLinkResponse(currentLesson);
    }

    trackCards.push({
      id: track.id,
      slug: track.slug,
      title: track.title,
      description: track.description,
      color: track.color,
      accent: track.accent,
      lessonsCompleted: completedLessons,
      totalLessons,
      xpTotal: progress?.xp_total ?? 0,
      currentLesson: currentLesson ? lessonLinkResponse(currentLesson) : null,
    });
  }

  const xpTotal = trackCards.reduce((sum, track) => sum + track.xpTotal, 0);
  const activityDates = await getActivityDates(env, child.id);
  const today = localDate(new Date(), env.TIME_ZONE);
  const streak = calculateCurrentStreak(activityDates, today);
  const badges = await getBadges(env, child.id, streak);

  return json({
    child: childResponse(child),
    stats: {
      xpTotal,
      streak,
      heartsRemaining: child.hearts_remaining,
    },
    recommendedLesson,
    tracks: trackCards,
    badges,
  });
}

async function apiChildTrack(
  parent: SessionParent,
  env: Env,
  childKey: string,
  trackSlug: string,
  childModeSlug: string | null,
) {
  const child = await getChildForParent(parent, env, childKey);
  if (!child) return json({ error: 'child_not_found' }, 404);
  if (!canAccessChild(childModeSlug, child)) return childLockedResponse();

  const track = await env.DB.prepare('SELECT * FROM tracks WHERE slug = ? LIMIT 1').bind(trackSlug).first<TrackRow>();
  if (!track) return json({ error: 'track_not_found' }, 404);

  const units = await all<UnitRow>(
    env.DB.prepare('SELECT * FROM units WHERE track_id = ? ORDER BY sort_order').bind(track.id),
  );
  const progress = await getTrackProgress(env, child.id, track.id);
  const unitResponses = [];

  for (const unit of units) {
    const lessons = await all<LessonRow>(
      env.DB.prepare('SELECT * FROM lessons WHERE unit_id = ? ORDER BY sort_order').bind(unit.id),
    );
    const lessonResponses = [];
    for (const lesson of lessons) {
      const lessonProgress = await getLessonProgress(env, child.id, lesson.id);
      lessonResponses.push({
        id: lesson.id,
        slug: lesson.slug,
        title: lesson.title,
        xpBase: lesson.xp_base,
        status: lessonProgress?.status ?? 'locked',
        completedAt: lessonProgress?.completed_at,
        bestScoreCorrect: lessonProgress?.best_score_correct ?? 0,
        bestScoreTotal: lessonProgress?.best_score_total ?? 0,
      });
    }
    unitResponses.push({
      id: unit.id,
      slug: unit.slug,
      title: unit.title,
      description: unit.description,
      lessons: lessonResponses,
    });
  }

  const currentLesson = progress?.current_lesson_id ? await getLessonDetail(env, progress.current_lesson_id) : null;

  return json({
    child: childResponse(child),
    track,
    progress: {
      lessonsCompleted: progress?.lessons_completed ?? 0,
      xpTotal: progress?.xp_total ?? 0,
      currentLesson: currentLesson ? lessonLinkResponse(currentLesson) : null,
    },
    units: unitResponses,
  });
}

async function apiLesson(
  parent: SessionParent,
  env: Env,
  childKey: string,
  lessonId: string,
  childModeSlug: string | null,
) {
  const child = await getChildForParent(parent, env, childKey);
  if (!child) return json({ error: 'child_not_found' }, 404);
  if (!canAccessChild(childModeSlug, child)) return childLockedResponse();

  const lesson = await getLessonDetail(env, lessonId);
  if (!lesson) return json({ error: 'lesson_not_found' }, 404);

  const progress = await getLessonProgress(env, child.id, lesson.id);
  if (progress?.status === 'locked' || !progress) return json({ error: 'lesson_locked' }, 403);

  const questions = await getLessonQuestions(env, lesson.id);

  return json({
    child: childResponse(child),
    heartsStart: 5,
    progress,
    lesson: {
      id: lesson.id,
      slug: lesson.slug,
      title: lesson.title,
      xpBase: lesson.xp_base,
      unit: {
        id: lesson.unit_id,
        slug: lesson.unit_slug,
        title: lesson.unit_title,
      },
      track: {
        id: lesson.track_id,
        slug: lesson.track_slug,
        title: lesson.track_title,
        color: lesson.track_color,
        accent: lesson.track_accent,
      },
      questions,
    },
  });
}

async function apiSubmitLesson(
  parent: SessionParent,
  env: Env,
  request: Request,
  childKey: string,
  lessonId: string,
  childModeSlug: string | null,
) {
  const child = await getChildForParent(parent, env, childKey);
  if (!child) return json({ error: 'child_not_found' }, 404);
  if (!canAccessChild(childModeSlug, child)) return childLockedResponse();

  const lesson = await getLessonDetail(env, lessonId);
  if (!lesson) return json({ error: 'lesson_not_found' }, 404);

  const progress = await getLessonProgress(env, child.id, lesson.id);
  if (progress?.status === 'locked' || !progress) return json({ error: 'lesson_locked' }, 403);

  let body: z.infer<typeof AttemptSubmissionSchema>;
  try {
    body = AttemptSubmissionSchema.parse(await request.json());
  } catch {
    return json({ error: 'invalid_attempt_payload' }, 400);
  }

  const questions = await getLessonQuestions(env, lesson.id);
  const attemptsByQuestion = new Map(body.attempts.map((attempt) => [attempt.questionId, attempt.answer]));
  const completedAt = new Date();
  const completedIso = completedAt.toISOString();
  const scored = questions.map((question) => {
    const answer = attemptsByQuestion.get(question.id);
    return {
      question,
      answer,
      isCorrect: attemptsByQuestion.has(question.id) ? evaluateAnswer(question, answer) : false,
    };
  });
  const scoreCorrect = scored.filter((attempt) => attempt.isCorrect).length;
  const scoreTotal = questions.length;
  const heartsRemaining = Math.max(0, 5 - (scoreTotal - scoreCorrect));
  const xpAwarded = calculateXp(lesson.xp_base, scoreCorrect, scoreTotal, heartsRemaining);
  const lessonAttemptId = randomId('attempt_');
  const startedAt = body.startedAt || completedIso;

  const inserts = [
    env.DB.prepare(
      `INSERT INTO lesson_attempts
       (id, child_profile_id, lesson_id, started_at, completed_at, score_correct, score_total, xp_awarded, hearts_remaining)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    ).bind(lessonAttemptId, child.id, lesson.id, startedAt, completedIso, scoreCorrect, scoreTotal, xpAwarded, heartsRemaining),
    ...scored.map((attempt) =>
      env.DB.prepare(
        `INSERT INTO question_attempts
         (id, lesson_attempt_id, question_id, is_correct, answer_json, attempted_at)
         VALUES (?, ?, ?, ?, ?, ?)`,
      ).bind(
        randomId('qa_'),
        lessonAttemptId,
        attempt.question.id,
        attempt.isCorrect ? 1 : 0,
        JSON.stringify(attempt.answer ?? null),
        completedIso,
      ),
    ),
  ];
  await env.DB.batch(inserts);

  await env.DB.prepare(
    `INSERT INTO child_lesson_progress
     (id, child_profile_id, lesson_id, status, completed_at, best_score_correct, best_score_total)
     VALUES (?, ?, ?, 'completed', ?, ?, ?)
     ON CONFLICT(child_profile_id, lesson_id) DO UPDATE SET
       status = 'completed',
       completed_at = COALESCE(child_lesson_progress.completed_at, excluded.completed_at),
       best_score_correct = max(child_lesson_progress.best_score_correct, excluded.best_score_correct),
       best_score_total = excluded.best_score_total`,
  )
    .bind(`lesson_progress_${child.id}_${lesson.id}`, child.id, lesson.id, completedIso, scoreCorrect, scoreTotal)
    .run();

  const nextLesson = await getNextLesson(env, lesson);
  if (nextLesson) {
    await env.DB.prepare(
      `INSERT INTO child_lesson_progress
       (id, child_profile_id, lesson_id, status, completed_at, best_score_correct, best_score_total)
       VALUES (?, ?, ?, 'available', NULL, 0, 0)
       ON CONFLICT(child_profile_id, lesson_id) DO UPDATE SET
         status = CASE WHEN child_lesson_progress.status = 'locked' THEN 'available' ELSE child_lesson_progress.status END`,
    )
      .bind(`lesson_progress_${child.id}_${nextLesson.id}`, child.id, nextLesson.id)
      .run();
  }

  const lessonsCompleted = await countCompletedTrackLessons(env, child.id, lesson.track_id);
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
      `track_progress_${child.id}_${lesson.track_id}`,
      child.id,
      lesson.track_id,
      nextLesson?.unit_id ?? lesson.unit_id,
      nextLesson?.id ?? lesson.id,
      lessonsCompleted,
      xpAwarded,
      completedIso,
    )
    .run();

  const today = localDate(completedAt, env.TIME_ZONE);
  await env.DB.prepare(
    `INSERT INTO child_daily_activity
     (id, child_profile_id, activity_date, lessons_completed, xp_earned)
     VALUES (?, ?, ?, 1, ?)
     ON CONFLICT(child_profile_id, activity_date) DO UPDATE SET
       lessons_completed = child_daily_activity.lessons_completed + 1,
       xp_earned = child_daily_activity.xp_earned + excluded.xp_earned`,
  )
    .bind(`activity_${child.id}_${today}`, child.id, today, xpAwarded)
    .run();

  await env.DB.prepare('UPDATE child_profiles SET hearts_remaining = ?, updated_at = ? WHERE id = ?')
    .bind(heartsRemaining, completedIso, child.id)
    .run();

  const activityDates = await getActivityDates(env, child.id);
  const streak = calculateCurrentStreak(activityDates, today);

  return json({
    result: {
      lessonAttemptId,
      scoreCorrect,
      scoreTotal,
      xpAwarded,
      heartsRemaining,
      streak,
      nextLesson: nextLesson ? lessonLinkResponse(nextLesson) : null,
    },
  });
}

async function apiParentDashboard(parent: SessionParent, env: Env) {
  const children = await getChildren(parent, env);
  const tracks = await all<TrackRow>(env.DB.prepare('SELECT * FROM tracks ORDER BY sort_order'));
  const today = localDate(new Date(), env.TIME_ZONE);
  const childSummaries = [];

  for (const child of children) {
    const activityDates = await getActivityDates(env, child.id);
    const streak = calculateCurrentStreak(activityDates, today);
    const trackSummaries = [];

    for (const track of tracks) {
      const totalLessons = await countTrackLessons(env, track.id);
      const lessonsCompleted = await countCompletedTrackLessons(env, child.id, track.id);
      const progress = await getTrackProgress(env, child.id, track.id);
      trackSummaries.push({
        id: track.id,
        slug: track.slug,
        title: track.title,
        color: track.color,
        lessonsCompleted,
        totalLessons,
        xpTotal: progress?.xp_total ?? 0,
      });
    }

    const recentActivity = await all<{
      completed_at: string;
      score_correct: number;
      score_total: number;
      xp_awarded: number;
      lesson_title: string;
      track_title: string;
      track_slug: string;
    }>(
      env.DB.prepare(
        `SELECT lesson_attempts.completed_at, lesson_attempts.score_correct, lesson_attempts.score_total,
                lesson_attempts.xp_awarded, lessons.title as lesson_title, tracks.title as track_title, tracks.slug as track_slug
         FROM lesson_attempts
         JOIN lessons ON lessons.id = lesson_attempts.lesson_id
         JOIN units ON units.id = lessons.unit_id
         JOIN tracks ON tracks.id = units.track_id
         WHERE lesson_attempts.child_profile_id = ?
         ORDER BY lesson_attempts.completed_at DESC
         LIMIT 6`,
      ).bind(child.id),
    );

    childSummaries.push({
      child: childResponse(child),
      stats: {
        xpTotal: trackSummaries.reduce((sum, track) => sum + track.xpTotal, 0),
        streak,
        heartsRemaining: child.hearts_remaining,
      },
      tracks: trackSummaries,
      badges: await getBadges(env, child.id, streak),
      recentActivity,
    });
  }

  return json({
    parent: parentResponse(parent),
    fixedV1Profiles: true,
    children: childSummaries,
  });
}

async function getParentFromRequest(request: Request, env: Env): Promise<SessionParent | null> {
  const sessionId = parseCookies(request.headers.get('Cookie')).get(SESSION_COOKIE);
  if (!sessionId) return null;

  const row = await env.DB.prepare(
    `SELECT parents.id, parents.username, parents.email, parents.status, parents.created_at, parents.updated_at
     FROM sessions
     JOIN parents ON parents.id = sessions.parent_id
     WHERE sessions.id = ? AND sessions.expires_at > ?
     LIMIT 1`,
  )
    .bind(sessionId, new Date().toISOString())
    .first<SessionParent>();

  if (!row || row.status !== 'active') return null;
  return row;
}

async function getChildren(parent: SessionParent, env: Env) {
  return all<ChildRow>(
    env.DB.prepare('SELECT * FROM child_profiles WHERE parent_id = ? ORDER BY display_name').bind(parent.id),
  );
}

async function getChildForParent(parent: SessionParent, env: Env, childKey: string) {
  return env.DB.prepare('SELECT * FROM child_profiles WHERE parent_id = ? AND (slug = ? OR id = ?) LIMIT 1')
    .bind(parent.id, childKey, childKey)
    .first<ChildRow>();
}

async function getTrackProgress(env: Env, childId: string, trackId: string) {
  return env.DB.prepare('SELECT * FROM child_track_progress WHERE child_profile_id = ? AND track_id = ? LIMIT 1')
    .bind(childId, trackId)
    .first<TrackProgressRow>();
}

async function getLessonProgress(env: Env, childId: string, lessonId: string) {
  return env.DB.prepare('SELECT * FROM child_lesson_progress WHERE child_profile_id = ? AND lesson_id = ? LIMIT 1')
    .bind(childId, lessonId)
    .first<LessonProgressRow>();
}

async function countTrackLessons(env: Env, trackId: string) {
  const row = await env.DB.prepare(
    `SELECT count(*) as total
     FROM lessons
     JOIN units ON units.id = lessons.unit_id
     WHERE units.track_id = ?`,
  )
    .bind(trackId)
    .first<CountRow>();
  return row?.total ?? 0;
}

async function countCompletedTrackLessons(env: Env, childId: string, trackId: string) {
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
    .first<CountRow>();
  return row?.total ?? 0;
}

async function getLessonDetail(env: Env, lessonId: string) {
  return env.DB.prepare(
    `SELECT lessons.*, units.title as unit_title, units.slug as unit_slug,
            tracks.id as track_id, tracks.slug as track_slug, tracks.title as track_title,
            tracks.color as track_color, tracks.accent as track_accent
     FROM lessons
     JOIN units ON units.id = lessons.unit_id
     JOIN tracks ON tracks.id = units.track_id
     WHERE lessons.id = ?
     LIMIT 1`,
  )
    .bind(lessonId)
    .first<LessonDetailRow>();
}

async function getLessonQuestions(env: Env, lessonId: string): Promise<LessonQuestion[]> {
  const rows = await all<QuestionRow>(
    env.DB.prepare('SELECT * FROM questions WHERE lesson_id = ? ORDER BY sort_order').bind(lessonId),
  );
  return rows.map((row) => ({
    id: row.id,
    type: row.type,
    prompt: row.prompt,
    payload: JSON.parse(row.payload_json) as QuestionPayload,
    explanation: row.explanation,
  }));
}

async function getNextLesson(env: Env, lesson: LessonDetailRow) {
  const lessons = await all<LessonDetailRow>(
    env.DB.prepare(
      `SELECT lessons.*, units.title as unit_title, units.slug as unit_slug,
              tracks.id as track_id, tracks.slug as track_slug, tracks.title as track_title,
              tracks.color as track_color, tracks.accent as track_accent
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

async function getActivityDates(env: Env, childId: string) {
  const rows = await all<{ activity_date: string }>(
    env.DB.prepare(
      'SELECT activity_date FROM child_daily_activity WHERE child_profile_id = ? AND lessons_completed > 0 ORDER BY activity_date DESC',
    ).bind(childId),
  );
  return rows.map((row) => row.activity_date);
}

async function getBadges(env: Env, childId: string, streak: number) {
  const attempts = await env.DB.prepare('SELECT count(*) as total FROM lesson_attempts WHERE child_profile_id = ?')
    .bind(childId)
    .first<CountRow>();
  const perfect = await env.DB.prepare(
    'SELECT count(*) as total FROM lesson_attempts WHERE child_profile_id = ? AND score_correct = score_total',
  )
    .bind(childId)
    .first<CountRow>();
  const completedByTrack = await all<{ slug: string; total: number }>(
    env.DB.prepare(
      `SELECT tracks.slug, count(*) as total
       FROM child_lesson_progress
       JOIN lessons ON lessons.id = child_lesson_progress.lesson_id
       JOIN units ON units.id = lessons.unit_id
       JOIN tracks ON tracks.id = units.track_id
       WHERE child_lesson_progress.child_profile_id = ?
         AND child_lesson_progress.status = 'completed'
       GROUP BY tracks.slug`,
    ).bind(childId),
  );
  const completed = new Map(completedByTrack.map((row) => [row.slug, row.total]));
  const badges = [];

  if ((attempts?.total ?? 0) > 0) badges.push({ key: 'first-lesson', label: 'First Lesson' });
  if (streak >= 3) badges.push({ key: 'three-day-streak', label: 'Three Day Streak' });
  if ((completed.get('math') ?? 0) > 0) badges.push({ key: 'math-starter', label: 'Math Starter' });
  if ((completed.get('vocabulary') ?? 0) > 0) badges.push({ key: 'word-explorer', label: 'Word Explorer' });
  if ((completed.get('spanish') ?? 0) > 0) badges.push({ key: 'spanish-starter', label: 'Spanish Starter' });
  if ((perfect?.total ?? 0) > 0) badges.push({ key: 'perfect-lesson', label: 'Perfect Lesson' });

  return badges;
}

function parentResponse(parent: SessionParent) {
  return {
    id: parent.id,
    username: parent.username,
    email: parent.email,
  };
}

function childResponse(child: ChildRow) {
  return {
    id: child.id,
    slug: child.slug,
    displayName: child.display_name,
    avatarKey: child.avatar_key,
    levelBand: child.level_band,
    heartsRemaining: child.hearts_remaining,
  };
}

function lessonLinkResponse(lesson: LessonDetailRow) {
  return {
    id: lesson.id,
    slug: lesson.slug,
    title: lesson.title,
    unitTitle: lesson.unit_title,
    trackSlug: lesson.track_slug,
    trackTitle: lesson.track_title,
  };
}

function getChildModeSlug(request: Request) {
  return parseCookies(request.headers.get('Cookie')).get(CHILD_COOKIE) || null;
}

function canAccessChild(childModeSlug: string | null, child: ChildRow) {
  return !childModeSlug || childModeSlug === child.slug;
}

function childLockedResponse() {
  return json({ error: 'child_locked' }, 403);
}

function parentReauthResponse() {
  return json({ error: 'parent_reauth_required' }, 403);
}

async function all<T>(statement: D1PreparedStatement) {
  const result = await statement.all<T>();
  return result.results ?? [];
}

function isParentPage(pathname: string) {
  return (
    pathname === '/profiles' ||
    pathname.startsWith('/profiles/') ||
    pathname === '/parent' ||
    pathname.startsWith('/parent/')
  );
}

function childSlugFromKidPath(pathname: string) {
  const match = pathname.match(/^\/kid\/([^/]+)(?:\/|$)/);
  return match ? decodeURIComponent(match[1]) : null;
}

function parentGateRedirect(request: Request, nextPath: string) {
  const url = new URL(PARENT_GATE_PATH, request.url);
  url.searchParams.set('next', safeNextPath(nextPath, '/parent/'));
  return redirect(url, 303);
}

function safeNextPath(value: string, fallback: string) {
  if (!value || !value.startsWith('/') || value.startsWith('//')) return fallback;

  try {
    const url = new URL(value, 'https://buddy-blocks.local');
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return fallback;
  }
}

function childCookieExpiry() {
  return new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
}

function withCookie(response: Response, cookie: string) {
  const headers = new Headers(response.headers);
  headers.append('Set-Cookie', cookie);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function serveAsset(request: Request, env: Env, pathname: string) {
  const url = new URL(request.url);
  if (!pathname.endsWith('/') && !pathname.includes('.')) pathname += '/';
  url.pathname = pathname;
  return env.ASSETS.fetch(new Request(url, request));
}

function redirect(url: URL, status = 302) {
  return new Response(null, {
    status,
    headers: {
      Location: url.toString(),
    },
  });
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

function sameOrigin(request: Request) {
  const origin = request.headers.get('Origin');
  if (!origin) return true;
  return new URL(origin).origin === new URL(request.url).origin;
}

function isPublicAsset(pathname: string) {
  if (PUBLIC_FILE_PREFIXES.some((prefix) => pathname.startsWith(prefix))) return true;
  return ['/favicon.ico', '/manifest.webmanifest', '/service-worker.js'].includes(pathname);
}

function stripTrailingSlash(pathname: string) {
  return pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname;
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
