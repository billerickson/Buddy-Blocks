import type { TrackFixture } from './curriculum';

export type SeedQuestion = {
  id: string;
  lessonId: string;
  type: string;
  prompt: string;
  payload: unknown;
  explanation?: string | null;
  hint?: string | null;
  sortOrder: number;
};

export function buildCurriculumSeedStatements(tracks: TrackFixture[], questions: SeedQuestion[]) {
  const statements: string[] = [
    ...buildCanonicalCatalogStatements(tracks, questions),
    ...buildRetiredCurriculumPruneStatements(),
  ];

  tracks.forEach((track, trackIndex) => {
    statements.push(
      upsertStatement('tracks', {
        id: track.id,
        slug: track.slug,
        subject: track.subject,
        grade_level: track.gradeLevel,
        title: track.title,
        description: track.description,
        color: track.color,
        accent: track.accent,
        sort_order: trackIndex + 1,
      }),
    );

    track.units.forEach((unit, unitIndex) => {
      statements.push(
        upsertStatement('units', {
          id: unit.id,
          track_id: track.id,
          slug: unit.slug,
          title: unit.title,
          description: unit.description,
          sort_order: unitIndex + 1,
        }),
      );

      unit.lessons.forEach((lesson, lessonIndex) => {
        statements.push(
          upsertStatement('lessons', {
            id: lesson.id,
            unit_id: unit.id,
            slug: lesson.slug,
            title: lesson.title,
            kind: lesson.kind ?? 'standard',
            config_json: lesson.config ? JSON.stringify(lesson.config) : null,
            sort_order: lessonIndex + 1,
            xp_base: lesson.xpBase,
          }),
        );
      });
    });
  });

  for (const question of questions) {
    statements.push(
      upsertStatement('questions', {
        id: question.id,
        lesson_id: question.lessonId,
        type: question.type,
        prompt: question.prompt,
        payload_json: JSON.stringify(question.payload),
        explanation: question.explanation ?? null,
        hint: question.hint ?? null,
        sort_order: question.sortOrder,
      }),
    );
  }

  statements.push(...buildDropCanonicalCatalogStatements());
  return statements;
}

export function buildChildTrackRepairStatements(childId: string, trackId: string, updatedAt: string) {
  const child = sql(childId);
  const track = sql(trackId);
  const timestamp = sql(updatedAt);
  const trackLessons = `SELECT lessons.id
     FROM lessons
     JOIN units ON units.id = lessons.unit_id
     WHERE units.track_id = ${track}`;
  const firstIncompleteLesson = `SELECT lessons.id
       FROM lessons
       JOIN units ON units.id = lessons.unit_id
       JOIN child_lesson_progress
         ON child_lesson_progress.lesson_id = lessons.id
        AND child_lesson_progress.child_profile_id = ${child}
       WHERE units.track_id = ${track}
         AND child_lesson_progress.status <> 'completed'
       ORDER BY units.sort_order, lessons.sort_order
       LIMIT 1`;
  const firstAvailableLesson = `SELECT lessons.id
       FROM lessons
       JOIN units ON units.id = lessons.unit_id
       JOIN child_lesson_progress
         ON child_lesson_progress.lesson_id = lessons.id
        AND child_lesson_progress.child_profile_id = ${child}
       WHERE units.track_id = ${track}
         AND child_lesson_progress.status = 'available'
         AND child_lesson_progress.completed_at IS NULL
       ORDER BY units.sort_order, lessons.sort_order
       LIMIT 1`;
  return [
    `UPDATE child_lesson_progress
SET status = CASE
  WHEN status = 'completed' THEN 'completed'
  WHEN lesson_id IN (
    SELECT lessons.id
    FROM lessons
    JOIN units ON units.id = lessons.unit_id
    WHERE units.track_id = ${track}
      AND lessons.kind = 'mad-minute'
  ) THEN 'available'
  ELSE 'locked'
END
WHERE child_profile_id = ${child}
  AND lesson_id IN (${trackLessons});`,
    `UPDATE child_lesson_progress
SET status = 'available'
WHERE id = (
  SELECT child_lesson_progress.id
  FROM child_lesson_progress
  WHERE child_profile_id = ${child}
    AND lesson_id = (${firstIncompleteLesson})
);`,
    `UPDATE child_track_progress
SET current_lesson_id = coalesce(
      (${firstIncompleteLesson}),
      CASE
        WHEN current_lesson_id IN (${trackLessons}) THEN current_lesson_id
        ELSE (${firstAvailableLesson})
      END
    )
WHERE child_profile_id = ${child}
  AND track_id = ${track};`,
    `UPDATE child_track_progress
SET current_unit_id = (
  SELECT units.id
  FROM units
  JOIN lessons ON lessons.unit_id = units.id
  WHERE lessons.id = child_track_progress.current_lesson_id
    AND units.track_id = ${track}
  LIMIT 1
)
WHERE child_profile_id = ${child}
  AND track_id = ${track};`,
    `UPDATE child_track_progress
SET lessons_completed = (
  SELECT count(*)
  FROM child_lesson_progress
  JOIN lessons ON lessons.id = child_lesson_progress.lesson_id
  JOIN units ON units.id = lessons.unit_id
  WHERE child_lesson_progress.child_profile_id = ${child}
    AND units.track_id = ${track}
    AND child_lesson_progress.status = 'completed'
)
WHERE child_profile_id = ${child}
  AND track_id = ${track};`,
    `UPDATE child_track_progress
SET xp_total = (
  SELECT coalesce(sum(lesson_attempts.xp_awarded), 0)
  FROM lesson_attempts
  JOIN lessons ON lessons.id = lesson_attempts.lesson_id
  JOIN units ON units.id = lessons.unit_id
  WHERE lesson_attempts.child_profile_id = ${child}
    AND units.track_id = ${track}
),
updated_at = ${timestamp}
WHERE child_profile_id = ${child}
  AND track_id = ${track};`,
  ];
}

function buildCanonicalCatalogStatements(tracks: TrackFixture[], questions: SeedQuestion[]) {
  const units = tracks.flatMap((track) => track.units);
  const lessons = units.flatMap((unit) => unit.lessons);
  return [
    'CREATE TABLE IF NOT EXISTS seed_canonical_tracks (id TEXT PRIMARY KEY);',
    'CREATE TABLE IF NOT EXISTS seed_canonical_units (id TEXT PRIMARY KEY);',
    'CREATE TABLE IF NOT EXISTS seed_canonical_lessons (id TEXT PRIMARY KEY);',
    'CREATE TABLE IF NOT EXISTS seed_canonical_questions (id TEXT PRIMARY KEY);',
    'DELETE FROM seed_canonical_tracks;',
    'DELETE FROM seed_canonical_units;',
    'DELETE FROM seed_canonical_lessons;',
    'DELETE FROM seed_canonical_questions;',
    ...insertCanonicalIds('seed_canonical_tracks', tracks.map((track) => track.id)),
    ...insertCanonicalIds('seed_canonical_units', units.map((unit) => unit.id)),
    ...insertCanonicalIds('seed_canonical_lessons', lessons.map((lesson) => lesson.id)),
    ...insertCanonicalIds('seed_canonical_questions', questions.map((question) => question.id)),
  ];
}

function buildRetiredCurriculumPruneStatements() {
  return [
    `DELETE FROM question_attempts
WHERE question_id IN (
  SELECT id FROM questions
  WHERE id NOT IN (SELECT id FROM seed_canonical_questions)
);`,
    `DELETE FROM questions
WHERE id NOT IN (SELECT id FROM seed_canonical_questions);`,
    `DELETE FROM question_attempts
WHERE lesson_attempt_id IN (
  SELECT lesson_attempts.id
  FROM lesson_attempts
  JOIN lessons ON lessons.id = lesson_attempts.lesson_id
  WHERE lessons.id NOT IN (SELECT id FROM seed_canonical_lessons)
);`,
    `DELETE FROM lesson_attempts
WHERE lesson_id IN (
  SELECT id FROM lessons
  WHERE id NOT IN (SELECT id FROM seed_canonical_lessons)
);`,
    `DELETE FROM child_lesson_progress
WHERE lesson_id IN (
  SELECT id FROM lessons
  WHERE id NOT IN (SELECT id FROM seed_canonical_lessons)
);`,
    `UPDATE child_track_progress
SET current_lesson_id = NULL
WHERE current_lesson_id IS NOT NULL
  AND current_lesson_id NOT IN (SELECT id FROM seed_canonical_lessons);`,
    `UPDATE child_track_progress
SET current_unit_id = NULL
WHERE current_unit_id IS NOT NULL
  AND current_unit_id NOT IN (SELECT id FROM seed_canonical_units);`,
    `DELETE FROM lessons
WHERE id NOT IN (SELECT id FROM seed_canonical_lessons);`,
    `DELETE FROM units
WHERE id NOT IN (SELECT id FROM seed_canonical_units);`,
    `DELETE FROM child_track_progress
WHERE track_id IN (
  SELECT id FROM tracks
  WHERE id NOT IN (SELECT id FROM seed_canonical_tracks)
);`,
    `DELETE FROM tracks
WHERE id NOT IN (SELECT id FROM seed_canonical_tracks);`,
  ];
}

function buildDropCanonicalCatalogStatements() {
  return [
    'DROP TABLE IF EXISTS seed_canonical_questions;',
    'DROP TABLE IF EXISTS seed_canonical_lessons;',
    'DROP TABLE IF EXISTS seed_canonical_units;',
    'DROP TABLE IF EXISTS seed_canonical_tracks;',
  ];
}

export function insertIgnoreStatement(table: string, row: Record<string, unknown>) {
  const columns = Object.keys(row);
  return `INSERT OR IGNORE INTO ${table} (${columns.join(', ')}) VALUES (${columns.map((column) => sql(row[column])).join(', ')});`;
}

export function upsertStatement(table: string, row: Record<string, unknown>) {
  return insertWithUpdateStatement(
    table,
    row,
    Object.keys(row).filter((column) => column !== 'id' && column !== 'created_at'),
  );
}

export function insertWithUpdateStatement(table: string, row: Record<string, unknown>, updateColumns: string[]) {
  const columns = Object.keys(row);
  const updates = updateColumns.map((column) => `${column} = excluded.${column}`).join(', ');
  return `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${columns.map((column) => sql(row[column])).join(', ')}) ON CONFLICT(id) DO UPDATE SET ${updates};`;
}

export function sql(value: unknown) {
  if (value === null || value === undefined) return 'NULL';
  if (typeof value === 'number') return String(value);
  return `'${String(value).replaceAll("'", "''")}'`;
}

function insertCanonicalIds(table: string, ids: string[]) {
  const statements: string[] = [];
  const chunkSize = 25;
  for (let index = 0; index < ids.length; index += chunkSize) {
    const chunk = ids.slice(index, index + chunkSize);
    if (chunk.length === 0) continue;
    statements.push(`INSERT INTO ${table} (id) VALUES ${chunk.map((id) => `(${sql(id)})`).join(', ')};`);
  }
  return statements;
}
