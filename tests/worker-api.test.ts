import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { describe, expect, it } from 'vitest';
import { SESSION_COOKIE } from '../src/lib/auth';
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
  db.prepare(
    'INSERT INTO child_subject_levels (id, child_profile_id, subject, grade_level, updated_at) VALUES (?, ?, ?, ?, ?)',
  ).run('subject_level_child_reagan_spanish', 'child_reagan', 'spanish', 3, now);

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
    title: 'Grade 3 Spanish',
    sortOrder: 2,
  });
  insertTrack(db, {
    id: 'track_g6_spanish',
    slug: 'grade-6-spanish',
    subject: 'spanish',
    gradeLevel: 6,
    title: 'Grade 6 Spanish',
    sortOrder: 3,
  });

  insertUnit(db, 'unit_2', 'track_g3_spanish', 'unit-two', 'Unit Two', 2);
  insertUnit(db, 'unit_1', 'track_g3_spanish', 'unit-one', 'Unit One', 1);

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

function createEnv() {
  const sqlite = new SqliteD1Database(createTestDatabase());
  seedTrackFixture(sqlite.db);

  return {
    sqlite,
    env: {
      DB: sqlite,
      TIME_ZONE: 'America/Chicago',
      ASSETS: { fetch: async () => new Response('asset not found', { status: 404 }) },
    },
  };
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
  });

  it('honors subject overrides when resolving child tracks', async () => {
    const { env } = createEnv();

    const visible = await getJson('/api/children/reagan/tracks/grade-3-spanish', env);
    const hidden = await getJson('/api/children/reagan/tracks/grade-6-spanish', env);

    expect(visible.response.status).toBe(200);
    expect(hidden.response.status).toBe(404);
    expect(hidden.body).toEqual({ error: 'track_not_found' });
  });
});

describe('performance index migration', () => {
  it('adds the lookup indexes used by batched reads', () => {
    const db = createTestDatabase();
    const indexesFor = (table: string) =>
      new Set(db.prepare(`PRAGMA index_list(${table})`).all().map((row) => String((row as { name: unknown }).name)));

    expect(indexesFor('tracks').has('idx_tracks_grade_subject_sort')).toBe(true);
    expect(indexesFor('tracks').has('idx_tracks_subject_grade')).toBe(true);
    expect(indexesFor('lessons').has('idx_lessons_unit_sort')).toBe(true);
    expect(indexesFor('child_lesson_progress').has('idx_child_lesson_progress_child_lesson')).toBe(true);
    expect(indexesFor('child_track_progress').has('idx_child_track_progress_child_track')).toBe(true);
    expect(indexesFor('child_subject_levels').has('idx_child_subject_levels_child_subject')).toBe(true);
  });
});
