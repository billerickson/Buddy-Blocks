import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { describe, expect, it } from 'vitest';
import type { LessonFixture, TrackFixture } from '../src/lib/curriculum';
import { buildChildProgressProvisioningStatements, getTracksForGradeLevel } from '../src/lib/provisioning';
import { buildCurriculumSeedStatements } from '../src/lib/seed-sql';

describe('child provisioning helpers', () => {
  it('uses child grade for scholastic tracks and level 1 for foundation tracks', () => {
    expect(getTracksForGradeLevel(6).map((track) => track.slug)).toEqual([
      'grade-6-math',
      'grade-6-vocabulary',
      'grade-3-spanish',
      'grade-3-french',
      'grade-3-latin',
      'grade-3-grammar',
      'grade-3-logic',
      'grade-3-rhetoric',
      'grade-3-literature',
      'grade-3-history-civics',
      'grade-3-memory-work',
    ]);
    expect(getTracksForGradeLevel(3).map((track) => track.slug)).toEqual([
      'grade-3-math',
      'grade-3-vocabulary',
      'grade-3-spanish',
      'grade-3-french',
      'grade-3-latin',
      'grade-3-grammar',
      'grade-3-logic',
      'grade-3-rhetoric',
      'grade-3-literature',
      'grade-3-history-civics',
      'grade-3-memory-work',
    ]);
  });

  it('initializes track and lesson progress for an arbitrary child', () => {
    const db = createTestDatabase();
    const track = scienceTrack([
      lesson('lesson_intro', 'intro', 'Intro'),
      lesson('lesson_next', 'next', 'Next'),
    ]);
    seedParentAndChild(db, 'child_mira', 7);
    execStatements(db, buildCurriculumSeedStatements([track], []));

    execStatements(
      db,
      buildChildProgressProvisioningStatements(
        { id: 'child_mira', gradeLevel: 7 },
        '2026-07-01T12:00:00.000Z',
        [track],
      ),
    );

    expect(
      db.prepare('SELECT current_unit_id, current_lesson_id, lessons_completed, xp_total FROM child_track_progress').get(),
    ).toEqual({
      current_unit_id: 'unit_science',
      current_lesson_id: 'lesson_intro',
      lessons_completed: 0,
      xp_total: 0,
    });
    expect(
      db.prepare('SELECT lesson_id, status FROM child_lesson_progress ORDER BY lesson_id').all(),
    ).toEqual([
      { lesson_id: 'lesson_intro', status: 'available' },
      { lesson_id: 'lesson_next', status: 'locked' },
    ]);
  });

  it('repairs missing progress after a reseed without overwriting completed work', () => {
    const db = createTestDatabase();
    const firstTrack = scienceTrack([
      lesson('lesson_intro', 'intro', 'Intro'),
      lesson('lesson_next', 'next', 'Next'),
    ]);
    const reseededTrack = scienceTrack([
      lesson('lesson_intro', 'intro', 'Intro'),
      lesson('lesson_next', 'next', 'Next'),
      lesson('lesson_new', 'new', 'New Lesson'),
    ]);
    seedParentAndChild(db, 'child_mira', 7);
    execStatements(db, buildCurriculumSeedStatements([firstTrack], []));
    execStatements(
      db,
      buildChildProgressProvisioningStatements(
        { id: 'child_mira', gradeLevel: 7 },
        '2026-07-01T12:00:00.000Z',
        [firstTrack],
      ),
    );
    db.prepare(
      `UPDATE child_lesson_progress
       SET status = 'completed', completed_at = ?, best_score_correct = 5, best_score_total = 5
       WHERE child_profile_id = ? AND lesson_id = ?`,
    ).run('2026-07-01T12:10:00.000Z', 'child_mira', 'lesson_intro');
    db.prepare(
      `INSERT INTO lesson_attempts
       (id, child_profile_id, lesson_id, started_at, completed_at, score_correct, score_total, xp_awarded, hearts_remaining)
       VALUES ('attempt_intro', 'child_mira', 'lesson_intro', '2026-07-01T12:00:00.000Z', '2026-07-01T12:10:00.000Z', 5, 5, 12, 5)`,
    ).run();

    execStatements(db, buildCurriculumSeedStatements([reseededTrack], []));
    execStatements(
      db,
      buildChildProgressProvisioningStatements(
        { id: 'child_mira', gradeLevel: 7 },
        '2026-07-01T13:00:00.000Z',
        [reseededTrack],
      ),
    );

    expect(
      db.prepare(
        'SELECT lesson_id, status, best_score_correct, best_score_total FROM child_lesson_progress ORDER BY lesson_id',
      ).all(),
    ).toEqual([
      { lesson_id: 'lesson_intro', status: 'completed', best_score_correct: 5, best_score_total: 5 },
      { lesson_id: 'lesson_new', status: 'locked', best_score_correct: 0, best_score_total: 0 },
      { lesson_id: 'lesson_next', status: 'available', best_score_correct: 0, best_score_total: 0 },
    ]);
    expect(
      db.prepare(
        'SELECT current_unit_id, current_lesson_id, lessons_completed, xp_total FROM child_track_progress WHERE child_profile_id = ?',
      ).get('child_mira'),
    ).toEqual({
      current_unit_id: 'unit_science',
      current_lesson_id: 'lesson_next',
      lessons_completed: 1,
      xp_total: 12,
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

function seedParentAndChild(db: DatabaseSync, childId: string, gradeLevel: number) {
  const now = '2026-07-01T12:00:00.000Z';
  db.prepare(
    `INSERT INTO parents
     (id, username, email, password_hash, password_salt, status, created_at, updated_at)
     VALUES ('parent_1', 'parent', 'parent@example.test', 'hash', 'salt', 'active', ?, ?)`,
  ).run(now, now);
  db.prepare(
    `INSERT INTO child_profiles
     (id, parent_id, slug, display_name, avatar_key, level_band, hearts_remaining, created_at, updated_at, grade_level)
     VALUES (?, 'parent_1', 'mira', 'Mira', 'berry-builder', ?, 5, ?, ?, ?)`,
  ).run(childId, `Grade ${gradeLevel}`, now, now, gradeLevel);
}

function scienceTrack(lessons: LessonFixture[]): TrackFixture {
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
        id: 'unit_science',
        slug: 'science',
        title: 'Science Unit',
        description: 'Science unit description',
        lessons,
      },
    ],
  };
}

function lesson(id: string, slug: string, title: string): LessonFixture {
  return {
    id,
    slug,
    title,
    xpBase: 10,
    questions: [],
  };
}

function execStatements(db: DatabaseSync, statements: string[]) {
  for (const statement of statements) db.exec(statement);
}
