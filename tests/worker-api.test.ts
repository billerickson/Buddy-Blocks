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
  ).run('parent_1', 'bill', 'bill@example.test', 'hash', 'salt', now, now);
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
  ).run('child_reagan', 'parent_1', 'reagan', 'Reagan', 'berry-builder', 'Grade 6', 6, 5, now, now);
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
  });
  insertQuestion(db, 'question_lesson_g4_1', 'lesson_g4_1', 'Type hola.', {
    acceptedAnswers: ['hola'],
    answerType: 'text',
  });

  db.prepare(
    `INSERT INTO child_track_progress
     (id, child_profile_id, track_id, current_unit_id, current_lesson_id, lessons_completed, xp_total, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
  ).run('track_progress_child_reagan_track_g3_spanish', 'child_reagan', 'track_g3_spanish', 'unit_1', 'lesson_2', 1, 15, now);
  db.prepare(
    `INSERT INTO child_lesson_progress
     (id, child_profile_id, lesson_id, status, completed_at, best_score_correct, best_score_total)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
  ).run('lesson_progress_child_reagan_lesson_1', 'child_reagan', 'lesson_1', 'completed', '2026-06-28T10:00:00.000Z', 3, 3);
  db.prepare(
    `INSERT INTO child_lesson_progress
     (id, child_profile_id, lesson_id, status, completed_at, best_score_correct, best_score_total)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
  ).run('lesson_progress_child_reagan_lesson_2', 'child_reagan', 'lesson_2', 'available', null, 0, 0);
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

function insertQuestion(db: DatabaseSync, id: string, lessonId: string, prompt: string, payload: unknown) {
  db.prepare(
    `INSERT INTO questions
     (id, lesson_id, type, prompt, payload_json, explanation, sort_order)
     VALUES (?, ?, 'text-input', ?, ?, NULL, 1)`,
  ).run(id, lessonId, prompt, JSON.stringify(payload));
}

function createEnv() {
  const sqlite = new SqliteD1Database(createTestDatabase());
  seedTrackFixture(sqlite.db);

  return {
    sqlite,
    env: {
      DB: sqlite,
      TIME_ZONE: 'America/Chicago',
      ASSETS: { fetch: async (request: Request) => new Response(`asset:${new URL(request.url).pathname}`) },
    },
  };
}

function countRows(db: DatabaseSync, sql: string, ...bindings: unknown[]) {
  const row = db.prepare(sql).get(...(bindings as never[])) as { total: number } | undefined;
  return row?.total ?? 0;
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
  }: { method?: string; body?: unknown; cookie?: string; origin?: string } = {},
) {
  const headers = new Headers({ Cookie: cookie });
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

describe('worker track APIs', () => {
  it('returns the child track response shape with batched lesson progress in unit order', async () => {
    const { env, sqlite } = createEnv();

    const { response, body } = await getJson('/api/children/reagan/tracks/grade-3-spanish', env);

    expect(response.status).toBe(200);
    expect(body).toMatchObject({
      child: { slug: 'reagan', gradeLevel: 6 },
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
    expect(body.units[0].lessons[2].completedAt).toBeUndefined();

    expect(sqlite.queryLog.filter((sql) => sql.includes('LEFT JOIN child_lesson_progress'))).toHaveLength(1);
    expect(sqlite.queryLog.some((sql) => sql.includes('SELECT * FROM lessons WHERE unit_id = ?'))).toBe(false);
    expect(sqlite.queryLog.some((sql) => sql.includes('SELECT * FROM child_lesson_progress WHERE child_profile_id = ? AND lesson_id = ?'))).toBe(false);

    await expect(getJson('/api/children/reagan/tracks/grade-4-spanish', env)).resolves.toMatchObject({
      response: expect.objectContaining({ status: 404 }),
    });
  });

  it('uses child grade for scholastic tracks and starts foundation tracks at level 1', async () => {
    const { env } = createEnv();

    const visible = await getJson('/api/children/reagan/tracks/grade-3-spanish', env);
    const nextSequence = await getJson('/api/children/reagan/tracks/grade-4-spanish', env);
    const hidden = await getJson('/api/children/reagan/tracks/grade-6-spanish', env);

    expect(visible.response.status).toBe(200);
    expect(nextSequence.response.status).toBe(404);
    expect(nextSequence.body).toEqual({ error: 'track_not_found' });
    expect(hidden.response.status).toBe(404);
    expect(hidden.body).toEqual({ error: 'track_not_found' });
  });

  it('unlocks Spanish 2 after completing Spanish 1', async () => {
    const { env, sqlite } = createEnv();

    expect((await getJson('/api/children/reagan/tracks/grade-4-spanish', env)).response.status).toBe(404);

    sqlite.db
      .prepare(
        `UPDATE child_lesson_progress
         SET status = 'completed', completed_at = '2026-06-29T10:00:00.000Z', best_score_correct = 1, best_score_total = 1
         WHERE child_profile_id = ? AND lesson_id = ?`,
      )
      .run('child_reagan', 'lesson_2');
    for (const lessonId of ['lesson_3', 'lesson_4']) {
      sqlite.db
        .prepare(
          `INSERT INTO child_lesson_progress
           (id, child_profile_id, lesson_id, status, completed_at, best_score_correct, best_score_total)
           VALUES (?, ?, ?, 'completed', '2026-06-29T10:00:00.000Z', 1, 1)`,
        )
        .run(`lesson_progress_child_reagan_${lessonId}`, 'child_reagan', lessonId);
    }
    sqlite.db
      .prepare(
        `INSERT INTO child_lesson_progress
         (id, child_profile_id, lesson_id, status, completed_at, best_score_correct, best_score_total)
         VALUES (?, ?, ?, 'available', NULL, 0, 0)`,
      )
      .run('lesson_progress_child_reagan_lesson_5', 'child_reagan', 'lesson_5');
    sqlite.db
      .prepare(
        `UPDATE child_track_progress
         SET current_unit_id = ?, current_lesson_id = ?, lessons_completed = ?
         WHERE child_profile_id = ? AND track_id = ?`,
      )
      .run('unit_2', 'lesson_5', 4, 'child_reagan', 'track_g3_spanish');

    const completion = await requestJson('/api/children/reagan/lessons/lesson_5', env, {
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

    const grade4 = await getJson('/api/children/reagan/tracks/grade-4-spanish', env);
    expect(grade4.response.status).toBe(200);
    expect(grade4.body.progress.currentLesson).toMatchObject({
      id: 'lesson_g4_1',
      trackSlug: 'grade-4-spanish',
    });
    expect(grade4.body.units[0].lessons[0]).toMatchObject({
      id: 'lesson_g4_1',
      status: 'available',
    });

    const home = await getJson('/api/children/reagan/home', env);
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

  it('deduplicates standard lesson retries by client attempt id', async () => {
    const { env, sqlite } = createEnv();
    sqlite.db
      .prepare(
        `INSERT INTO child_lesson_progress
         (id, child_profile_id, lesson_id, status, completed_at, best_score_correct, best_score_total)
         VALUES (?, ?, ?, 'available', NULL, 0, 0)`,
      )
      .run('lesson_progress_child_reagan_lesson_5', 'child_reagan', 'lesson_5');

    const payload = {
      clientAttemptId: 'offline_standard_attempt_1',
      startedAt: '2026-06-29T12:05:00.000Z',
      attempts: [{ questionId: 'question_lesson_5', answer: 'si' }],
    };

    const first = await requestJson('/api/children/reagan/lessons/lesson_5', env, {
      method: 'POST',
      body: payload,
    });
    const retry = await requestJson('/api/children/reagan/lessons/lesson_5', env, {
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
        'child_reagan',
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
        'child_reagan',
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

    const first = await requestJson('/api/children/reagan/lessons/lesson_2', env, {
      method: 'POST',
      body: payload,
    });
    const retry = await requestJson('/api/children/reagan/lessons/lesson_2', env, {
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
        'child_reagan',
        payload.clientAttemptId,
      ),
    ).toBe(1);
    expect(countRows(sqlite.db, 'SELECT count(*) as total FROM child_daily_activity WHERE child_profile_id = ?', 'child_reagan')).toBe(1);
  });

  it('returns 410 for the removed subject-level override endpoint', async () => {
    const { env } = createEnv();

    const { response, body } = await requestJson('/api/parent/children/reagan/subject-levels', env, {
      method: 'PATCH',
      body: { subject: 'spanish', gradeLevel: 3 },
    });

    expect(response.status).toBe(410);
    expect(body).toEqual({ error: 'subject_levels_removed' });
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
        'child_reagan',
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
});

describe('worker practice set APIs', () => {
  it('creates, lists, updates, and archives child-scoped practice sets', async () => {
    const { env, sqlite } = createEnv();

    const created = await requestJson('/api/parent/children/reagan/practice-sets', env, {
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

    const listed = await requestJson('/api/parent/children/reagan/practice-sets', env);
    expect(listed.response.status).toBe(200);
    expect(listed.body.practiceSets.map((set: { id: string }) => set.id)).toEqual([created.body.practiceSet.id]);

    const updated = await requestJson(`/api/parent/children/reagan/practice-sets/${created.body.practiceSet.id}`, env, {
      method: 'PATCH',
      body: { title: 'Week 1 Vocabulary', pinned: false },
    });
    expect(updated.response.status).toBe(200);
    expect(updated.body.practiceSet).toMatchObject({
      title: 'Week 1 Vocabulary',
      pinned: false,
      archivedAt: null,
    });

    const archived = await requestJson(`/api/parent/children/reagan/practice-sets/${created.body.practiceSet.id}`, env, {
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

    const active = await requestJson('/api/parent/children/reagan/practice-sets', env, {
      method: 'POST',
      body: {
        title: 'Pinned School Words',
        pinned: true,
        expiresAt: '2099-01-05T00:00:00.000Z',
        cards: [{ term: 'scarce', definition: 'hard to find' }],
      },
    });
    await requestJson('/api/parent/children/reagan/practice-sets', env, {
      method: 'POST',
      body: {
        title: 'Expired Words',
        pinned: true,
        expiresAt: '2000-01-05T00:00:00.000Z',
        cards: [{ term: 'stale', definition: 'old' }],
      },
    });
    await requestJson('/api/parent/children/reagan/practice-sets', env, {
      method: 'POST',
      body: {
        title: 'Archived Words',
        status: 'archived',
        pinned: true,
        cards: [{ term: 'hidden', definition: 'not visible' }],
      },
    });

    const home = await getJson('/api/children/reagan/home', env);

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
    const created = await requestJson('/api/parent/children/reagan/practice-sets', env, {
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

    const lesson = await getJson(`/api/children/reagan/lessons/${lessonId}`, env);

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

    const completion = await requestJson(`/api/children/reagan/lessons/${lessonId}`, env, {
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

    const retry = await requestJson(`/api/children/reagan/lessons/${lessonId}`, env, {
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

    await requestJson(`/api/parent/children/reagan/practice-sets/${created.body.practiceSet.id}`, env, {
      method: 'PATCH',
      body: { status: 'archived' },
    });

    const archivedLesson = await getJson(`/api/children/reagan/lessons/${lessonId}`, env);
    expect(archivedLesson.response.status).toBe(404);
    expect(archivedLesson.body).toEqual({ error: 'lesson_not_found' });
    expect(countRows(sqlite.db, 'SELECT count(*) as total FROM practice_set_attempts')).toBe(1);
  });

  it('enforces child-mode scoping for practice set APIs and virtual lessons', async () => {
    const { env, sqlite } = createEnv();
    insertChild(sqlite.db, 'child_ada', 'ada', 3);
    const created = await requestJson('/api/parent/children/reagan/practice-sets', env, {
      method: 'POST',
      body: {
        title: 'Private Words',
        cards: [{ term: 'private', definition: 'for one student' }],
      },
    });

    const parentMutation = await requestJson('/api/parent/children/reagan/practice-sets', env, {
      method: 'POST',
      cookie: `${SESSION_COOKIE}=session_1; ${CHILD_COOKIE}=reagan`,
      body: {
        title: 'Blocked',
        cards: [{ term: 'blocked', definition: 'not allowed' }],
      },
    });
    expect(parentMutation.response.status).toBe(403);
    expect(parentMutation.body).toEqual({ error: 'parent_reauth_required' });

    const mismatchedChildMode = await requestJson(`/api/children/reagan/lessons/${created.body.practiceSet.lessonId}`, env, {
      cookie: `${SESSION_COOKIE}=session_1; ${CHILD_COOKIE}=ada`,
    });
    expect(mismatchedChildMode.response.status).toBe(403);
    expect(mismatchedChildMode.body).toEqual({ error: 'child_locked' });

    const wrongChild = await requestJson(`/api/children/ada/lessons/${created.body.practiceSet.lessonId}`, env, {
      cookie: `${SESSION_COOKIE}=session_1; ${CHILD_COOKIE}=ada`,
    });
    expect(wrongChild.response.status).toBe(404);
    expect(wrongChild.body).toEqual({ error: 'lesson_not_found' });
  });
});

describe('worker protected page shells', () => {
  it('serves generic kid app shells for a database child outside static fixtures', async () => {
    const { env, sqlite } = createEnv();
    insertChild(sqlite.db, 'child_mira', 'mira', 4);

    await expect(getText('/kid/mira/', env)).resolves.toMatchObject({
      response: expect.objectContaining({ status: 200 }),
      body: 'asset:/kid/shell/',
    });
    await expect(getText('/kid/mira/track/grade-4-science/', env)).resolves.toMatchObject({
      response: expect.objectContaining({ status: 200 }),
      body: 'asset:/kid/track-shell/',
    });
    await expect(getText('/kid/mira/lesson/temp_week_1/', env)).resolves.toMatchObject({
      response: expect.objectContaining({ status: 200 }),
      body: 'asset:/kid/lesson-shell/',
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
      '/kid/reagan/track/grade-3-spanish/',
      env,
      `${SESSION_COOKIE}=session_1; ${CHILD_COOKIE}=ada`,
    );

    expect(response.status).toBe(303);
    expect(response.headers.get('Location')).toBe(
      'https://learn.example.test/parent-gate/?next=%2Fkid%2Freagan%2Ftrack%2Fgrade-3-spanish%2F',
    );
  });
});

describe('worker access control', () => {
  it('does not force HTTPS redirects for local Wrangler hosts', async () => {
    const { env } = createEnv();

    const response = await worker.fetch(
      new Request('http://learn.billplustara.com/login/', {
        headers: {
          Host: 'learn.billplustara.com',
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
      new Request('http://learn.billplustara.com/login/', {
        headers: {
          Host: 'learn.billplustara.com',
          'CF-Connecting-IP': '203.0.113.10',
        },
      }),
      env as unknown as Parameters<typeof worker.fetch>[1],
    );

    expect(response.status).toBe(308);
    expect(response.headers.get('Location')).toBe('https://learn.billplustara.com/login/');
  });

  it('returns 401 for unauthenticated API requests', async () => {
    const { env } = createEnv();

    const { response, body } = await requestJson('/api/me', env, { cookie: '' });

    expect(response.status).toBe(401);
    expect(body).toEqual({ error: 'not_authenticated' });
  });

  it('redirects parent pages to the parent gate while child mode is active', async () => {
    const { env } = createEnv();

    const { response } = await getText('/parent/', env, `${SESSION_COOKIE}=session_1; ${CHILD_COOKIE}=reagan`);

    expect(response.status).toBe(303);
    expect(response.headers.get('Location')).toBe('https://learn.example.test/parent-gate/?next=%2Fparent%2F');
  });

  it('requires parent reauth for parent APIs while child mode is active', async () => {
    const { env } = createEnv();

    const { response, body } = await requestJson('/api/parent/dashboard', env, {
      cookie: `${SESSION_COOKIE}=session_1; ${CHILD_COOKIE}=reagan`,
    });

    expect(response.status).toBe(403);
    expect(body).toEqual({ error: 'parent_reauth_required' });
  });

  it('blocks child mode from reading another child API', async () => {
    const { env, sqlite } = createEnv();
    insertChild(sqlite.db, 'child_ada', 'ada', 3);

    const { response, body } = await requestJson('/api/children/ada/home', env, {
      cookie: `${SESSION_COOKIE}=session_1; ${CHILD_COOKIE}=reagan`,
    });

    expect(response.status).toBe(403);
    expect(body).toEqual({ error: 'child_locked' });
  });

  it('rejects mutating APIs from a different origin', async () => {
    const { env } = createEnv();

    const { response, body } = await requestJson('/api/parent/children/reagan/practice-sets', env, {
      method: 'PATCH',
      origin: 'https://evil.example.test',
      body: { title: 'Blocked', cards: [{ term: 'blocked', definition: 'not allowed' }] },
    });

    expect(response.status).toBe(403);
    expect(body).toEqual({ error: 'invalid_origin' });
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
    expect(indexesFor('child_subject_levels').has('idx_child_subject_levels_child_subject')).toBe(true);
    expect(tables.has('practice_sets')).toBe(true);
    expect(tables.has('practice_set_cards')).toBe(true);
    expect(tables.has('practice_set_attempts')).toBe(true);
    expect(tables.has('practice_card_attempts')).toBe(true);
    expect(indexesFor('practice_sets').has('idx_practice_sets_child_status')).toBe(true);
    expect(indexesFor('practice_set_cards').has('idx_practice_set_cards_set_sort')).toBe(true);
    expect(indexesFor('practice_set_attempts').has('idx_practice_set_attempts_child_set')).toBe(true);
    expect(indexesFor('lesson_attempts').has('idx_lesson_attempts_child_client_attempt')).toBe(true);
    expect(indexesFor('practice_set_attempts').has('idx_practice_set_attempts_child_client_attempt')).toBe(true);
  });
});
