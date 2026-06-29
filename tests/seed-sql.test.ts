import { describe, expect, it } from 'vitest';
import type { TrackFixture } from '../src/lib/curriculum';
import {
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
        sortOrder: 1,
      },
    ]);

    expect(statements.find((statement) => statement.startsWith('INSERT INTO tracks'))).toContain("'track_grade7_science'");
    expect(statements.find((statement) => statement.startsWith('INSERT INTO units'))).toContain("'unit_grade7_science_cells'");
    expect(statements.find((statement) => statement.startsWith('INSERT INTO lessons'))).toContain("'lesson_grade7_science_cell_parts'");
    expect(statements.find((statement) => statement.startsWith('INSERT INTO questions'))).toContain("'lesson_grade7_science_cell_parts_q01'");
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
});
