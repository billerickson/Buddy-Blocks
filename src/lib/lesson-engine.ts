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
  unorderedGroupsOf?: number;
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
      if (payload.unorderedGroupsOf && payload.unorderedGroupsOf > 1) {
        return groupedItemsMatch(answer, payload.correctOrder, payload.unorderedGroupsOf);
      }
      return payload.correctOrder.every((item, index) => normalizeText(answer[index]) === normalizeText(item));
    }
    default:
      return false;
  }
}

function groupedItemsMatch(answer: unknown[], correctOrder: string[], groupSize: number) {
  if (answer.length % groupSize !== 0 || correctOrder.length % groupSize !== 0) return false;

  const selectedGroups = groupItems(answer, groupSize);
  const correctGroups = groupItems(correctOrder, groupSize);
  const remaining = new Map<string, number>();

  for (const group of correctGroups) {
    const key = groupKey(group);
    remaining.set(key, (remaining.get(key) ?? 0) + 1);
  }

  for (const group of selectedGroups) {
    const key = groupKey(group);
    const count = remaining.get(key) ?? 0;
    if (count <= 0) return false;
    if (count === 1) remaining.delete(key);
    else remaining.set(key, count - 1);
  }

  return remaining.size === 0;
}

function groupItems(items: unknown[], groupSize: number) {
  const groups: unknown[][] = [];
  for (let index = 0; index < items.length; index += groupSize) {
    groups.push(items.slice(index, index + groupSize));
  }
  return groups;
}

function groupKey(items: unknown[]) {
  return items.map(normalizeText).sort().join('\u0000');
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
