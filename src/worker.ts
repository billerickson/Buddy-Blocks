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
import {
  calculateXp,
  evaluateAnswer,
  type ExerciseType,
  type LessonQuestion,
  type QuestionPayload,
} from './lib/lesson-engine';
import { parseMadMinuteConfig, parseStandardLessonConfig, type LessonKind, type MadMinuteConfig } from './lib/lesson-config';
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
  grade_level: number;
  hearts_remaining: number;
  created_at: string;
  updated_at: string;
};

type TrackRow = {
  id: string;
  slug: string;
  subject: string;
  grade_level: number;
  title: string;
  description: string;
  color: string;
  accent: string;
  sort_order: number;
};

type ChildSubjectLevelRow = {
  id: string;
  child_profile_id: string;
  subject: string;
  grade_level: number;
  updated_at: string;
};

type LessonRow = {
  id: string;
  unit_id: string;
  slug: string;
  title: string;
  kind: LessonKind;
  config_json: string | null;
  sort_order: number;
  xp_base: number;
};

type LessonDetailRow = LessonRow & {
  unit_title: string;
  unit_slug: string;
  track_id: string;
  track_slug: string;
  track_subject: string;
  track_grade_level: number;
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
  id: string;
  child_profile_id: string;
  track_id: string;
  current_unit_id: string | null;
  current_lesson_id: string | null;
  lessons_completed: number;
  xp_total: number;
  updated_at: string;
};

type CountRow = {
  total: number;
};

type TrackCountRow = {
  track_id: string;
  total: number;
};

type TrackLessonProgressRow = {
  unit_id: string;
  unit_slug: string;
  unit_title: string;
  unit_description: string;
  lesson_id: string | null;
  lesson_slug: string | null;
  lesson_title: string | null;
  lesson_kind: LessonKind | null;
  lesson_config_json: string | null;
  lesson_sort_order: number | null;
  lesson_xp_base: number | null;
  progress_status: LessonProgressRow['status'] | null;
  completed_at: string | null;
  best_score_correct: number | null;
  best_score_total: number | null;
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

const MadMinuteSubmissionSchema = z.object({
  startedAt: z.string().optional(),
  attempts: z
    .array(
      z.object({
        factor: z.number().int().min(1).max(12),
        multiplier: z.number().int().min(1).max(12),
        answer: z.union([z.string(), z.number()]),
      }),
    )
    .max(240),
});

const SubjectLevelUpdateSchema = z.object({
  subject: z.string().trim().toLowerCase().min(1).regex(/^[a-z][a-z0-9-]*$/),
  gradeLevel: z.number().int().min(1).max(12).nullable(),
});

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (shouldRedirectToHttps(request, url)) return httpsRedirect(url);

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

  const subjectLevelMatch = pathname.match(/^\/api\/parent\/children\/([^/]+)\/subject-levels$/);
  if (subjectLevelMatch) {
    if (childModeSlug) return parentReauthResponse();
    if (request.method === 'PATCH') {
      return apiUpdateChildSubjectLevel(parent, env, request, decodeURIComponent(subjectLevelMatch[1]));
    }
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

  const tracks = await getTracksForChild(env, child);
  const trackStats = await getTrackStatsForChild(
    env,
    child.id,
    tracks.map((track) => track.id),
  );
  const trackCards = [];
  let recommendedLesson = null;

  for (const track of tracks) {
    const progress = trackStats.progressByTrack.get(track.id);
    const currentLesson = trackStats.currentLessonsByTrack.get(track.id) ?? null;

    if (!recommendedLesson && currentLesson) {
      recommendedLesson = lessonLinkResponse(currentLesson);
    }

    trackCards.push({
      id: track.id,
      slug: track.slug,
      subject: track.subject,
      gradeLevel: track.grade_level,
      title: track.title,
      description: track.description,
      color: track.color,
      accent: track.accent,
      lessonsCompleted: trackStats.completedLessonsByTrack.get(track.id) ?? 0,
      totalLessons: trackStats.totalLessonsByTrack.get(track.id) ?? 0,
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

  const track = await getTrackForChild(env, child, trackSlug);
  if (!track) return json({ error: 'track_not_found' }, 404);

  const [progress, unitResponses] = await Promise.all([
    getTrackProgress(env, child.id, track.id),
    getTrackUnitResponses(env, child.id, track.id),
  ]);

  const currentLesson = progress?.current_lesson_id ? await getLessonDetail(env, progress.current_lesson_id) : null;

  return json({
    child: childResponse(child),
    track: trackResponse(track),
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
  if (!(await canAccessLessonTrack(env, child, lesson))) return json({ error: 'lesson_not_found' }, 404);

  const progress = await getLessonProgress(env, child.id, lesson.id);
  if (progress?.status === 'locked' || !progress) return json({ error: 'lesson_locked' }, 403);

  const questions = await getLessonQuestions(env, lesson.id);

  return json({
    child: childResponse(child),
    heartsStart: 5,
    progress: lessonProgressResponse(progress),
    lesson: {
      id: lesson.id,
      slug: lesson.slug,
      title: lesson.title,
      kind: lesson.kind,
      config: lesson.kind === 'mad-minute' ? parseMadMinuteConfig(lesson.config_json) : parseStandardLessonConfig(lesson.config_json),
      xpBase: lesson.xp_base,
      unit: {
        id: lesson.unit_id,
        slug: lesson.unit_slug,
        title: lesson.unit_title,
      },
      track: {
        id: lesson.track_id,
        slug: lesson.track_slug,
        subject: lesson.track_subject,
        gradeLevel: lesson.track_grade_level,
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
  if (!(await canAccessLessonTrack(env, child, lesson))) return json({ error: 'lesson_not_found' }, 404);

  const progress = await getLessonProgress(env, child.id, lesson.id);
  if (progress?.status === 'locked' || !progress) return json({ error: 'lesson_locked' }, 403);

  if (lesson.kind === 'mad-minute') return apiSubmitMadMinuteLesson(env, request, child, lesson);

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

async function apiSubmitMadMinuteLesson(env: Env, request: Request, child: ChildRow, lesson: LessonDetailRow) {
  const config = parseMadMinuteConfig(lesson.config_json);
  let body: z.infer<typeof MadMinuteSubmissionSchema>;
  try {
    body = MadMinuteSubmissionSchema.parse(await request.json());
  } catch {
    return json({ error: 'invalid_mad_minute_payload' }, 400);
  }

  const completedAt = new Date();
  const completedIso = completedAt.toISOString();
  const scored = body.attempts.map((attempt) => {
    const answer = Number(String(attempt.answer).trim());
    return {
      ...attempt,
      isCorrect:
        Number.isFinite(answer) &&
        isAllowedMadMinuteFact(config, attempt.factor, attempt.multiplier) &&
        answer === attempt.factor * attempt.multiplier,
    };
  });
  const scoreCorrect = scored.filter((attempt) => attempt.isCorrect).length;
  const scoreTotal = scored.length;
  const heartsRemaining = 5;
  const xpAwarded = calculateMadMinuteXp(lesson.xp_base, scoreCorrect, scoreTotal, config.goalCorrect);
  const lessonAttemptId = randomId('attempt_');
  const startedAt = body.startedAt || completedIso;

  await env.DB.prepare(
    `INSERT INTO lesson_attempts
     (id, child_profile_id, lesson_id, started_at, completed_at, score_correct, score_total, xp_awarded, hearts_remaining)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(lessonAttemptId, child.id, lesson.id, startedAt, completedIso, scoreCorrect, scoreTotal, xpAwarded, heartsRemaining)
    .run();

  await env.DB.prepare(
    `INSERT INTO child_lesson_progress
     (id, child_profile_id, lesson_id, status, completed_at, best_score_correct, best_score_total)
     VALUES (?, ?, ?, 'completed', ?, ?, ?)
     ON CONFLICT(child_profile_id, lesson_id) DO UPDATE SET
       status = 'completed',
       completed_at = COALESCE(child_lesson_progress.completed_at, excluded.completed_at),
       best_score_correct = max(child_lesson_progress.best_score_correct, excluded.best_score_correct),
       best_score_total = CASE
         WHEN excluded.best_score_correct >= child_lesson_progress.best_score_correct THEN excluded.best_score_total
         ELSE child_lesson_progress.best_score_total
       END`,
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
  const updatedProgress = await getLessonProgress(env, child.id, lesson.id);

  return json({
    result: {
      lessonAttemptId,
      scoreCorrect,
      scoreTotal,
      xpAwarded,
      heartsRemaining,
      streak,
      bestScoreCorrect: updatedProgress?.best_score_correct ?? scoreCorrect,
      goalCorrect: config.goalCorrect,
      nextLesson: nextLesson ? lessonLinkResponse(nextLesson) : null,
    },
  });
}

async function apiParentDashboard(parent: SessionParent, env: Env) {
  const children = await getChildren(parent, env);
  const today = localDate(new Date(), env.TIME_ZONE);
  const childSummaries = [];

  for (const child of children) {
    const tracks = await getTracksForChild(env, child);
    const trackStats = await getTrackStatsForChild(
      env,
      child.id,
      tracks.map((track) => track.id),
    );
    const activityDates = await getActivityDates(env, child.id);
    const streak = calculateCurrentStreak(activityDates, today);
    const trackSummaries = [];

    for (const track of tracks) {
      const progress = trackStats.progressByTrack.get(track.id);
      trackSummaries.push({
        id: track.id,
        slug: track.slug,
        subject: track.subject,
        gradeLevel: track.grade_level,
        title: track.title,
        color: track.color,
        lessonsCompleted: trackStats.completedLessonsByTrack.get(track.id) ?? 0,
        totalLessons: trackStats.totalLessonsByTrack.get(track.id) ?? 0,
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
      subjectLevels: await getSubjectLevelResponses(env, child),
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

async function apiUpdateChildSubjectLevel(parent: SessionParent, env: Env, request: Request, childKey: string) {
  const child = await getChildForParent(parent, env, childKey);
  if (!child) return json({ error: 'child_not_found' }, 404);

  let body: z.infer<typeof SubjectLevelUpdateSchema>;
  try {
    body = SubjectLevelUpdateSchema.parse(await request.json());
  } catch {
    return json({ error: 'invalid_subject_level_payload' }, 400);
  }

  if (!(await subjectExists(env, body.subject))) return json({ error: 'subject_not_found' }, 404);

  const now = new Date().toISOString();
  if (body.gradeLevel === null || body.gradeLevel === child.grade_level) {
    await env.DB.prepare('DELETE FROM child_subject_levels WHERE child_profile_id = ? AND subject = ?')
      .bind(child.id, body.subject)
      .run();
  } else {
    await env.DB.prepare(
      `INSERT INTO child_subject_levels (id, child_profile_id, subject, grade_level, updated_at)
       VALUES (?, ?, ?, ?, ?)
       ON CONFLICT(child_profile_id, subject) DO UPDATE SET
         grade_level = excluded.grade_level,
         updated_at = excluded.updated_at`,
    )
      .bind(`subject_level_${child.id}_${body.subject}`, child.id, body.subject, body.gradeLevel, now)
      .run();
  }

  return json({ subjectLevels: await getSubjectLevelResponses(env, child) });
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

async function getTracksForChild(env: Env, child: ChildRow) {
  return all<TrackRow>(
    env.DB.prepare(
      `SELECT tracks.*
       FROM tracks
       LEFT JOIN child_subject_levels
         ON child_subject_levels.child_profile_id = ?
        AND child_subject_levels.subject = tracks.subject
       WHERE tracks.grade_level = COALESCE(child_subject_levels.grade_level, ?)
       ORDER BY CASE tracks.subject
         WHEN 'math' THEN 1
         WHEN 'vocabulary' THEN 2
         WHEN 'spanish' THEN 3
         ELSE tracks.sort_order
       END, tracks.sort_order`,
    ).bind(child.id, child.grade_level),
  );
}

async function getTrackForChild(env: Env, child: ChildRow, trackSlug: string) {
  return env.DB.prepare(
    `SELECT tracks.*
     FROM tracks
     LEFT JOIN child_subject_levels
       ON child_subject_levels.child_profile_id = ?
      AND child_subject_levels.subject = tracks.subject
     WHERE tracks.slug = ?
       AND tracks.grade_level = COALESCE(child_subject_levels.grade_level, ?)
     LIMIT 1`,
  )
    .bind(child.id, trackSlug, child.grade_level)
    .first<TrackRow>();
}

async function canAccessLessonTrack(env: Env, child: ChildRow, lesson: Pick<LessonDetailRow, 'track_subject' | 'track_grade_level'>) {
  const effectiveGradeLevel = await getEffectiveGradeLevelForSubject(env, child, lesson.track_subject);
  return lesson.track_grade_level === effectiveGradeLevel;
}

async function getEffectiveGradeLevelForSubject(env: Env, child: ChildRow, subject: string) {
  const level = await getChildSubjectLevel(env, child.id, subject);
  return level?.grade_level ?? child.grade_level;
}

async function getChildSubjectLevel(env: Env, childId: string, subject: string) {
  return env.DB.prepare('SELECT * FROM child_subject_levels WHERE child_profile_id = ? AND subject = ? LIMIT 1')
    .bind(childId, subject)
    .first<ChildSubjectLevelRow>();
}

async function subjectExists(env: Env, subject: string) {
  const row = await env.DB.prepare('SELECT subject FROM tracks WHERE subject = ? LIMIT 1').bind(subject).first<{ subject: string }>();
  return Boolean(row);
}

async function getSubjectLevelResponses(env: Env, child: ChildRow) {
  const subjects = await all<{ subject: string }>(
    env.DB.prepare(
      `SELECT subject
       FROM tracks
       GROUP BY subject
       ORDER BY CASE subject
         WHEN 'math' THEN 1
         WHEN 'vocabulary' THEN 2
         WHEN 'spanish' THEN 3
         ELSE 100
       END, subject`,
    ),
  );
  const overrides = await all<ChildSubjectLevelRow>(
    env.DB.prepare('SELECT * FROM child_subject_levels WHERE child_profile_id = ?').bind(child.id),
  );
  const overrideBySubject = new Map(overrides.map((level) => [level.subject, level]));

  return subjects.map(({ subject }) => {
    const override = overrideBySubject.get(subject);
    return {
      subject,
      label: subjectLabel(subject),
      defaultGradeLevel: child.grade_level,
      overrideGradeLevel: override?.grade_level ?? null,
      effectiveGradeLevel: override?.grade_level ?? child.grade_level,
    };
  });
}

async function getTrackProgress(env: Env, childId: string, trackId: string) {
  return env.DB.prepare('SELECT * FROM child_track_progress WHERE child_profile_id = ? AND track_id = ? LIMIT 1')
    .bind(childId, trackId)
    .first<TrackProgressRow>();
}

async function getTrackStatsForChild(env: Env, childId: string, trackIds: string[]) {
  const empty = {
    totalLessonsByTrack: new Map<string, number>(),
    completedLessonsByTrack: new Map<string, number>(),
    progressByTrack: new Map<string, TrackProgressRow>(),
    currentLessonsByTrack: new Map<string, LessonDetailRow>(),
  };
  if (trackIds.length === 0) return empty;

  const trackPlaceholders = placeholders(trackIds);
  const [lessonCounts, completedCounts, progressRows] = await Promise.all([
    all<TrackCountRow>(
      env.DB.prepare(
        `SELECT units.track_id, count(lessons.id) as total
         FROM units
         JOIN lessons ON lessons.unit_id = units.id
         WHERE units.track_id IN (${trackPlaceholders})
         GROUP BY units.track_id`,
      ).bind(...trackIds),
    ),
    all<TrackCountRow>(
      env.DB.prepare(
        `SELECT units.track_id, count(*) as total
         FROM child_lesson_progress
         JOIN lessons ON lessons.id = child_lesson_progress.lesson_id
         JOIN units ON units.id = lessons.unit_id
         WHERE child_lesson_progress.child_profile_id = ?
           AND units.track_id IN (${trackPlaceholders})
           AND child_lesson_progress.status = 'completed'
         GROUP BY units.track_id`,
      ).bind(childId, ...trackIds),
    ),
    all<TrackProgressRow>(
      env.DB.prepare(
        `SELECT *
         FROM child_track_progress
         WHERE child_profile_id = ?
           AND track_id IN (${trackPlaceholders})`,
      ).bind(childId, ...trackIds),
    ),
  ]);

  const currentLessonIds = progressRows
    .map((progress) => progress.current_lesson_id)
    .filter((lessonId): lessonId is string => Boolean(lessonId));
  const currentLessons = await getLessonDetailsByIds(env, currentLessonIds);
  const currentLessonsById = new Map(currentLessons.map((lesson) => [lesson.id, lesson]));
  const currentLessonsByTrack = new Map<string, LessonDetailRow>();

  for (const progress of progressRows) {
    if (!progress.current_lesson_id) continue;
    const lesson = currentLessonsById.get(progress.current_lesson_id);
    if (lesson) currentLessonsByTrack.set(progress.track_id, lesson);
  }

  return {
    totalLessonsByTrack: new Map(lessonCounts.map((row) => [row.track_id, row.total])),
    completedLessonsByTrack: new Map(completedCounts.map((row) => [row.track_id, row.total])),
    progressByTrack: new Map(progressRows.map((row) => [row.track_id, row])),
    currentLessonsByTrack,
  };
}

async function getTrackUnitResponses(env: Env, childId: string, trackId: string) {
  const rows = await all<TrackLessonProgressRow>(
    env.DB.prepare(
      `SELECT units.id as unit_id, units.slug as unit_slug, units.title as unit_title,
              units.description as unit_description,
              lessons.id as lesson_id, lessons.slug as lesson_slug, lessons.title as lesson_title,
              lessons.kind as lesson_kind, lessons.config_json as lesson_config_json,
              lessons.sort_order as lesson_sort_order, lessons.xp_base as lesson_xp_base,
              child_lesson_progress.status as progress_status,
              child_lesson_progress.completed_at as completed_at,
              child_lesson_progress.best_score_correct as best_score_correct,
              child_lesson_progress.best_score_total as best_score_total
       FROM units
       LEFT JOIN lessons ON lessons.unit_id = units.id
       LEFT JOIN child_lesson_progress
         ON child_lesson_progress.child_profile_id = ?
        AND child_lesson_progress.lesson_id = lessons.id
       WHERE units.track_id = ?
       ORDER BY units.sort_order, lessons.sort_order`,
    ).bind(childId, trackId),
  );

  const units = new Map<
    string,
    {
      id: string;
      slug: string;
      title: string;
      description: string;
      lessons: Array<{
        id: string;
        slug: string;
        title: string;
        kind: LessonKind;
        madMinuteGoal: number | null;
        xpBase: number;
        status: LessonProgressRow['status'];
        completedAt?: string | null;
        bestScoreCorrect: number;
        bestScoreTotal: number;
      }>;
    }
  >();

  for (const row of rows) {
    let unit = units.get(row.unit_id);
    if (!unit) {
      unit = {
        id: row.unit_id,
        slug: row.unit_slug,
        title: row.unit_title,
        description: row.unit_description,
        lessons: [],
      };
      units.set(row.unit_id, unit);
    }

    if (!row.lesson_id || !row.lesson_slug || !row.lesson_title || !row.lesson_kind) continue;

    const lesson: LessonRow = {
      id: row.lesson_id,
      unit_id: row.unit_id,
      slug: row.lesson_slug,
      title: row.lesson_title,
      kind: row.lesson_kind,
      config_json: row.lesson_config_json,
      sort_order: row.lesson_sort_order ?? 0,
      xp_base: row.lesson_xp_base ?? 0,
    };
    const hasProgress = row.progress_status !== null;

    unit.lessons.push({
      id: lesson.id,
      slug: lesson.slug,
      title: lesson.title,
      kind: lesson.kind,
      madMinuteGoal: lesson.kind === 'mad-minute' ? parseMadMinuteConfig(lesson.config_json).goalCorrect : null,
      xpBase: lesson.xp_base,
      status: row.progress_status ?? 'locked',
      completedAt: hasProgress ? row.completed_at : undefined,
      bestScoreCorrect: row.best_score_correct ?? 0,
      bestScoreTotal: row.best_score_total ?? 0,
    });
  }

  return Array.from(units.values());
}

async function getLessonProgress(env: Env, childId: string, lessonId: string) {
  return env.DB.prepare('SELECT * FROM child_lesson_progress WHERE child_profile_id = ? AND lesson_id = ? LIMIT 1')
    .bind(childId, lessonId)
    .first<LessonProgressRow>();
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
            tracks.id as track_id, tracks.slug as track_slug, tracks.subject as track_subject,
            tracks.grade_level as track_grade_level, tracks.title as track_title,
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

async function getLessonDetailsByIds(env: Env, lessonIds: string[]) {
  if (lessonIds.length === 0) return [];

  return all<LessonDetailRow>(
    env.DB.prepare(
      `SELECT lessons.*, units.title as unit_title, units.slug as unit_slug,
              tracks.id as track_id, tracks.slug as track_slug, tracks.subject as track_subject,
              tracks.grade_level as track_grade_level, tracks.title as track_title,
              tracks.color as track_color, tracks.accent as track_accent
       FROM lessons
       JOIN units ON units.id = lessons.unit_id
       JOIN tracks ON tracks.id = units.track_id
       WHERE lessons.id IN (${placeholders(lessonIds)})`,
    ).bind(...lessonIds),
  );
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
              tracks.id as track_id, tracks.slug as track_slug, tracks.subject as track_subject,
              tracks.grade_level as track_grade_level, tracks.title as track_title,
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
  const completedBySubject = await all<{ subject: TrackRow['subject']; total: number }>(
    env.DB.prepare(
      `SELECT tracks.subject, count(*) as total
       FROM child_lesson_progress
       JOIN lessons ON lessons.id = child_lesson_progress.lesson_id
       JOIN units ON units.id = lessons.unit_id
       JOIN tracks ON tracks.id = units.track_id
       WHERE child_lesson_progress.child_profile_id = ?
         AND child_lesson_progress.status = 'completed'
       GROUP BY tracks.subject`,
    ).bind(childId),
  );
  const completed = new Map(completedBySubject.map((row) => [row.subject, row.total]));
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
    gradeLevel: child.grade_level,
    heartsRemaining: child.hearts_remaining,
  };
}

function trackResponse(track: TrackRow) {
  return {
    id: track.id,
    slug: track.slug,
    subject: track.subject,
    gradeLevel: track.grade_level,
    title: track.title,
    description: track.description,
    color: track.color,
    accent: track.accent,
  };
}

function subjectLabel(subject: string) {
  if (subject === 'math') return 'Math';
  if (subject === 'vocabulary') return 'Vocabulary';
  if (subject === 'spanish') return 'Spanish';
  return subject
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function lessonProgressResponse(progress: LessonProgressRow) {
  return {
    status: progress.status,
    completedAt: progress.completed_at,
    bestScoreCorrect: progress.best_score_correct,
    bestScoreTotal: progress.best_score_total,
  };
}

function lessonLinkResponse(lesson: LessonDetailRow) {
  return {
    id: lesson.id,
    slug: lesson.slug,
    title: lesson.title,
    unitTitle: lesson.unit_title,
    trackSlug: lesson.track_slug,
    trackSubject: lesson.track_subject,
    trackGradeLevel: lesson.track_grade_level,
    trackTitle: lesson.track_title,
  };
}

function isAllowedMadMinuteFact(config: MadMinuteConfig, factor: number, multiplier: number) {
  const minFactor = config.factor === 'mixed' ? (config.minFactor ?? 2) : config.factor;
  const maxFactor = config.factor === 'mixed' ? (config.maxFactor ?? 12) : config.factor;
  return (
    factor >= minFactor &&
    factor <= maxFactor &&
    multiplier >= config.minMultiplier &&
    multiplier <= config.maxMultiplier
  );
}

function calculateMadMinuteXp(baseXp: number, scoreCorrect: number, scoreTotal: number, goalCorrect: number) {
  if (scoreTotal === 0) return 0;
  const goalBonus = scoreCorrect >= goalCorrect ? 10 : 0;
  return Math.min(75, baseXp + scoreCorrect + goalBonus);
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

function placeholders(values: unknown[]) {
  return values.map(() => '?').join(', ');
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

function httpsRedirect(url: URL) {
  const secureUrl = new URL(url);
  secureUrl.protocol = 'https:';
  return redirect(secureUrl, 308);
}

function shouldRedirectToHttps(request: Request, url: URL) {
  const forwardedProtocol = request.headers.get('X-Forwarded-Proto')?.split(',')[0]?.trim().toLowerCase();
  const isHttp = url.protocol === 'http:' || forwardedProtocol === 'http';
  return isHttp && !isLocalHostname(url.hostname);
}

function isLocalHostname(hostname: string) {
  return (
    hostname === 'localhost' ||
    hostname.endsWith('.localhost') ||
    hostname === '127.0.0.1' ||
    hostname === '0.0.0.0' ||
    hostname === '::1' ||
    hostname === '[::1]'
  );
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
