import { describe, expect, it } from 'vitest';
import type { LessonQuestion } from '../src/lib/lesson-engine';
import { prepareLessonQueue, shuffleQuestions } from '../src/components/lesson/lesson-flow';

const questions: LessonQuestion[] = ['q1', 'q2', 'q3', 'q4'].map((id) => ({
  id,
  type: 'multiple-choice',
  prompt: id,
  payload: {
    choices: ['A', 'B'],
    correctAnswer: 'A',
  },
}));

describe('lesson flow', () => {
  it('keeps authored order when shuffle is disabled', () => {
    expect(prepareLessonQueue(questions, null, 'lesson_a').map((item) => item.question.id)).toEqual(['q1', 'q2', 'q3', 'q4']);
    expect(
      prepareLessonQueue(questions, { review: { mode: 'deck', shuffleQuestions: false } }, 'lesson_a').map((item) => item.question.id),
    ).toEqual(['q1', 'q2', 'q3', 'q4']);
  });

  it('shuffles deterministically by lesson id without mutating questions', () => {
    const shuffledA = prepareLessonQueue(questions, { review: { mode: 'deck', shuffleQuestions: true } }, 'lesson_a');
    const shuffledAgain = prepareLessonQueue(questions, { review: { mode: 'deck', shuffleQuestions: true } }, 'lesson_a');
    const shuffledB = prepareLessonQueue(questions, { review: { mode: 'deck', shuffleQuestions: true } }, 'lesson_b');

    expect(shuffledA.map((item) => item.question.id)).toEqual(shuffledAgain.map((item) => item.question.id));
    expect(shuffledA.map((item) => item.question.id)).not.toEqual(shuffledB.map((item) => item.question.id));
    expect(questions.map((question) => question.id)).toEqual(['q1', 'q2', 'q3', 'q4']);
    expect(shuffledA.every((item) => item.review === false)).toBe(true);
  });

  it('uses question ids as the fallback seed for direct shuffle calls', () => {
    expect(shuffleQuestions(questions, '').map((question) => question.id)).toEqual(
      shuffleQuestions(questions, '').map((question) => question.id),
    );
  });
});
