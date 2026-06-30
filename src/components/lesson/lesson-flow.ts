import type { StandardLessonConfig } from '../../lib/lesson-config-core';
import type { LessonQuestion, MultiBlankClozePayload, QuestionPayload } from '../../lib/lesson-engine';

export type QueueItem = {
  question: LessonQuestion;
  review: boolean;
};

export function prepareLessonQueue(questions: LessonQuestion[], config: StandardLessonConfig | null, lessonId: string): QueueItem[] {
  const orderedQuestions = config?.review?.shuffleQuestions ? shuffleQuestions(questions, lessonId) : questions;
  const questionsWithShuffledChoices = orderedQuestions.map((question) => shuffleQuestionChoices(question));
  return rebalanceUniformCorrectChoicePositions(questionsWithShuffledChoices).map((question) => ({ question, review: false }));
}

export function shuffleQuestions(questions: LessonQuestion[], seedValue: string) {
  const shuffled = [...questions];
  let seed = hashString(seedValue || questions.map((question) => question.id).join('|'));

  for (let index = shuffled.length - 1; index > 0; index--) {
    seed = nextSeed(seed);
    const swapIndex = seed % (index + 1);
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
}

export function shuffleQuestionChoices(question: LessonQuestion): LessonQuestion {
  if (question.type === 'multi-blank-cloze') {
    const payload = question.payload as MultiBlankClozePayload;
    return {
      ...question,
      payload: {
        ...payload,
        blanks: payload.blanks.map((blank, index) =>
          blank.choices
            ? {
                ...blank,
                choices: shuffleChoices(blank.choices, `${question.id}:blank:${index}`),
              }
            : blank,
        ),
      },
    };
  }

  if (!hasChoiceAnswerPayload(question.payload)) return question;

  return {
    ...question,
    payload: {
      ...question.payload,
      choices: shuffleChoices(question.payload.choices, question.id),
    },
  };
}

export function rebalanceUniformCorrectChoicePositions(questions: LessonQuestion[]) {
  const choiceQuestions = questions
    .map((question, index) => ({
      index,
      correctIndex: correctChoiceIndex(question),
    }))
    .filter((item): item is { index: number; correctIndex: number } => item.correctIndex !== null);

  if (choiceQuestions.length < 3) return questions;

  const firstCorrectIndex = choiceQuestions[0]?.correctIndex;
  if (firstCorrectIndex === undefined || choiceQuestions.some((item) => item.correctIndex !== firstCorrectIndex)) return questions;

  const rebalanced = [...questions];
  choiceQuestions.forEach((item, sequenceIndex) => {
    rebalanced[item.index] = moveCorrectChoiceToPosition(questions[item.index], sequenceIndex);
  });
  return rebalanced;
}

export function shuffleChoices(choices: string[], seedValue: string) {
  if (choices.length < 2) return choices;

  const shuffled = [...choices];
  let seed = hashString(seedValue || choices.join('|'));

  for (let index = shuffled.length - 1; index > 0; index--) {
    seed = nextSeed(seed);
    const swapIndex = seed % (index + 1);
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  if (sameOrder(shuffled, choices)) {
    const rotated = shuffled.slice(1);
    rotated.push(shuffled[0] ?? '');
    return rotated;
  }

  return shuffled;
}

function correctChoiceIndex(question: LessonQuestion) {
  if (!hasChoiceAnswerPayload(question.payload)) return null;
  if (question.payload.choices.length < 2) return null;

  const index = question.payload.choices.indexOf(question.payload.correctAnswer);
  return index >= 0 ? index : null;
}

function moveCorrectChoiceToPosition(question: LessonQuestion, targetIndex: number) {
  if (!hasChoiceAnswerPayload(question.payload)) return question;

  const choices = [...question.payload.choices];
  const correctIndex = choices.indexOf(question.payload.correctAnswer);
  if (correctIndex < 0) return question;

  const boundedTargetIndex = targetIndex % choices.length;
  const [correctChoice] = choices.splice(correctIndex, 1);
  choices.splice(boundedTargetIndex, 0, correctChoice ?? question.payload.correctAnswer);

  return {
    ...question,
    payload: {
      ...question.payload,
      choices,
    },
  };
}

function hasChoiceAnswerPayload(payload: QuestionPayload): payload is QuestionPayload & { choices: string[]; correctAnswer: string } {
  const candidate = payload as { choices?: unknown; correctAnswer?: unknown };
  return Array.isArray(candidate.choices) && typeof candidate.correctAnswer === 'string';
}

function sameOrder(left: string[], right: string[]) {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

export function hashString(value: string) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index++) {
    hash = Math.imul(hash ^ value.charCodeAt(index), 16777619);
  }
  return hash >>> 0;
}

export function nextSeed(seed: number) {
  return (Math.imul(seed, 1664525) + 1013904223) >>> 0;
}
