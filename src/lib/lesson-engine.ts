export type ExerciseType = 'multiple-choice' | 'text-input' | 'match-pairs' | 'order-items' | 'fill-blank';

export type MultipleChoicePayload = {
  choices: string[];
  correctAnswer: string;
};

export type TextInputPayload = {
  acceptedAnswers: string[];
  answerType: 'text' | 'number';
};

export type MatchPairsPayload = {
  pairs: Array<{ left: string; right: string }>;
};

export type OrderItemsPayload = {
  items: string[];
  correctOrder: string[];
};

export type FillBlankPayload = {
  sentenceBefore: string;
  sentenceAfter: string;
  choices: string[];
  correctAnswer: string;
};

export type QuestionPayload =
  | MultipleChoicePayload
  | TextInputPayload
  | MatchPairsPayload
  | OrderItemsPayload
  | FillBlankPayload;

export type LessonQuestion = {
  id: string;
  type: ExerciseType;
  prompt: string;
  payload: QuestionPayload;
  explanation?: string | null;
};

export function normalizeText(value: unknown) {
  return String(value ?? '')
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase();
}

export function evaluateAnswer(question: LessonQuestion, answer: unknown) {
  switch (question.type) {
    case 'multiple-choice': {
      const payload = question.payload as MultipleChoicePayload;
      return normalizeText(answer) === normalizeText(payload.correctAnswer);
    }
    case 'fill-blank': {
      const payload = question.payload as FillBlankPayload;
      return normalizeText(answer) === normalizeText(payload.correctAnswer);
    }
    case 'text-input': {
      const payload = question.payload as TextInputPayload;
      if (payload.answerType === 'number') {
        const numericAnswer = Number(String(answer).trim());
        return payload.acceptedAnswers.some((accepted) => Number(accepted) === numericAnswer);
      }
      const normalized = normalizeText(answer);
      return payload.acceptedAnswers.some((accepted) => normalizeText(accepted) === normalized);
    }
    case 'match-pairs': {
      const payload = question.payload as MatchPairsPayload;
      if (!answer || typeof answer !== 'object' || Array.isArray(answer)) return false;
      const selected = answer as Record<string, unknown>;
      return payload.pairs.every((pair) => normalizeText(selected[pair.left]) === normalizeText(pair.right));
    }
    case 'order-items': {
      const payload = question.payload as OrderItemsPayload;
      if (!Array.isArray(answer) || answer.length !== payload.correctOrder.length) return false;
      return payload.correctOrder.every((item, index) => normalizeText(answer[index]) === normalizeText(item));
    }
    default:
      return false;
  }
}

export function getCorrectAnswerLabel(question: LessonQuestion) {
  switch (question.type) {
    case 'multiple-choice':
      return (question.payload as MultipleChoicePayload).correctAnswer;
    case 'fill-blank':
      return (question.payload as FillBlankPayload).correctAnswer;
    case 'text-input':
      return (question.payload as TextInputPayload).acceptedAnswers[0] ?? '';
    case 'match-pairs':
      return (question.payload as MatchPairsPayload).pairs.map((pair) => `${pair.left} = ${pair.right}`).join(', ');
    case 'order-items':
      return (question.payload as OrderItemsPayload).correctOrder.join(' ');
    default:
      return '';
  }
}

export function calculateXp(baseXp: number, correct: number, total: number, heartsRemaining: number) {
  const perfectBonus = correct === total ? 5 : 0;
  const earned = baseXp + correct + perfectBonus;
  return heartsRemaining <= 0 ? Math.max(5, Math.floor(earned / 2)) : earned;
}

