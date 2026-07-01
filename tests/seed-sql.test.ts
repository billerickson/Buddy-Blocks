import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { describe, expect, it } from 'vitest';
import type { TrackFixture } from '../src/lib/curriculum';
import {
  buildChildTrackRepairStatements,
  buildCurriculumSeedStatements,
  insertIgnoreStatement,
  upsertStatement,
} from '../src/lib/seed-sql';

describe('seed SQL helpers', () => {
  it('uses stable authored IDs when building curriculum upserts', () => {
    const track: TrackFixture = {
      id: 'track_grade7_science',
      slug: 'grade-7-science',
      subject: 'science',
      gradeLevel: 7,
      title: 'Science',
      description: 'Science description',
      color: '#5b79ff',
      accent: '#ffd84d',
      units: [
        {
          id: 'unit_grade7_science_cells',
          slug: 'cells',
          title: 'Cells',
          description: 'Cells description',
          lessons: [
            {
              id: 'lesson_grade7_science_cell_parts',
              slug: 'cell-parts',
              title: 'Cell Parts',
              xpBase: 10,
              questions: [
                {
                  type: 'text-input',
                  prompt: 'Type cell.',
                  payload: { acceptedAnswers: ['cell'], answerType: 'text' },
                },
              ],
            },
          ],
        },
      ],
    };

    const statements = buildCurriculumSeedStatements([track], [
      {
        id: 'lesson_grade7_science_cell_parts_q01',
        lessonId: 'lesson_grade7_science_cell_parts',
        type: 'text-input',
        prompt: 'Type cell.',
        payload: { acceptedAnswers: ['cell'], answerType: 'text' },
        hint: 'Cells are the smallest living units.',
        sortOrder: 1,
      },
    ]);

    expect(statements.find((statement) => statement.startsWith('INSERT INTO tracks'))).toContain("'track_grade7_science'");
    expect(statements.find((statement) => statement.startsWith('INSERT INTO units'))).toContain("'unit_grade7_science_cells'");
    expect(statements.find((statement) => statement.startsWith('INSERT INTO lessons'))).toContain("'lesson_grade7_science_cell_parts'");
    const questionStatement = statements.find((statement) => statement.startsWith('INSERT INTO questions'));
    expect(questionStatement).toBeDefined();
    expect(questionStatement!).toContain("'lesson_grade7_science_cell_parts_q01'");
    expect(questionStatement!).toContain("'Cells are the smallest living units.'");
  });

  it('keeps curriculum rows upsertable but progress rows insert-only', () => {
    expect(
      upsertStatement('lessons', {
        id: 'lesson_stable',
        unit_id: 'unit_stable',
        slug: 'stable',
        title: 'Stable',
        kind: 'standard',
        config_json: null,
        sort_order: 1,
        xp_base: 10,
      }),
    ).toContain('ON CONFLICT(id) DO UPDATE SET');

    const progressStatement = insertIgnoreStatement('child_lesson_progress', {
      id: 'lesson_progress_child_lesson_stable',
      child_profile_id: 'child_1',
      lesson_id: 'lesson_stable',
      status: 'completed',
      completed_at: '2026-06-29T12:00:00.000Z',
      best_score_correct: 5,
      best_score_total: 5,
    });

    expect(progressStatement).toContain('INSERT OR IGNORE INTO child_lesson_progress');
    expect(progressStatement).not.toContain('DO UPDATE');
    expect(progressStatement).toContain("'lesson_progress_child_lesson_stable'");
  });

  it('prunes retired curriculum rows outside the Markdown catalog', () => {
    const db = createTestDatabase();
    const track = seedCanonicalFixture(db);

    db.prepare(
      `INSERT INTO units (id, track_id, slug, title, description, sort_order)
       VALUES ('unit_retired', 'track_grade7_science', 'retired', 'Retired', 'Retired unit', 2)`,
    ).run();
    db.prepare(
      `INSERT INTO lessons (id, unit_id, slug, title, sort_order, xp_base, kind, config_json)
       VALUES ('lesson_retired', 'unit_retired', 'retired', 'Retired', 1, 10, 'standard', NULL)`,
    ).run();
    db.prepare(
      `INSERT INTO questions (id, lesson_id, type, prompt, payload_json, explanation, sort_order)
       VALUES ('question_retired', 'lesson_retired', 'text-input', 'Retired?', '{"acceptedAnswers":["yes"]}', NULL, 1)`,
    ).run();
    db.prepare(
      `INSERT INTO child_lesson_progress
       (id, child_profile_id, lesson_id, status, completed_at, best_score_correct, best_score_total)
       VALUES ('progress_retired', 'child_1', 'lesson_retired', 'completed', '2026-06-29T12:00:00.000Z', 1, 1)`,
    ).run();
    db.prepare(
      `INSERT INTO child_track_progress
       (id, child_profile_id, track_id, current_unit_id, current_lesson_id, lessons_completed, xp_total, updated_at)
       VALUES ('track_progress_child_1_science', 'child_1', 'track_grade7_science', 'unit_retired', 'lesson_retired', 1, 10, '2026-06-29T12:00:00.000Z')`,
    ).run();
    db.prepare(
      `INSERT INTO lesson_attempts
       (id, child_profile_id, lesson_id, started_at, completed_at, score_correct, score_total, xp_awarded, hearts_remaining)
       VALUES ('attempt_retired', 'child_1', 'lesson_retired', '2026-06-29T12:00:00.000Z', '2026-06-29T12:01:00.000Z', 1, 1, 10, 5)`,
    ).run();
    db.prepare(
      `INSERT INTO question_attempts
       (id, lesson_attempt_id, question_id, is_correct, answer_json, attempted_at)
       VALUES ('qa_retired', 'attempt_retired', 'question_retired', 1, '"yes"', '2026-06-29T12:01:00.000Z')`,
    ).run();

    execStatements(
      db,
      buildCurriculumSeedStatements([track], [
        {
          id: 'question_canonical',
          lessonId: 'lesson_canonical',
          type: 'text-input',
          prompt: 'Canonical?',
          payload: { acceptedAnswers: ['yes'], answerType: 'text' },
          sortOrder: 1,
        },
      ]),
    );

    expect(count(db, 'units', 'unit_retired')).toBe(0);
    expect(count(db, 'lessons', 'lesson_retired')).toBe(0);
    expect(count(db, 'questions', 'question_retired')).toBe(0);
    expect(count(db, 'child_lesson_progress', 'progress_retired')).toBe(0);
    expect(count(db, 'lesson_attempts', 'attempt_retired')).toBe(0);
    expect(count(db, 'units', 'unit_canonical')).toBe(1);
    expect(count(db, 'lessons', 'lesson_canonical')).toBe(1);
    expect(count(db, 'questions', 'question_canonical')).toBe(1);
  });

  it('repairs child track progress after retired current lessons are removed', () => {
    const db = createTestDatabase();
    seedCanonicalFixture(db);
    db.prepare(
      `INSERT INTO lessons (id, unit_id, slug, title, sort_order, xp_base, kind, config_json)
       VALUES ('lesson_next', 'unit_canonical', 'next', 'Next', 2, 10, 'standard', NULL)`,
    ).run();
    db.prepare(
      `INSERT INTO child_lesson_progress
       (id, child_profile_id, lesson_id, status, completed_at, best_score_correct, best_score_total)
       VALUES ('progress_done', 'child_1', 'lesson_canonical', 'completed', '2026-06-29T12:00:00.000Z', 1, 1)`,
    ).run();
    db.prepare(
      `INSERT INTO child_lesson_progress
       (id, child_profile_id, lesson_id, status, completed_at, best_score_correct, best_score_total)
       VALUES ('progress_next', 'child_1', 'lesson_next', 'locked', NULL, 0, 0)`,
    ).run();
    db.prepare(
      `INSERT INTO child_track_progress
       (id, child_profile_id, track_id, current_unit_id, current_lesson_id, lessons_completed, xp_total, updated_at)
       VALUES ('track_progress_child_1_science', 'child_1', 'track_grade7_science', NULL, NULL, 99, 99, '2026-06-29T12:00:00.000Z')`,
    ).run();
    db.prepare(
      `INSERT INTO lesson_attempts
       (id, child_profile_id, lesson_id, started_at, completed_at, score_correct, score_total, xp_awarded, hearts_remaining)
       VALUES ('attempt_done', 'child_1', 'lesson_canonical', '2026-06-29T12:00:00.000Z', '2026-06-29T12:01:00.000Z', 1, 1, 10, 5)`,
    ).run();

    execStatements(db, buildChildTrackRepairStatements('child_1', 'track_grade7_science', '2026-06-29T13:00:00.000Z'));

    expect(
      db.prepare('SELECT status FROM child_lesson_progress WHERE id = ?').get('progress_next'),
    ).toEqual({ status: 'available' });
    expect(
      db.prepare('SELECT lessons_completed, xp_total, current_unit_id, current_lesson_id FROM child_track_progress WHERE id = ?').get(
        'track_progress_child_1_science',
      ),
    ).toEqual({
      lessons_completed: 1,
      xp_total: 10,
      current_unit_id: 'unit_canonical',
      current_lesson_id: 'lesson_next',
    });
  });

  it('promotes an earlier locked lesson ahead of a stale available intro lesson', () => {
    const db = createTestDatabase();
    seedCanonicalFixture(db);
    db.prepare(
      `INSERT INTO lessons (id, unit_id, slug, title, sort_order, xp_base, kind, config_json)
       VALUES ('lesson_intro', 'unit_canonical', 'intro', 'Intro', 4, 10, 'standard', NULL)`,
    ).run();
    db.prepare(
      `INSERT INTO child_lesson_progress
       (id, child_profile_id, lesson_id, status, completed_at, best_score_correct, best_score_total)
       VALUES ('progress_flash_cards', 'child_1', 'lesson_canonical', 'locked', NULL, 0, 0)`,
    ).run();
    db.prepare(
      `INSERT INTO child_lesson_progress
       (id, child_profile_id, lesson_id, status, completed_at, best_score_correct, best_score_total)
       VALUES ('progress_intro', 'child_1', 'lesson_intro', 'available', NULL, 0, 0)`,
    ).run();
    db.prepare(
      `INSERT INTO child_track_progress
       (id, child_profile_id, track_id, current_unit_id, current_lesson_id, lessons_completed, xp_total, updated_at)
       VALUES ('track_progress_child_1_science', 'child_1', 'track_grade7_science', 'unit_canonical', 'lesson_intro', 0, 0, '2026-06-29T12:00:00.000Z')`,
    ).run();

    execStatements(db, buildChildTrackRepairStatements('child_1', 'track_grade7_science', '2026-06-29T13:00:00.000Z'));

    expect(
      db.prepare('SELECT status FROM child_lesson_progress WHERE id = ?').get('progress_flash_cards'),
    ).toEqual({ status: 'available' });
    expect(
      db.prepare('SELECT status FROM child_lesson_progress WHERE id = ?').get('progress_intro'),
    ).toEqual({ status: 'locked' });
    expect(
      db.prepare('SELECT current_unit_id, current_lesson_id FROM child_track_progress WHERE id = ?').get(
        'track_progress_child_1_science',
      ),
    ).toEqual({
      current_unit_id: 'unit_canonical',
      current_lesson_id: 'lesson_canonical',
    });
  });

  it('repairs stale available current lessons to the canonical first incomplete lesson', () => {
    const db = createTestDatabase();
    seedCanonicalFixture(db);
    db.prepare(
      `INSERT INTO lessons (id, unit_id, slug, title, sort_order, xp_base, kind, config_json)
       VALUES ('lesson_next', 'unit_canonical', 'next', 'Next', 2, 10, 'standard', NULL)`,
    ).run();
    db.prepare(
      `INSERT INTO lessons (id, unit_id, slug, title, sort_order, xp_base, kind, config_json)
       VALUES ('lesson_current', 'unit_canonical', 'current', 'Current', 3, 10, 'standard', NULL)`,
    ).run();
    db.prepare(
      `INSERT INTO child_lesson_progress
       (id, child_profile_id, lesson_id, status, completed_at, best_score_correct, best_score_total)
       VALUES ('progress_done', 'child_1', 'lesson_canonical', 'completed', '2026-06-29T12:00:00.000Z', 1, 1)`,
    ).run();
    db.prepare(
      `INSERT INTO child_lesson_progress
       (id, child_profile_id, lesson_id, status, completed_at, best_score_correct, best_score_total)
       VALUES ('progress_next', 'child_1', 'lesson_next', 'locked', NULL, 0, 0)`,
    ).run();
    db.prepare(
      `INSERT INTO child_lesson_progress
       (id, child_profile_id, lesson_id, status, completed_at, best_score_correct, best_score_total)
       VALUES ('progress_current', 'child_1', 'lesson_current', 'available', NULL, 0, 0)`,
    ).run();
    db.prepare(
      `INSERT INTO child_track_progress
       (id, child_profile_id, track_id, current_unit_id, current_lesson_id, lessons_completed, xp_total, updated_at)
       VALUES ('track_progress_child_1_science', 'child_1', 'track_grade7_science', 'unit_canonical', 'lesson_current', 99, 99, '2026-06-29T12:00:00.000Z')`,
    ).run();

    execStatements(db, buildChildTrackRepairStatements('child_1', 'track_grade7_science', '2026-06-29T13:00:00.000Z'));

    expect(
      db.prepare('SELECT status FROM child_lesson_progress WHERE id = ?').get('progress_next'),
    ).toEqual({ status: 'available' });
    expect(
      db.prepare('SELECT status FROM child_lesson_progress WHERE id = ?').get('progress_current'),
    ).toEqual({ status: 'locked' });
    expect(
      db.prepare('SELECT current_unit_id, current_lesson_id FROM child_track_progress WHERE id = ?').get(
        'track_progress_child_1_science',
      ),
    ).toEqual({
      current_unit_id: 'unit_canonical',
      current_lesson_id: 'lesson_next',
    });
  });

  it('advances a completed current lesson to the canonical first incomplete lesson', () => {
    const db = createTestDatabase();
    seedCanonicalFixture(db);
    db.prepare(
      `INSERT INTO lessons (id, unit_id, slug, title, sort_order, xp_base, kind, config_json)
       VALUES ('lesson_next', 'unit_canonical', 'next', 'Next', 2, 10, 'standard', NULL)`,
    ).run();
    db.prepare(
      `INSERT INTO child_lesson_progress
       (id, child_profile_id, lesson_id, status, completed_at, best_score_correct, best_score_total)
       VALUES ('progress_current', 'child_1', 'lesson_canonical', 'completed', '2026-06-29T12:00:00.000Z', 1, 1)`,
    ).run();
    db.prepare(
      `INSERT INTO child_lesson_progress
       (id, child_profile_id, lesson_id, status, completed_at, best_score_correct, best_score_total)
       VALUES ('progress_next', 'child_1', 'lesson_next', 'locked', NULL, 0, 0)`,
    ).run();
    db.prepare(
      `INSERT INTO child_track_progress
       (id, child_profile_id, track_id, current_unit_id, current_lesson_id, lessons_completed, xp_total, updated_at)
       VALUES ('track_progress_child_1_science', 'child_1', 'track_grade7_science', 'unit_canonical', 'lesson_canonical', 1, 10, '2026-06-29T12:00:00.000Z')`,
    ).run();

    execStatements(db, buildChildTrackRepairStatements('child_1', 'track_grade7_science', '2026-06-29T13:00:00.000Z'));

    expect(
      db.prepare('SELECT status FROM child_lesson_progress WHERE id = ?').get('progress_next'),
    ).toEqual({ status: 'available' });
    expect(
      db.prepare('SELECT current_unit_id, current_lesson_id FROM child_track_progress WHERE id = ?').get(
        'track_progress_child_1_science',
      ),
    ).toEqual({
      current_unit_id: 'unit_canonical',
      current_lesson_id: 'lesson_next',
    });
  });
});

function createTestDatabase() {
  const db = new DatabaseSync(':memory:');
  db.exec('PRAGMA foreign_keys = ON;');

  const migrationsPath = join(process.cwd(), 'migrations');
  for (const fileName of readdirSync(migrationsPath).filter((file) => file.endsWith('.sql')).sort()) {
    db.exec(readFileSync(join(migrationsPath, fileName), 'utf8'));
  }

  return db;
}

function seedCanonicalFixture(db: DatabaseSync): TrackFixture {
  const now = '2026-06-29T12:00:00.000Z';
  db.prepare(
    `INSERT INTO parents
     (id, username, email, password_hash, password_salt, status, created_at, updated_at)
     VALUES ('parent_1', 'bill', 'bill@example.test', 'hash', 'salt', 'active', ?, ?)`,
  ).run(now, now);
  db.prepare(
    `INSERT INTO child_profiles
     (id, parent_id, slug, display_name, avatar_key, level_band, hearts_remaining, created_at, updated_at, grade_level)
     VALUES ('child_1', 'parent_1', 'reagan', 'Reagan', 'berry-builder', 'Grade 7', 5, ?, ?, 7)`,
  ).run(now, now);
  db.prepare(
    `INSERT INTO tracks
     (id, slug, title, description, color, accent, sort_order, subject, grade_level)
     VALUES ('track_grade7_science', 'grade-7-science', 'Science', 'Science description', '#5b79ff', '#ffd84d', 1, 'science', 7)`,
  ).run();
  db.prepare(
    `INSERT INTO units (id, track_id, slug, title, description, sort_order)
     VALUES ('unit_canonical', 'track_grade7_science', 'canonical', 'Canonical', 'Canonical unit', 1)`,
  ).run();
  db.prepare(
    `INSERT INTO lessons (id, unit_id, slug, title, sort_order, xp_base, kind, config_json)
     VALUES ('lesson_canonical', 'unit_canonical', 'canonical', 'Canonical', 1, 10, 'standard', NULL)`,
  ).run();
  db.prepare(
    `INSERT INTO questions (id, lesson_id, type, prompt, payload_json, explanation, sort_order)
     VALUES ('question_canonical', 'lesson_canonical', 'text-input', 'Canonical?', '{"acceptedAnswers":["yes"]}', NULL, 1)`,
  ).run();

  return {
    id: 'track_grade7_science',
    slug: 'grade-7-science',
    subject: 'science',
    gradeLevel: 7,
    title: 'Science',
    description: 'Science description',
    color: '#5b79ff',
    accent: '#ffd84d',
    units: [
      {
        id: 'unit_canonical',
        slug: 'canonical',
        title: 'Canonical',
        description: 'Canonical unit',
        lessons: [
          {
            id: 'lesson_canonical',
            slug: 'canonical',
            title: 'Canonical',
            xpBase: 10,
            questions: [
              {
                type: 'text-input',
                prompt: 'Canonical?',
                payload: { acceptedAnswers: ['yes'], answerType: 'text' },
              },
            ],
          },
        ],
      },
    ],
  };
}

function execStatements(db: DatabaseSync, statements: string[]) {
  db.exec(statements.join('\n'));
}

function count(db: DatabaseSync, table: string, id: string) {
  return (db.prepare(`SELECT count(*) as total FROM ${table} WHERE id = ?`).get(id) as { total: number }).total;
}
