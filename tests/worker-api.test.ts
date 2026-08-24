import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { describe, expect, it } from 'vitest';
import { CHILD_COOKIE, SESSION_COOKIE } from '../src/lib/auth';
import worker from '../src/worker';

type QueryLog = string[];

class SqliteD1PreparedStatement {
  constructor(
    private readonly db: DatabaseSync,
    private readonly sql: string,
    private readonly queryLog: QueryLog,
    private readonly bindings: unknown[] = [],
  ) {}

  bind(...values: unknown[]) {
    return new SqliteD1PreparedStatement(this.db, this.sql, this.queryLog, values);
  }

  async first<T>() {
    this.queryLog.push(this.sql);
    return (this.db.prepare(this.sql).get(...(this.bindings as never[])) as T | undefined) ?? null;
  }

  async all<T>() {
    this.queryLog.push(this.sql);
    return {
      results: this.db.prepare(this.sql).all(...(this.bindings as never[])) as T[],
      success: true,
      meta: {},
    };
  }

  async run() {
    this.queryLog.push(this.sql);
    this.db.prepare(this.sql).run(...(this.bindings as never[]));
    return { success: true, meta: {} };
  }
}

class SqliteD1Database {
  readonly queryLog: QueryLog = [];

  constructor(readonly db: DatabaseSync) {}

  prepare(sql: string) {
    return new SqliteD1PreparedStatement(this.db, sql, this.queryLog);
  }

  async batch(statements: SqliteD1PreparedStatement[]) {
    return Promise.all(statements.map((statement) => statement.run()));
  }
}

function createTestDatabase() {
  const db = new DatabaseSync(':memory:');
  db.exec('PRAGMA foreign_keys = ON;');

  const migrationsPath = join(process.cwd(), 'migrations');
  for (const fileName of readdirSync(migrationsPath).filter((file) => file.endsWith('.sql')).sort()) {
    db.exec(readFileSync(join(migrationsPath, fileName), 'utf8'));
  }

  return db;
}

function seedTrackFixture(db: DatabaseSync) {
  const now = '2026-06-29T12:00:00.000Z';
  const future = '2099-01-01T00:00:00.000Z';

  db.prepare(
    `INSERT INTO parents
     (id, username, email, password_hash, password_salt, status, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, 'active', ?, ?)`,
  ).run('parent_1', 'morgan', 'morgan@example.test', 'hash', 'salt', now, now);
  db.prepare('INSERT INTO sessions (id, parent_id, expires_at, created_at) VALUES (?, ?, ?, ?)').run(
    'session_1',
    'parent_1',
    future,
    now,
  );
  db.prepare(
    `INSERT INTO child_profiles
     (id, parent_id, slug, display_name, avatar_key, level_band, grade_level, hearts_remaining, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ).run('child_mira', 'parent_1', 'mira', 'Mira', 'berry-builder', 'Grade 6', 6, 5, now, now);
  insertTrack(db, {
    id: 'track_g6_math',
    slug: 'grade-6-math',
    subject: 'math',
    gradeLevel: 6,
    title: 'Grade 6 Math',
    sortOrder: 1,
  });
  insertTrack(db, {
    id: 'track_g3_spanish',
    slug: 'grade-3-spanish',
    subject: 'spanish',
    gradeLevel: 3,
    title: 'Spanish 1',
    sortOrder: 2,
  });
  insertTrack(db, {
    id: 'track_g4_spanish',
    slug: 'grade-4-spanish',
    subject: 'spanish',
    gradeLevel: 4,
    title: 'Spanish 2',
    sortOrder: 3,
  });
  insertUnit(db, 'unit_2', 'track_g3_spanish', 'unit-two', 'Unit Two', 2);
  insertUnit(db, 'unit_1', 'track_g3_spanish', 'unit-one', 'Unit One', 1);
  insertUnit(db, 'unit_g4_1', 'track_g4_spanish', 'spanish-ii-start', 'Spanish II Start', 1);

  insertLesson(db, {
    id: 'lesson_2',
    unitId: 'unit_1',
    slug: 'available-mad-minute',
    title: 'Available Mad Minute',
    kind: 'mad-minute',
    sortOrder: 2,
    config: JSON.stringify({
      mode: 'multiplication',
      factor: 3,
      minMultiplier: 1,
      maxMultiplier: 12,
      durationSeconds: 60,
      goalCorrect: 40,
    }),
  });
  insertLesson(db, { id: 'lesson_1', unitId: 'unit_1', slug: 'completed', title: 'Completed Lesson', sortOrder: 1 });
  insertLesson(db, { id: 'lesson_3', unitId: 'unit_1', slug: 'locked-a', title: 'Locked A', sortOrder: 3 });
  insertLesson(db, { id: 'lesson_5', unitId: 'unit_2', slug: 'locked-c', title: 'Locked C', sortOrder: 2 });
  insertLesson(db, { id: 'lesson_4', unitId: 'unit_2', slug: 'locked-b', title: 'Locked B', sortOrder: 1 });
  insertLesson(db, {
    id: 'lesson_g4_1',
    unitId: 'unit_g4_1',
    slug: 'quick-spanish-ii-start',
    title: 'Quick Spanish II Start',
    sortOrder: 1,
  });
  insertQuestion(db, 'question_lesson_5', 'lesson_5', 'Type si.', {
    acceptedAnswers: ['si'],
    answerType: 'text',
  }, 'Remember the short Spanish word for yes.');
  insertQuestion(db, 'question_lesson_g4_1', 'lesson_g4_1', 'Type hola.', {
    acceptedAnswers: ['hola'],
    answerType: 'text',
  });

  db.prepare(
    `INSERT INTO child_track_progress
     (id, child_profile_id, track_id, current_unit_id, current_lesson_id, lessons_completed, xp_total, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
  ).run('track_progress_child_mira_track_g3_spanish', 'child_mira', 'track_g3_spanish', 'unit_1', 'lesson_2', 1, 15, now);
  db.prepare(
    `INSERT INTO child_lesson_progress
     (id, child_profile_id, lesson_id, status, completed_at, best_score_correct, best_score_total)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
  ).run('lesson_progress_child_mira_lesson_1', 'child_mira', 'lesson_1', 'completed', '2026-06-28T10:00:00.000Z', 3, 3);
  db.prepare(
    `INSERT INTO child_lesson_progress
     (id, child_profile_id, lesson_id, status, completed_at, best_score_correct, best_score_total)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
  ).run('lesson_progress_child_mira_lesson_2', 'child_mira', 'lesson_2', 'available', null, 0, 0);
}

function insertChild(db: DatabaseSync, id: string, slug: string, gradeLevel: number) {
  const now = '2026-06-29T12:00:00.000Z';
  db.prepare(
    `INSERT INTO child_profiles
     (id, parent_id, slug, display_name, avatar_key, level_band, grade_level, hearts_remaining, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ).run(id, 'parent_1', slug, slug.charAt(0).toUpperCase() + slug.slice(1), 'test-builder', `Grade ${gradeLevel}`, gradeLevel, 5, now, now);
}

function insertTrack(
  db: DatabaseSync,
  track: { id: string; slug: string; subject: string; gradeLevel: number; title: string; sortOrder: number },
) {
  db.prepare(
    `INSERT INTO tracks
     (id, slug, subject, grade_level, title, description, color, accent, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ).run(
    track.id,
    track.slug,
    track.subject,
    track.gradeLevel,
    track.title,
    `${track.title} description`,
    'bg-blue-500',
    'text-blue-900',
    track.sortOrder,
  );
}

function insertUnit(db: DatabaseSync, id: string, trackId: string, slug: string, title: string, sortOrder: number) {
  db.prepare('INSERT INTO units (id, track_id, slug, title, description, sort_order) VALUES (?, ?, ?, ?, ?, ?)').run(
    id,
    trackId,
    slug,
    title,
    `${title} description`,
    sortOrder,
  );
}

function insertLesson(
  db: DatabaseSync,
  lesson: {
    id: string;
    unitId: string;
    slug: string;
    title: string;
    sortOrder: number;
    kind?: 'standard' | 'mad-minute';
    config?: string | null;
  },
) {
  db.prepare(
    `INSERT INTO lessons
     (id, unit_id, slug, title, kind, config_json, sort_order, xp_base)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
  ).run(lesson.id, lesson.unitId, lesson.slug, lesson.title, lesson.kind ?? 'standard', lesson.config ?? null, lesson.sortOrder, 10);
}

function insertQuestion(db: DatabaseSync, id: string, lessonId: string, prompt: string, payload: unknown, hint: string | null = null) {
  db.prepare(
    `INSERT INTO questions
     (id, lesson_id, type, prompt, payload_json, explanation, hint, sort_order)
     VALUES (?, ?, 'text-input', ?, ?, NULL, ?, 1)`,
  ).run(id, lessonId, prompt, JSON.stringify(payload), hint);
}

function createEnv({ seed = true }: { seed?: boolean } = {}) {
  const sqlite = new SqliteD1Database(createTestDatabase());
  if (seed) seedTrackFixture(sqlite.db);

  return {
    sqlite,
    env: {
      DB: sqlite,
      TIME_ZONE: 'America/Chicago',
      PAIRING_HMAC_SECRET: 'test-only-pairing-hmac-secret-at-least-32-bytes',
      ASSETS: { fetch: async (request: Request) => new Response(`asset:${new URL(request.url).pathname}`) },
    },
  };
}

function countRows(db: DatabaseSync, sql: string, ...bindings: unknown[]) {
  const row = db.prepare(sql).get(...(bindings as never[])) as { total: number } | undefined;
  return row?.total ?? 0;
}

async function sha256Hex(value: string) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

async function getJson(pathname: string, env: unknown) {
  const response = await worker.fetch(
    new Request(`https://learn.example.test${pathname}`, {
      headers: { Cookie: `${SESSION_COOKIE}=session_1` },
    }),
    env as Parameters<typeof worker.fetch>[1],
  );
  return { response, body: (await response.json()) as any };
}

async function requestJson(
  pathname: string,
  env: unknown,
  {
    method = 'GET',
    body,
    cookie = `${SESSION_COOKIE}=session_1`,
    origin,
    requestHeaders,
  }: { method?: string; body?: unknown; cookie?: string; origin?: string; requestHeaders?: HeadersInit } = {},
) {
  const headers = new Headers(requestHeaders);
  if (cookie) headers.set('Cookie', cookie);
  if (body !== undefined) headers.set('Content-Type', 'application/json');
  if (origin) headers.set('Origin', origin);
  const response = await worker.fetch(
    new Request(`https://learn.example.test${pathname}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    }),
    env as Parameters<typeof worker.fetch>[1],
  );
  return { response, body: (await response.json()) as any };
}

async function getText(pathname: string, env: unknown, cookie = `${SESSION_COOKIE}=session_1`) {
  const response = await worker.fetch(
    new Request(`https://learn.example.test${pathname}`, {
      headers: { Cookie: cookie },
    }),
    env as Parameters<typeof worker.fetch>[1],
  );
  return { response, body: await response.text() };
}

async function requestRaw(pathname: string, env: unknown, headers: HeadersInit) {
  return worker.fetch(
    new Request(`https://learn.example.test${pathname}`, { headers }),
    env as Parameters<typeof worker.fetch>[1],
  );
}

describe('worker track APIs', () => {
  it('returns the child track response shape with batched lesson progress in unit order', async () => {
    const { env, sqlite } = createEnv();

    const { response, body } = await getJson('/api/children/mira/tracks/grade-3-spanish', env);

    expect(response.status).toBe(200);
    expect(body).toMatchObject({
      child: { slug: 'mira', gradeLevel: 6 },
      track: {
        id: 'track_g3_spanish',
        slug: 'grade-3-spanish',
        subject: 'spanish',
        trackGroup: 'foundation',
        gradeLevel: 3,
      },
      progress: {
        lessonsCompleted: 1,
        xpTotal: 15,
        currentLesson: {
          id: 'lesson_2',
          slug: 'available-mad-minute',
          unitTitle: 'Unit One',
          trackSlug: 'grade-3-spanish',
        },
      },
    });
    expect(body.units.map((unit: { slug: string }) => unit.slug)).toEqual(['unit-one', 'unit-two']);
    expect(body.units[0].lessons.map((lesson: { id: string }) => lesson.id)).toEqual([
      'lesson_1',
      'lesson_2',
      'lesson_3',
    ]);
    expect(body.units[1].lessons.map((lesson: { id: string }) => lesson.id)).toEqual(['lesson_4', 'lesson_5']);
    expect(body.units[0].lessons.map((lesson: { status: string }) => lesson.status)).toEqual([
      'completed',
      'available',
      'locked',
    ]);
    expect(body.units[0].lessons[0]).toMatchObject({
      completedAt: '2026-06-28T10:00:00.000Z',
      bestScoreCorrect: 3,
      bestScoreTotal: 3,
    });
    expect(body.units[0].lessons[1]).toMatchObject({
      madMinuteGoal: 40,
      completedAt: null,
    });
    expect(body.units[0].lessons[2].completedAt).toBeNull();

    expect(sqlite.queryLog.filter((sql) => sql.includes('LEFT JOIN child_lesson_progress')).length).toBeLessThanOrEqual(4);
    expect(sqlite.queryLog.some((sql) => sql.includes('SELECT * FROM lessons WHERE unit_id = ?'))).toBe(false);
    expect(sqlite.queryLog.some((sql) => sql.includes('SELECT * FROM child_lesson_progress WHERE child_profile_id = ? AND lesson_id = ?'))).toBe(false);

    await expect(getJson('/api/children/mira/tracks/grade-4-spanish', env)).resolves.toMatchObject({
      response: expect.objectContaining({ status: 404 }),
    });
  });

  it('skips progress repair writes when a child is already provisioned', async () => {
    const { env, sqlite } = createEnv();

    const first = await getJson('/api/children/mira/home', env);
    sqlite.queryLog.length = 0;
    const second = await getJson('/api/children/mira/home', env);

    expect(first.response.status).toBe(200);
    expect(second.response.status).toBe(200);
    expect(sqlite.queryLog.some((sql) => sql.includes('INSERT OR IGNORE INTO child_track_progress'))).toBe(false);
    expect(sqlite.queryLog.some((sql) => sql.includes('INSERT OR IGNORE INTO child_lesson_progress'))).toBe(false);
    expect(sqlite.queryLog.some((sql) => sql.includes('SELECT lesson_id') && sql.includes('FROM child_lesson_progress'))).toBe(false);
  });

  it('returns a whole-track offline pack including locked lesson payloads', async () => {
    const { env } = createEnv();

    const { response, body } = await getJson('/api/children/mira/tracks/grade-3-spanish/offline-pack', env);

    expect(response.status).toBe(200);
    expect(body).toMatchObject({
      child: { slug: 'mira' },
      track: { slug: 'grade-3-spanish', title: 'Spanish 1' },
      progress: {
        lessonsCompleted: 1,
        currentLesson: { id: 'lesson_2' },
      },
    });
    expect(body.units[0].lessons.map((lesson: { id: string; status: string }) => [lesson.id, lesson.status])).toEqual([
      ['lesson_1', 'completed'],
      ['lesson_2', 'available'],
      ['lesson_3', 'locked'],
    ]);
    expect(body.lessons.map((lessonData: { lesson: { id: string } }) => lessonData.lesson.id)).toEqual([
      'lesson_1',
      'lesson_2',
      'lesson_3',
      'lesson_4',
      'lesson_5',
    ]);
    expect(body.lessons.find((lessonData: { lesson: { id: string } }) => lessonData.lesson.id === 'lesson_3')).toMatchObject({
      progress: {
        status: 'locked',
        bestScoreCorrect: 0,
        bestScoreTotal: 0,
      },
      lesson: {
        title: 'Locked A',
        track: { slug: 'grade-3-spanish' },
      },
    });
    expect(body.lessons.find((lessonData: { lesson: { id: string } }) => lessonData.lesson.id === 'lesson_5').lesson.questions).toEqual([
      expect.objectContaining({
        hint: 'Remember the short Spanish word for yes.',
      }),
    ]);

    const normalLockedLesson = await getJson('/api/children/mira/lessons/lesson_3', env);
    expect(normalLockedLesson.response.status).toBe(403);
    expect(normalLockedLesson.body).toEqual({ error: 'lesson_locked' });
  });

  it('returns question hints from the regular lesson API', async () => {
    const { env, sqlite } = createEnv();
    sqlite.db
      .prepare(
        `INSERT INTO child_lesson_progress
         (id, child_profile_id, lesson_id, status, completed_at, best_score_correct, best_score_total)
         VALUES (?, ?, ?, 'available', NULL, 0, 0)`,
      )
      .run('lesson_progress_child_mira_lesson_5', 'child_mira', 'lesson_5');

    const { response, body } = await getJson('/api/children/mira/lessons/lesson_5', env);

    expect(response.status).toBe(200);
    expect(body.lesson.questions).toEqual([
      expect.objectContaining({
        id: 'question_lesson_5',
        hint: 'Remember the short Spanish word for yes.',
      }),
    ]);
  });

  it('does not leak author-only question metadata from lesson APIs', async () => {
    const { env, sqlite } = createEnv();
    sqlite.db
      .prepare(
        `INSERT INTO child_lesson_progress
         (id, child_profile_id, lesson_id, status, completed_at, best_score_correct, best_score_total)
         VALUES (?, ?, ?, 'available', NULL, 0, 0)`,
      )
      .run('lesson_progress_child_mira_lesson_5', 'child_mira', 'lesson_5');
    sqlite.db
      .prepare('UPDATE questions SET payload_json = ? WHERE id = ?')
      .run(
        JSON.stringify({
          acceptedAnswers: ['si'],
          answerType: 'text',
          questionGoal: 'Author-only goal.',
          misconception: 'Author-only misconception.',
        }),
        'question_lesson_5',
      );

    const { response, body } = await getJson('/api/children/mira/lessons/lesson_5', env);

    expect(response.status).toBe(200);
    expect(body.lesson.questions[0]).not.toHaveProperty('questionGoal');
    expect(body.lesson.questions[0]).not.toHaveProperty('misconception');
    expect(body.lesson.questions[0].payload).not.toHaveProperty('questionGoal');
    expect(body.lesson.questions[0].payload).not.toHaveProperty('misconception');
  });

  it('uses child grade for scholastic tracks and starts foundation tracks at level 1', async () => {
    const { env } = createEnv();

    const visible = await getJson('/api/children/mira/tracks/grade-3-spanish', env);
    const nextSequence = await getJson('/api/children/mira/tracks/grade-4-spanish', env);
    const hidden = await getJson('/api/children/mira/tracks/grade-6-spanish', env);

    expect(visible.response.status).toBe(200);
    expect(nextSequence.response.status).toBe(404);
    expect(nextSequence.body).toEqual({ error: 'track_not_found' });
    expect(hidden.response.status).toBe(404);
    expect(hidden.body).toEqual({ error: 'track_not_found' });
  });

  it('unlocks Spanish 2 after completing Spanish 1', async () => {
    const { env, sqlite } = createEnv();

    expect((await getJson('/api/children/mira/tracks/grade-4-spanish', env)).response.status).toBe(404);

    sqlite.db
      .prepare(
        `UPDATE child_lesson_progress
         SET status = 'completed', completed_at = '2026-06-29T10:00:00.000Z', best_score_correct = 1, best_score_total = 1
         WHERE child_profile_id = ? AND lesson_id = ?`,
      )
      .run('child_mira', 'lesson_2');
    for (const lessonId of ['lesson_3', 'lesson_4']) {
      sqlite.db
        .prepare(
          `UPDATE child_lesson_progress
           SET status = 'completed', completed_at = '2026-06-29T10:00:00.000Z', best_score_correct = 1, best_score_total = 1
           WHERE child_profile_id = ? AND lesson_id = ?`,
        )
        .run('child_mira', lessonId);
    }
    sqlite.db
      .prepare(
        `UPDATE child_lesson_progress
         SET status = 'available', completed_at = NULL, best_score_correct = 0, best_score_total = 0
         WHERE child_profile_id = ? AND lesson_id = ?`,
      )
      .run('child_mira', 'lesson_5');
    sqlite.db
      .prepare(
        `UPDATE child_track_progress
         SET current_unit_id = ?, current_lesson_id = ?, lessons_completed = ?
         WHERE child_profile_id = ? AND track_id = ?`,
      )
      .run('unit_2', 'lesson_5', 4, 'child_mira', 'track_g3_spanish');

    const completion = await requestJson('/api/children/mira/lessons/lesson_5', env, {
      method: 'POST',
      body: {
        startedAt: '2026-06-29T12:05:00.000Z',
        attempts: [{ questionId: 'question_lesson_5', answer: 'si' }],
      },
    });

    expect(completion.response.status).toBe(200);
    expect(completion.body.result).toMatchObject({
      scoreCorrect: 1,
      scoreTotal: 1,
      nextLesson: {
        id: 'lesson_g4_1',
        trackSlug: 'grade-4-spanish',
        trackGradeLevel: 4,
      },
    });

    const grade4 = await getJson('/api/children/mira/tracks/grade-4-spanish', env);
    expect(grade4.response.status).toBe(200);
    expect(grade4.body.progress.currentLesson).toMatchObject({
      id: 'lesson_g4_1',
      trackSlug: 'grade-4-spanish',
    });
    expect(grade4.body.units[0].lessons[0]).toMatchObject({
      id: 'lesson_g4_1',
      status: 'available',
    });

    const home = await getJson('/api/children/mira/home', env);
    expect(home.response.status).toBe(200);
    expect(home.body.tracks.map((track: { slug: string }) => track.slug)).toEqual([
      'grade-6-math',
      'grade-3-spanish',
      'grade-4-spanish',
    ]);
    expect(home.body.recommendedLesson).toMatchObject({
      id: 'lesson_g4_1',
      trackSlug: 'grade-4-spanish',
    });
  });

  it('repairs missing progress when a dynamic child enters kid flows', async () => {
    const { env, sqlite } = createEnv();
    insertChild(sqlite.db, 'child_luca', 'luca', 6);

    const home = await getJson('/api/children/luca/home', env);

    expect(home.response.status).toBe(200);
    expect(home.body.child).toMatchObject({ slug: 'luca', gradeLevel: 6 });
    expect(
      countRows(
        sqlite.db,
        'SELECT count(*) as total FROM child_track_progress WHERE child_profile_id = ? AND track_id = ?',
        'child_luca',
        'track_g3_spanish',
      ),
    ).toBe(1);
    expect(
      countRows(
        sqlite.db,
        'SELECT count(*) as total FROM child_lesson_progress WHERE child_profile_id = ?',
        'child_luca',
      ),
    ).toBe(5);
  });

  it('deduplicates standard lesson retries by client attempt id', async () => {
    const { env, sqlite } = createEnv();
    sqlite.db
      .prepare(
        `INSERT INTO child_lesson_progress
         (id, child_profile_id, lesson_id, status, completed_at, best_score_correct, best_score_total)
         VALUES (?, ?, ?, 'available', NULL, 0, 0)`,
      )
      .run('lesson_progress_child_mira_lesson_5', 'child_mira', 'lesson_5');

    const payload = {
      clientAttemptId: 'offline_standard_attempt_1',
      startedAt: '2026-06-29T12:05:00.000Z',
      attempts: [{ questionId: 'question_lesson_5', answer: 'si' }],
    };

    const first = await requestJson('/api/children/mira/lessons/lesson_5', env, {
      method: 'POST',
      body: payload,
    });
    const retry = await requestJson('/api/children/mira/lessons/lesson_5', env, {
      method: 'POST',
      body: payload,
    });

    expect(first.response.status).toBe(200);
    expect(retry.response.status).toBe(200);
    expect(retry.body.result).toMatchObject({
      lessonAttemptId: first.body.result.lessonAttemptId,
      scoreCorrect: first.body.result.scoreCorrect,
      scoreTotal: first.body.result.scoreTotal,
      xpAwarded: first.body.result.xpAwarded,
      heartsRemaining: first.body.result.heartsRemaining,
    });
    expect(
      countRows(
        sqlite.db,
        'SELECT count(*) as total FROM lesson_attempts WHERE child_profile_id = ? AND client_attempt_id = ?',
        'child_mira',
        payload.clientAttemptId,
      ),
    ).toBe(1);
    expect(
      countRows(
        sqlite.db,
        `SELECT count(*) as total
         FROM question_attempts
         JOIN lesson_attempts ON lesson_attempts.id = question_attempts.lesson_attempt_id
         WHERE lesson_attempts.client_attempt_id = ?`,
        payload.clientAttemptId,
      ),
    ).toBe(1);
    expect(
      countRows(
        sqlite.db,
        'SELECT lessons_completed as total FROM child_daily_activity WHERE child_profile_id = ?',
        'child_mira',
      ),
    ).toBe(1);
  });

  it('deduplicates Mad Minute retries by client attempt id', async () => {
    const { env, sqlite } = createEnv();
    const payload = {
      clientAttemptId: 'offline_mad_minute_attempt_1',
      startedAt: '2026-06-29T12:05:00.000Z',
      attempts: [
        { factor: 3, multiplier: 4, answer: 12 },
        { factor: 3, multiplier: 5, answer: 15 },
      ],
    };

    const first = await requestJson('/api/children/mira/lessons/lesson_2', env, {
      method: 'POST',
      body: payload,
    });
    const retry = await requestJson('/api/children/mira/lessons/lesson_2', env, {
      method: 'POST',
      body: payload,
    });

    expect(first.response.status).toBe(200);
    expect(retry.response.status).toBe(200);
    expect(retry.body.result).toMatchObject({
      lessonAttemptId: first.body.result.lessonAttemptId,
      scoreCorrect: first.body.result.scoreCorrect,
      scoreTotal: first.body.result.scoreTotal,
      bestScoreCorrect: first.body.result.bestScoreCorrect,
      goalCorrect: first.body.result.goalCorrect,
    });
    expect(
      countRows(
        sqlite.db,
        'SELECT count(*) as total FROM lesson_attempts WHERE child_profile_id = ? AND client_attempt_id = ?',
        'child_mira',
        payload.clientAttemptId,
      ),
    ).toBe(1);
    expect(countRows(sqlite.db, 'SELECT count(*) as total FROM child_daily_activity WHERE child_profile_id = ?', 'child_mira')).toBe(1);
  });

  it('keeps historical foundation activity visible without subject overrides', async () => {
    const { env, sqlite } = createEnv();
    sqlite.db
      .prepare(
        `INSERT INTO lesson_attempts
         (id, child_profile_id, lesson_id, started_at, completed_at, score_correct, score_total, xp_awarded, hearts_remaining)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .run(
        'attempt_old_spanish',
        'child_mira',
        'lesson_1',
        '2026-06-28T10:00:00.000Z',
        '2026-06-28T10:05:00.000Z',
        3,
        3,
        18,
        5,
      );

    const dashboard = await getJson('/api/parent/dashboard', env);

    expect(dashboard.response.status).toBe(200);
    expect(dashboard.body.children[0].tracks.map((track: { slug: string }) => track.slug)).toContain('grade-3-spanish');
    expect(dashboard.body.children[0].recentActivity).toEqual([
      expect.objectContaining({
        lesson_title: 'Completed Lesson',
        track_slug: 'grade-3-spanish',
      }),
    ]);
  });

  it('lists parent children including archived profiles', async () => {
    const { env, sqlite } = createEnv();
    insertChild(sqlite.db, 'child_luca', 'luca', 3);
    sqlite.db.prepare("UPDATE child_profiles SET status = 'archived' WHERE id = ?").run('child_luca');

    const { response, body } = await getJson('/api/parent/children', env);

    expect(response.status).toBe(200);
    expect(body.children.map((child: { slug: string; status: string }) => [child.slug, child.status])).toEqual([
      ['mira', 'active'],
      ['luca', 'archived'],
    ]);
  });

  it('creates child profiles with stable slugs, grade level, defaults, and progress', async () => {
    const { env, sqlite } = createEnv();

    const created = await requestJson('/api/parent/children', env, {
      method: 'POST',
      body: { displayName: 'Mira Stone', gradeLevel: 6 },
    });
    const duplicate = await requestJson('/api/parent/children', env, {
      method: 'POST',
      body: { displayName: 'Mira Stone', gradeLevel: 6 },
    });

    expect(created.response.status).toBe(201);
    expect(created.body.child).toMatchObject({
      slug: 'mira-stone',
      displayName: 'Mira Stone',
      gradeLevel: 6,
      levelBand: 'Grade 6',
      status: 'active',
      heartsRemaining: 5,
    });
    expect(duplicate.body.child.slug).toBe('mira-stone-2');
    expect(
      countRows(
        sqlite.db,
        'SELECT count(*) as total FROM child_track_progress WHERE child_profile_id = ? AND track_id = ?',
        created.body.child.id,
        'track_g3_spanish',
      ),
    ).toBe(1);
    expect(
      countRows(
        sqlite.db,
        'SELECT count(*) as total FROM child_lesson_progress WHERE child_profile_id = ?',
        created.body.child.id,
      ),
    ).toBe(5);
  });

  it('updates child profile fields without changing the stable slug', async () => {
    const { env } = createEnv();
    const created = await requestJson('/api/parent/children', env, {
      method: 'POST',
      body: { displayName: 'Mira Stone', gradeLevel: 6 },
    });

    const updated = await requestJson(`/api/parent/children/${created.body.child.id}`, env, {
      method: 'PATCH',
      body: { displayName: 'Mira Sky', gradeLevel: 4 },
    });

    expect(updated.response.status).toBe(200);
    expect(updated.body.child).toMatchObject({
      id: created.body.child.id,
      slug: 'mira-stone',
      displayName: 'Mira Sky',
      gradeLevel: 4,
      levelBand: 'Grade 4',
      status: 'active',
    });
  });

  it('archives and unarchives children without deleting progress', async () => {
    const { env, sqlite } = createEnv();
    const beforeProgress = countRows(sqlite.db, 'SELECT count(*) as total FROM child_lesson_progress WHERE child_profile_id = ?', 'child_mira');

    const archived = await requestJson('/api/parent/children/mira', env, {
      method: 'PATCH',
      body: { status: 'archived' },
    });
    const profiles = await getJson('/api/children', env);
    const home = await getJson('/api/children/mira/home', env);
    const page = await getText('/kid/mira/', env);
    const afterArchiveProgress = countRows(sqlite.db, 'SELECT count(*) as total FROM child_lesson_progress WHERE child_profile_id = ?', 'child_mira');
    const unarchived = await requestJson('/api/parent/children/mira', env, {
      method: 'PATCH',
      body: { status: 'active' },
    });
    const profilesAfterUnarchive = await getJson('/api/children', env);

    expect(archived.body.child).toMatchObject({ slug: 'mira', status: 'archived' });
    expect(profiles.body.children.map((child: { slug: string }) => child.slug)).not.toContain('mira');
    expect(home.response.status).toBe(403);
    expect(home.body).toEqual({ error: 'child_locked' });
    expect(page.response.status).toBe(303);
    expect(page.response.headers.get('Location')).toBe('https://learn.example.test/profiles/');
    expect(afterArchiveProgress).toBe(beforeProgress);
    expect(unarchived.body.child).toMatchObject({ slug: 'mira', status: 'active' });
    expect(profilesAfterUnarchive.body.children.map((child: { slug: string }) => child.slug)).toContain('mira');
  });
});

describe('worker practice set APIs', () => {
  it('creates, lists, updates, and archives child-scoped practice sets', async () => {
    const { env, sqlite } = createEnv();

    const created = await requestJson('/api/parent/children/mira/practice-sets', env, {
      method: 'POST',
      body: {
        title: 'Week 1 Words',
        source: 'Friday quiz',
        pinned: true,
        expiresAt: '2099-01-05T00:00:00.000Z',
        cards: [
          { term: 'vast', definition: 'very big', example: 'The desert is vast.', acceptedAnswers: ['large'] },
          { term: 'nimble', definition: 'quick and light', example: 'The dancer was nimble.' },
        ],
      },
    });

    expect(created.response.status).toBe(201);
    expect(created.body.practiceSet).toMatchObject({
      title: 'Week 1 Words',
      source: 'Friday quiz',
      status: 'active',
      pinned: true,
      subject: 'vocabulary',
    });
    expect(created.body.practiceSet.lessonId).toMatch(/^practice_set_practice_/);
    expect(created.body.practiceSet.cards).toHaveLength(2);
    expect(created.body.practiceSet.cards[0]).toMatchObject({
      term: 'vast',
      definition: 'very big',
      acceptedAnswers: ['vast', 'large'],
    });

    const listed = await requestJson('/api/parent/children/mira/practice-sets', env);
    expect(listed.response.status).toBe(200);
    expect(listed.body.practiceSets.map((set: { id: string }) => set.id)).toEqual([created.body.practiceSet.id]);

    const updated = await requestJson(`/api/parent/children/mira/practice-sets/${created.body.practiceSet.id}`, env, {
      method: 'PATCH',
      body: { title: 'Week 1 Vocabulary', pinned: false },
    });
    expect(updated.response.status).toBe(200);
    expect(updated.body.practiceSet).toMatchObject({
      title: 'Week 1 Vocabulary',
      pinned: false,
      archivedAt: null,
    });

    const archived = await requestJson(`/api/parent/children/mira/practice-sets/${created.body.practiceSet.id}`, env, {
      method: 'PATCH',
      body: { status: 'archived' },
    });
    expect(archived.response.status).toBe(200);
    expect(archived.body.practiceSet.status).toBe('archived');
    expect(archived.body.practiceSet.archivedAt).toEqual(expect.any(String));
    expect(countRows(sqlite.db, 'SELECT count(*) as total FROM practice_set_cards WHERE practice_set_id = ?', created.body.practiceSet.id)).toBe(2);
  });

  it('puts pinned active practice sets above normal recommendations on Kid Home', async () => {
    const { env } = createEnv();

    const active = await requestJson('/api/parent/children/mira/practice-sets', env, {
      method: 'POST',
      body: {
        title: 'Pinned School Words',
        pinned: true,
        expiresAt: '2099-01-05T00:00:00.000Z',
        cards: [{ term: 'scarce', definition: 'hard to find' }],
      },
    });
    await requestJson('/api/parent/children/mira/practice-sets', env, {
      method: 'POST',
      body: {
        title: 'Expired Words',
        pinned: true,
        expiresAt: '2000-01-05T00:00:00.000Z',
        cards: [{ term: 'stale', definition: 'old' }],
      },
    });
    await requestJson('/api/parent/children/mira/practice-sets', env, {
      method: 'POST',
      body: {
        title: 'Archived Words',
        status: 'archived',
        pinned: true,
        cards: [{ term: 'hidden', definition: 'not visible' }],
      },
    });

    const home = await getJson('/api/children/mira/home', env);

    expect(home.response.status).toBe(200);
    expect(home.body.practiceSets).toEqual([
      expect.objectContaining({
        id: active.body.practiceSet.id,
        lessonId: active.body.practiceSet.lessonId,
        title: 'Pinned School Words',
        pinned: true,
      }),
    ]);
    expect(home.body.recommendedLesson).toMatchObject({
      id: active.body.practiceSet.lessonId,
      title: 'Pinned School Words',
      unitTitle: 'Weekly Practice',
    });
  });

  it('renders and completes a practice set as context, easy card, and hard card questions', async () => {
    const { env, sqlite } = createEnv();
    const created = await requestJson('/api/parent/children/mira/practice-sets', env, {
      method: 'POST',
      body: {
        title: 'Quiz Words',
        pinned: true,
        cards: [
          { term: 'vast', definition: 'very big', example: 'The canyon is vast.', acceptedAnswers: ['large'] },
          { term: 'nimble', definition: 'quick and light' },
        ],
      },
    });
    const lessonId = created.body.practiceSet.lessonId;

    const lesson = await getJson(`/api/children/mira/lessons/${lessonId}`, env);

    expect(lesson.response.status).toBe(200);
    expect(lesson.body.lesson).toMatchObject({
      id: lessonId,
      title: 'Quiz Words',
      kind: 'standard',
      unit: { title: 'Weekly Practice' },
      track: { subject: 'vocabulary', title: 'Vocabulary' },
    });
    expect(lesson.body.lesson.questions).toHaveLength(6);
    expect(lesson.body.lesson.questions[0]).toMatchObject({
      type: 'passage-question',
      prompt: 'Read the context before the flash cards.',
      payload: {
        passageTitle: 'vast',
        passage: 'The canyon is vast.',
        question: 'What does "vast" mean here?',
        correctAnswer: 'very big',
        choices: expect.arrayContaining(['very big', 'quick and light']),
      },
    });
    expect(lesson.body.lesson.questions[2]).toMatchObject({
      type: 'flash-card',
      prompt: 'Choose the best meaning.',
      payload: {
        mode: 'easy',
        front: 'vast',
        correctAnswer: 'very big',
        choices: expect.arrayContaining(['very big', 'quick and light']),
      },
    });
    expect(lesson.body.lesson.questions[4]).toMatchObject({
      type: 'flash-card',
      prompt: 'Type the vocabulary word.',
      payload: {
        mode: 'hard',
        front: 'very big',
        acceptedAnswers: ['vast', 'large'],
      },
    });

    const completion = await requestJson(`/api/children/mira/lessons/${lessonId}`, env, {
      method: 'POST',
      body: {
        clientAttemptId: 'offline_practice_attempt_1',
        startedAt: '2026-06-29T12:05:00.000Z',
        attempts: lesson.body.lesson.questions.map((question: any) => ({
          questionId: question.id,
          answer:
            question.type === 'passage-question' || question.payload.mode === 'easy'
              ? question.payload.correctAnswer
              : question.payload.acceptedAnswers[0],
        })),
      },
    });

    expect(completion.response.status).toBe(200);
    expect(completion.body.result).toMatchObject({
      scoreCorrect: 6,
      scoreTotal: 6,
      heartsRemaining: 5,
      nextLesson: null,
    });
    expect(countRows(sqlite.db, 'SELECT count(*) as total FROM practice_set_attempts')).toBe(1);
    expect(countRows(sqlite.db, 'SELECT count(*) as total FROM practice_card_attempts')).toBe(6);
    expect(countRows(sqlite.db, 'SELECT count(*) as total FROM lesson_attempts')).toBe(0);

    const retry = await requestJson(`/api/children/mira/lessons/${lessonId}`, env, {
      method: 'POST',
      body: {
        clientAttemptId: 'offline_practice_attempt_1',
        startedAt: '2026-06-29T12:05:00.000Z',
        attempts: [],
      },
    });

    expect(retry.response.status).toBe(200);
    expect(retry.body.result).toMatchObject({
      lessonAttemptId: completion.body.result.lessonAttemptId,
      scoreCorrect: completion.body.result.scoreCorrect,
      scoreTotal: completion.body.result.scoreTotal,
      xpAwarded: completion.body.result.xpAwarded,
    });
    expect(countRows(sqlite.db, 'SELECT count(*) as total FROM practice_set_attempts')).toBe(1);
    expect(countRows(sqlite.db, 'SELECT count(*) as total FROM practice_card_attempts')).toBe(6);

    await requestJson(`/api/parent/children/mira/practice-sets/${created.body.practiceSet.id}`, env, {
      method: 'PATCH',
      body: { status: 'archived' },
    });

    const archivedLesson = await getJson(`/api/children/mira/lessons/${lessonId}`, env);
    expect(archivedLesson.response.status).toBe(404);
    expect(archivedLesson.body).toEqual({ error: 'lesson_not_found' });
    expect(countRows(sqlite.db, 'SELECT count(*) as total FROM practice_set_attempts')).toBe(1);
  });

  it('enforces child-mode scoping for practice set APIs and virtual lessons', async () => {
    const { env, sqlite } = createEnv();
    insertChild(sqlite.db, 'child_nico', 'nico', 3);
    const created = await requestJson('/api/parent/children/mira/practice-sets', env, {
      method: 'POST',
      body: {
        title: 'Private Words',
        cards: [{ term: 'private', definition: 'for one student' }],
      },
    });

    const parentMutation = await requestJson('/api/parent/children/mira/practice-sets', env, {
      method: 'POST',
      cookie: `${SESSION_COOKIE}=session_1; ${CHILD_COOKIE}=mira`,
      body: {
        title: 'Blocked',
        cards: [{ term: 'blocked', definition: 'not allowed' }],
      },
    });
    expect(parentMutation.response.status).toBe(403);
    expect(parentMutation.body).toEqual({ error: 'parent_reauth_required' });

    const mismatchedChildMode = await requestJson(`/api/children/mira/lessons/${created.body.practiceSet.lessonId}`, env, {
      cookie: `${SESSION_COOKIE}=session_1; ${CHILD_COOKIE}=nico`,
    });
    expect(mismatchedChildMode.response.status).toBe(403);
    expect(mismatchedChildMode.body).toEqual({ error: 'child_locked' });

    const wrongChild = await requestJson(`/api/children/nico/lessons/${created.body.practiceSet.lessonId}`, env, {
      cookie: `${SESSION_COOKIE}=session_1; ${CHILD_COOKIE}=nico`,
    });
    expect(wrongChild.response.status).toBe(404);
    expect(wrongChild.body).toEqual({ error: 'lesson_not_found' });
  });
});

describe('worker kid flash-card section APIs', () => {
  it('lets the active child create, edit, list, archive, and restore flash-card sections', async () => {
    const { env } = createEnv();
    const childCookie = `${SESSION_COOKIE}=session_1; ${CHILD_COOKIE}=mira`;

    const created = await requestJson('/api/children/mira/flash-card-sections', env, {
      method: 'POST',
      cookie: childCookie,
      body: {
        title: 'Science Words',
        source: 'Chapter 3',
        pinned: true,
        cards: [
          { term: 'orbit', definition: 'the path one object takes around another' },
          { term: 'axis', definition: 'an imaginary line an object turns around', example: 'Earth spins on its axis.' },
        ],
      },
    });

    expect(created.response.status).toBe(201);
    expect(created.body.practiceSet).toMatchObject({
      title: 'Science Words',
      source: 'Chapter 3',
      status: 'active',
      pinned: true,
    });
    expect(created.body.practiceSet.cards).toHaveLength(2);

    const listed = await requestJson('/api/children/mira/flash-card-sections', env, { cookie: childCookie });
    expect(listed.response.status).toBe(200);
    expect(listed.body.practiceSets).toEqual([
      expect.objectContaining({ id: created.body.practiceSet.id, title: 'Science Words' }),
    ]);

    const updated = await requestJson(
      `/api/children/mira/flash-card-sections/${created.body.practiceSet.id}`,
      env,
      {
        method: 'PATCH',
        cookie: childCookie,
        body: {
          title: 'Space Science',
          cards: [{ term: 'orbit', definition: 'a path around another object' }],
        },
      },
    );
    expect(updated.response.status).toBe(200);
    expect(updated.body.practiceSet).toMatchObject({ title: 'Space Science', status: 'active' });
    expect(updated.body.practiceSet.cards).toHaveLength(1);

    const archived = await requestJson(
      `/api/children/mira/flash-card-sections/${created.body.practiceSet.id}`,
      env,
      { method: 'PATCH', cookie: childCookie, body: { status: 'archived' } },
    );
    expect(archived.response.status).toBe(200);
    expect(archived.body.practiceSet.status).toBe('archived');
    expect(archived.body.practiceSet.archivedAt).toEqual(expect.any(String));

    const restored = await requestJson(
      `/api/children/mira/flash-card-sections/${created.body.practiceSet.id}`,
      env,
      { method: 'PATCH', cookie: childCookie, body: { status: 'active' } },
    );
    expect(restored.response.status).toBe(200);
    expect(restored.body.practiceSet).toMatchObject({ status: 'active', archivedAt: null });
  });

  it('requires the matching child mode instead of parent mode or another child profile', async () => {
    const { env, sqlite } = createEnv();
    insertChild(sqlite.db, 'child_nico', 'nico', 3);
    const body = {
      title: 'Private Cards',
      cards: [{ term: 'front', definition: 'back' }],
    };

    const parentMode = await requestJson('/api/children/mira/flash-card-sections', env, {
      method: 'POST',
      body,
    });
    expect(parentMode.response.status).toBe(403);
    expect(parentMode.body).toEqual({ error: 'child_locked' });

    const wrongChildMode = await requestJson('/api/children/mira/flash-card-sections', env, {
      method: 'POST',
      cookie: `${SESSION_COOKIE}=session_1; ${CHILD_COOKIE}=nico`,
      body,
    });
    expect(wrongChildMode.response.status).toBe(403);
    expect(wrongChildMode.body).toEqual({ error: 'child_locked' });

    const matchingChildMode = await requestJson('/api/children/mira/flash-card-sections', env, {
      method: 'POST',
      cookie: `${SESSION_COOKIE}=session_1; ${CHILD_COOKIE}=mira`,
      body,
    });
    expect(matchingChildMode.response.status).toBe(201);
  });
});

describe('worker protected page shells', () => {
  it('lets an authenticated parent preload the generated kid shells', async () => {
    const { env } = createEnv();

    for (const path of [
      '/kid/shell/',
      '/kid/track-shell/',
      '/kid/lesson-shell/',
      '/kid/facts-shell/',
      '/kid/flash-cards-shell/',
    ]) {
      await expect(getText(path, env)).resolves.toMatchObject({
        response: expect.objectContaining({ status: 200 }),
        body: `asset:${path}`,
      });
    }
  });

  it('serves generic kid app shells for a database child outside static fixtures', async () => {
    const { env, sqlite } = createEnv();
    insertChild(sqlite.db, 'child_luca', 'luca', 4);

    await expect(getText('/kid/luca/', env)).resolves.toMatchObject({
      response: expect.objectContaining({ status: 200 }),
      body: 'asset:/kid/shell/',
    });
    await expect(getText('/kid/luca/track/grade-4-science/', env)).resolves.toMatchObject({
      response: expect.objectContaining({ status: 200 }),
      body: 'asset:/kid/track-shell/',
    });
    await expect(getText('/kid/luca/lesson/temp_week_1/', env)).resolves.toMatchObject({
      response: expect.objectContaining({ status: 200 }),
      body: 'asset:/kid/lesson-shell/',
    });
    await expect(getText('/kid/luca/facts/', env)).resolves.toMatchObject({
      response: expect.objectContaining({ status: 200 }),
      body: 'asset:/kid/facts-shell/',
    });
    await expect(getText('/kid/luca/flash-cards/', env)).resolves.toMatchObject({
      response: expect.objectContaining({ status: 200 }),
      body: 'asset:/kid/flash-cards-shell/',
    });
  });

  it('redirects unknown child pages back to profiles', async () => {
    const { env } = createEnv();

    const { response } = await getText('/kid/not-a-child/lesson/lesson_1/', env);

    expect(response.status).toBe(303);
    expect(response.headers.get('Location')).toBe('https://learn.example.test/profiles/');
  });

  it('requires parent reauth when child mode opens a different child page', async () => {
    const { env } = createEnv();

    const { response } = await getText(
      '/kid/mira/track/grade-3-spanish/',
      env,
      `${SESSION_COOKIE}=session_1; ${CHILD_COOKIE}=nico`,
    );

    expect(response.status).toBe(303);
    expect(response.headers.get('Location')).toBe(
      'https://learn.example.test/parent-gate/?next=%2Fkid%2Fmira%2Ftrack%2Fgrade-3-spanish%2F',
    );
  });
});

describe('worker setup flow', () => {
  it('reports setup status without requiring authentication', async () => {
    const unconfigured = createEnv({ seed: false });
    const configured = createEnv();

    await expect(requestJson('/api/setup/status', unconfigured.env, { cookie: '' })).resolves.toMatchObject({
      response: expect.objectContaining({ status: 200 }),
      body: { configured: false, setupRequired: true, activeParentCount: 0 },
    });
    await expect(requestJson('/api/setup/status', configured.env, { cookie: '' })).resolves.toMatchObject({
      response: expect.objectContaining({ status: 200 }),
      body: { configured: true, setupRequired: false, activeParentCount: 1 },
    });
  });

  it('creates the first parent account and signs it in', async () => {
    const { env, sqlite } = createEnv({ seed: false });

    const { response, body } = await requestJson('/api/setup/parent', env, {
      method: 'POST',
      cookie: '',
      origin: 'https://learn.example.test',
      body: {
        username: 'Tara_Parent',
        email: 'tara@example.test',
        password: 'strong-blocks-password',
      },
    });

    expect(response.status).toBe(201);
    expect(body).toMatchObject({
      parent: { username: 'tara_parent', email: 'tara@example.test' },
      redirectTo: '/parent/',
    });
    expect(response.headers.get('Set-Cookie')).toContain(SESSION_COOKIE);
    expect(countRows(sqlite.db, "SELECT count(*) as total FROM parents WHERE status = 'active'")).toBe(1);
    expect(countRows(sqlite.db, 'SELECT count(*) as total FROM sessions')).toBe(1);

    const loginForm = new FormData();
    loginForm.set('identifier', 'tara_parent');
    loginForm.set('password', 'strong-blocks-password');
    const loginResponse = await worker.fetch(
      new Request('https://learn.example.test/login/', {
        method: 'POST',
        body: loginForm,
      }),
      env as unknown as Parameters<typeof worker.fetch>[1],
    );
    expect(loginResponse.status).toBe(303);
    expect(loginResponse.headers.get('Location')).toBe('https://learn.example.test/profiles/');
  });

  it('creates the first parent account without requiring email', async () => {
    const { env } = createEnv({ seed: false });

    const { response, body } = await requestJson('/api/setup/parent', env, {
      method: 'POST',
      cookie: '',
      body: {
        username: 'no_email_parent',
        password: 'strong-blocks-password',
      },
    });

    expect(response.status).toBe(201);
    expect(body.parent).toMatchObject({
      username: 'no_email_parent',
      email: null,
    });
  });

  it('blocks parent setup after an active parent exists', async () => {
    const { env, sqlite } = createEnv();

    const { response, body } = await requestJson('/api/setup/parent', env, {
      method: 'POST',
      cookie: '',
      body: {
        username: 'second_parent',
        password: 'another-strong-password',
      },
    });

    expect(response.status).toBe(409);
    expect(body).toEqual({ error: 'setup_complete' });
    expect(countRows(sqlite.db, "SELECT count(*) as total FROM parents WHERE status = 'active'")).toBe(1);
  });

  it('rejects setup creation from a different origin', async () => {
    const { env } = createEnv({ seed: false });

    const { response, body } = await requestJson('/api/setup/parent', env, {
      method: 'POST',
      cookie: '',
      origin: 'https://evil.example.test',
      body: {
        username: 'tara',
        password: 'strong-blocks-password',
      },
    });

    expect(response.status).toBe(403);
    expect(body).toEqual({ error: 'invalid_origin' });
  });

  it('routes an unconfigured install to setup', async () => {
    const { env } = createEnv({ seed: false });

    const rootResponse = await worker.fetch(
      new Request('https://learn.example.test/'),
      env as unknown as Parameters<typeof worker.fetch>[1],
    );
    const setupPage = await getText('/setup/', env, '');
    const loginPage = await getText('/login/', env, '');
    const parentPage = await getText('/parent/', env, '');

    expect(rootResponse.status).toBe(302);
    expect(rootResponse.headers.get('Location')).toBe('https://learn.example.test/setup/');
    expect(setupPage).toMatchObject({
      response: expect.objectContaining({ status: 200 }),
      body: 'asset:/setup/',
    });
    expect(loginPage.response.status).toBe(303);
    expect(loginPage.response.headers.get('Location')).toBe('https://learn.example.test/setup/');
    expect(parentPage.response.status).toBe(303);
    expect(parentPage.response.headers.get('Location')).toBe('https://learn.example.test/setup/');
  });

  it('routes configured installs away from setup', async () => {
    const { env } = createEnv();

    const loggedOut = await getText('/setup/', env, '');
    const loggedIn = await getText('/setup/', env);

    expect(loggedOut.response.status).toBe(303);
    expect(loggedOut.response.headers.get('Location')).toBe('https://learn.example.test/login/');
    expect(loggedIn.response.status).toBe(303);
    expect(loggedIn.response.headers.get('Location')).toBe('https://learn.example.test/profiles/');
  });
});

describe('worker access control', () => {
  it('serves the public homepage for logged-out root requests', async () => {
    const { env } = createEnv();

    const response = await worker.fetch(
      new Request('https://learn.example.test/'),
      env as unknown as Parameters<typeof worker.fetch>[1],
    );

    expect(response.status).toBe(200);
    expect(await response.text()).toBe('asset:/');
  });

  it('redirects signed-in root requests into the app', async () => {
    const { env } = createEnv();

    const response = await worker.fetch(
      new Request('https://learn.example.test/', {
        headers: { Cookie: `${SESSION_COOKIE}=session_1` },
      }),
      env as unknown as Parameters<typeof worker.fetch>[1],
    );

    expect(response.status).toBe(302);
    expect(response.headers.get('Location')).toBe('https://learn.example.test/profiles/');
  });

  it('does not force HTTPS redirects for local Wrangler hosts', async () => {
    const { env } = createEnv();

    const response = await worker.fetch(
      new Request('http://buddyblocks.net/login/', {
        headers: {
          Host: 'buddyblocks.net',
          'CF-Connecting-IP': '::1',
        },
      }),
      env as unknown as Parameters<typeof worker.fetch>[1],
    );

    expect(response.status).toBe(200);
    expect(await response.text()).toBe('asset:/login/');
  });

  it('redirects production HTTP requests to HTTPS', async () => {
    const { env } = createEnv();

    const response = await worker.fetch(
      new Request('http://buddyblocks.net/login/', {
        headers: {
          Host: 'buddyblocks.net',
          'CF-Connecting-IP': '203.0.113.10',
        },
      }),
      env as unknown as Parameters<typeof worker.fetch>[1],
    );

    expect(response.status).toBe(308);
    expect(response.headers.get('Location')).toBe('https://buddyblocks.net/login/');
  });

  it('returns 401 for unauthenticated API requests', async () => {
    const { env } = createEnv();

    const { response, body } = await requestJson('/api/me', env, { cookie: '' });

    expect(response.status).toBe(401);
    expect(body).toEqual({ error: 'not_authenticated' });
  });

  it('redirects parent pages to the parent gate while child mode is active', async () => {
    const { env } = createEnv();

    const { response } = await getText('/parent/', env, `${SESSION_COOKIE}=session_1; ${CHILD_COOKIE}=mira`);

    expect(response.status).toBe(303);
    expect(response.headers.get('Location')).toBe('https://learn.example.test/parent-gate/?next=%2Fparent%2F');
  });

  it('requires parent reauth for parent APIs while child mode is active', async () => {
    const { env } = createEnv();

    const { response, body } = await requestJson('/api/parent/dashboard', env, {
      cookie: `${SESSION_COOKIE}=session_1; ${CHILD_COOKIE}=mira`,
    });

    expect(response.status).toBe(403);
    expect(body).toEqual({ error: 'parent_reauth_required' });
  });

  it('blocks child mode from reading another child API', async () => {
    const { env, sqlite } = createEnv();
    insertChild(sqlite.db, 'child_nico', 'nico', 3);

    const { response, body } = await requestJson('/api/children/nico/home', env, {
      cookie: `${SESSION_COOKIE}=session_1; ${CHILD_COOKIE}=mira`,
    });

    expect(response.status).toBe(403);
    expect(body).toEqual({ error: 'child_locked' });
  });

  it('rejects mutating APIs from a different origin', async () => {
    const { env } = createEnv();

    const { response, body } = await requestJson('/api/parent/children/mira/practice-sets', env, {
      method: 'PATCH',
      origin: 'https://evil.example.test',
      body: { title: 'Blocked', cards: [{ term: 'blocked', definition: 'not allowed' }] },
    });

    expect(response.status).toBe(403);
    expect(body).toEqual({ error: 'invalid_origin' });
  });
});

describe('multiplication facts APIs', () => {
  it('is available to a child in any grade with an empty progress summary', async () => {
    const { env, sqlite } = createEnv();
    insertChild(sqlite.db, 'child_first', 'first', 1);
    insertChild(sqlite.db, 'child_twelfth', 'twelfth', 12);

    for (const slug of ['first', 'twelfth']) {
      const { response, body } = await getJson(`/api/children/${slug}/multiplication`, env);
      expect(response.status).toBe(200);
      expect(body).toMatchObject({
        child: { slug },
        summary: {
          sessionsCompleted: 0,
          factsCorrect: 0,
          factsAttempted: 0,
          fluentFacts: 0,
        },
        mastery: [],
        recentSessions: [],
      });
    }
  });

  it('scores, persists, summarizes, and deduplicates a practice session', async () => {
    const { env, sqlite } = createEnv();
    const payload = {
      clientAttemptId: 'multiplication_client_1',
      mode: 'practice',
      selectedFactors: [6, 2],
      durationSeconds: null,
      inputMethod: 'keyboard',
      startedAt: '2026-06-29T12:10:00.000Z',
      attempts: Array.from({ length: 10 }, (_, index) => ({
        factor: index % 2 === 0 ? 6 : 2,
        multiplier: (index % 5) + 1,
        answer: index === 9 ? 999 : (index % 2 === 0 ? 6 : 2) * ((index % 5) + 1),
        responseMs: 2_000 + index,
        inputMethod: 'keyboard' as const,
        attemptedAt: `2026-06-29T12:10:${String(index).padStart(2, '0')}.000Z`,
      })),
    };

    const first = await requestJson('/api/children/mira/multiplication/sessions', env, {
      method: 'POST',
      body: payload,
    });
    const duplicate = await requestJson('/api/children/mira/multiplication/sessions', env, {
      method: 'POST',
      body: payload,
    });

    expect(first.response.status).toBe(201);
    expect(first.body.result).toMatchObject({
      scoreCorrect: 9,
      scoreTotal: 10,
      accuracy: 90,
      xpAwarded: 11,
      isNewPersonalBest: false,
      summary: { sessionsCompleted: 1, factsCorrect: 9, factsAttempted: 10, xpTotal: 11 },
    });
    expect(duplicate.response.status).toBe(200);
    expect(duplicate.body.result.session.id).toBe(first.body.result.session.id);
    expect(countRows(sqlite.db, 'SELECT count(*) as total FROM multiplication_sessions')).toBe(1);
    expect(countRows(sqlite.db, 'SELECT count(*) as total FROM multiplication_fact_attempts')).toBe(10);
    expect(countRows(sqlite.db, 'SELECT count(*) as total FROM child_multiplication_mastery')).toBe(10);
    expect(sqlite.db.prepare('SELECT practice_sessions_completed, xp_earned FROM child_daily_activity').get()).toEqual({
      practice_sessions_completed: 1,
      xp_earned: 11,
    });

    const home = await getJson('/api/children/mira/home', env);
    expect(home.body.stats.xpTotal).toBe(26);
    expect(home.body.multiplication).toMatchObject({ sessionsCompleted: 1, xpTotal: 11 });

    const dashboard = await getJson('/api/parent/dashboard', env);
    expect(dashboard.body.children[0].multiplication).toMatchObject({
      sessionsCompleted: 1,
      factsCorrect: 9,
      factsAttempted: 10,
      xpTotal: 11,
      mastery: expect.arrayContaining([
        expect.objectContaining({ factor: 6, multiplier: 1, attempts: 1, correct: 1, level: 'learning' }),
      ]),
    });
  });

  it('keeps timed records separate by duration and input method', async () => {
    const { env } = createEnv();
    const submit = (clientAttemptId: string, durationSeconds: 60 | 120, inputMethod: 'keyboard' | 'voice') =>
      requestJson('/api/children/mira/multiplication/sessions', env, {
        method: 'POST',
        body: {
          clientAttemptId,
          mode: 'timed',
          selectedFactors: [3],
          durationSeconds,
          inputMethod,
          startedAt: '2026-06-29T12:10:00.000Z',
          attempts: [
            { factor: 3, multiplier: 4, answer: 12, inputMethod, responseMs: 2_000 },
          ],
        },
      });

    expect((await submit('timed_keyboard_60_1', 60, 'keyboard')).body.result.isNewPersonalBest).toBe(true);
    expect((await submit('timed_keyboard_60_2', 60, 'keyboard')).body.result.isNewPersonalBest).toBe(false);
    expect((await submit('timed_voice_60_1', 60, 'voice')).body.result.isNewPersonalBest).toBe(true);
    expect((await submit('timed_keyboard_120_1', 120, 'keyboard')).body.result.isNewPersonalBest).toBe(true);
  });

  it('rejects attempts outside the selected tables', async () => {
    const { env, sqlite } = createEnv();
    const { response, body } = await requestJson('/api/children/mira/multiplication/sessions', env, {
      method: 'POST',
      body: {
        clientAttemptId: 'invalid_selection',
        mode: 'practice',
        selectedFactors: [6],
        durationSeconds: null,
        inputMethod: 'keyboard',
        startedAt: '2026-06-29T12:10:00.000Z',
        attempts: [{ factor: 7, multiplier: 4, answer: 28, inputMethod: 'keyboard' }],
      },
    });

    expect(response.status).toBe(400);
    expect(body).toEqual({ error: 'invalid_multiplication_session_payload' });
    expect(countRows(sqlite.db, 'SELECT count(*) as total FROM multiplication_sessions')).toBe(0);
  });
});

describe('hosted interest API', () => {
  it('stores hosted interest email submissions without authentication', async () => {
    const { env, sqlite } = createEnv();

    const { response, body } = await requestJson('/api/hosted-interest', env, {
      method: 'POST',
      cookie: '',
      origin: 'https://learn.example.test',
      body: { email: 'Tara@Example.TEST ', source: 'homepage' },
    });

    expect(response.status).toBe(200);
    expect(body).toMatchObject({ ok: true });
    expect(sqlite.db.prepare('SELECT email, source FROM hosted_interest_emails').get()).toEqual({
      email: 'tara@example.test',
      source: 'homepage',
    });
  });

  it('dedupes hosted interest submissions by email', async () => {
    const { env, sqlite } = createEnv();

    await requestJson('/api/hosted-interest', env, {
      method: 'POST',
      cookie: '',
      body: { email: 'tara@example.test' },
    });
    const { response } = await requestJson('/api/hosted-interest', env, {
      method: 'POST',
      cookie: '',
      body: { email: 'TARA@example.test' },
    });

    expect(response.status).toBe(200);
    expect(countRows(sqlite.db, 'SELECT count(*) as total FROM hosted_interest_emails')).toBe(1);
  });

  it('rejects invalid hosted interest submissions', async () => {
    const { env, sqlite } = createEnv();

    const { response, body } = await requestJson('/api/hosted-interest', env, {
      method: 'POST',
      cookie: '',
      body: { email: 'not-an-email' },
    });

    expect(response.status).toBe(400);
    expect(body).toEqual({ error: 'invalid_email' });
    expect(countRows(sqlite.db, 'SELECT count(*) as total FROM hosted_interest_emails')).toBe(0);
  });

  it('rejects hosted interest submissions from a different origin', async () => {
    const { env } = createEnv();

    const { response, body } = await requestJson('/api/hosted-interest', env, {
      method: 'POST',
      cookie: '',
      origin: 'https://evil.example.test',
      body: { email: 'tara@example.test' },
    });

    expect(response.status).toBe(403);
    expect(body).toEqual({ error: 'invalid_origin' });
  });
});

describe('child profile status migration', () => {
  it('adds active status as the default child profile state', () => {
    const db = createTestDatabase();
    const statusColumn = db
      .prepare('PRAGMA table_info(child_profiles)')
      .all()
      .find((column) => String((column as { name: unknown }).name) === 'status') as { dflt_value: string } | undefined;

    expect(statusColumn?.dflt_value).toBe("'active'");
  });
});

describe('ESP32-P4 device APIs', () => {
  it('pairs once, scopes content/activity, preserves idempotency, and enforces revocation', async () => {
    const { env, sqlite } = createEnv();
    const deviceId = '018f6f5e-2f16-7f4a-9b42-77c85dc85e10';
    const deviceToken = 'bbdev_v1_test_device_token_0123456789abcdefghijklmnopqrstuvwxyz';
    const pollSecret = 'bbpoll_v1_test_poll_secret_0123456789abcdefghijklmnopqrstuvwxyz';
    const pairing = await requestJson('/api/device/v1/pairings', env, {
      method: 'POST',
      cookie: '',
      body: {
        deviceId,
        tokenHash: await sha256Hex(deviceToken),
        pollSecretHash: await sha256Hex(pollSecret),
        hardwareModel: 'waveshare-esp32-p4-wifi6-touch-lcd-4.3',
        hardwareRevision: 'rev3',
        firmwareVersion: '0.1.0',
        apiVersion: 1,
      },
    });
    expect(pairing.response.status).toBe(201);
    expect(pairing.body.code).toMatch(/^[0-9A-HJKMNP-TV-Z]{8}$/);

    const childModeClaim = await requestJson('/api/parent/devices/pair', env, {
      method: 'POST',
      cookie: `${SESSION_COOKIE}=session_1; ${CHILD_COOKIE}=mira`,
      body: { code: pairing.body.code, childId: 'child_mira', name: 'Kitchen Buddy' },
    });
    expect(childModeClaim.response.status).toBe(403);
    expect(childModeClaim.body.error).toBe('parent_reauth_required');

    const claimed = await requestJson('/api/parent/devices/pair', env, {
      method: 'POST',
      body: { code: pairing.body.code, childId: 'child_mira', name: 'Kitchen Buddy' },
    });
    expect(claimed.response.status).toBe(201);
    const secondClaim = await requestJson('/api/parent/devices/pair', env, {
      method: 'POST',
      body: { code: pairing.body.code, childId: 'child_mira', name: 'Duplicate' },
    });
    expect(secondClaim.response.status).toBe(409);

    const poll = await requestJson(`/api/device/v1/pairings/${pairing.body.pairingId}`, env, {
      cookie: '',
      requestHeaders: { Authorization: `Pairing ${pollSecret}` },
    });
    expect(poll.body).toMatchObject({
      status: 'claimed',
      deviceId,
      device: { id: deviceId, name: 'Kitchen Buddy' },
      child: { id: 'child_mira', slug: 'mira' },
    });

    const childCookie = `${SESSION_COOKIE}=session_1; ${CHILD_COOKIE}=mira`;
    const section = await requestJson('/api/children/mira/flash-card-sections', env, {
      method: 'POST',
      cookie: childCookie,
      body: {
        title: 'Board words',
        subject: 'vocabulary',
        source: 'Friday quiz',
        status: 'active',
        pinned: true,
        cards: [{ term: 'vast', definition: 'very large', example: 'A vast desert.' }],
      },
    });
    expect(section.response.status).toBe(201);

    const authenticationHeaders = {
      Authorization: `Bearer ${deviceToken}`,
      'X-Buddy-Blocks-Device-ID': deviceId,
      'X-Buddy-Blocks-Firmware': '0.1.0',
    };
    const bootstrap = await requestJson('/api/device/v1/bootstrap', env, {
      cookie: '',
      requestHeaders: authenticationHeaders,
    });
    expect(bootstrap.response.status).toBe(200);
    expect(bootstrap.body).toMatchObject({
      device: { id: deviceId, name: 'Kitchen Buddy' },
      child: { id: 'child_mira', slug: 'mira', displayName: 'Mira' },
      content: { flashCardsRevision: 1 },
      multiplication: { fluentFacts: 0, xpTotal: 0, best60Seconds: 0, best120Seconds: 0 },
    });
    expect(bootstrap.response.headers.get('Cache-Control')).toBe('private, no-store');

    Object.assign(env, {
      FIRMWARE_MANIFEST_REV3: JSON.stringify({
        schemaVersion: 1,
        hardwareProfile: 'waveshare-p4-lcd43-rev3',
        version: '1.2.0',
        minimumVersion: '1.0.0',
        url: 'https://releases.example.test/buddy-blocks-rev3-v1.2.0.bin',
        sha256: 'a'.repeat(64),
        size: 1_958_528,
        releaseNotes: 'Test release',
        mandatory: false,
      }),
    });
    const firmware = await requestJson('/api/device/v1/firmware', env, {
      cookie: '', requestHeaders: authenticationHeaders,
    });
    expect(firmware.response.status).toBe(200);
    expect(firmware.body).toMatchObject({
      hardwareProfile: 'waveshare-p4-lcd43-rev3',
      version: '1.2.0',
      minimumVersion: '1.0.0',
      updateAvailable: true,
      mandatory: true,
    });
    const currentFirmware = await requestJson('/api/device/v1/firmware', env, {
      cookie: '',
      requestHeaders: { ...authenticationHeaders, 'X-Buddy-Blocks-Firmware': '1.2.0' },
    });
    expect(currentFirmware.body).toMatchObject({ updateAvailable: false, mandatory: false });
    const invalidFirmwareHeader = await requestJson('/api/device/v1/firmware', env, {
      cookie: '',
      requestHeaders: { ...authenticationHeaders, 'X-Buddy-Blocks-Firmware': 'not-semver' },
    });
    expect(invalidFirmwareHeader.response.status).toBe(401);

    const requiredUpdate = await requestJson('/api/device/v1/flash-card-sections', env, {
      cookie: '', requestHeaders: authenticationHeaders,
    });
    expect(requiredUpdate.response.status).toBe(426);
    expect(requiredUpdate.body.error).toBe('firmware_update_required');
    authenticationHeaders['X-Buddy-Blocks-Firmware'] = '1.2.0';

    const snapshot = await requestJson('/api/device/v1/flash-card-sections', env, {
      cookie: '',
      requestHeaders: authenticationHeaders,
    });
    expect(snapshot.body.sections[0]).toMatchObject({
      title: 'Board words',
      pinned: true,
      cards: [{ front: 'vast', back: 'very large', clue: 'A vast desert.' }],
    });
    const etag = snapshot.response.headers.get('ETag');
    const notModified = await requestRaw(
      '/api/device/v1/flash-card-sections',
      env,
      { ...authenticationHeaders, 'If-None-Match': etag! },
    );
    expect(notModified.status).toBe(304);

    const oversizedSection = sqlite.db.prepare(
      `INSERT INTO practice_sets
       (id, child_profile_id, subject, title, source, status, pinned, starts_at,
        expires_at, archived_at, created_at, updated_at)
       VALUES (?, 'child_mira', 'vocabulary', ?, 'oversized-device-fixture',
        'active', 0, NULL, NULL, NULL, ?, ?)`,
    );
    const oversizedCard = sqlite.db.prepare(
      `INSERT INTO practice_set_cards
       (id, practice_set_id, term, definition, example, accepted_answers_json, sort_order)
       VALUES (?, ?, ?, ?, ?, '[]', ?)`,
    );
    const oversizedTimestamp = new Date().toISOString();
    for (let sectionIndex = 0; sectionIndex < 6; sectionIndex += 1) {
      const sectionId = `oversized_section_${sectionIndex}`;
      oversizedSection.run(
        sectionId,
        `Oversized section ${sectionIndex}`,
        oversizedTimestamp,
        oversizedTimestamp,
      );
      for (let cardIndex = 0; cardIndex < 100; cardIndex += 1) {
        oversizedCard.run(
          `oversized_card_${sectionIndex}_${cardIndex}`,
          sectionId,
          'f'.repeat(500),
          'b'.repeat(800),
          'c'.repeat(800),
          cardIndex,
        );
      }
    }
    sqlite.db.prepare(
      `UPDATE child_content_revisions
       SET flash_cards_revision = flash_cards_revision + 1
       WHERE child_profile_id = 'child_mira'`,
    ).run();
    const oversizedSnapshot = await requestJson('/api/device/v1/flash-card-sections', env, {
      cookie: '',
      requestHeaders: authenticationHeaders,
    });
    expect(oversizedSnapshot.response.status).toBe(413);
    expect(oversizedSnapshot.body).toEqual({ error: 'device_content_too_large' });
    sqlite.db.prepare(
      `DELETE FROM practice_sets
       WHERE child_profile_id = 'child_mira' AND source = 'oversized-device-fixture'`,
    ).run();
    sqlite.db.prepare(
      `UPDATE child_content_revisions
       SET flash_cards_revision = flash_cards_revision + 1
       WHERE child_profile_id = 'child_mira'`,
    ).run();

    const multiplicationBody = {
      clientAttemptId: 'esp32p4_85e10_01JDEVICEATTEMPT000000001',
      mode: 'practice',
      selectedFactors: [7],
      durationSeconds: null,
      inputMethod: 'keyboard',
      startedAt: '1970-01-01T00:00:00.000Z',
      attempts: [{ factor: 7, multiplier: 8, answer: 56, responseMs: 2400, inputMethod: 'keyboard' }],
    };
    const submitted = await requestJson('/api/device/v1/multiplication/sessions', env, {
      method: 'POST', cookie: '', requestHeaders: authenticationHeaders, body: multiplicationBody,
    });
    const duplicate = await requestJson('/api/device/v1/multiplication/sessions', env, {
      method: 'POST', cookie: '', requestHeaders: authenticationHeaders, body: multiplicationBody,
    });
    expect(submitted.response.status).toBe(201);
    expect(duplicate.response.status).toBe(200);
    expect(countRows(sqlite.db, 'SELECT count(*) AS total FROM multiplication_sessions')).toBe(1);
    const storedMultiplication = sqlite.db.prepare(
      'SELECT started_at, device_payload_hash FROM multiplication_sessions LIMIT 1',
    ).get() as { started_at: string; device_payload_hash: string };
    expect(storedMultiplication.started_at).not.toContain('1970-01-01');
    expect(storedMultiplication.device_payload_hash).toMatch(/^[a-f0-9]{64}$/);
    const multiplicationConflict = await requestJson('/api/device/v1/multiplication/sessions', env, {
      method: 'POST', cookie: '', requestHeaders: authenticationHeaders,
      body: { ...multiplicationBody, attempts: [{ ...multiplicationBody.attempts[0], answer: 54 }] },
    });
    expect(multiplicationConflict.response.status).toBe(409);
    expect(multiplicationConflict.body.error).toBe('client_attempt_conflict');

    const originalCardId = snapshot.body.sections[0].cards[0].id;
    await requestJson(`/api/children/mira/flash-card-sections/${section.body.practiceSet.id}`, env, {
      method: 'PATCH',
      cookie: childCookie,
      body: { cards: [{ term: 'orbit', definition: 'a path around an object' }] },
    });
    const studyBody = {
      clientAttemptId: 'esp32p4_85e10_01JFLASHSTUDY00000000001',
      practiceSetId: section.body.practiceSet.id,
      contentRevision: snapshot.body.revision,
      durationSeconds: 45,
      uniqueCards: 1,
      firstPassGotIt: 0,
      totalReviews: 2,
      reviews: [{
        cardId: originalCardId,
        cardFingerprint: '0'.repeat(64),
        rating: 'again',
        shownCount: 2,
        responseMs: 1200,
      }],
    };
    const studied = await requestJson('/api/device/v1/flash-card-sessions', env, {
      method: 'POST', cookie: '', requestHeaders: authenticationHeaders, body: studyBody,
    });
    const studiedAgain = await requestJson('/api/device/v1/flash-card-sessions', env, {
      method: 'POST', cookie: '', requestHeaders: authenticationHeaders, body: studyBody,
    });
    expect(studied.response.status).toBe(201);
    expect(studiedAgain.body.duplicate).toBe(true);
    const studyConflict = await requestJson('/api/device/v1/flash-card-sessions', env, {
      method: 'POST', cookie: '', requestHeaders: authenticationHeaders,
      body: { ...studyBody, durationSeconds: 46 },
    });
    expect(studyConflict.response.status).toBe(409);
    expect(studyConflict.body.error).toBe('client_attempt_conflict');
    expect(countRows(sqlite.db, 'SELECT count(*) AS total FROM flash_card_study_sessions')).toBe(1);
    expect(sqlite.db.prepare('SELECT practice_set_card_id FROM flash_card_study_reviews').get()).toMatchObject({
      practice_set_card_id: null,
    });
    const dashboardAfterStudy = await requestJson('/api/parent/dashboard', env);
    expect(dashboardAfterStudy.body.children[0].recentActivity).toEqual(
      expect.arrayContaining([expect.objectContaining({ activity_label: 'Studied 1 flash card' })]),
    );

    const listed = await requestJson('/api/parent/devices', env);
    expect(listed.body.devices).toEqual([
      expect.objectContaining({ id: deviceId, childDisplayName: 'Mira', status: 'active' }),
    ]);
    const revoked = await requestJson(`/api/parent/devices/${deviceId}`, env, {
      method: 'PATCH', body: { status: 'revoked' },
    });
    expect(revoked.body.device.status).toBe('revoked');
    const rejected = await requestJson('/api/device/v1/bootstrap', env, {
      cookie: '', requestHeaders: authenticationHeaders,
    });
    expect(rejected.response.status).toBe(403);
    expect(rejected.body.error).toBe('device_revoked');
  });

  it('rate limits repeated device bearer authentication failures by source', async () => {
    const { env, sqlite } = createEnv();
    let latest: Awaited<ReturnType<typeof requestJson>> | undefined;
    for (let attempt = 0; attempt < 21; attempt += 1) {
      latest = await requestJson('/api/device/v1/bootstrap', env, {
        cookie: '',
        requestHeaders: {
          Authorization: 'Bearer bbdev_v1_invalid_token',
          'X-Buddy-Blocks-Device-ID': '018f6f5e-2f16-7f4a-9b42-77c85dc85e10',
          'X-Buddy-Blocks-Firmware': '0.1.0',
          'CF-Connecting-IP': '192.0.2.55',
        },
      });
    }
    expect(latest?.response.status).toBe(429);
    expect(latest?.response.headers.get('Retry-After')).toBe('600');
    expect(latest?.body).toEqual({ error: 'rate_limited', retryAfterSeconds: 600 });
    expect(sqlite.db.prepare(
      'SELECT attempt_count FROM device_auth_failure_limits',
    ).get()).toMatchObject({ attempt_count: 21 });
  });
});

describe('performance index migration', () => {
  it('adds the lookup indexes used by batched reads', () => {
    const db = createTestDatabase();
    const indexesFor = (table: string) =>
      new Set(db.prepare(`PRAGMA index_list(${table})`).all().map((row) => String((row as { name: unknown }).name)));
    const tables = new Set(
      db
        .prepare("SELECT name FROM sqlite_master WHERE type = 'table'")
        .all()
        .map((row) => String((row as { name: unknown }).name)),
    );

    expect(indexesFor('tracks').has('idx_tracks_grade_subject_sort')).toBe(true);
    expect(indexesFor('tracks').has('idx_tracks_subject_grade')).toBe(true);
    expect(indexesFor('lessons').has('idx_lessons_unit_sort')).toBe(true);
    expect(indexesFor('child_lesson_progress').has('idx_child_lesson_progress_child_lesson')).toBe(true);
    expect(indexesFor('child_track_progress').has('idx_child_track_progress_child_track')).toBe(true);
    expect(tables.has('practice_sets')).toBe(true);
    expect(tables.has('practice_set_cards')).toBe(true);
    expect(tables.has('practice_set_attempts')).toBe(true);
    expect(tables.has('practice_card_attempts')).toBe(true);
    expect(tables.has('hosted_interest_emails')).toBe(true);
    expect(tables.has('multiplication_sessions')).toBe(true);
    expect(tables.has('multiplication_fact_attempts')).toBe(true);
    expect(tables.has('child_multiplication_mastery')).toBe(true);
    expect(tables.has('device_pairings')).toBe(true);
    expect(tables.has('child_devices')).toBe(true);
    expect(tables.has('device_auth_failure_limits')).toBe(true);
    expect(tables.has('child_content_revisions')).toBe(true);
    expect(tables.has('flash_card_study_sessions')).toBe(true);
    expect(tables.has('flash_card_study_reviews')).toBe(true);
    expect(indexesFor('practice_sets').has('idx_practice_sets_child_status')).toBe(true);
    expect(indexesFor('practice_set_cards').has('idx_practice_set_cards_set_sort')).toBe(true);
    expect(indexesFor('practice_set_attempts').has('idx_practice_set_attempts_child_set')).toBe(true);
    expect(indexesFor('lesson_attempts').has('idx_lesson_attempts_child_client_attempt')).toBe(true);
    expect(indexesFor('practice_set_attempts').has('idx_practice_set_attempts_child_client_attempt')).toBe(true);
    expect(indexesFor('hosted_interest_emails').has('idx_hosted_interest_emails_created_at')).toBe(true);
    expect(indexesFor('multiplication_sessions').has('idx_multiplication_sessions_child_completed')).toBe(true);
    expect(indexesFor('multiplication_sessions').has('idx_multiplication_sessions_child_selection')).toBe(true);
    expect(indexesFor('child_devices').has('idx_child_devices_child_status')).toBe(true);
    expect(indexesFor('device_auth_failure_limits').has('idx_device_auth_failure_limits_last_attempt')).toBe(true);
    expect(indexesFor('flash_card_study_sessions').has('idx_flash_card_study_sessions_child_attempt')).toBe(true);
    expect(
      new Set(db.prepare('PRAGMA table_info(multiplication_sessions)').all()
        .map((row) => String((row as { name: unknown }).name))).has('device_payload_hash'),
    ).toBe(true);
    expect(
      new Set(db.prepare('PRAGMA table_info(questions)').all().map((row) => String((row as { name: unknown }).name))).has('hint'),
    ).toBe(true);
  });
});
