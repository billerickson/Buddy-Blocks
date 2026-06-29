import { describe, expect, it } from 'vitest';
import { calculateXp, evaluateAnswer, type LessonQuestion } from '../src/lib/lesson-engine';

const question = (overrides: Partial<LessonQuestion>): LessonQuestion => ({
  id: 'q1',
  type: 'multiple-choice',
  prompt: 'Prompt',
  payload: { choices: ['A', 'B'], correctAnswer: 'A' },
  ...overrides,
});

describe('lesson engine', () => {
  it('scores text answers with case and whitespace normalization', () => {
    expect(
      evaluateAnswer(
        question({
          type: 'text-input',
          payload: { acceptedAnswers: ['quick fox'], answerType: 'text' },
        }),
        '  Quick   Fox ',
      ),
    ).toBe(true);
  });

  it('scores numeric text input by numeric value', () => {
    expect(
      evaluateAnswer(
        question({
          type: 'text-input',
          payload: { acceptedAnswers: ['13'], answerType: 'number' },
        }),
        '13.0',
      ),
    ).toBe(true);
  });

  it('scores match-pairs and order-items questions', () => {
    expect(
      evaluateAnswer(
        question({
          type: 'match-pairs',
          payload: {
            pairs: [
              { left: 'hola', right: 'hello' },
              { left: 'adios', right: 'goodbye' },
            ],
          },
        }),
        { hola: 'hello', adios: 'goodbye' },
      ),
    ).toBe(true);

    expect(
      evaluateAnswer(
        question({
          type: 'order-items',
          payload: { items: ['amigo', 'hola'], correctOrder: ['hola', 'amigo'] },
        }),
        ['amigo', 'hola'],
      ),
    ).toBe(false);
  });

  it('awards completion, correctness, perfect, and practice-mode XP', () => {
    expect(calculateXp(10, 8, 8, 5)).toBe(23);
    expect(calculateXp(10, 3, 8, 0)).toBe(6);
  });
});

