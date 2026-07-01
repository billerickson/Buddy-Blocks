import { describe, expect, it } from 'vitest';
import type { LessonQuestion } from '../src/lib/lesson-engine';
import {
  nextQueueAfterAnswer,
  prepareLessonQueue,
  rebalanceUniformCorrectChoicePositions,
  shuffleQuestionChoices,
  shuffleQuestions,
  shouldRecordFirstAttempt,
  shouldShowRetryHint,
} from '../src/components/lesson/lesson-flow';

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

  it('appends missed first-attempt questions as retry items at the end of the queue', () => {
    const queue = prepareLessonQueue(questions.slice(0, 3), null, 'lesson_a');

    const missed = nextQueueAfterAnswer(queue, queue[0], false);

    expect(missed.map((item) => [item.question.id, item.review])).toEqual([
      ['q1', false],
      ['q2', false],
      ['q3', false],
      ['q1', true],
    ]);
    expect(nextQueueAfterAnswer(queue, queue[0], true)).toBe(queue);
    expect(nextQueueAfterAnswer(missed, missed.at(-1)!, false)).toBe(missed);
  });

  it('shows hints only for retry queue items', () => {
    const hintedQuestion: LessonQuestion = {
      ...questions[0],
      hint: 'Look for the strategy clue.',
    };

    expect(shouldShowRetryHint({ question: hintedQuestion, review: false })).toBe(false);
    expect(shouldShowRetryHint({ question: hintedQuestion, review: true })).toBe(true);
    expect(shouldShowRetryHint({ question: questions[1], review: true })).toBe(false);
  });

  it('records only the first attempt for scoring', () => {
    const firstAttemptIds = new Set<string>();
    const first = { question: questions[0], review: false };
    const retry = { question: questions[0], review: true };

    expect(shouldRecordFirstAttempt(first, firstAttemptIds)).toBe(true);
    firstAttemptIds.add(questions[0].id);
    expect(shouldRecordFirstAttempt(first, firstAttemptIds)).toBe(false);
    expect(shouldRecordFirstAttempt(retry, firstAttemptIds)).toBe(false);
  });

  it('shuffles answer choices without mutating the source question', () => {
    const source: LessonQuestion = {
      id: 'choice_q',
      type: 'multiple-choice',
      prompt: 'Pick one.',
      payload: {
        choices: ['A', 'B', 'C', 'D'],
        correctAnswer: 'A',
      },
    };

    const shuffled = shuffleQuestionChoices(source);

    expect(shuffled.payload).toMatchObject({ correctAnswer: 'A' });
    expect((shuffled.payload as { choices: string[] }).choices).not.toEqual(['A', 'B', 'C', 'D']);
    expect([...(shuffled.payload as { choices: string[] }).choices].sort()).toEqual(['A', 'B', 'C', 'D']);
    expect((source.payload as { choices: string[] }).choices).toEqual(['A', 'B', 'C', 'D']);
  });

  it('shuffles cloze blank choices without changing correct answers', () => {
    const source: LessonQuestion = {
      id: 'cloze_q',
      type: 'multi-blank-cloze',
      prompt: 'Fill blanks.',
      payload: {
        parts: ['I see ', '.'],
        blanks: [
          {
            correctAnswer: 'red',
            choices: ['red', 'blue', 'green'],
          },
        ],
      },
    };

    const shuffled = shuffleQuestionChoices(source);
    const blank = (shuffled.payload as { blanks: Array<{ correctAnswer: string; choices: string[] }> }).blanks[0];

    expect(blank.correctAnswer).toBe('red');
    expect(blank.choices).not.toEqual(['red', 'blue', 'green']);
    expect([...blank.choices].sort()).toEqual(['blue', 'green', 'red']);
    expect((source.payload as { blanks: Array<{ choices: string[] }> }).blanks[0].choices).toEqual(['red', 'blue', 'green']);
  });

  it('rebalances a lesson when every correct choice is in the same position', () => {
    const uniformQuestions: LessonQuestion[] = ['q1', 'q2', 'q3', 'q4'].map((id) => ({
      id,
      type: 'multiple-choice',
      prompt: id,
      payload: {
        choices: ['A', 'B', 'C', 'D'],
        correctAnswer: 'A',
      },
    }));

    const rebalanced = rebalanceUniformCorrectChoicePositions(uniformQuestions);
    const correctIndexes = rebalanced.map((question) =>
      (question.payload as { choices: string[]; correctAnswer: string }).choices.indexOf(
        (question.payload as { choices: string[]; correctAnswer: string }).correctAnswer,
      ),
    );

    expect(correctIndexes).toEqual([0, 1, 2, 3]);
    expect((uniformQuestions[1].payload as { choices: string[] }).choices).toEqual(['A', 'B', 'C', 'D']);
  });
});
