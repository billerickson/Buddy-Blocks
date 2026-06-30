import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { describe, expect, it } from 'vitest';
import { completeLesson, type CompletionEnv, type CompletionLesson } from '../src/worker/lesson-completion';

class SqliteD1PreparedStatement {
  constructor(
    private readonly db: DatabaseSync,
    private readonly sql: string,
    private readonly bindings: unknown[] = [],
  ) {}

  bind(...values: unknown[]) {
    return new SqliteD1PreparedStatement(this.db, this.sql, values);
  }

  async first<T>() {
    return (this.db.prepare(this.sql).get(...(this.bindings as never[])) as T | undefined) ?? null;
  }

  async all<T>() {
    return {
      results: this.db.prepare(this.sql).all(...(this.bindings as never[])) as T[],
      success: true,
      meta: {},
    };
  }

  async run() {
    this.db.prepare(this.sql).run(...(this.bindings as never[]));
    return { success: true, meta: {} };
  }
}

class SqliteD1Database {
  constructor(readonly db: DatabaseSync) {}

  prepare(sql: string) {
    return new SqliteD1PreparedStatement(this.db, sql);
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

function createFixture() {
  const sqlite = new SqliteD1Database(createTestDatabase());
  const now = '2026-06-29T12:00:00.000Z';

  sqlite.db
    .prepare(
      `INSERT INTO parents
       (id, username, email, password_hash, password_salt, status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, 'active', ?, ?)`,
    )
    .run('parent_1', 'bill', 'bill@example.test', 'hash', 'salt', now, now);
  sqlite.db
    .prepare(
      `INSERT INTO child_profiles
       (id, parent_id, slug, display_name, avatar_key, level_band, hearts_remaining, created_at, updated_at, grade_level)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .run('child_1', 'parent_1', 'reagan', 'Reagan', 'berry-builder', 'Grade 6', 5, now, now, 6);
  sqlite.db
    .prepare(
      `INSERT INTO tracks
       (id, slug, title, description, color, accent, sort_order, subject, grade_level)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .run('track_math', 'grade-6-math', 'Grade 6 Math', 'Math practice', 'bg-blue-500', 'text-blue-900', 1, 'math', 6);
  sqlite.db
    .prepare('INSERT INTO units (id, track_id, slug, title, description, sort_order) VALUES (?, ?, ?, ?, ?, ?)')
    .run('unit_1', 'track_math', 'unit-one', 'Unit One', 'First unit', 1);
  sqlite.db
    .prepare(
      `INSERT INTO lessons
       (id, unit_id, slug, title, sort_order, xp_base, kind, config_json)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .run('lesson_1', 'unit_1', 'lesson-one', 'Lesson One', 1, 10, 'standard', null);
  sqlite.db
    .prepare(
      `INSERT INTO lessons
       (id, unit_id, slug, title, sort_order, xp_base, kind, config_json)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .run('lesson_2', 'unit_1', 'lesson-two', 'Lesson Two', 2, 10, 'standard', null);
  sqlite.db
    .prepare(
      `INSERT INTO questions
       (id, lesson_id, type, prompt, payload_json, explanation, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
    )
    .run('question_1', 'lesson_1', 'text-input', 'What is 2 + 2?', '{"acceptedAnswers":["4"]}', null, 1);

  const env: CompletionEnv = {
    DB: sqlite as unknown as D1Database,
    TIME_ZONE: 'America/Chicago',
  };
  const child = { id: 'child_1' };
  const lesson: CompletionLesson = {
    id: 'lesson_1',
    unit_id: 'unit_1',
    slug: 'lesson-one',
    title: 'Lesson One',
    track_id: 'track_math',
    track_slug: 'grade-6-math',
    track_subject: 'math',
    track_grade_level: 6,
    track_title: 'Grade 6 Math',
    unit_title: 'Unit One',
    unit_slug: 'unit-one',
  };

  return { sqlite, env, child, lesson };
}

function row<T>(db: DatabaseSync, sql: string, ...bindings: unknown[]) {
  const result = db.prepare(sql).get(...(bindings as never[])) as T | undefined;
  if (!result) throw new Error(`Missing row for ${sql}`);
  return result;
}

function count(db: DatabaseSync, sql: string, ...bindings: unknown[]) {
  return row<{ total: number }>(db, sql, ...bindings).total;
}

describe('completeLesson', () => {
  it('keeps repeat standard completion behavior in one shared service', async () => {
    const { sqlite, env, child, lesson } = createFixture();
    const firstCompletedAt = '2026-06-28T10:00:00.000Z';
    sqlite.db
      .prepare(
        `INSERT INTO child_lesson_progress
         (id, child_profile_id, lesson_id, status, completed_at, best_score_correct, best_score_total)
         VALUES (?, ?, ?, 'completed', ?, ?, ?)`,
      )
      .run('lesson_progress_child_1_lesson_1', child.id, lesson.id, firstCompletedAt, 3, 5);
    sqlite.db
      .prepare(
        `INSERT INTO child_track_progress
         (id, child_profile_id, track_id, current_unit_id, current_lesson_id, lessons_completed, xp_total, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .run('track_progress_child_1_track_math', child.id, lesson.track_id, lesson.unit_id, lesson.id, 1, 20, firstCompletedAt);

    const repeat = await completeLesson({
      env,
      child,
      lesson,
      startedAt: '2026-06-29T12:01:00.000Z',
      scoreCorrect: 2,
      scoreTotal: 4,
      xpAwarded: 7,
      heartsRemaining: 3,
      questionAttempts: [{ questionId: 'question_1', isCorrect: true, answer: '4' }],
      bestScoreTotalStrategy: 'latest',
    });

    expect(repeat.nextLesson?.id).toBe('lesson_2');
    expect(repeat.lessonProgress).toMatchObject({
      status: 'completed',
      completed_at: firstCompletedAt,
      best_score_correct: 3,
      best_score_total: 4,
    });
    expect(count(sqlite.db, 'SELECT count(*) as total FROM question_attempts')).toBe(1);

    const secondProgress = row<{
      status: string;
      completed_at: string | null;
      best_score_correct: number;
      best_score_total: number;
    }>(
      sqlite.db,
      'SELECT status, completed_at, best_score_correct, best_score_total FROM child_lesson_progress WHERE child_profile_id = ? AND lesson_id = ?',
      child.id,
      'lesson_2',
    );
    expect(secondProgress.status).toBe('available');
    expect(secondProgress.completed_at).toBeNull();

    await completeLesson({
      env,
      child,
      lesson,
      startedAt: '2026-06-29T12:02:00.000Z',
      scoreCorrect: 4,
      scoreTotal: 6,
      xpAwarded: 8,
      heartsRemaining: 4,
      bestScoreTotalStrategy: 'latest',
    });

    expect(
      row<{ completed_at: string | null; best_score_correct: number; best_score_total: number }>(
        sqlite.db,
        'SELECT completed_at, best_score_correct, best_score_total FROM child_lesson_progress WHERE child_profile_id = ? AND lesson_id = ?',
        child.id,
        lesson.id,
      ),
    ).toEqual({
      completed_at: firstCompletedAt,
      best_score_correct: 4,
      best_score_total: 6,
    });
    expect(count(sqlite.db, 'SELECT count(*) as total FROM child_lesson_progress WHERE child_profile_id = ? AND lesson_id = ?', child.id, 'lesson_2')).toBe(1);
    expect(
      row<{ lessons_completed: number; xp_total: number; current_lesson_id: string }>(
        sqlite.db,
        'SELECT lessons_completed, xp_total, current_lesson_id FROM child_track_progress WHERE child_profile_id = ? AND track_id = ?',
        child.id,
        lesson.track_id,
      ),
    ).toEqual({ lessons_completed: 1, xp_total: 35, current_lesson_id: 'lesson_2' });
    expect(row<{ hearts_remaining: number }>(sqlite.db, 'SELECT hearts_remaining FROM child_profiles WHERE id = ?', child.id).hearts_remaining).toBe(4);
  });

  it('skips completed lessons when choosing the next lesson after completion', async () => {
    const { sqlite, env, child, lesson } = createFixture();
    sqlite.db
      .prepare(
        `INSERT INTO lessons
         (id, unit_id, slug, title, sort_order, xp_base, kind, config_json)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .run('lesson_3', 'unit_1', 'lesson-three', 'Lesson Three', 3, 10, 'standard', null);
    sqlite.db
      .prepare(
        `INSERT INTO child_lesson_progress
         (id, child_profile_id, lesson_id, status, completed_at, best_score_correct, best_score_total)
         VALUES (?, ?, ?, 'completed', ?, ?, ?)`,
      )
      .run('lesson_progress_child_1_lesson_2', child.id, 'lesson_2', '2026-06-28T10:00:00.000Z', 5, 5);
    sqlite.db
      .prepare(
        `INSERT INTO child_lesson_progress
         (id, child_profile_id, lesson_id, status, completed_at, best_score_correct, best_score_total)
         VALUES (?, ?, ?, 'locked', NULL, 0, 0)`,
      )
      .run('lesson_progress_child_1_lesson_3', child.id, 'lesson_3');
    sqlite.db
      .prepare(
        `INSERT INTO child_track_progress
         (id, child_profile_id, track_id, current_unit_id, current_lesson_id, lessons_completed, xp_total, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .run('track_progress_child_1_track_math', child.id, lesson.track_id, lesson.unit_id, lesson.id, 1, 20, '2026-06-28T10:00:00.000Z');

    const result = await completeLesson({
      env,
      child,
      lesson,
      startedAt: '2026-06-29T12:01:00.000Z',
      scoreCorrect: 5,
      scoreTotal: 5,
      xpAwarded: 10,
      heartsRemaining: 5,
      bestScoreTotalStrategy: 'latest',
    });

    expect(result.nextLesson?.id).toBe('lesson_3');
    expect(
      row<{ current_lesson_id: string }>(
        sqlite.db,
        'SELECT current_lesson_id FROM child_track_progress WHERE child_profile_id = ? AND track_id = ?',
        child.id,
        lesson.track_id,
      ),
    ).toEqual({ current_lesson_id: 'lesson_3' });
    expect(
      row<{ status: string }>(
        sqlite.db,
        'SELECT status FROM child_lesson_progress WHERE child_profile_id = ? AND lesson_id = ?',
        child.id,
        'lesson_3',
      ),
    ).toEqual({ status: 'available' });
  });

  it('uses the Mad Minute best-attempt score total behavior through the shared service', async () => {
    const { sqlite, env, child, lesson } = createFixture();
    sqlite.db
      .prepare(
        `INSERT INTO child_lesson_progress
         (id, child_profile_id, lesson_id, status, completed_at, best_score_correct, best_score_total)
         VALUES (?, ?, ?, 'available', NULL, 0, 0)`,
      )
      .run('lesson_progress_child_1_lesson_1', child.id, lesson.id);

    await completeLesson({
      env,
      child,
      lesson,
      startedAt: '2026-06-29T12:01:00.000Z',
      scoreCorrect: 40,
      scoreTotal: 45,
      xpAwarded: 60,
      heartsRemaining: 5,
      bestScoreTotalStrategy: 'best-score-attempt',
    });
    await completeLesson({
      env,
      child,
      lesson,
      startedAt: '2026-06-29T12:02:00.000Z',
      scoreCorrect: 35,
      scoreTotal: 35,
      xpAwarded: 45,
      heartsRemaining: 5,
      bestScoreTotalStrategy: 'best-score-attempt',
    });
    const lowerRepeat = row<{ best_score_correct: number; best_score_total: number }>(
      sqlite.db,
      'SELECT best_score_correct, best_score_total FROM child_lesson_progress WHERE child_profile_id = ? AND lesson_id = ?',
      child.id,
      lesson.id,
    );
    expect(lowerRepeat).toEqual({ best_score_correct: 40, best_score_total: 45 });

    await completeLesson({
      env,
      child,
      lesson,
      startedAt: '2026-06-29T12:03:00.000Z',
      scoreCorrect: 42,
      scoreTotal: 50,
      xpAwarded: 62,
      heartsRemaining: 5,
      bestScoreTotalStrategy: 'best-score-attempt',
    });

    expect(
      row<{ best_score_correct: number; best_score_total: number }>(
        sqlite.db,
        'SELECT best_score_correct, best_score_total FROM child_lesson_progress WHERE child_profile_id = ? AND lesson_id = ?',
        child.id,
        lesson.id,
      ),
    ).toEqual({ best_score_correct: 42, best_score_total: 50 });
    expect(count(sqlite.db, 'SELECT count(*) as total FROM lesson_attempts WHERE child_profile_id = ?', child.id)).toBe(3);
    expect(count(sqlite.db, 'SELECT count(*) as total FROM question_attempts')).toBe(0);
    expect(
      row<{ xp_total: number; current_lesson_id: string }>(
        sqlite.db,
        'SELECT xp_total, current_lesson_id FROM child_track_progress WHERE child_profile_id = ? AND track_id = ?',
        child.id,
        lesson.track_id,
      ),
    ).toEqual({ xp_total: 167, current_lesson_id: 'lesson_2' });
  });
});
