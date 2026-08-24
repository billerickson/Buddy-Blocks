import { z } from 'zod';
import {
  CHILD_COOKIE,
  SESSION_COOKIE,
  childCookie,
  clearChildCookie,
  clearSessionCookie,
  hashPassword,
  fromHex,
  parseCookies,
  randomId,
  sessionCookie,
  timingSafeEqual as constantTimeStringEqual,
  toHex,
  verifyPassword,
} from './lib/auth';
import { buildBadges } from './lib/badges';
import {
  calculateXp,
  evaluateAnswer,
  type ExerciseType,
  type LessonQuestion,
  type QuestionPayload,
} from './lib/lesson-engine';
import { parseMadMinuteConfig, parseStandardLessonConfig, type LessonKind } from './lib/lesson-config';
import { calculateMadMinuteXp, scoreMadMinuteAttempts } from './lib/mad-minute';
import {
  calculateMultiplicationXp,
  multiplicationMasteryLevel,
  multiplicationSelectionKey,
  normalizeSelectedFactors,
  scoreMultiplicationAttempts,
  type MultiplicationInputMethod,
  type MultiplicationMasteryStats,
  type MultiplicationSessionInputMethod,
} from './lib/multiplication';
import { calculateCurrentStreak } from './lib/streak';
import { compareSubjectKeys, getSubjectLabel, getTrackGroup, isFoundationSubject } from './lib/subjects';
import { completeLesson, type CompletionLesson } from './worker/lesson-completion';

type ParentRow = {
  id: string;
  username: string;
  email: string | null;
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
  status: 'active' | 'archived';
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
  hint: string | null;
  sort_order: number;
};

type LessonProgressRow = {
  status: 'locked' | 'available' | 'completed';
  completed_at: string | null;
  best_score_correct: number;
  best_score_total: number;
};

type LessonAttemptRow = {
  id: string;
  child_profile_id: string;
  lesson_id: string;
  client_attempt_id: string | null;
  started_at: string;
  completed_at: string;
  score_correct: number;
  score_total: number;
  xp_awarded: number;
  hearts_remaining: number;
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

type TrackProvisionStatusRow = {
  track_id: string;
  total_lessons: number;
  provisioned_lessons: number;
  has_track_progress: number;
};

type BadgeAttemptCountsRow = {
  total: number;
  perfect: number | null;
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

type PracticeSetStatus = 'draft' | 'active' | 'archived';

type PracticeSetRow = {
  id: string;
  child_profile_id: string;
  subject: string;
  title: string;
  source: string | null;
  status: PracticeSetStatus;
  pinned: number;
  starts_at: string | null;
  expires_at: string | null;
  archived_at: string | null;
  created_at: string;
  updated_at: string;
};

type PracticeSetCardRow = {
  id: string;
  practice_set_id: string;
  term: string;
  definition: string | null;
  example: string | null;
  accepted_answers_json: string | null;
  sort_order: number;
};

type PracticeSetAttemptRow = {
  id: string;
  child_profile_id: string;
  practice_set_id: string;
  client_attempt_id: string | null;
  started_at: string;
  completed_at: string;
  score_correct: number;
  score_total: number;
  xp_awarded: number;
  hearts_remaining: number;
};

type MultiplicationSessionRow = {
  id: string;
  child_profile_id: string;
  client_attempt_id: string;
  mode: 'practice' | 'timed';
  selected_factors_json: string;
  selection_key: string;
  duration_seconds: 60 | 120 | null;
  input_method: MultiplicationSessionInputMethod;
  started_at: string;
  completed_at: string;
  score_correct: number;
  score_total: number;
  xp_awarded: number;
  device_payload_hash: string | null;
};

type MultiplicationMasteryRow = {
  child_profile_id: string;
  factor: number;
  multiplier: number;
  attempts: number;
  correct: number;
  correct_streak: number;
  best_keyboard_response_ms: number | null;
  last_response_ms: number | null;
  last_input_method: MultiplicationInputMethod | null;
  last_practiced_at: string;
};

type DevicePairingRow = {
  id: string;
  code_hmac: string;
  poll_secret_hash: string;
  proposed_device_id: string;
  proposed_token_hash: string;
  source_fingerprint: string;
  hardware_model: string;
  hardware_revision: string;
  firmware_version: string;
  api_version: number;
  status: 'pending' | 'claimed' | 'expired' | 'cancelled';
  claimed_child_profile_id: string | null;
  failed_claim_count: number;
  failed_poll_count: number;
  created_at: string;
  expires_at: string;
  claimed_at: string | null;
};

type ChildDeviceRow = {
  id: string;
  child_profile_id: string;
  name: string;
  token_hash: string;
  status: 'active' | 'revoked';
  hardware_model: string;
  hardware_revision: string;
  firmware_version: string;
  api_version: number;
  created_at: string;
  updated_at: string;
  last_seen_at: string | null;
  revoked_at: string | null;
};

type ContentRevisionRow = {
  child_profile_id: string;
  flash_cards_revision: number;
  updated_at: string;
};

type Env = {
  ASSETS: { fetch(request: Request): Promise<Response> };
  DB: D1Database;
  TIME_ZONE?: string;
  PAIRING_HMAC_SECRET?: string;
  FIRMWARE_MANIFEST_REV3?: string;
  FIRMWARE_MANIFEST_REV1_3?: string;
};

const SESSION_DAYS = 14;
const PROTECTED_PAGE_PREFIXES = ['/profiles', '/kid', '/parent'];
const PUBLIC_FILE_PREFIXES = ['/icons/', '/assets/', '/_astro/'];
const SETUP_PATH = '/setup/';
const PARENT_GATE_PATH = '/parent-gate/';
const PRACTICE_LESSON_PREFIX = 'practice_set_';
const PRACTICE_SET_XP_BASE = 8;
const DEVICE_FLASH_CARD_MAX_RESPONSE_BYTES = 1024 * 1024;
const SetupParentSchema = z.object({
  username: z
    .string()
    .trim()
    .min(2)
    .max(64)
    .regex(/^[a-z0-9][a-z0-9_-]*$/i)
    .transform((value) => value.toLowerCase()),
  email: z.preprocess(
    (value) => (typeof value === 'string' && value.trim() === '' ? undefined : value),
    z.string().trim().email().max(254).optional(),
  ),
  password: z.string().min(8).max(200),
});
const ClientAttemptIdSchema = z.string().trim().min(1).max(128).optional();
const AttemptSubmissionSchema = z.object({
  clientAttemptId: ClientAttemptIdSchema,
  startedAt: z.string().optional(),
  attempts: z.array(
    z.object({
      questionId: z.string(),
      answer: z.unknown(),
    }),
  ),
});

const MadMinuteSubmissionSchema = z.object({
  clientAttemptId: ClientAttemptIdSchema,
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

const MultiplicationSessionSubmissionSchema = z
  .object({
    clientAttemptId: z.string().trim().min(1).max(128),
    mode: z.enum(['practice', 'timed']),
    selectedFactors: z.array(z.number().int().min(1).max(12)).min(1).max(12),
    durationSeconds: z.union([z.literal(60), z.literal(120), z.null()]),
    inputMethod: z.enum(['keyboard', 'voice']),
    startedAt: z.string().trim().min(1),
    attempts: z
      .array(
        z.object({
          factor: z.number().int().min(1).max(12),
          multiplier: z.number().int().min(1).max(12),
          answer: z.number().int().min(0).max(999),
          responseMs: z.number().int().min(0).max(600_000).optional(),
          inputMethod: z.enum(['keyboard', 'voice']),
          attemptedAt: z.string().trim().min(1).optional(),
        }),
      )
      .max(500),
  })
  .superRefine((value, context) => {
    if (value.mode === 'timed' && value.durationSeconds === null) {
      context.addIssue({ code: z.ZodIssueCode.custom, path: ['durationSeconds'], message: 'Timed sessions require a duration.' });
    }
    if (value.mode === 'practice' && value.durationSeconds !== null) {
      context.addIssue({ code: z.ZodIssueCode.custom, path: ['durationSeconds'], message: 'Practice sessions are untimed.' });
    }
  });

const Sha256HexSchema = z.string().regex(/^[a-f0-9]{64}$/i).transform((value) => value.toLowerCase());
const FirmwareVersionSchema = z.string().regex(/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/).max(64);
const FirmwareManifestSchema = z.object({
  schemaVersion: z.literal(1),
  hardwareProfile: z.enum(['waveshare-p4-lcd43-rev3', 'waveshare-p4-lcd43-rev1.3']),
  version: FirmwareVersionSchema,
  minimumVersion: FirmwareVersionSchema,
  url: z.string().url().refine((value) => value.startsWith('https://')),
  sha256: Sha256HexSchema,
  size: z.number().int().min(1).max(7 * 1024 * 1024),
  releaseNotes: z.string().max(1000).default(''),
  mandatory: z.boolean().default(false),
}).strict();
const DevicePairingCreateSchema = z.object({
  deviceId: z.string().uuid(),
  tokenHash: Sha256HexSchema,
  pollSecretHash: Sha256HexSchema,
  hardwareModel: z.literal('waveshare-esp32-p4-wifi6-touch-lcd-4.3'),
  hardwareRevision: z.enum(['rev3', 'rev1_3']),
  firmwareVersion: FirmwareVersionSchema,
  apiVersion: z.literal(1),
});
const ParentPairDeviceSchema = z.object({
  code: z.string().trim().regex(/^[0-9A-HJKMNP-TV-Z]{8}$/i).transform((value) => value.toUpperCase()),
  childId: z.string().trim().min(1).max(128),
  name: z.string().trim().min(1).max(80),
});
const ParentDeviceUpdateSchema = z.object({
  name: z.string().trim().min(1).max(80).optional(),
  status: z.literal('revoked').optional(),
}).refine((value) => value.name !== undefined || value.status !== undefined);
const FlashCardStudySubmissionSchema = z.object({
  clientAttemptId: z.string().trim().min(1).max(128),
  practiceSetId: z.string().trim().min(1).max(128),
  contentRevision: z.number().int().min(0),
  startedAt: z.string().trim().min(1).optional(),
  completedAt: z.string().trim().min(1).optional(),
  durationSeconds: z.number().int().min(0).max(86400),
  uniqueCards: z.number().int().min(0).max(100),
  firstPassGotIt: z.number().int().min(0).max(100),
  totalReviews: z.number().int().min(0).max(10000),
  reviews: z.array(z.object({
    cardId: z.string().trim().min(1).max(128).optional().nullable(),
    cardFingerprint: Sha256HexSchema,
    rating: z.enum(['again', 'got_it']),
    shownCount: z.number().int().min(1).max(1000),
    responseMs: z.number().int().min(0).max(600000).optional().nullable(),
    reviewedAt: z.string().trim().min(1).optional(),
  })).max(1000),
});

const PracticeSetCardInputSchema = z.object({
  term: z.string().trim().min(1).max(500),
  definition: z.string().trim().min(1).max(800).optional().nullable(),
  example: z.string().trim().min(1).max(800).optional().nullable(),
  acceptedAnswers: z.array(z.string().trim().min(1).max(200)).max(20).optional().default([]),
});

const PracticeSetCreateSchema = z.object({
  title: z.string().trim().min(1).max(100),
  subject: z.string().trim().min(1).max(64).default('vocabulary'),
  source: z.string().trim().min(1).max(160).optional().nullable(),
  status: z.enum(['draft', 'active', 'archived']).default('active'),
  pinned: z.boolean().default(false),
  startsAt: z.string().trim().min(1).optional().nullable(),
  expiresAt: z.string().trim().min(1).optional().nullable(),
  cards: z.array(PracticeSetCardInputSchema).min(1).max(100),
});

const PracticeSetUpdateSchema = z.object({
  title: z.string().trim().min(1).max(100).optional(),
  subject: z.string().trim().min(1).max(64).optional(),
  source: z.string().trim().min(1).max(160).optional().nullable(),
  status: z.enum(['draft', 'active', 'archived']).optional(),
  pinned: z.boolean().optional(),
  startsAt: z.string().trim().min(1).optional().nullable(),
  expiresAt: z.string().trim().min(1).optional().nullable(),
  cards: z.array(PracticeSetCardInputSchema).min(1).max(100).optional(),
});

const ChildCreateSchema = z.object({
  displayName: z.string().trim().min(1).max(80),
  gradeLevel: z.number().int().min(1).max(12),
});

const ChildUpdateSchema = z.object({
  displayName: z.string().trim().min(1).max(80).optional(),
  gradeLevel: z.number().int().min(1).max(12).optional(),
  status: z.enum(['active', 'archived']).optional(),
});

const HostedInterestSchema = z.object({
  email: z.string().trim().max(254).email().transform((value) => value.toLowerCase()),
  source: z.string().trim().max(80).optional(),
});

const childAvatarKeys = ['berry-builder', 'teal-tinkerer', 'gold-builder'];

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (shouldRedirectToHttps(request, url)) return httpsRedirect(url);

    if (url.pathname === '/') return rootRedirect(request, env);
    if (isPublicAsset(url.pathname)) return assetResponse(request, env);

    if (url.pathname === '/setup' || url.pathname === SETUP_PATH) return setupPage(request, env);

    if (url.pathname === '/login' || url.pathname === '/login/') {
      if (!(await hasActiveParent(env))) return redirect(new URL(SETUP_PATH, request.url), 303);
      if (request.method === 'POST') return login(request, env);
      return serveAsset(request, env, '/login/');
    }

    if (url.pathname === '/logout' || url.pathname === '/logout/') return logout(request, env);
    if (url.pathname === '/parent-gate' || url.pathname === '/parent-gate/') return parentGate(request, env);
    if (url.pathname === '/api/setup/status' || url.pathname === '/api/setup/status/') return apiSetupStatus(env);
    if (url.pathname === '/api/setup/parent' || url.pathname === '/api/setup/parent/') return apiSetupParent(request, env);
    if (url.pathname === '/api/hosted-interest' || url.pathname === '/api/hosted-interest/') {
      return apiHostedInterest(request, env);
    }
    if (url.pathname === '/api/device/v1' || url.pathname.startsWith('/api/device/v1/')) {
      return deviceApiRouter(request, env);
    }
    if (url.pathname.startsWith('/api/')) return apiRouter(request, env);

    if (PROTECTED_PAGE_PREFIXES.some((prefix) => url.pathname === prefix || url.pathname.startsWith(`${prefix}/`))) {
      return protectedAsset(request, env);
    }

    return assetResponse(request, env);
  },
};

async function rootRedirect(request: Request, env: Env) {
  if (!(await hasActiveParent(env))) return redirect(new URL(SETUP_PATH, request.url));

  const parent = await getParentFromRequest(request, env);
  if (!parent) return serveAsset(request, env, '/');

  const childSlug = getChildModeSlug(request);
  return redirect(new URL(childSlug ? `/kid/${encodeURIComponent(childSlug)}/` : '/profiles/', request.url));
}

async function setupPage(request: Request, env: Env) {
  if (await hasActiveParent(env)) {
    const parent = await getParentFromRequest(request, env);
    return redirect(new URL(parent ? '/profiles/' : '/login/', request.url), 303);
  }

  if (request.method === 'GET' || request.method === 'HEAD') return serveAsset(request, env, SETUP_PATH);
  return json({ error: 'method_not_allowed' }, 405);
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
  if (!(await hasActiveParent(env))) return redirect(new URL(SETUP_PATH, request.url), 303);

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
  if (!(await hasActiveParent(env))) return redirect(new URL(SETUP_PATH, request.url), 303);

  const parent = await getParentFromRequest(request, env);
  if (!parent) return redirect(new URL('/login/', request.url), 303);

  const url = new URL(request.url);
  const childModeSlug = getChildModeSlug(request);

  if (isParentPage(url.pathname)) {
    if (childModeSlug) return parentGateRedirect(request, url.pathname);
    return serveAsset(request, env, url.pathname);
  }

  if (isKidShellPath(url.pathname)) return serveAsset(request, env, url.pathname);

  const requestedChildSlug = childSlugFromKidPath(url.pathname);
  if (!requestedChildSlug) return serveAsset(request, env, url.pathname);

  const child = await getChildForParent(parent, env, requestedChildSlug);
  if (!child || child.status !== 'active') {
    const response = redirect(new URL('/profiles/', request.url), 303);
    response.headers.append('Set-Cookie', clearChildCookie());
    return response;
  }

  if (childModeSlug && childModeSlug !== child.slug) return parentGateRedirect(request, url.pathname);

  const response = await serveAsset(request, env, kidShellAssetPath(url.pathname) ?? url.pathname);
  return childModeSlug === child.slug ? response : withCookie(response, childCookie(child.slug, childCookieExpiry()));
}

type DeviceAuthContext = {
  device: ChildDeviceRow;
  child: ChildRow;
  parent: SessionParent;
};

async function deviceApiRouter(request: Request, env: Env) {
  const pathname = stripTrailingSlash(new URL(request.url).pathname);
  if (pathname === '/api/device/v1/pairings' && request.method === 'POST') {
    return apiCreateDevicePairing(request, env);
  }
  const pairingMatch = pathname.match(/^\/api\/device\/v1\/pairings\/([^/]+)$/);
  if (pairingMatch && request.method === 'GET') {
    return apiPollDevicePairing(request, env, decodeURIComponent(pairingMatch[1]));
  }

  const authenticated = await authenticateDevice(request, env);
  if (authenticated instanceof Response) return authenticated;

  if (pathname !== '/api/device/v1/bootstrap' && pathname !== '/api/device/v1/firmware') {
    const firmware = deviceFirmwarePolicy(authenticated.device, env);
    if (!firmware) return deviceError('temporarily_unavailable', 503, 300);
    if (firmware.mandatory) return deviceError('firmware_update_required', 426);
  }

  if (pathname === '/api/device/v1/bootstrap' && request.method === 'GET') {
    return apiDeviceBootstrap(env, authenticated);
  }
  if (pathname === '/api/device/v1/flash-card-sections' && request.method === 'GET') {
    return apiDeviceFlashCardSections(request, env, authenticated);
  }
  if (pathname === '/api/device/v1/multiplication/sessions' && request.method === 'POST') {
    return apiSubmitMultiplicationSession(
      authenticated.parent,
      env,
      request,
      authenticated.child.id,
      authenticated.child.slug,
      true,
    );
  }
  if (pathname === '/api/device/v1/flash-card-sessions' && request.method === 'POST') {
    return apiDeviceFlashCardStudy(request, env, authenticated);
  }
  if (pathname === '/api/device/v1/firmware' && request.method === 'GET') {
    return apiDeviceFirmware(authenticated, env);
  }
  return deviceError('resource_not_found', 404);
}

async function apiCreateDevicePairing(request: Request, env: Env) {
  if (!env.PAIRING_HMAC_SECRET || env.PAIRING_HMAC_SECRET.length < 32) {
    return deviceError('server_error', 500);
  }
  let body: z.infer<typeof DevicePairingCreateSchema>;
  try {
    body = DevicePairingCreateSchema.parse(await readBoundedJson(request, 16 * 1024));
  } catch {
    return deviceError('invalid_payload', 400);
  }

  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const sourceFingerprint = await pairingCodeHmac(
    env.PAIRING_HMAC_SECRET,
    `source:${request.headers.get('CF-Connecting-IP') ?? 'unknown'}`,
  );
  const [recent, recentSource] = await Promise.all([env.DB.prepare(
    'SELECT count(*) AS total FROM device_pairings WHERE proposed_device_id = ? AND created_at >= ?',
  ).bind(body.deviceId, oneHourAgo).first<CountRow>(), env.DB.prepare(
    'SELECT count(*) AS total FROM device_pairings WHERE source_fingerprint = ? AND created_at >= ?',
  ).bind(sourceFingerprint, oneHourAgo).first<CountRow>()]);
  if ((recent?.total ?? 0) >= 5 || (recentSource?.total ?? 0) >= 20) {
    return deviceError('rate_limited', 429, 3600);
  }

  const now = new Date();
  const expires = new Date(now.getTime() + 10 * 60 * 1000);
  const code = randomPairingCode();
  const pairingId = randomId('pairing_');
  await env.DB.prepare(
    `INSERT INTO device_pairings
     (id, code_hmac, poll_secret_hash, proposed_device_id, proposed_token_hash, source_fingerprint,
      hardware_model, hardware_revision, firmware_version, api_version, status,
      created_at, expires_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?)`,
  ).bind(
    pairingId,
    await pairingCodeHmac(env.PAIRING_HMAC_SECRET, code),
    body.pollSecretHash,
    body.deviceId,
    body.tokenHash,
    sourceFingerprint,
    body.hardwareModel,
    body.hardwareRevision,
    body.firmwareVersion,
    body.apiVersion,
    now.toISOString(),
    expires.toISOString(),
  ).run();

  const claimUrl = new URL('/parent/', request.url);
  claimUrl.searchParams.set('pair', code);
  return deviceJson({
    schemaVersion: 1,
    pairingId,
    code,
    claimUrl: claimUrl.toString(),
    expiresAt: expires.toISOString(),
  }, 201);
}

async function apiPollDevicePairing(request: Request, env: Env, pairingId: string) {
  const pairing = await env.DB.prepare('SELECT * FROM device_pairings WHERE id = ? LIMIT 1')
    .bind(pairingId)
    .first<DevicePairingRow>();
  if (!pairing) return deviceError('resource_not_found', 404);
  if (pairing.failed_poll_count >= 100) return deviceError('rate_limited', 429, 600);

  const authorization = request.headers.get('Authorization') ?? '';
  const pollSecret = authorization.startsWith('Pairing ') ? authorization.slice(8) : '';
  const presentedHash = pollSecret ? await sha256Hex(pollSecret) : '';
  if (!secureHashEqual(presentedHash, pairing.poll_secret_hash)) {
    await env.DB.prepare(
      'UPDATE device_pairings SET failed_poll_count = min(100, failed_poll_count + 1) WHERE id = ?',
    ).bind(pairing.id).run();
    return deviceError('device_auth_invalid', 401);
  }

  if (pairing.status === 'pending' && pairing.expires_at <= new Date().toISOString()) {
    await env.DB.prepare("UPDATE device_pairings SET status = 'expired' WHERE id = ? AND status = 'pending'")
      .bind(pairing.id)
      .run();
    return deviceJson({ schemaVersion: 1, status: 'expired' });
  }
  if (pairing.status !== 'claimed' || !pairing.claimed_child_profile_id) {
    return deviceJson({ schemaVersion: 1, status: pairing.status });
  }
  const [child, device] = await Promise.all([
    env.DB.prepare('SELECT * FROM child_profiles WHERE id = ? LIMIT 1')
      .bind(pairing.claimed_child_profile_id)
      .first<ChildRow>(),
    env.DB.prepare('SELECT id, name FROM child_devices WHERE id = ? LIMIT 1')
      .bind(pairing.proposed_device_id)
      .first<{ id: string; name: string }>(),
  ]);
  return deviceJson({
    schemaVersion: 1,
    status: 'claimed',
    deviceId: pairing.proposed_device_id,
    device: device ? { id: device.id, name: device.name } : null,
    child: child ? { id: child.id, slug: child.slug, displayName: child.display_name } : null,
  });
}

async function authenticateDevice(request: Request, env: Env): Promise<DeviceAuthContext | Response> {
  const deviceId = request.headers.get('X-Buddy-Blocks-Device-ID')?.trim() ?? '';
  const firmwareVersionResult = FirmwareVersionSchema.safeParse(
    request.headers.get('X-Buddy-Blocks-Firmware')?.trim() ?? '',
  );
  const authorization = request.headers.get('Authorization') ?? '';
  const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : '';
  if (!deviceId || !firmwareVersionResult.success || !token.startsWith('bbdev_v1_') || token.length > 128) {
    return recordDeviceAuthFailure(request, env);
  }
  const firmwareVersion = firmwareVersionResult.data;

  const device = await env.DB.prepare('SELECT * FROM child_devices WHERE id = ? LIMIT 1')
    .bind(deviceId)
    .first<ChildDeviceRow>();
  const presentedHash = await sha256Hex(token);
  if (!device || !secureHashEqual(presentedHash, device.token_hash)) {
    return recordDeviceAuthFailure(request, env);
  }
  if (device.status !== 'active') return deviceError('device_revoked', 403);

  const child = await env.DB.prepare('SELECT * FROM child_profiles WHERE id = ? LIMIT 1')
    .bind(device.child_profile_id)
    .first<ChildRow>();
  if (!child || child.status !== 'active') return deviceError('child_inactive', 403);
  const parent = await env.DB.prepare(
    `SELECT id, username, email, status, created_at, updated_at
     FROM parents WHERE id = ? AND status = 'active' LIMIT 1`,
  ).bind(child.parent_id).first<SessionParent>();
  if (!parent) return deviceError('device_revoked', 403);

  const now = new Date();
  if (!device.last_seen_at || Date.parse(device.last_seen_at) < now.getTime() - 60 * 60 * 1000) {
    await env.DB.prepare(
      'UPDATE child_devices SET last_seen_at = ?, firmware_version = ?, updated_at = ? WHERE id = ?',
    ).bind(now.toISOString(), firmwareVersion.slice(0, 64), now.toISOString(), device.id).run();
  }
  return { device: { ...device, firmware_version: firmwareVersion }, child, parent };
}

async function recordDeviceAuthFailure(request: Request, env: Env) {
  if (!env.PAIRING_HMAC_SECRET || env.PAIRING_HMAC_SECRET.length < 32) {
    return deviceError('device_auth_invalid', 401);
  }
  const windowMilliseconds = 10 * 60 * 1000;
  const now = new Date();
  const windowStarted = new Date(
    Math.floor(now.getTime() / windowMilliseconds) * windowMilliseconds,
  ).toISOString();
  const sourceFingerprint = await pairingCodeHmac(
    env.PAIRING_HMAC_SECRET,
    `device-auth:${request.headers.get('CF-Connecting-IP') ?? 'unknown'}`,
  );
  await env.DB.prepare(
    `INSERT INTO device_auth_failure_limits
       (source_fingerprint, window_started_at, attempt_count, last_attempt_at)
     VALUES (?, ?, 1, ?)
     ON CONFLICT(source_fingerprint) DO UPDATE SET
       window_started_at = excluded.window_started_at,
       attempt_count = CASE
         WHEN device_auth_failure_limits.window_started_at = excluded.window_started_at
           THEN min(1000, device_auth_failure_limits.attempt_count + 1)
         ELSE 1
       END,
       last_attempt_at = excluded.last_attempt_at`,
  ).bind(sourceFingerprint, windowStarted, now.toISOString()).run();
  const failureLimit = await env.DB.prepare(
    'SELECT attempt_count FROM device_auth_failure_limits WHERE source_fingerprint = ? LIMIT 1',
  ).bind(sourceFingerprint).first<{ attempt_count: number }>();
  return (failureLimit?.attempt_count ?? 0) > 20
    ? deviceError('rate_limited', 429, 600)
    : deviceError('device_auth_invalid', 401);
}

async function apiDeviceBootstrap(env: Env, authenticated: DeviceAuthContext) {
  const firmware = deviceFirmwarePolicy(authenticated.device, env);
  if (!firmware) return deviceError('temporarily_unavailable', 503, 300);
  const [overview, revision] = await Promise.all([
    multiplicationOverviewResponse(env, authenticated.child),
    getContentRevision(env, authenticated.child.id),
  ]);
  return deviceJson({
    schemaVersion: 1,
    serverTime: new Date().toISOString(),
    device: { id: authenticated.device.id, name: authenticated.device.name },
    child: {
      id: authenticated.child.id,
      slug: authenticated.child.slug,
      displayName: authenticated.child.display_name,
    },
    content: { flashCardsRevision: revision.flash_cards_revision },
    multiplication: {
      mastery: overview.mastery,
      recentSessions: overview.recentSessions,
      fluentFacts: overview.summary.fluentFacts,
      xpTotal: overview.summary.xpTotal,
      best60Seconds: overview.summary.best60Seconds,
      best120Seconds: overview.summary.best120Seconds,
    },
    firmware: {
      latest: firmware.version,
      minimum: firmware.minimumVersion,
      updateAvailable: firmware.updateAvailable,
      mandatory: firmware.mandatory,
    },
  });
}

async function apiDeviceFlashCardSections(
  request: Request,
  env: Env,
  authenticated: DeviceAuthContext,
) {
  const revision = await getContentRevision(env, authenticated.child.id);
  const etag = `"flash-cards-r${revision.flash_cards_revision}"`;
  if (request.headers.get('If-None-Match') === etag) {
    return new Response(null, { status: 304, headers: deviceHeaders({ ETag: etag }) });
  }
  const sections = await getVisiblePracticeSets(env, authenticated.child.id, new Date());
  if (sections.length > 50) return deviceError('device_content_too_large', 413);
  const withCards = await Promise.all(sections.map(async (section) => ({
    section,
    cards: await getPracticeSetCards(env, section.id),
  })));
  const cardCount = withCards.reduce((sum, entry) => sum + entry.cards.length, 0);
  if (cardCount > 2500 || withCards.some((entry) => entry.cards.length > 100)) {
    return deviceError('device_content_too_large', 413);
  }
  const payload = {
    schemaVersion: 1,
    revision: revision.flash_cards_revision,
    generatedAt: new Date().toISOString(),
    sections: withCards.map(({ section, cards }) => ({
      id: section.id,
      title: section.title,
      source: section.source,
      pinned: Boolean(section.pinned),
      updatedAt: section.updated_at,
      cards: cards.map((card) => ({
        id: card.id,
        front: card.term,
        back: card.definition ?? acceptedAnswersFromCard(card)[0] ?? card.term,
        clue: card.example,
        sortOrder: card.sort_order,
      })),
    })),
  };
  const body = JSON.stringify(payload);
  if (new TextEncoder().encode(body).byteLength > DEVICE_FLASH_CARD_MAX_RESPONSE_BYTES) {
    return deviceError('device_content_too_large', 413);
  }
  return new Response(body, { status: 200, headers: deviceHeaders({ ETag: etag }) });
}

async function apiDeviceFlashCardStudy(
  request: Request,
  env: Env,
  authenticated: DeviceAuthContext,
) {
  let body: z.infer<typeof FlashCardStudySubmissionSchema>;
  try {
    body = FlashCardStudySubmissionSchema.parse(await readBoundedJson(request, 512 * 1024));
  } catch {
    return deviceError('invalid_payload', 400);
  }
  if (body.firstPassGotIt > body.uniqueCards || body.uniqueCards > body.totalReviews) {
    return deviceError('invalid_payload', 400);
  }
  const now = new Date();
  const maximumDeviceTime = now.getTime() + 5 * 60 * 1000;
  const submittedTimes = [body.startedAt, body.completedAt,
    ...body.reviews.map((review) => review.reviewedAt)].filter(
    (value): value is string => typeof value === 'string',
  );
  if (submittedTimes.some((value) => {
    const timestamp = Date.parse(value);
    return Number.isFinite(timestamp) && timestamp > maximumDeviceTime;
  })) return deviceError('invalid_payload', 400);
  const payloadHash = await sha256Hex(JSON.stringify(body));
  const existing = await env.DB.prepare(
    `SELECT id, payload_hash FROM flash_card_study_sessions
     WHERE child_profile_id = ? AND client_attempt_id = ? LIMIT 1`,
  ).bind(authenticated.child.id, body.clientAttemptId).first<{ id: string; payload_hash: string }>();
  if (existing) {
    if (existing.payload_hash !== payloadHash) return deviceError('client_attempt_conflict', 409);
    return deviceJson({ schemaVersion: 1, sessionId: existing.id, duplicate: true });
  }

  const practiceSet = await getPracticeSetForChild(env, authenticated.child.id, body.practiceSetId);
  if (!practiceSet) return deviceError('resource_not_found', 404);
  const currentCards = await getPracticeSetCards(env, practiceSet.id);
  const currentCardIds = new Set(currentCards.map((card) => card.id));
  const receivedAt = now.toISOString();
  const completedAt = body.completedAt && validIsoTimestamp(body.completedAt) &&
      Date.parse(body.completedAt) >= Date.UTC(2024, 0, 1)
    ? new Date(body.completedAt).toISOString()
    : receivedAt;
  const startedAt = body.startedAt && validIsoTimestamp(body.startedAt) &&
      Date.parse(body.startedAt) >= Date.UTC(2024, 0, 1)
    ? new Date(body.startedAt).toISOString()
    : completedAt;
  const sessionId = randomId('flash_study_');
  await env.DB.batch([
    env.DB.prepare(
      `INSERT INTO flash_card_study_sessions
       (id, child_profile_id, device_id, practice_set_id, client_attempt_id, content_revision,
        started_at, completed_at, received_at, unique_cards, first_pass_got_it, total_reviews,
        duration_seconds, payload_hash)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    ).bind(
      sessionId,
      authenticated.child.id,
      authenticated.device.id,
      practiceSet.id,
      body.clientAttemptId,
      body.contentRevision,
      startedAt,
      completedAt,
      receivedAt,
      body.uniqueCards,
      body.firstPassGotIt,
      body.totalReviews,
      body.durationSeconds,
      payloadHash,
    ),
    ...body.reviews.map((review) => env.DB.prepare(
      `INSERT INTO flash_card_study_reviews
       (id, session_id, practice_set_card_id, card_fingerprint, rating, shown_count,
        response_ms, reviewed_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    ).bind(
      randomId('flash_review_'),
      sessionId,
      review.cardId && currentCardIds.has(review.cardId) ? review.cardId : null,
      review.cardFingerprint,
      review.rating,
      review.shownCount,
      review.responseMs ?? null,
      review.reviewedAt && validIsoTimestamp(review.reviewedAt) &&
          Date.parse(review.reviewedAt) >= Date.UTC(2024, 0, 1)
        ? new Date(review.reviewedAt).toISOString()
        : completedAt,
    )),
  ]);
  return deviceJson({ schemaVersion: 1, sessionId, duplicate: false }, 201);
}

function apiDeviceFirmware(authenticated: DeviceAuthContext, env: Env) {
  const policy = deviceFirmwarePolicy(authenticated.device, env);
  return policy ? deviceJson(policy) : deviceError('temporarily_unavailable', 503, 300);
}

function deviceFirmwarePolicy(device: ChildDeviceRow, env: Env) {
  const hardwareProfile = `waveshare-p4-lcd43-${device.hardware_revision.replace('_', '.')}`;
  const configured = device.hardware_revision === 'rev3'
    ? env.FIRMWARE_MANIFEST_REV3
    : env.FIRMWARE_MANIFEST_REV1_3;
  if (!configured) {
    return {
      schemaVersion: 1 as const,
      hardwareProfile,
      version: '0.1.0',
      minimumVersion: '0.1.0',
      updateAvailable: false,
      mandatory: false,
    };
  }

  let decoded: unknown;
  try {
    decoded = JSON.parse(configured);
  } catch {
    return null;
  }
  const result = FirmwareManifestSchema.safeParse(decoded);
  if (!result.success || result.data.hardwareProfile !== hardwareProfile ||
      compareFirmwareVersions(result.data.minimumVersion, result.data.version) > 0) {
    return null;
  }
  const updateAvailable = compareFirmwareVersions(device.firmware_version, result.data.version) < 0;
  const belowMinimum = compareFirmwareVersions(device.firmware_version, result.data.minimumVersion) < 0;
  return {
    ...result.data,
    updateAvailable,
    mandatory: updateAvailable && (result.data.mandatory || belowMinimum),
  };
}

function compareFirmwareVersions(left: string, right: string) {
  const split = (value: string) => {
    const withoutBuild = value.split('+', 1)[0];
    const separator = withoutBuild.indexOf('-');
    const core = separator === -1 ? withoutBuild : withoutBuild.slice(0, separator);
    const prerelease = separator === -1 ? '' : withoutBuild.slice(separator + 1);
    return {
      core: core.split('.').map((part) => Number.parseInt(part, 10)),
      prerelease: prerelease?.split('.') ?? [],
    };
  };
  const a = split(left);
  const b = split(right);
  for (let index = 0; index < 3; index += 1) {
    if (a.core[index] !== b.core[index]) return a.core[index] < b.core[index] ? -1 : 1;
  }
  if (a.prerelease.length === 0 || b.prerelease.length === 0) {
    return a.prerelease.length === b.prerelease.length ? 0 : a.prerelease.length === 0 ? 1 : -1;
  }
  for (let index = 0; index < Math.max(a.prerelease.length, b.prerelease.length); index += 1) {
    const aPart = a.prerelease[index];
    const bPart = b.prerelease[index];
    if (aPart === undefined || bPart === undefined) return aPart === undefined ? -1 : 1;
    if (aPart === bPart) continue;
    const aNumeric = /^\d+$/.test(aPart);
    const bNumeric = /^\d+$/.test(bPart);
    if (aNumeric && bNumeric) return Number(aPart) < Number(bPart) ? -1 : 1;
    if (aNumeric !== bNumeric) return aNumeric ? -1 : 1;
    return aPart < bPart ? -1 : 1;
  }
  return 0;
}

async function apiParentDevices(parent: SessionParent, env: Env) {
  const devices = await all<ChildDeviceRow & { child_display_name: string }>(env.DB.prepare(
    `SELECT child_devices.*, child_profiles.display_name AS child_display_name
     FROM child_devices
     JOIN child_profiles ON child_profiles.id = child_devices.child_profile_id
     WHERE child_profiles.parent_id = ?
     ORDER BY child_devices.created_at DESC`,
  ).bind(parent.id));
  return json({ devices: devices.map((device) => ({
    id: device.id,
    childId: device.child_profile_id,
    childDisplayName: device.child_display_name,
    name: device.name,
    status: device.status,
    hardwareModel: device.hardware_model,
    hardwareRevision: device.hardware_revision,
    firmwareVersion: device.firmware_version,
    createdAt: device.created_at,
    updatedAt: device.updated_at,
    lastSeenAt: device.last_seen_at,
    revokedAt: device.revoked_at,
  })), pendingPairings: [] });
}

async function apiParentPairDevice(parent: SessionParent, env: Env, request: Request) {
  if (!env.PAIRING_HMAC_SECRET || env.PAIRING_HMAC_SECRET.length < 32) return json({ error: 'server_error' }, 500);
  let body: z.infer<typeof ParentPairDeviceSchema>;
  try {
    body = ParentPairDeviceSchema.parse(await readBoundedJson(request, 16 * 1024));
  } catch {
    return json({ error: 'invalid_device_pairing_payload' }, 400);
  }
  const windowMilliseconds = 10 * 60 * 1000;
  const windowStarted = new Date(
    Math.floor(Date.now() / windowMilliseconds) * windowMilliseconds,
  ).toISOString();
  const claimFingerprint = await pairingCodeHmac(
    env.PAIRING_HMAC_SECRET,
    `claim:${parent.id}:${request.headers.get('CF-Connecting-IP') ?? 'unknown'}:${windowStarted}`,
  );
  await env.DB.prepare(
    `INSERT INTO device_pairing_claim_limits (source_fingerprint, window_started_at, attempt_count)
     VALUES (?, ?, 1)
     ON CONFLICT(source_fingerprint) DO UPDATE SET attempt_count = min(1000, attempt_count + 1)`,
  ).bind(claimFingerprint, windowStarted).run();
  const claimLimit = await env.DB.prepare(
    'SELECT attempt_count FROM device_pairing_claim_limits WHERE source_fingerprint = ? LIMIT 1',
  ).bind(claimFingerprint).first<{ attempt_count: number }>();
  if ((claimLimit?.attempt_count ?? 0) > 20) {
    return json({ error: 'rate_limited', retryAfterSeconds: 600 }, 429);
  }
  const pairing = await env.DB.prepare('SELECT * FROM device_pairings WHERE code_hmac = ? LIMIT 1')
    .bind(await pairingCodeHmac(env.PAIRING_HMAC_SECRET, body.code))
    .first<DevicePairingRow>();
  if (!pairing) return json({ error: 'pairing_code_invalid' }, 404);
  if (pairing.failed_claim_count >= 20) return json({ error: 'rate_limited' }, 429);
  if (pairing.status !== 'pending') return json({ error: 'pairing_code_used' }, 409);
  if (pairing.expires_at <= new Date().toISOString()) {
    await env.DB.prepare("UPDATE device_pairings SET status = 'expired' WHERE id = ? AND status = 'pending'")
      .bind(pairing.id).run();
    return json({ error: 'pairing_code_expired' }, 410);
  }
  const child = await getChildForParent(parent, env, body.childId);
  if (!child || child.status !== 'active') {
    await env.DB.prepare(
      'UPDATE device_pairings SET failed_claim_count = min(20, failed_claim_count + 1) WHERE id = ?',
    ).bind(pairing.id).run();
    return json({ error: 'child_not_found' }, 404);
  }
  const now = new Date().toISOString();
  try {
    await env.DB.batch([
      env.DB.prepare(
        `INSERT INTO child_devices
         (id, child_profile_id, name, token_hash, status, hardware_model, hardware_revision,
          firmware_version, api_version, created_at, updated_at)
         VALUES (?, ?, ?, ?, 'active', ?, ?, ?, ?, ?, ?)`,
      ).bind(
        pairing.proposed_device_id,
        child.id,
        body.name,
        pairing.proposed_token_hash,
        pairing.hardware_model,
        pairing.hardware_revision,
        pairing.firmware_version,
        pairing.api_version,
        now,
        now,
      ),
      env.DB.prepare(
        `UPDATE device_pairings
         SET status = 'claimed', claimed_child_profile_id = ?, claimed_at = ?
         WHERE id = ? AND status = 'pending'`,
      ).bind(child.id, now, pairing.id),
    ]);
  } catch {
    return json({ error: 'pairing_code_used' }, 409);
  }
  return json({ device: { id: pairing.proposed_device_id, name: body.name, childId: child.id, status: 'active' } }, 201);
}

async function apiParentUpdateDevice(
  parent: SessionParent,
  env: Env,
  request: Request,
  deviceId: string,
) {
  let body: z.infer<typeof ParentDeviceUpdateSchema>;
  try {
    body = ParentDeviceUpdateSchema.parse(await readBoundedJson(request, 16 * 1024));
  } catch {
    return json({ error: 'invalid_device_payload' }, 400);
  }
  const device = await env.DB.prepare(
    `SELECT child_devices.* FROM child_devices
     JOIN child_profiles ON child_profiles.id = child_devices.child_profile_id
     WHERE child_devices.id = ? AND child_profiles.parent_id = ? LIMIT 1`,
  ).bind(deviceId, parent.id).first<ChildDeviceRow>();
  if (!device) return json({ error: 'device_not_found' }, 404);
  const now = new Date().toISOString();
  const status = body.status ?? device.status;
  await env.DB.prepare(
    `UPDATE child_devices SET name = ?, status = ?, updated_at = ?, revoked_at = ? WHERE id = ?`,
  ).bind(
    body.name ?? device.name,
    status,
    now,
    status === 'revoked' ? (device.revoked_at ?? now) : null,
    device.id,
  ).run();
  return json({ device: { id: device.id, name: body.name ?? device.name, status } });
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

  if (pathname === '/api/parent/devices') {
    if (childModeSlug) return parentReauthResponse();
    if (request.method === 'GET') return apiParentDevices(parent, env);
  }
  if (pathname === '/api/parent/devices/pair') {
    if (childModeSlug) return parentReauthResponse();
    if (request.method === 'POST') return apiParentPairDevice(parent, env, request);
  }
  const parentDeviceMatch = pathname.match(/^\/api\/parent\/devices\/([^/]+)$/);
  if (parentDeviceMatch) {
    if (childModeSlug) return parentReauthResponse();
    if (request.method === 'PATCH') {
      return apiParentUpdateDevice(parent, env, request, decodeURIComponent(parentDeviceMatch[1]));
    }
  }

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
  if (pathname === '/api/parent/children') {
    if (childModeSlug) return parentReauthResponse();
    if (request.method === 'GET') return apiParentChildren(parent, env);
    if (request.method === 'POST') return apiCreateChild(parent, env, request);
  }

  const parentChildMatch = pathname.match(/^\/api\/parent\/children\/([^/]+)$/);
  if (parentChildMatch) {
    if (childModeSlug) return parentReauthResponse();
    if (request.method === 'PATCH') return apiUpdateChild(parent, env, request, decodeURIComponent(parentChildMatch[1]));
  }

  const parentPracticeSetMatch = pathname.match(/^\/api\/parent\/children\/([^/]+)\/practice-sets(?:\/([^/]+))?$/);
  if (parentPracticeSetMatch) {
    if (childModeSlug) return parentReauthResponse();
    const childKey = decodeURIComponent(parentPracticeSetMatch[1]);
    const practiceSetId = parentPracticeSetMatch[2] ? decodeURIComponent(parentPracticeSetMatch[2]) : null;
    if (!practiceSetId && request.method === 'GET') return apiParentPracticeSets(parent, env, childKey);
    if (!practiceSetId && request.method === 'POST') return apiCreatePracticeSet(parent, env, request, childKey);
    if (practiceSetId && request.method === 'PATCH') return apiUpdatePracticeSet(parent, env, request, childKey, practiceSetId);
  }

  const childFlashCardSectionMatch = pathname.match(
    /^\/api\/children\/([^/]+)\/flash-card-sections(?:\/([^/]+))?$/,
  );
  if (childFlashCardSectionMatch) {
    const childKey = decodeURIComponent(childFlashCardSectionMatch[1]);
    const child = await getChildForParent(parent, env, childKey);
    if (!child) return json({ error: 'child_not_found' }, 404);
    if (child.status !== 'active' || childModeSlug !== child.slug) return childLockedResponse();

    const practiceSetId = childFlashCardSectionMatch[2]
      ? decodeURIComponent(childFlashCardSectionMatch[2])
      : null;
    if (!practiceSetId && request.method === 'GET') return apiParentPracticeSets(parent, env, child.id);
    if (!practiceSetId && request.method === 'POST') return apiCreatePracticeSet(parent, env, request, child.id);
    if (practiceSetId && request.method === 'PATCH') {
      return apiUpdatePracticeSet(parent, env, request, child.id, practiceSetId);
    }
  }

  const childHomeMatch = pathname.match(/^\/api\/children\/([^/]+)\/home$/);
  if (childHomeMatch) return apiChildHome(parent, env, decodeURIComponent(childHomeMatch[1]), childModeSlug);

  const multiplicationMatch = pathname.match(/^\/api\/children\/([^/]+)\/multiplication(?:\/(sessions))?$/);
  if (multiplicationMatch) {
    const childKey = decodeURIComponent(multiplicationMatch[1]);
    if (!multiplicationMatch[2] && request.method === 'GET') {
      return apiMultiplicationOverview(parent, env, childKey, childModeSlug);
    }
    if (multiplicationMatch[2] === 'sessions' && request.method === 'POST') {
      return apiSubmitMultiplicationSession(parent, env, request, childKey, childModeSlug);
    }
  }

  const trackOfflinePackMatch = pathname.match(/^\/api\/children\/([^/]+)\/tracks\/([^/]+)\/offline-pack$/);
  if (trackOfflinePackMatch) {
    return apiChildTrackOfflinePack(
      parent,
      env,
      decodeURIComponent(trackOfflinePackMatch[1]),
      decodeURIComponent(trackOfflinePackMatch[2]),
      childModeSlug,
    );
  }

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

async function apiSetupStatus(env: Env) {
  const activeParentCount = await getActiveParentCount(env);
  return json({
    configured: activeParentCount > 0,
    setupRequired: activeParentCount === 0,
    activeParentCount,
  });
}

async function apiSetupParent(request: Request, env: Env) {
  if (request.method !== 'POST') return json({ error: 'method_not_allowed' }, 405);
  if (!sameOrigin(request)) return json({ error: 'invalid_origin' }, 403);
  if (await hasActiveParent(env)) return json({ error: 'setup_complete' }, 409);

  let body: z.infer<typeof SetupParentSchema>;
  try {
    body = SetupParentSchema.parse(await request.json());
  } catch {
    return json({ error: 'invalid_setup_parent_payload' }, 400);
  }

  const now = new Date();
  const expires = new Date(now.getTime() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  const parentId = randomId('parent_');
  const sessionId = randomId('sess_');
  const password = await hashPassword(body.password);
  const parent: SessionParent = {
    id: parentId,
    username: body.username,
    email: body.email ?? null,
    status: 'active',
    created_at: now.toISOString(),
    updated_at: now.toISOString(),
  };

  await env.DB.batch([
    env.DB.prepare(
      `INSERT INTO parents
       (id, username, email, password_hash, password_salt, status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, 'active', ?, ?)`,
    ).bind(parent.id, parent.username, parent.email, password.hash, password.salt, parent.created_at, parent.updated_at),
    env.DB.prepare('INSERT INTO sessions (id, parent_id, expires_at, created_at) VALUES (?, ?, ?, ?)')
      .bind(sessionId, parent.id, expires.toISOString(), parent.created_at),
  ]);

  const response = json({ parent: parentResponse(parent), redirectTo: '/parent/' }, 201);
  response.headers.append('Set-Cookie', sessionCookie(sessionId, expires));
  response.headers.append('Set-Cookie', clearChildCookie());
  return response;
}

async function apiHostedInterest(request: Request, env: Env) {
  if (request.method !== 'POST') return json({ error: 'method_not_allowed' }, 405);
  if (!sameOrigin(request)) return json({ error: 'invalid_origin' }, 403);

  let body: z.infer<typeof HostedInterestSchema>;
  try {
    body = HostedInterestSchema.parse(await readRequestPayload(request));
  } catch {
    return json({ error: 'invalid_email' }, 400);
  }

  const now = new Date().toISOString();
  await env.DB.prepare(
    `INSERT INTO hosted_interest_emails (email, source, created_at, updated_at)
     VALUES (?, ?, ?, ?)
     ON CONFLICT(email) DO UPDATE SET
       source = COALESCE(excluded.source, hosted_interest_emails.source),
       updated_at = excluded.updated_at`,
  )
    .bind(body.email, body.source ?? 'homepage', now, now)
    .run();

  return json({ ok: true, message: 'Thanks. We will let you know if a hosted version becomes available.' });
}

async function apiMe(parent: SessionParent, env: Env) {
  return json({
    parent: parentResponse(parent),
    children: (await getChildren(parent, env)).map(childResponse),
  });
}

async function apiChildren(parent: SessionParent, env: Env) {
  const children = await getActiveChildren(parent, env);
  return json({ children: children.map(childResponse) });
}

async function apiParentChildren(parent: SessionParent, env: Env) {
  const children = await getChildren(parent, env);
  return json({ children: children.map(childResponse) });
}

async function apiCreateChild(parent: SessionParent, env: Env, request: Request) {
  let body: z.infer<typeof ChildCreateSchema>;
  try {
    body = ChildCreateSchema.parse(await request.json());
  } catch {
    return json({ error: 'invalid_child_payload' }, 400);
  }

  const now = new Date().toISOString();
  const existingChildren = await getChildren(parent, env);
  const child: ChildRow = {
    id: randomId('child_'),
    parent_id: parent.id,
    slug: uniqueChildSlug(body.displayName, existingChildren.map((item) => item.slug)),
    display_name: body.displayName,
    avatar_key: childAvatarKeys[existingChildren.length % childAvatarKeys.length],
    level_band: levelBandForGrade(body.gradeLevel),
    grade_level: body.gradeLevel,
    status: 'active',
    hearts_remaining: 5,
    created_at: now,
    updated_at: now,
  };

  await env.DB.prepare(
    `INSERT INTO child_profiles
     (id, parent_id, slug, display_name, avatar_key, level_band, grade_level, status, hearts_remaining, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(
      child.id,
      child.parent_id,
      child.slug,
      child.display_name,
      child.avatar_key,
      child.level_band,
      child.grade_level,
      child.status,
      child.hearts_remaining,
      child.created_at,
      child.updated_at,
    )
    .run();

  await provisionChildProgress(env, child, now);

  return json({ child: childResponse(child) }, 201);
}

async function apiUpdateChild(parent: SessionParent, env: Env, request: Request, childKey: string) {
  const child = await getChildForParent(parent, env, childKey);
  if (!child) return json({ error: 'child_not_found' }, 404);

  let body: z.infer<typeof ChildUpdateSchema>;
  try {
    body = ChildUpdateSchema.parse(await request.json());
  } catch {
    return json({ error: 'invalid_child_payload' }, 400);
  }

  const now = new Date().toISOString();
  const gradeLevel = body.gradeLevel ?? child.grade_level;
  const status = body.status ?? child.status;
  await env.DB.prepare(
    `UPDATE child_profiles
     SET display_name = ?, level_band = ?, grade_level = ?, status = ?, updated_at = ?
     WHERE id = ? AND parent_id = ?`,
  )
    .bind(body.displayName ?? child.display_name, levelBandForGrade(gradeLevel), gradeLevel, status, now, child.id, parent.id)
    .run();

  const updated = await getChildForParent(parent, env, child.id);
  if (!updated) return json({ error: 'child_not_found' }, 404);
  if (updated.status === 'active') await provisionChildProgress(env, updated, now);

  return json({ child: childResponse(updated) });
}

async function apiChildHome(parent: SessionParent, env: Env, childKey: string, childModeSlug: string | null) {
  const child = await getChildForParent(parent, env, childKey);
  if (!child) return json({ error: 'child_not_found' }, 404);
  if (!canAccessChild(childModeSlug, child)) return childLockedResponse();
  await provisionChildProgress(env, child, new Date().toISOString());

  const tracks = await getTracksForChild(env, child);
  const trackStats = await getTrackStatsForChild(
    env,
    child.id,
    tracks.map((track) => track.id),
  );
  const trackCards = [];
  let recommendedLesson = null;
  const activePracticeSets = await getVisiblePracticeSets(env, child.id, new Date());
  const pinnedPracticeSet = activePracticeSets.find((practiceSet) => Boolean(practiceSet.pinned));
  if (pinnedPracticeSet) recommendedLesson = practiceSetLinkResponse(pinnedPracticeSet);

  for (const track of tracks) {
    const progress = trackStats.progressByTrack.get(track.id);
    const currentLesson = trackStats.currentLessonsByTrack.get(track.id) ?? null;
    const lessonsCompleted = trackStats.completedLessonsByTrack.get(track.id) ?? 0;
    const totalLessons = trackStats.totalLessonsByTrack.get(track.id) ?? 0;
    const trackComplete = totalLessons > 0 && lessonsCompleted >= totalLessons;

    if (!recommendedLesson && currentLesson && !trackComplete) {
      recommendedLesson = lessonLinkResponse(currentLesson);
    }

    trackCards.push({
      id: track.id,
      slug: track.slug,
      subject: track.subject,
      trackGroup: getTrackGroup(track.subject),
      gradeLevel: track.grade_level,
      title: track.title,
      description: track.description,
      color: track.color,
      accent: track.accent,
      lessonsCompleted,
      totalLessons,
      xpTotal: progress?.xp_total ?? 0,
      currentLesson: currentLesson ? lessonLinkResponse(currentLesson) : null,
    });
  }

  const multiplication = await getMultiplicationSummary(env, child.id);
  const xpTotal = trackCards.reduce((sum, track) => sum + track.xpTotal, 0) + multiplication.xpTotal;
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
    multiplication,
    practiceSets: activePracticeSets.map(practiceSetHomeResponse),
    tracks: trackCards,
    badges,
  });
}

async function apiMultiplicationOverview(
  parent: SessionParent,
  env: Env,
  childKey: string,
  childModeSlug: string | null,
) {
  const child = await getChildForParent(parent, env, childKey);
  if (!child) return json({ error: 'child_not_found' }, 404);
  if (!canAccessChild(childModeSlug, child)) return childLockedResponse();

  return json(await multiplicationOverviewResponse(env, child));
}

async function apiSubmitMultiplicationSession(
  parent: SessionParent,
  env: Env,
  request: Request,
  childKey: string,
  childModeSlug: string | null,
  deviceSubmission = false,
) {
  const child = await getChildForParent(parent, env, childKey);
  if (!child) return json({ error: 'child_not_found' }, 404);
  if (!canAccessChild(childModeSlug, child)) return childLockedResponse();

  let body: z.infer<typeof MultiplicationSessionSubmissionSchema>;
  try {
    body = MultiplicationSessionSubmissionSchema.parse(await request.json());
  } catch {
    return deviceSubmission
      ? deviceError('invalid_payload', 400)
      : json({ error: 'invalid_multiplication_session_payload' }, 400);
  }

  const selectedFactors = normalizeSelectedFactors(body.selectedFactors);
  if (
    selectedFactors.length !== new Set(body.selectedFactors).size ||
    body.attempts.some((attempt) => !selectedFactors.includes(attempt.factor))
  ) {
    return deviceSubmission
      ? deviceError('invalid_payload', 400)
      : json({ error: 'invalid_multiplication_session_payload' }, 400);
  }

  const receivedAt = new Date();
  const maximumDeviceTime = receivedAt.getTime() + 5 * 60 * 1000;
  const submittedTimes = [body.startedAt, ...body.attempts.flatMap((attempt) =>
    attempt.attemptedAt ? [attempt.attemptedAt] : [])];
  if (deviceSubmission && submittedTimes.some((value) => {
    const timestamp = Date.parse(value);
    return Number.isFinite(timestamp) && timestamp > maximumDeviceTime;
  })) {
    return deviceError('invalid_payload', 400);
  }
  const devicePayloadHash = deviceSubmission ? await sha256Hex(JSON.stringify(body)) : null;

  const existing = await env.DB.prepare(
    'SELECT * FROM multiplication_sessions WHERE child_profile_id = ? AND client_attempt_id = ? LIMIT 1',
  )
    .bind(child.id, body.clientAttemptId)
    .first<MultiplicationSessionRow>();
  if (existing) {
    if (deviceSubmission && existing.device_payload_hash !== devicePayloadHash) {
      return deviceError('client_attempt_conflict', 409);
    }
    return json({ result: await multiplicationCompletionResponse(env, child, existing, false) });
  }

  const config = {
    mode: body.mode,
    selectedFactors,
    durationSeconds: body.durationSeconds,
  };
  const { scored, scoreCorrect, scoreTotal } = scoreMultiplicationAttempts(config, body.attempts);
  const completedAt = receivedAt.toISOString();
  const submittedStart = Date.parse(body.startedAt);
  const startedAt = validIsoTimestamp(body.startedAt) &&
      (!deviceSubmission || submittedStart >= Date.UTC(2024, 0, 1))
    ? new Date(body.startedAt).toISOString()
    : completedAt;
  const xpAwarded = calculateMultiplicationXp(scoreCorrect, scoreTotal);
  const inputMethod = multiplicationSessionInputMethod(body.inputMethod, body.attempts.map((attempt) => attempt.inputMethod));
  const selectionKey = multiplicationSelectionKey(selectedFactors, body.durationSeconds, inputMethod);
  const previousBest = await env.DB.prepare(
    `SELECT max(score_correct) as total
     FROM multiplication_sessions
     WHERE child_profile_id = ? AND selection_key = ?`,
  )
    .bind(child.id, selectionKey)
    .first<CountRow>();
  const sessionId = randomId('multiplication_session_');
  const masteryUpdates = aggregateMultiplicationMastery(scored);
  const activityDate = localDate(new Date(completedAt), env.TIME_ZONE);
  const statements: D1PreparedStatement[] = [
    env.DB.prepare(
      `INSERT INTO multiplication_sessions
       (id, child_profile_id, client_attempt_id, mode, selected_factors_json, selection_key, duration_seconds,
        input_method, started_at, completed_at, score_correct, score_total, xp_awarded,
        device_payload_hash)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    ).bind(
      sessionId,
      child.id,
      body.clientAttemptId,
      body.mode,
      JSON.stringify(selectedFactors),
      selectionKey,
      body.durationSeconds,
      inputMethod,
      startedAt,
      completedAt,
      scoreCorrect,
      scoreTotal,
      xpAwarded,
      devicePayloadHash,
    ),
    ...scored.map((attempt, index) =>
      env.DB.prepare(
        `INSERT INTO multiplication_fact_attempts
         (id, session_id, sequence_number, factor, multiplier, answer, is_correct, response_ms, input_method, attempted_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      ).bind(
        randomId('multiplication_attempt_'),
        sessionId,
        index + 1,
        attempt.factor,
        attempt.multiplier,
        Number(attempt.answer),
        attempt.isCorrect ? 1 : 0,
        attempt.responseMs ?? null,
        attempt.inputMethod ?? body.inputMethod,
        body.attempts[index]?.attemptedAt && validIsoTimestamp(body.attempts[index].attemptedAt!) &&
            (!deviceSubmission || Date.parse(body.attempts[index].attemptedAt!) >= Date.UTC(2024, 0, 1))
          ? new Date(body.attempts[index].attemptedAt!).toISOString()
          : completedAt,
      ),
    ),
    ...masteryUpdates.map((update) =>
      env.DB.prepare(
        `INSERT INTO child_multiplication_mastery
         (child_profile_id, factor, multiplier, attempts, correct, correct_streak, best_keyboard_response_ms,
          last_response_ms, last_input_method, last_practiced_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON CONFLICT(child_profile_id, factor, multiplier) DO UPDATE SET
           attempts = child_multiplication_mastery.attempts + excluded.attempts,
           correct = child_multiplication_mastery.correct + excluded.correct,
           correct_streak = CASE
             WHEN ? = 1 THEN child_multiplication_mastery.correct_streak + excluded.correct_streak
             ELSE excluded.correct_streak
           END,
           best_keyboard_response_ms = CASE
             WHEN excluded.best_keyboard_response_ms IS NULL THEN child_multiplication_mastery.best_keyboard_response_ms
             WHEN child_multiplication_mastery.best_keyboard_response_ms IS NULL THEN excluded.best_keyboard_response_ms
             ELSE min(child_multiplication_mastery.best_keyboard_response_ms, excluded.best_keyboard_response_ms)
           END,
           last_response_ms = excluded.last_response_ms,
           last_input_method = excluded.last_input_method,
           last_practiced_at = excluded.last_practiced_at`,
      ).bind(
        child.id,
        update.factor,
        update.multiplier,
        update.attempts,
        update.correct,
        update.trailingCorrect,
        update.bestKeyboardResponseMs,
        update.lastResponseMs,
        update.lastInputMethod,
        completedAt,
        update.allCorrect ? 1 : 0,
      ),
    ),
    env.DB.prepare(
      `INSERT INTO child_daily_activity
       (id, child_profile_id, activity_date, lessons_completed, xp_earned, practice_sessions_completed)
       VALUES (?, ?, ?, 0, ?, 1)
       ON CONFLICT(child_profile_id, activity_date) DO UPDATE SET
         practice_sessions_completed = child_daily_activity.practice_sessions_completed + 1,
         xp_earned = child_daily_activity.xp_earned + excluded.xp_earned`,
    ).bind(`activity_${child.id}_${activityDate}`, child.id, activityDate, xpAwarded),
  ];

  await env.DB.batch(statements);
  const session = await env.DB.prepare('SELECT * FROM multiplication_sessions WHERE id = ? LIMIT 1')
    .bind(sessionId)
    .first<MultiplicationSessionRow>();
  if (!session) return json({ error: 'multiplication_session_not_found' }, 404);

  const isNewPersonalBest =
    body.mode === 'timed' &&
    (previousBest?.total === null || previousBest?.total === undefined || scoreCorrect > previousBest.total);
  return json({ result: await multiplicationCompletionResponse(env, child, session, isNewPersonalBest) }, 201);
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
  await provisionChildProgress(env, child, new Date().toISOString());

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

async function apiChildTrackOfflinePack(
  parent: SessionParent,
  env: Env,
  childKey: string,
  trackSlug: string,
  childModeSlug: string | null,
) {
  const child = await getChildForParent(parent, env, childKey);
  if (!child) return json({ error: 'child_not_found' }, 404);
  if (!canAccessChild(childModeSlug, child)) return childLockedResponse();
  await provisionChildProgress(env, child, new Date().toISOString());

  const track = await getTrackForChild(env, child, trackSlug);
  if (!track) return json({ error: 'track_not_found' }, 404);

  const [progress, unitResponses, lessons] = await Promise.all([
    getTrackProgress(env, child.id, track.id),
    getTrackUnitResponses(env, child.id, track.id),
    getLessonDetailsForTrack(env, track.id),
  ]);
  const questionsByLessonId = await getLessonQuestionsByLessonIds(
    env,
    lessons.map((lesson) => lesson.id),
  );
  const progressByLessonId = lessonProgressByIdFromUnits(unitResponses);
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
    lessons: lessons.map((lesson) =>
      lessonResponse(child, lesson, progressByLessonId.get(lesson.id), questionsByLessonId.get(lesson.id) ?? []),
    ),
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
  await provisionChildProgress(env, child, new Date().toISOString());

  const practiceSetId = practiceSetIdFromLessonId(lessonId);
  if (practiceSetId) return apiPracticeLesson(env, child, practiceSetId);

  const lesson = await getLessonDetail(env, lessonId);
  if (!lesson) return json({ error: 'lesson_not_found' }, 404);
  if (!(await canAccessLessonTrack(env, child, lesson))) return json({ error: 'lesson_not_found' }, 404);

  const progress = await getLessonProgress(env, child.id, lesson.id);
  if (progress?.status === 'locked' || !progress) return json({ error: 'lesson_locked' }, 403);

  const questions = await getLessonQuestions(env, lesson.id);

  return json(lessonResponse(child, lesson, progress, questions));
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
  await provisionChildProgress(env, child, new Date().toISOString());

  const practiceSetId = practiceSetIdFromLessonId(lessonId);
  if (practiceSetId) return apiSubmitPracticeLesson(env, request, child, practiceSetId);

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

  const existingAttempt = body.clientAttemptId
    ? await getLessonAttemptByClientAttemptId(env, child.id, body.clientAttemptId)
    : null;
  if (existingAttempt) {
    if (existingAttempt.lesson_id !== lesson.id) return json({ error: 'client_attempt_conflict' }, 409);
    return json({
      result: await existingLessonAttemptResult(env, child, lesson, existingAttempt),
    });
  }

  const questions = await getLessonQuestions(env, lesson.id);
  const attemptsByQuestion = new Map(body.attempts.map((attempt) => [attempt.questionId, attempt.answer]));
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
  const completed = await completeLesson({
    env,
    child,
    lesson,
    clientAttemptId: body.clientAttemptId ?? null,
    startedAt: body.startedAt || '',
    scoreCorrect,
    scoreTotal,
    xpAwarded,
    heartsRemaining,
    questionAttempts: scored.map((attempt) => ({
      questionId: attempt.question.id,
      answer: attempt.answer,
      isCorrect: attempt.isCorrect,
    })),
    bestScoreTotalStrategy: 'latest',
  });

  return json({
    result: {
      lessonAttemptId: completed.lessonAttemptId,
      scoreCorrect,
      scoreTotal,
      xpAwarded: completed.xpAwarded,
      heartsRemaining: completed.heartsRemaining,
      streak: completed.streak,
      nextLesson: completed.nextLesson ? lessonLinkResponse(completed.nextLesson) : null,
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

  const existingAttempt = body.clientAttemptId
    ? await getLessonAttemptByClientAttemptId(env, child.id, body.clientAttemptId)
    : null;
  if (existingAttempt) {
    if (existingAttempt.lesson_id !== lesson.id) return json({ error: 'client_attempt_conflict' }, 409);
    const progress = await getLessonProgress(env, child.id, lesson.id);
    return json({
      result: {
        ...(await existingLessonAttemptResult(env, child, lesson, existingAttempt)),
        bestScoreCorrect: progress?.best_score_correct ?? existingAttempt.score_correct,
        goalCorrect: config.goalCorrect,
      },
    });
  }

  const { scoreCorrect, scoreTotal } = scoreMadMinuteAttempts(config, body.attempts);
  const heartsRemaining = 5;
  const xpAwarded = calculateMadMinuteXp(lesson.xp_base, scoreCorrect, scoreTotal, config.goalCorrect);
  const completed = await completeLesson({
    env,
    child,
    lesson,
    clientAttemptId: body.clientAttemptId ?? null,
    startedAt: body.startedAt || '',
    scoreCorrect,
    scoreTotal,
    xpAwarded,
    heartsRemaining,
    bestScoreTotalStrategy: 'best-score-attempt',
  });

  return json({
    result: {
      lessonAttemptId: completed.lessonAttemptId,
      scoreCorrect,
      scoreTotal,
      xpAwarded: completed.xpAwarded,
      heartsRemaining: completed.heartsRemaining,
      streak: completed.streak,
      bestScoreCorrect: completed.lessonProgress?.best_score_correct ?? scoreCorrect,
      goalCorrect: config.goalCorrect,
      nextLesson: completed.nextLesson ? lessonLinkResponse(completed.nextLesson) : null,
    },
  });
}

async function apiParentDashboard(parent: SessionParent, env: Env) {
  const children = await getChildren(parent, env);
  const today = localDate(new Date(), env.TIME_ZONE);
  const childSummaries = await Promise.all(children.map((child) => parentDashboardChildSummary(env, child, today)));

  return json({
    parent: parentResponse(parent),
    fixedV1Profiles: true,
    children: childSummaries,
  });
}

async function parentDashboardChildSummary(env: Env, child: ChildRow, today: string) {
  const tracks = await getTracksForChild(env, child);
  const [trackStats, activityDates, recentActivity, multiplication, multiplicationMastery] = await Promise.all([
    getTrackStatsForChild(
      env,
      child.id,
      tracks.map((track) => track.id),
    ),
    getActivityDates(env, child.id),
    getRecentActivity(env, child.id),
    getMultiplicationSummary(env, child.id),
    getMultiplicationMasteryResponses(env, child.id),
  ]);
  const streak = calculateCurrentStreak(activityDates, today);
  const trackSummaries = tracks.map((track) => {
    const progress = trackStats.progressByTrack.get(track.id);
    return {
      id: track.id,
      slug: track.slug,
      subject: track.subject,
      trackGroup: getTrackGroup(track.subject),
      gradeLevel: track.grade_level,
      title: track.title,
      color: track.color,
      lessonsCompleted: trackStats.completedLessonsByTrack.get(track.id) ?? 0,
      totalLessons: trackStats.totalLessonsByTrack.get(track.id) ?? 0,
      xpTotal: progress?.xp_total ?? 0,
    };
  });

  return {
    child: childResponse(child),
    stats: {
      xpTotal: trackSummaries.reduce((sum, track) => sum + track.xpTotal, 0) + multiplication.xpTotal,
      streak,
      heartsRemaining: child.hearts_remaining,
    },
    multiplication: { ...multiplication, mastery: multiplicationMastery },
    tracks: trackSummaries,
    badges: await getBadges(env, child.id, streak),
    recentActivity,
  };
}

async function apiParentPracticeSets(parent: SessionParent, env: Env, childKey: string) {
  const child = await getChildForParent(parent, env, childKey);
  if (!child) return json({ error: 'child_not_found' }, 404);

  const practiceSets = await getPracticeSetsForChild(env, child.id);
  const responses = await Promise.all(practiceSets.map((practiceSet) => practiceSetResponseWithCards(env, practiceSet)));
  return json({ practiceSets: responses });
}

async function apiCreatePracticeSet(parent: SessionParent, env: Env, request: Request, childKey: string) {
  const child = await getChildForParent(parent, env, childKey);
  if (!child) return json({ error: 'child_not_found' }, 404);

  let body: z.infer<typeof PracticeSetCreateSchema>;
  try {
    body = PracticeSetCreateSchema.parse(await request.json());
  } catch {
    return json({ error: 'invalid_practice_set_payload' }, 400);
  }

  const now = new Date().toISOString();
  const practiceSetId = randomId('practice_');
  const statements: D1PreparedStatement[] = [
    env.DB.prepare(
      `INSERT INTO practice_sets
       (id, child_profile_id, subject, title, source, status, pinned, starts_at, expires_at, archived_at, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    ).bind(
      practiceSetId,
      child.id,
      body.subject,
      body.title,
      body.source ?? null,
      body.status,
      body.pinned ? 1 : 0,
      body.startsAt ?? null,
      body.expiresAt ?? null,
      body.status === 'archived' ? now : null,
      now,
      now,
    ),
    ...practiceCardInsertStatements(env, practiceSetId, body.cards),
    flashCardRevisionStatement(env, child.id, now),
  ];
  await env.DB.batch(statements);

  const practiceSet = await getPracticeSetForChild(env, child.id, practiceSetId);
  if (!practiceSet) return json({ error: 'practice_set_not_found' }, 404);
  return json({ practiceSet: await practiceSetResponseWithCards(env, practiceSet) }, 201);
}

async function apiUpdatePracticeSet(parent: SessionParent, env: Env, request: Request, childKey: string, practiceSetId: string) {
  const child = await getChildForParent(parent, env, childKey);
  if (!child) return json({ error: 'child_not_found' }, 404);

  const practiceSet = await getPracticeSetForChild(env, child.id, practiceSetId);
  if (!practiceSet) return json({ error: 'practice_set_not_found' }, 404);

  let body: z.infer<typeof PracticeSetUpdateSchema>;
  try {
    body = PracticeSetUpdateSchema.parse(await request.json());
  } catch {
    return json({ error: 'invalid_practice_set_payload' }, 400);
  }

  const now = new Date().toISOString();
  const nextStatus = body.status ?? practiceSet.status;
  const archivedAt =
    nextStatus === 'archived' ? (practiceSet.archived_at ?? now) : body.status ? null : practiceSet.archived_at;
  const statements: D1PreparedStatement[] = [
    env.DB.prepare(
      `UPDATE practice_sets
       SET subject = ?, title = ?, source = ?, status = ?, pinned = ?, starts_at = ?, expires_at = ?, archived_at = ?, updated_at = ?
       WHERE id = ? AND child_profile_id = ?`,
    ).bind(
      body.subject ?? practiceSet.subject,
      body.title ?? practiceSet.title,
      body.source === undefined ? practiceSet.source : body.source,
      nextStatus,
      body.pinned === undefined ? practiceSet.pinned : body.pinned ? 1 : 0,
      body.startsAt === undefined ? practiceSet.starts_at : body.startsAt,
      body.expiresAt === undefined ? practiceSet.expires_at : body.expiresAt,
      archivedAt,
      now,
      practiceSet.id,
      child.id,
    ),
  ];

  if (body.cards) {
    statements.push(env.DB.prepare('DELETE FROM practice_set_cards WHERE practice_set_id = ?').bind(practiceSet.id));
    statements.push(...practiceCardInsertStatements(env, practiceSet.id, body.cards));
  }
  statements.push(flashCardRevisionStatement(env, child.id, now));

  await env.DB.batch(statements);

  const updated = await getPracticeSetForChild(env, child.id, practiceSet.id);
  if (!updated) return json({ error: 'practice_set_not_found' }, 404);
  return json({ practiceSet: await practiceSetResponseWithCards(env, updated) });
}

async function apiPracticeLesson(env: Env, child: ChildRow, practiceSetId: string) {
  const practiceSet = await getVisiblePracticeSetForChild(env, child.id, practiceSetId, new Date());
  if (!practiceSet) return json({ error: 'lesson_not_found' }, 404);

  const cards = await getPracticeSetCards(env, practiceSet.id);
  const progress = await getPracticeSetProgress(env, child.id, practiceSet.id);

  return json({
    child: childResponse(child),
    heartsStart: 5,
    progress: {
      status: 'available',
      completedAt: progress.completedAt,
      bestScoreCorrect: progress.bestScoreCorrect,
      bestScoreTotal: progress.bestScoreTotal,
    },
    lesson: {
      id: practiceLessonId(practiceSet.id),
      slug: practiceSet.id,
      title: practiceSet.title,
      kind: 'standard',
      config: {
        review: {
          mode: 'deck',
          label: 'Weekly practice',
          shuffleQuestions: false,
        },
      },
      xpBase: PRACTICE_SET_XP_BASE,
      unit: {
        id: `practice_unit_${practiceSet.id}`,
        slug: 'weekly-practice',
        title: 'Weekly Practice',
      },
      track: {
        id: `practice_track_${practiceSet.subject}`,
        slug: 'weekly-vocabulary',
        subject: practiceSet.subject,
        gradeLevel: child.grade_level,
        title: getSubjectLabel(practiceSet.subject),
        color: 'bg-[#50c2ff]',
        accent: 'text-ink',
      },
      questions: practiceQuestionsFromCards(cards),
    },
  });
}

async function apiSubmitPracticeLesson(env: Env, request: Request, child: ChildRow, practiceSetId: string) {
  const practiceSet = await getVisiblePracticeSetForChild(env, child.id, practiceSetId, new Date());
  if (!practiceSet) return json({ error: 'lesson_not_found' }, 404);

  let body: z.infer<typeof AttemptSubmissionSchema>;
  try {
    body = AttemptSubmissionSchema.parse(await request.json());
  } catch {
    return json({ error: 'invalid_attempt_payload' }, 400);
  }

  const existingAttempt = body.clientAttemptId
    ? await getPracticeSetAttemptByClientAttemptId(env, child.id, body.clientAttemptId)
    : null;
  if (existingAttempt) {
    if (existingAttempt.practice_set_id !== practiceSet.id) return json({ error: 'client_attempt_conflict' }, 409);
    return json({
      result: await existingPracticeSetAttemptResult(env, child, existingAttempt),
    });
  }

  const cards = await getPracticeSetCards(env, practiceSet.id);
  const questions = practiceQuestionsFromCards(cards);
  const cardIdByQuestionId = new Map(questions.map((question) => [question.id, practiceCardIdFromQuestionId(question.id)]));
  const attemptsByQuestion = new Map(body.attempts.map((attempt) => [attempt.questionId, attempt.answer]));
  const completedAt = new Date();
  const completedIso = completedAt.toISOString();
  const scoreTotal = questions.length;
  const scored = questions.map((question) => {
    const answer = attemptsByQuestion.get(question.id);
    return {
      question,
      answer,
      isCorrect: attemptsByQuestion.has(question.id) ? evaluateAnswer(question, answer) : false,
    };
  });
  const scoreCorrect = scored.filter((attempt) => attempt.isCorrect).length;
  const heartsRemaining = Math.max(0, 5 - (scoreTotal - scoreCorrect));
  const xpAwarded = calculateXp(PRACTICE_SET_XP_BASE, scoreCorrect, scoreTotal, heartsRemaining);
  const practiceAttemptId = randomId('practice_attempt_');

  const inserts = [
    env.DB.prepare(
      `INSERT INTO practice_set_attempts
       (id, child_profile_id, practice_set_id, client_attempt_id, started_at, completed_at, score_correct, score_total, xp_awarded, hearts_remaining)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    ).bind(
      practiceAttemptId,
      child.id,
      practiceSet.id,
      body.clientAttemptId ?? null,
      body.startedAt || completedIso,
      completedIso,
      scoreCorrect,
      scoreTotal,
      xpAwarded,
      heartsRemaining,
    ),
    ...scored.map((attempt) =>
      env.DB.prepare(
        `INSERT INTO practice_card_attempts
         (id, practice_set_attempt_id, practice_set_card_id, is_correct, answer_json, attempted_at)
         VALUES (?, ?, ?, ?, ?, ?)`,
      ).bind(
        randomId('practice_card_attempt_'),
        practiceAttemptId,
        cardIdByQuestionId.get(attempt.question.id) ?? null,
        attempt.isCorrect ? 1 : 0,
        JSON.stringify(attempt.answer ?? null),
        completedIso,
      ),
    ),
  ];
  await env.DB.batch(inserts);

  const today = localDate(completedAt, env.TIME_ZONE);
  await updateDailyActivity(env, child.id, today, xpAwarded);
  await env.DB.prepare('UPDATE child_profiles SET hearts_remaining = ?, updated_at = ? WHERE id = ?')
    .bind(heartsRemaining, completedIso, child.id)
    .run();

  const activityDates = await getActivityDates(env, child.id);
  const streak = calculateCurrentStreak(activityDates, today);

  return json({
    result: {
      lessonAttemptId: practiceAttemptId,
      scoreCorrect,
      scoreTotal,
      xpAwarded,
      heartsRemaining,
      streak,
      nextLesson: null,
    },
  });
}

async function getLessonAttemptByClientAttemptId(env: Env, childId: string, clientAttemptId: string) {
  return env.DB.prepare(
    `SELECT *
     FROM lesson_attempts
     WHERE child_profile_id = ?
       AND client_attempt_id = ?
     LIMIT 1`,
  )
    .bind(childId, clientAttemptId)
    .first<LessonAttemptRow>();
}

async function getPracticeSetAttemptByClientAttemptId(env: Env, childId: string, clientAttemptId: string) {
  return env.DB.prepare(
    `SELECT *
     FROM practice_set_attempts
     WHERE child_profile_id = ?
       AND client_attempt_id = ?
     LIMIT 1`,
  )
    .bind(childId, clientAttemptId)
    .first<PracticeSetAttemptRow>();
}

async function existingLessonAttemptResult(
  env: Env,
  child: ChildRow,
  lesson: CompletionLesson,
  attempt: LessonAttemptRow,
) {
  const streak = await streakAtCompletedAt(env, child.id, attempt.completed_at);
  const nextLesson = await getCurrentLessonAfterDuplicate(env, child.id, lesson, attempt);

  return {
    lessonAttemptId: attempt.id,
    scoreCorrect: attempt.score_correct,
    scoreTotal: attempt.score_total,
    xpAwarded: attempt.xp_awarded,
    heartsRemaining: attempt.hearts_remaining,
    streak,
    nextLesson: nextLesson ? lessonLinkResponse(nextLesson) : null,
  };
}

async function existingPracticeSetAttemptResult(env: Env, child: ChildRow, attempt: PracticeSetAttemptRow) {
  return {
    lessonAttemptId: attempt.id,
    scoreCorrect: attempt.score_correct,
    scoreTotal: attempt.score_total,
    xpAwarded: attempt.xp_awarded,
    heartsRemaining: attempt.hearts_remaining,
    streak: await streakAtCompletedAt(env, child.id, attempt.completed_at),
    nextLesson: null,
  };
}

async function getCurrentLessonAfterDuplicate(
  env: Env,
  childId: string,
  lesson: CompletionLesson,
  attempt: LessonAttemptRow,
) {
  const progress = await getTrackProgress(env, childId, lesson.track_id);
  if (!progress?.current_lesson_id || progress.current_lesson_id === attempt.lesson_id) return null;
  return getLessonDetail(env, progress.current_lesson_id);
}

async function streakAtCompletedAt(env: Env, childId: string, completedAt: string) {
  const completedDate = new Date(completedAt);
  const today = Number.isNaN(completedDate.getTime()) ? localDate(new Date(), env.TIME_ZONE) : localDate(completedDate, env.TIME_ZONE);
  const activityDates = await getActivityDates(env, childId);
  return calculateCurrentStreak(activityDates, today);
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

async function hasActiveParent(env: Env) {
  return (await getActiveParentCount(env)) > 0;
}

async function getActiveParentCount(env: Env) {
  const row = await env.DB.prepare("SELECT count(*) as total FROM parents WHERE status = 'active'").first<CountRow>();
  return row?.total ?? 0;
}

async function getChildren(parent: SessionParent, env: Env) {
  return all<ChildRow>(
    env.DB.prepare("SELECT * FROM child_profiles WHERE parent_id = ? ORDER BY status, display_name").bind(parent.id),
  );
}

async function getActiveChildren(parent: SessionParent, env: Env) {
  return all<ChildRow>(
    env.DB.prepare("SELECT * FROM child_profiles WHERE parent_id = ? AND status = 'active' ORDER BY display_name").bind(parent.id),
  );
}

async function getChildForParent(parent: SessionParent, env: Env, childKey: string) {
  return env.DB.prepare('SELECT * FROM child_profiles WHERE parent_id = ? AND (slug = ? OR id = ?) LIMIT 1')
    .bind(parent.id, childKey, childKey)
    .first<ChildRow>();
}

async function getTracksForChild(env: Env, child: ChildRow) {
  const tracks = await all<TrackRow>(
    env.DB.prepare('SELECT * FROM tracks ORDER BY sort_order'),
  );
  const completedTrackIds = needsCompletedTrackLookup(tracks) ? await getCompletedTrackIdsForChild(env, child.id) : new Set<string>();
  return accessibleTracksForChild(child, tracks, completedTrackIds);
}

async function provisionChildProgress(env: Env, child: ChildRow, updatedAt: string) {
  const tracks = await getTracksForChild(env, child);
  const trackIds = tracks.map((track) => track.id);
  if (trackIds.length === 0 || !(await childProgressNeedsProvisioning(env, child.id, trackIds))) return;

  const lessons = await getLessonDetailsForTracks(env, trackIds);
  if (lessons.length === 0) return;

  const lessonIds = lessons.map((lesson) => lesson.id);
  const [existingTrackProgress, existingLessonProgressGroups] = await Promise.all([
    all<{ track_id: string }>(
      env.DB.prepare(
        `SELECT track_id
         FROM child_track_progress
         WHERE child_profile_id = ?
           AND track_id IN (${placeholders(trackIds)})`,
      ).bind(child.id, ...trackIds),
    ),
    Promise.all(
      chunks(lessonIds, 90).map((lessonIdChunk) =>
        all<{ lesson_id: string }>(
          env.DB.prepare(
            `SELECT lesson_id
             FROM child_lesson_progress
             WHERE child_profile_id = ?
               AND lesson_id IN (${placeholders(lessonIdChunk)})`,
          ).bind(child.id, ...lessonIdChunk),
        ),
      ),
    ),
  ]);
  const existingLessonProgress = existingLessonProgressGroups.flat();
  const existingTrackIds = new Set(existingTrackProgress.map((row) => row.track_id));
  const existingLessonIds = new Set(existingLessonProgress.map((row) => row.lesson_id));
  const firstLessonByTrack = new Map<string, LessonDetailRow>();

  for (const lesson of lessons) {
    if (!firstLessonByTrack.has(lesson.track_id)) firstLessonByTrack.set(lesson.track_id, lesson);
  }

  const statements: D1PreparedStatement[] = [];
  for (const track of tracks) {
    const firstLesson = firstLessonByTrack.get(track.id);
    if (!firstLesson || existingTrackIds.has(track.id)) continue;
    statements.push(
      env.DB.prepare(
        `INSERT OR IGNORE INTO child_track_progress
         (id, child_profile_id, track_id, current_unit_id, current_lesson_id, lessons_completed, xp_total, updated_at)
         VALUES (?, ?, ?, ?, ?, 0, 0, ?)`,
      ).bind(`track_progress_${child.id}_${track.id}`, child.id, track.id, firstLesson.unit_id, firstLesson.id, updatedAt),
    );
  }

  for (const lesson of lessons) {
    if (existingLessonIds.has(lesson.id)) continue;
    const firstLesson = firstLessonByTrack.get(lesson.track_id);
    statements.push(
      env.DB.prepare(
        `INSERT OR IGNORE INTO child_lesson_progress
         (id, child_profile_id, lesson_id, status, completed_at, best_score_correct, best_score_total)
         VALUES (?, ?, ?, ?, NULL, 0, 0)`,
      ).bind(
        `lesson_progress_${child.id}_${lesson.id}`,
        child.id,
        lesson.id,
        lesson.id === firstLesson?.id || lesson.kind === 'mad-minute' ? 'available' : 'locked',
      ),
    );
  }

  for (const statementChunk of chunks(statements, 90)) await env.DB.batch(statementChunk);
}

async function getTrackForChild(env: Env, child: ChildRow, trackSlug: string) {
  const tracks = await getTracksForChild(env, child);
  return tracks.find((track) => track.slug === trackSlug) ?? null;
}

async function canAccessLessonTrack(env: Env, child: ChildRow, lesson: Pick<LessonDetailRow, 'track_subject' | 'track_grade_level'>) {
  const tracks = await getTracksForChild(env, child);
  return tracks.some((track) => track.subject === lesson.track_subject && track.grade_level === lesson.track_grade_level);
}

async function childProgressNeedsProvisioning(env: Env, childId: string, trackIds: string[]) {
  const rows = await all<TrackProvisionStatusRow>(
    env.DB.prepare(
      `SELECT tracks.id as track_id,
              count(lessons.id) as total_lessons,
              count(child_lesson_progress.lesson_id) as provisioned_lessons,
              max(CASE WHEN child_track_progress.track_id IS NULL THEN 0 ELSE 1 END) as has_track_progress
       FROM tracks
       LEFT JOIN units ON units.track_id = tracks.id
       LEFT JOIN lessons ON lessons.unit_id = units.id
       LEFT JOIN child_lesson_progress
         ON child_lesson_progress.child_profile_id = ?
        AND child_lesson_progress.lesson_id = lessons.id
       LEFT JOIN child_track_progress
         ON child_track_progress.child_profile_id = ?
        AND child_track_progress.track_id = tracks.id
       WHERE tracks.id IN (${placeholders(trackIds)})
       GROUP BY tracks.id`,
    ).bind(childId, childId, ...trackIds),
  );
  const statusByTrackId = new Map(rows.map((row) => [row.track_id, row]));
  return trackIds.some((trackId) => {
    const row = statusByTrackId.get(trackId);
    return Boolean(row && row.total_lessons > 0 && (row.has_track_progress !== 1 || row.provisioned_lessons < row.total_lessons));
  });
}

function needsCompletedTrackLookup(tracks: TrackRow[]) {
  return Array.from(foundationTrackGroups(tracks).values()).some((group) => group.length > 1);
}

async function getCompletedTrackIdsForChild(env: Env, childId: string) {
  const rows = await all<{ track_id: string }>(
    env.DB.prepare(
      `SELECT tracks.id as track_id
       FROM tracks
       JOIN units ON units.track_id = tracks.id
       JOIN lessons ON lessons.unit_id = units.id
       LEFT JOIN child_lesson_progress
         ON child_lesson_progress.child_profile_id = ?
        AND child_lesson_progress.lesson_id = lessons.id
       GROUP BY tracks.id
       HAVING count(lessons.id) > 0
          AND sum(CASE WHEN child_lesson_progress.status = 'completed' THEN 1 ELSE 0 END) >= count(lessons.id)`,
    ).bind(childId),
  );
  return new Set(rows.map((row) => row.track_id));
}

function accessibleTracksForChild(child: ChildRow, tracks: TrackRow[], completedTrackIds: Set<string>) {
  const foundationGroups = foundationTrackGroups(tracks);
  const accessibleTracks = tracks.filter((track) => {
    if (!isFoundationSubject(track.subject)) return track.grade_level === child.grade_level;

    const group = foundationGroups.get(track.subject) ?? [];
    const index = group.findIndex((candidate) => candidate.id === track.id);
    if (index < 0) return false;
    if (index === 0) return true;
    return completedTrackIds.has(group[index - 1].id);
  });

  return uniqueTracks(accessibleTracks).sort(compareTracksBySubjectMetadata);
}

function foundationTrackGroups(tracks: TrackRow[]) {
  const groups = new Map<TrackRow['subject'], TrackRow[]>();
  for (const track of tracks) {
    if (!isFoundationSubject(track.subject)) continue;
    groups.set(track.subject, [...(groups.get(track.subject) ?? []), track]);
  }

  for (const group of groups.values()) {
    group.sort((a, b) => a.grade_level - b.grade_level || a.sort_order - b.sort_order);
  }

  return groups;
}

function uniqueTracks(tracks: TrackRow[]) {
  const byId = new Map<string, TrackRow>();
  for (const track of tracks) byId.set(track.id, track);
  return Array.from(byId.values());
}

async function getPracticeSetsForChild(env: Env, childId: string) {
  return all<PracticeSetRow>(
    env.DB.prepare(
      `SELECT *
       FROM practice_sets
       WHERE child_profile_id = ?
       ORDER BY pinned DESC, created_at DESC`,
    ).bind(childId),
  );
}

async function getPracticeSetForChild(env: Env, childId: string, practiceSetId: string) {
  return env.DB.prepare('SELECT * FROM practice_sets WHERE child_profile_id = ? AND id = ? LIMIT 1')
    .bind(childId, practiceSetId)
    .first<PracticeSetRow>();
}

async function getVisiblePracticeSets(env: Env, childId: string, now: Date) {
  const nowIso = now.toISOString();
  return all<PracticeSetRow>(
    env.DB.prepare(
      `SELECT *
       FROM practice_sets
       WHERE child_profile_id = ?
         AND status = 'active'
         AND (starts_at IS NULL OR starts_at <= ?)
         AND (expires_at IS NULL OR expires_at > ?)
       ORDER BY pinned DESC, updated_at DESC`,
    ).bind(childId, nowIso, nowIso),
  );
}

async function getVisiblePracticeSetForChild(env: Env, childId: string, practiceSetId: string, now: Date) {
  const nowIso = now.toISOString();
  return env.DB.prepare(
    `SELECT *
     FROM practice_sets
     WHERE child_profile_id = ?
       AND id = ?
       AND status = 'active'
       AND (starts_at IS NULL OR starts_at <= ?)
       AND (expires_at IS NULL OR expires_at > ?)
     LIMIT 1`,
  )
    .bind(childId, practiceSetId, nowIso, nowIso)
    .first<PracticeSetRow>();
}

async function getPracticeSetCards(env: Env, practiceSetId: string) {
  return all<PracticeSetCardRow>(
    env.DB.prepare('SELECT * FROM practice_set_cards WHERE practice_set_id = ? ORDER BY sort_order').bind(practiceSetId),
  );
}

async function practiceSetResponseWithCards(env: Env, practiceSet: PracticeSetRow) {
  const cards = await getPracticeSetCards(env, practiceSet.id);
  return {
    ...practiceSetResponse(practiceSet),
    cards: cards.map(practiceSetCardResponse),
  };
}

function practiceSetResponse(practiceSet: PracticeSetRow) {
  return {
    id: practiceSet.id,
    lessonId: practiceLessonId(practiceSet.id),
    childProfileId: practiceSet.child_profile_id,
    subject: practiceSet.subject,
    subjectLabel: getSubjectLabel(practiceSet.subject),
    title: practiceSet.title,
    source: practiceSet.source,
    status: practiceSet.status,
    pinned: Boolean(practiceSet.pinned),
    startsAt: practiceSet.starts_at,
    expiresAt: practiceSet.expires_at,
    archivedAt: practiceSet.archived_at,
    createdAt: practiceSet.created_at,
    updatedAt: practiceSet.updated_at,
  };
}

function practiceSetHomeResponse(practiceSet: PracticeSetRow) {
  return {
    id: practiceSet.id,
    lessonId: practiceLessonId(practiceSet.id),
    subject: practiceSet.subject,
    subjectLabel: getSubjectLabel(practiceSet.subject),
    title: practiceSet.title,
    source: practiceSet.source,
    pinned: Boolean(practiceSet.pinned),
    expiresAt: practiceSet.expires_at,
  };
}

function practiceSetCardResponse(card: PracticeSetCardRow) {
  return {
    id: card.id,
    term: card.term,
    definition: card.definition,
    example: card.example,
    acceptedAnswers: acceptedAnswersFromCard(card),
    sortOrder: card.sort_order,
  };
}

function practiceSetLinkResponse(practiceSet: PracticeSetRow) {
  return {
    id: practiceLessonId(practiceSet.id),
    slug: practiceSet.id,
    title: practiceSet.title,
    unitTitle: 'Weekly Practice',
    trackSlug: 'weekly-vocabulary',
    trackSubject: practiceSet.subject,
    trackGradeLevel: 0,
    trackTitle: getSubjectLabel(practiceSet.subject),
  };
}

function practiceCardInsertStatements(
  env: Env,
  practiceSetId: string,
  cards: Array<z.infer<typeof PracticeSetCardInputSchema>>,
) {
  return cards.map((card, index) =>
    env.DB.prepare(
      `INSERT INTO practice_set_cards
       (id, practice_set_id, term, definition, example, accepted_answers_json, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
    ).bind(
      randomId('practice_card_'),
      practiceSetId,
      card.term,
      card.definition ?? null,
      card.example ?? null,
      JSON.stringify(card.acceptedAnswers ?? []),
      index + 1,
    ),
  );
}

function flashCardRevisionStatement(env: Env, childId: string, updatedAt: string) {
  return env.DB.prepare(
    `INSERT INTO child_content_revisions (child_profile_id, flash_cards_revision, updated_at)
     VALUES (?, 1, ?)
     ON CONFLICT(child_profile_id) DO UPDATE SET
       flash_cards_revision = child_content_revisions.flash_cards_revision + 1,
       updated_at = excluded.updated_at`,
  ).bind(childId, updatedAt);
}

function practiceLessonId(practiceSetId: string) {
  return `${PRACTICE_LESSON_PREFIX}${practiceSetId}`;
}

function practiceSetIdFromLessonId(lessonId: string) {
  return lessonId.startsWith(PRACTICE_LESSON_PREFIX) ? lessonId.slice(PRACTICE_LESSON_PREFIX.length) : null;
}

function practiceCardIdFromQuestionId(questionId: string) {
  return questionId.replace(/^practice_question_(.+)_(context|easy|hard)$/, '$1');
}

function practiceQuestionsFromCards(cards: PracticeSetCardRow[]): LessonQuestion[] {
  const definitions = uniqueStrings(cards.map((card) => card.definition ?? card.term));

  const contextQuestions: LessonQuestion[] = cards.flatMap((card) => {
    if (!card.example) return [];

    const answer = card.definition ?? card.term;
    const choices = uniqueStrings([answer, ...definitions.filter((definition) => definition !== answer)]).slice(0, 4);

    return [{
      id: `practice_question_${card.id}_context`,
      type: 'passage-question' as const,
      prompt: 'Read the context before the flash cards.',
      payload: {
        passageTitle: card.term,
        passage: card.example,
        question: `What does "${card.term}" mean here?`,
        choices,
        correctAnswer: answer,
      },
      explanation: `The context sentence supports this meaning: ${answer}.`,
    }];
  });

  const easyQuestions: LessonQuestion[] = cards.map((card) => {
    const answer = card.definition ?? card.term;
    const choices = uniqueStrings([answer, ...definitions.filter((definition) => definition !== answer)]).slice(0, 4);

    return {
      id: `practice_question_${card.id}_easy`,
      type: 'flash-card' as const,
      prompt: 'Choose the best meaning.',
      payload: {
        mode: 'easy' as const,
        front: card.term,
        choices,
        correctAnswer: answer,
      },
      explanation: card.example ?? card.definition,
    };
  });

  const hardQuestions: LessonQuestion[] = cards.map((card) => {
    const acceptedAnswers = acceptedAnswersFromCard(card);
    const frontForHard = card.definition ?? card.example ?? card.term;

    return {
      id: `practice_question_${card.id}_hard`,
      type: 'flash-card' as const,
      prompt: 'Type the vocabulary word.',
      payload: {
        mode: 'hard' as const,
        front: frontForHard,
        acceptedAnswers,
        answerType: 'text' as const,
      },
      explanation: card.example ?? card.definition,
    };
  });

  return [...contextQuestions, ...easyQuestions, ...hardQuestions];
}

function acceptedAnswersFromCard(card: PracticeSetCardRow) {
  const parsed = parseStringArray(card.accepted_answers_json);
  return uniqueStrings([card.term, ...parsed]);
}

function parseStringArray(value: string | null) {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string' && Boolean(item.trim())) : [];
  } catch {
    return [];
  }
}

function uniqueStrings(values: string[]) {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const value of values) {
    const trimmed = value.trim();
    if (!trimmed || seen.has(trimmed.toLowerCase())) continue;
    seen.add(trimmed.toLowerCase());
    result.push(trimmed);
  }
  return result;
}

async function getPracticeSetProgress(env: Env, childId: string, practiceSetId: string) {
  const row = await env.DB.prepare(
    `SELECT completed_at, score_correct, score_total
     FROM practice_set_attempts
     WHERE child_profile_id = ? AND practice_set_id = ?
     ORDER BY score_correct DESC, completed_at DESC
     LIMIT 1`,
  )
    .bind(childId, practiceSetId)
    .first<{ completed_at: string; score_correct: number; score_total: number }>();

  return {
    completedAt: row?.completed_at ?? null,
    bestScoreCorrect: row?.score_correct ?? 0,
    bestScoreTotal: row?.score_total ?? 0,
  };
}

async function updateDailyActivity(env: Env, childId: string, today: string, xpAwarded: number) {
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

function lessonProgressByIdFromUnits(units: Awaited<ReturnType<typeof getTrackUnitResponses>>) {
  const progressByLessonId = new Map<string, LessonProgressRow>();
  for (const unit of units) {
    for (const lesson of unit.lessons) {
      progressByLessonId.set(lesson.id, {
        status: lesson.status,
        completed_at: lesson.completedAt ?? null,
        best_score_correct: lesson.bestScoreCorrect,
        best_score_total: lesson.bestScoreTotal,
      });
    }
  }
  return progressByLessonId;
}

async function getLessonProgress(env: Env, childId: string, lessonId: string) {
  return env.DB.prepare('SELECT * FROM child_lesson_progress WHERE child_profile_id = ? AND lesson_id = ? LIMIT 1')
    .bind(childId, lessonId)
    .first<LessonProgressRow>();
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

async function getLessonDetailsForTrack(env: Env, trackId: string) {
  return all<LessonDetailRow>(
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
    ).bind(trackId),
  );
}

async function getLessonDetailsForTracks(env: Env, trackIds: string[]) {
  if (trackIds.length === 0) return [];

  return all<LessonDetailRow>(
    env.DB.prepare(
      `SELECT lessons.*, units.title as unit_title, units.slug as unit_slug,
              tracks.id as track_id, tracks.slug as track_slug, tracks.subject as track_subject,
              tracks.grade_level as track_grade_level, tracks.title as track_title,
              tracks.color as track_color, tracks.accent as track_accent
       FROM lessons
       JOIN units ON units.id = lessons.unit_id
       JOIN tracks ON tracks.id = units.track_id
       WHERE tracks.id IN (${placeholders(trackIds)})
       ORDER BY tracks.sort_order, units.sort_order, lessons.sort_order`,
    ).bind(...trackIds),
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
    payload: runtimeQuestionPayload(row.payload_json),
    explanation: row.explanation,
    hint: row.hint,
  }));
}

async function getLessonQuestionsByLessonIds(env: Env, lessonIds: string[]) {
  const questionsByLessonId = new Map<string, LessonQuestion[]>();
  if (lessonIds.length === 0) return questionsByLessonId;

  const rows = await all<QuestionRow>(
    env.DB.prepare(
      `SELECT *
       FROM questions
       WHERE lesson_id IN (${placeholders(lessonIds)})
       ORDER BY lesson_id, sort_order`,
    ).bind(...lessonIds),
  );

  for (const row of rows) {
    const question = {
      id: row.id,
      type: row.type,
      prompt: row.prompt,
      payload: runtimeQuestionPayload(row.payload_json),
      explanation: row.explanation,
      hint: row.hint,
    };
    const questions = questionsByLessonId.get(row.lesson_id) ?? [];
    questions.push(question);
    questionsByLessonId.set(row.lesson_id, questions);
  }

  return questionsByLessonId;
}

function runtimeQuestionPayload(payloadJson: string): QuestionPayload {
  const payload = JSON.parse(payloadJson) as QuestionPayload | Record<string, unknown>;
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return payload as QuestionPayload;

  const runtimePayload: Record<string, unknown> = { ...(payload as Record<string, unknown>) };
  delete runtimePayload.questionGoal;
  delete runtimePayload.misconception;
  return runtimePayload as QuestionPayload;
}

async function multiplicationOverviewResponse(env: Env, child: ChildRow) {
  const [summary, mastery, recentSessions] = await Promise.all([
    getMultiplicationSummary(env, child.id),
    getMultiplicationMasteryResponses(env, child.id),
    all<MultiplicationSessionRow>(
      env.DB.prepare(
        `SELECT * FROM multiplication_sessions
         WHERE child_profile_id = ?
         ORDER BY completed_at DESC
         LIMIT 8`,
      ).bind(child.id),
    ),
  ]);

  return {
    child: childResponse(child),
    summary,
    mastery,
    recentSessions: recentSessions.map(multiplicationSessionResponse),
  };
}

async function getMultiplicationMasteryResponses(env: Env, childId: string) {
  const rows = await all<MultiplicationMasteryRow>(
    env.DB.prepare(
      `SELECT * FROM child_multiplication_mastery
       WHERE child_profile_id = ?
       ORDER BY factor, multiplier`,
    ).bind(childId),
  );
  return rows.map(multiplicationMasteryResponse);
}

async function multiplicationCompletionResponse(
  env: Env,
  child: ChildRow,
  session: MultiplicationSessionRow,
  isNewPersonalBest: boolean,
) {
  const [overview, activityDates] = await Promise.all([
    multiplicationOverviewResponse(env, child),
    getActivityDates(env, child.id),
  ]);
  const accuracy = session.score_total > 0 ? Math.round((session.score_correct / session.score_total) * 100) : 0;

  return {
    session: multiplicationSessionResponse(session),
    scoreCorrect: session.score_correct,
    scoreTotal: session.score_total,
    accuracy,
    xpAwarded: session.xp_awarded,
    streak: calculateCurrentStreak(activityDates, localDate(new Date(), env.TIME_ZONE)),
    isNewPersonalBest,
    summary: overview.summary,
    mastery: overview.mastery,
  };
}

async function getMultiplicationSummary(env: Env, childId: string) {
  const [totals, masteryRows, best60, best120] = await Promise.all([
    env.DB.prepare(
      `SELECT count(*) as sessions, coalesce(sum(score_correct), 0) as correct,
              coalesce(sum(score_total), 0) as attempted, coalesce(sum(xp_awarded), 0) as xp
       FROM multiplication_sessions
       WHERE child_profile_id = ?`,
    )
      .bind(childId)
      .first<{ sessions: number; correct: number; attempted: number; xp: number }>(),
    all<MultiplicationMasteryRow>(
      env.DB.prepare('SELECT * FROM child_multiplication_mastery WHERE child_profile_id = ?').bind(childId),
    ),
    env.DB.prepare(
      `SELECT max(score_correct) as total FROM multiplication_sessions
       WHERE child_profile_id = ? AND mode = 'timed' AND duration_seconds = 60`,
    )
      .bind(childId)
      .first<CountRow>(),
    env.DB.prepare(
      `SELECT max(score_correct) as total FROM multiplication_sessions
       WHERE child_profile_id = ? AND mode = 'timed' AND duration_seconds = 120`,
    )
      .bind(childId)
      .first<CountRow>(),
  ]);

  return {
    sessionsCompleted: totals?.sessions ?? 0,
    factsCorrect: totals?.correct ?? 0,
    factsAttempted: totals?.attempted ?? 0,
    xpTotal: totals?.xp ?? 0,
    fluentFacts: masteryRows.filter((row) => multiplicationMasteryLevel(multiplicationMasteryStats(row)) === 'fluent').length,
    practicedFacts: masteryRows.length,
    best60Seconds: best60?.total ?? 0,
    best120Seconds: best120?.total ?? 0,
  };
}

function multiplicationSessionResponse(session: MultiplicationSessionRow) {
  return {
    id: session.id,
    mode: session.mode,
    selectedFactors: parseNumberArray(session.selected_factors_json),
    durationSeconds: session.duration_seconds,
    inputMethod: session.input_method,
    startedAt: session.started_at,
    completedAt: session.completed_at,
    scoreCorrect: session.score_correct,
    scoreTotal: session.score_total,
    accuracy: session.score_total > 0 ? Math.round((session.score_correct / session.score_total) * 100) : 0,
    xpAwarded: session.xp_awarded,
  };
}

function multiplicationMasteryResponse(row: MultiplicationMasteryRow) {
  const stats = multiplicationMasteryStats(row);
  return {
    factor: row.factor,
    multiplier: row.multiplier,
    attempts: row.attempts,
    correct: row.correct,
    correctStreak: row.correct_streak,
    accuracy: row.attempts > 0 ? Math.round((row.correct / row.attempts) * 100) : 0,
    bestKeyboardResponseMs: row.best_keyboard_response_ms,
    lastResponseMs: row.last_response_ms,
    lastInputMethod: row.last_input_method,
    lastPracticedAt: row.last_practiced_at,
    level: multiplicationMasteryLevel(stats),
  };
}

function multiplicationMasteryStats(row: MultiplicationMasteryRow): MultiplicationMasteryStats {
  return {
    attempts: row.attempts,
    correct: row.correct,
    correctStreak: row.correct_streak,
    bestKeyboardResponseMs: row.best_keyboard_response_ms,
  };
}

function aggregateMultiplicationMastery(
  attempts: Array<{
    factor: number;
    multiplier: number;
    isCorrect: boolean;
    responseMs?: number;
    inputMethod?: MultiplicationInputMethod;
  }>,
) {
  const grouped = new Map<string, typeof attempts>();
  for (const attempt of attempts) {
    const key = `${attempt.factor}x${attempt.multiplier}`;
    grouped.set(key, [...(grouped.get(key) ?? []), attempt]);
  }

  return Array.from(grouped.values()).map((factAttempts) => {
    const last = factAttempts.at(-1)!;
    const keyboardTimes = factAttempts
      .filter((attempt) => attempt.inputMethod === 'keyboard' && attempt.responseMs !== undefined)
      .map((attempt) => attempt.responseMs!);
    let trailingCorrect = 0;
    for (let index = factAttempts.length - 1; index >= 0 && factAttempts[index].isCorrect; index -= 1) trailingCorrect += 1;
    return {
      factor: last.factor,
      multiplier: last.multiplier,
      attempts: factAttempts.length,
      correct: factAttempts.filter((attempt) => attempt.isCorrect).length,
      trailingCorrect,
      allCorrect: trailingCorrect === factAttempts.length,
      bestKeyboardResponseMs: keyboardTimes.length > 0 ? Math.min(...keyboardTimes) : null,
      lastResponseMs: last.responseMs ?? null,
      lastInputMethod: last.inputMethod ?? 'keyboard',
    };
  });
}

function multiplicationSessionInputMethod(
  preferred: MultiplicationInputMethod,
  methods: MultiplicationInputMethod[],
): MultiplicationSessionInputMethod {
  if (methods.length === 0) return preferred;
  return new Set(methods).size > 1 ? 'mixed' : methods[0];
}

function parseNumberArray(value: string) {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((item): item is number => typeof item === 'number') : [];
  } catch {
    return [];
  }
}

function validIsoTimestamp(value: string) {
  return Number.isFinite(Date.parse(value));
}

async function getActivityDates(env: Env, childId: string) {
  const rows = await all<{ activity_date: string }>(
    env.DB.prepare(
      `SELECT activity_date FROM child_daily_activity
       WHERE child_profile_id = ? AND (lessons_completed > 0 OR practice_sessions_completed > 0)
       ORDER BY activity_date DESC`,
    ).bind(childId),
  );
  return rows.map((row) => row.activity_date);
}

async function getRecentActivity(env: Env, childId: string) {
  return all<{
    completed_at: string;
    score_correct: number;
    score_total: number;
    xp_awarded: number;
    lesson_title: string;
    track_title: string;
    track_slug: string;
    activity_label: string | null;
  }>(
    env.DB.prepare(
      `SELECT * FROM (
         SELECT lesson_attempts.completed_at, lesson_attempts.score_correct, lesson_attempts.score_total,
                lesson_attempts.xp_awarded, lessons.title as lesson_title, tracks.title as track_title,
                tracks.slug as track_slug, NULL as activity_label
         FROM lesson_attempts
         JOIN lessons ON lessons.id = lesson_attempts.lesson_id
         JOIN units ON units.id = lessons.unit_id
         JOIN tracks ON tracks.id = units.track_id
         WHERE lesson_attempts.child_profile_id = ?
         UNION ALL
         SELECT multiplication_sessions.completed_at, multiplication_sessions.score_correct,
                multiplication_sessions.score_total, multiplication_sessions.xp_awarded,
                CASE
                  WHEN multiplication_sessions.mode = 'timed' THEN printf('%d-minute Time Test', multiplication_sessions.duration_seconds / 60)
                  ELSE 'Endless Practice'
                END as lesson_title,
                'Multiplication Facts' as track_title,
                'multiplication-facts' as track_slug,
                NULL as activity_label
         FROM multiplication_sessions
         WHERE multiplication_sessions.child_profile_id = ?
         UNION ALL
         SELECT flash_card_study_sessions.completed_at, 0 as score_correct, 0 as score_total,
                0 as xp_awarded, practice_sets.title as lesson_title,
                'My Flash Cards' as track_title, 'flash-cards' as track_slug,
                printf('Studied %d flash card%s', flash_card_study_sessions.unique_cards,
                  CASE WHEN flash_card_study_sessions.unique_cards = 1 THEN '' ELSE 's' END) as activity_label
         FROM flash_card_study_sessions
         JOIN practice_sets ON practice_sets.id = flash_card_study_sessions.practice_set_id
         WHERE flash_card_study_sessions.child_profile_id = ?
       )
       ORDER BY completed_at DESC
       LIMIT 6`,
    ).bind(childId, childId, childId),
  );
}

async function getBadges(env: Env, childId: string, streak: number) {
  const attempts = await env.DB.prepare(
    `SELECT count(*) as total,
            sum(CASE WHEN score_correct = score_total THEN 1 ELSE 0 END) as perfect
     FROM lesson_attempts
     WHERE child_profile_id = ?`,
  )
    .bind(childId)
    .first<BadgeAttemptCountsRow>();
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
  return buildBadges({
    attemptCount: attempts?.total ?? 0,
    perfectAttemptCount: attempts?.perfect ?? 0,
    streak,
    completedBySubject,
  });
}

function compareTracksBySubjectMetadata(a: TrackRow, b: TrackRow) {
  const subjectOrder = compareSubjectKeys(a.subject, b.subject);
  if (subjectOrder !== 0) return subjectOrder;
  return a.sort_order - b.sort_order;
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
    status: child.status,
    heartsRemaining: child.hearts_remaining,
  };
}

function trackResponse(track: TrackRow) {
  return {
    id: track.id,
    slug: track.slug,
    subject: track.subject,
    trackGroup: getTrackGroup(track.subject),
    gradeLevel: track.grade_level,
    title: track.title,
    description: track.description,
    color: track.color,
    accent: track.accent,
  };
}

function offlineLessonProgressResponse(progress: LessonProgressRow | null | undefined) {
  return {
    status: progress?.status ?? 'locked',
    completedAt: progress?.completed_at ?? null,
    bestScoreCorrect: progress?.best_score_correct ?? 0,
    bestScoreTotal: progress?.best_score_total ?? 0,
  };
}

function lessonResponse(
  child: ChildRow,
  lesson: LessonDetailRow,
  progress: LessonProgressRow | null | undefined,
  questions: LessonQuestion[],
) {
  return {
    child: childResponse(child),
    heartsStart: 5,
    progress: offlineLessonProgressResponse(progress),
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
  };
}

function lessonLinkResponse(lesson: CompletionLesson) {
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

function getChildModeSlug(request: Request) {
  return parseCookies(request.headers.get('Cookie')).get(CHILD_COOKIE) || null;
}

function canAccessChild(childModeSlug: string | null, child: ChildRow) {
  return child.status === 'active' && (!childModeSlug || childModeSlug === child.slug);
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

function chunks<T>(values: readonly T[], size: number) {
  const result: T[][] = [];
  for (let index = 0; index < values.length; index += size) result.push(values.slice(index, index + size));
  return result;
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

function isKidShellPath(pathname: string) {
  return ['/kid/shell', '/kid/track-shell', '/kid/lesson-shell', '/kid/facts-shell', '/kid/flash-cards-shell'].includes(
    stripTrailingSlash(pathname),
  );
}

function kidShellAssetPath(pathname: string) {
  const path = stripTrailingSlash(pathname);
  if (/^\/kid\/[^/]+$/.test(path)) return '/kid/shell/';
  if (/^\/kid\/[^/]+\/facts$/.test(path)) return '/kid/facts-shell/';
  if (/^\/kid\/[^/]+\/flash-cards$/.test(path)) return '/kid/flash-cards-shell/';
  if (/^\/kid\/[^/]+\/track\/[^/]+$/.test(path)) return '/kid/track-shell/';
  if (/^\/kid\/[^/]+\/lesson\/[^/]+$/.test(path)) return '/kid/lesson-shell/';
  return null;
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

function uniqueChildSlug(displayName: string, existingSlugs: string[]) {
  const taken = new Set(existingSlugs);
  const base = slugify(displayName) || 'child';
  if (!taken.has(base)) return base;

  for (let suffix = 2; ; suffix += 1) {
    const candidate = `${base}-${suffix}`;
    if (!taken.has(candidate)) return candidate;
  }
}

function levelBandForGrade(gradeLevel: number) {
  return `Grade ${gradeLevel}`;
}

function slugify(value: string) {
  return value
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .toLowerCase()
    .replace(/_/g, '-')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
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
  return assetResponse(new Request(url, request), env);
}

async function assetResponse(request: Request, env: Env) {
  const response = await env.ASSETS.fetch(request);
  const url = new URL(request.url);
  return withAssetHeaders(response, url.pathname);
}

function withAssetHeaders(response: Response, pathname: string) {
  const headers = new Headers(response.headers);
  if (response.ok) {
    headers.set('No-Vary-Search', 'key-order, params=("utm_source" "utm_medium" "utm_campaign" "utm_content" "utm_term")');
    if (pathname.startsWith('/_astro/')) {
      headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    } else if (isCacheablePublicFile(pathname)) {
      headers.set('Cache-Control', 'public, max-age=604800');
    }
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
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

async function readBoundedJson(request: Request, maximumBytes: number) {
  const declaredLength = Number(request.headers.get('Content-Length') ?? '0');
  if (Number.isFinite(declaredLength) && declaredLength > maximumBytes) throw new Error('payload_too_large');
  if (!request.body) return null;
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > maximumBytes) {
      await reader.cancel('payload_too_large');
      throw new Error('payload_too_large');
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return JSON.parse(new TextDecoder().decode(bytes)) as unknown;
}

async function sha256Hex(value: string) {
  return toHex(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value)));
}

function secureHashEqual(a: string, b: string) {
  if (!/^[a-f0-9]{64}$/i.test(a) || !/^[a-f0-9]{64}$/i.test(b)) return false;
  // Cloudflare's current SubtleCrypto has timingSafeEqual; the DOM lib used by Astro
  // has not added it yet, so describe only that retrieved Workers extension here.
  const workersSubtle = crypto.subtle as SubtleCrypto & {
    timingSafeEqual?: (left: ArrayBufferView, right: ArrayBufferView) => boolean;
  };
  if (typeof workersSubtle.timingSafeEqual === 'function') {
    return workersSubtle.timingSafeEqual(fromHex(a), fromHex(b));
  }
  // Node's WebCrypto test shim lacks the Workers-only primitive.
  return constantTimeStringEqual(a, b);
}

async function pairingCodeHmac(secret: string, code: string) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  return toHex(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(code.toUpperCase())));
}

function randomPairingCode() {
  const alphabet = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
  const bytes = crypto.getRandomValues(new Uint8Array(8));
  return Array.from(bytes, (byte) => alphabet[byte & 31]).join('');
}

async function getContentRevision(env: Env, childId: string) {
  const now = new Date().toISOString();
  await env.DB.prepare(
    `INSERT INTO child_content_revisions (child_profile_id, flash_cards_revision, updated_at)
     VALUES (?, 0, ?) ON CONFLICT(child_profile_id) DO NOTHING`,
  ).bind(childId, now).run();
  const revision = await env.DB.prepare(
    'SELECT * FROM child_content_revisions WHERE child_profile_id = ? LIMIT 1',
  ).bind(childId).first<ContentRevisionRow>();
  return revision ?? { child_profile_id: childId, flash_cards_revision: 0, updated_at: now };
}

function deviceHeaders(extra: HeadersInit = {}) {
  const headers = new Headers(extra);
  headers.set('Content-Type', 'application/json; charset=utf-8');
  headers.set('Cache-Control', 'private, no-store');
  return headers;
}

function deviceJson(data: unknown, status = 200, extraHeaders: HeadersInit = {}) {
  return new Response(JSON.stringify(data), { status, headers: deviceHeaders(extraHeaders) });
}

function deviceError(error: string, status: number, retryAfterSeconds?: number) {
  return deviceJson(
    { error, ...(retryAfterSeconds ? { retryAfterSeconds } : {}) },
    status,
    retryAfterSeconds ? { 'Retry-After': String(retryAfterSeconds) } : {},
  );
}

function shouldRedirectToHttps(request: Request, url: URL) {
  const forwardedProtocol = request.headers.get('X-Forwarded-Proto')?.split(',')[0]?.trim().toLowerCase();
  const host = request.headers.get('Host')?.split(':')[0]?.trim().toLowerCase();
  const connectingIp = request.headers.get('CF-Connecting-IP')?.trim().toLowerCase();
  const isHttp = url.protocol === 'http:' || forwardedProtocol === 'http';
  return (
    isHttp &&
    !url.port &&
    !isLocalHostname(url.hostname) &&
    !isLocalHostname(host ?? '') &&
    !isLocalHostname(connectingIp ?? '')
  );
}

function isLocalHostname(hostname: string) {
  const normalized = hostname.trim().toLowerCase().replace(/^\[/, '').replace(/\]$/, '');
  const withoutPort = normalized.includes(':') && normalized !== '::1' ? normalized.split(':')[0] : normalized;
  return (
    withoutPort === 'localhost' ||
    withoutPort.endsWith('.localhost') ||
    withoutPort === '127.0.0.1' ||
    withoutPort === '0.0.0.0' ||
    normalized === '::1'
  );
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'private, no-store',
    },
  });
}

async function readRequestPayload(request: Request) {
  const contentType = request.headers.get('Content-Type')?.toLowerCase() ?? '';
  if (contentType.includes('application/json')) return request.json();

  const form = await request.formData();
  return Object.fromEntries(form.entries());
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

function isCacheablePublicFile(pathname: string) {
  return (
    pathname.startsWith('/icons/') ||
    pathname.startsWith('/screenshots/') ||
    pathname.startsWith('/og/') ||
    pathname === '/manifest.webmanifest'
  );
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
