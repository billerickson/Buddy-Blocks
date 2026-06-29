import type { StandardLessonConfig } from '../../lib/lesson-config-core';
import type { LessonQuestion } from '../../lib/lesson-engine';

export type QueueItem = {
  question: LessonQuestion;
  review: boolean;
};

export function prepareLessonQueue(questions: LessonQuestion[], config: StandardLessonConfig | null, lessonId: string): QueueItem[] {
  const orderedQuestions = config?.review?.shuffleQuestions ? shuffleQuestions(questions, lessonId) : questions;
  return orderedQuestions.map((question) => ({ question, review: false }));
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
