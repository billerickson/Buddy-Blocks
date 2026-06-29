import type { TrackFixture } from './curriculum';

export type SeedQuestion = {
  id: string;
  lessonId: string;
  type: string;
  prompt: string;
  payload: unknown;
  explanation?: string | null;
  sortOrder: number;
};

export function buildCurriculumSeedStatements(tracks: TrackFixture[], questions: SeedQuestion[]) {
  const statements: string[] = [];

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
        sort_order: question.sortOrder,
      }),
    );
  }

  return statements;
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
