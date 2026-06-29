export type ExerciseType =
  | 'multiple-choice'
  | 'text-input'
  | 'match-pairs'
  | 'order-items'
  | 'fill-blank'
  | 'passage-question'
  | 'multi-blank-cloze'
  | 'constructed-response'
  | 'dialogue-builder'
  | 'listening-question'
  | 'speaking-prompt'
  | 'error-correction'
  | 'conjugation-grid'
  | 'flash-card';

export type QuestionMedia = {
  image?: {
    src: string;
    alt: string;
    caption?: string;
  };
  audio?: {
    src: string;
    label?: string;
    transcript?: string;
  };
  video?: {
    src: string;
    label?: string;
  };
};

type MediaPayload = {
  media?: QuestionMedia;
};

export type MultipleChoicePayload = MediaPayload & {
  choices: string[];
  correctAnswer: string;
};

export type TextInputPayload = MediaPayload & {
  acceptedAnswers: string[];
  answerType: 'text' | 'number';
};

export type MatchPairsPayload = MediaPayload & {
  pairs: Array<{ left: string; right: string }>;
};

export type OrderItemsPayload = MediaPayload & {
  items: string[];
  correctOrder: string[];
  unorderedGroupsOf?: number;
};

export type FillBlankPayload = MediaPayload & {
  sentenceBefore: string;
  sentenceAfter: string;
  choices: string[];
  correctAnswer: string;
};

export type PassageQuestionPayload = MediaPayload & {
  passageTitle?: string;
  passage: string;
  question: string;
  choices: string[];
  correctAnswer: string;
};

export type MultiBlankClozePayload = MediaPayload & {
  parts: string[];
  blanks: Array<{
    label?: string;
    correctAnswer: string;
    acceptedAnswers?: string[];
    answerType?: 'text' | 'number';
    choices?: string[];
  }>;
};

export type ConstructedResponsePayload = MediaPayload & {
  sampleAnswer?: string;
  minWords?: number;
  minCharacters?: number;
  checklist?: string[];
};

export type DialogueBuilderPayload = MediaPayload & {
  turns: Array<{ speaker: string; line: string }>;
  choices: string[];
  correctAnswer: string;
};

export type ListeningQuestionPayload = MediaPayload & {
  audioSrc: string;
  audioLabel?: string;
  transcript?: string;
  choices: string[];
  correctAnswer: string;
};

export type SpeakingPromptPayload = MediaPayload & {
  sampleAnswer?: string;
  minSeconds?: number;
  checklist?: string[];
};

export type ErrorCorrectionPayload = MediaPayload & {
  sentence: string;
  acceptedAnswers: string[];
};

export type ConjugationGridCellAnswer = string | string[];

export type ConjugationGridPayload = MediaPayload & {
  columns: string[];
  rows: Array<{
    label: string;
    answers: ConjugationGridCellAnswer[];
  }>;
};

export type FlashCardPayload = MediaPayload & {
  mode: 'easy' | 'medium' | 'hard';
  front: string;
  choices?: string[];
  correctAnswer?: string;
  acceptedAnswers?: string[];
  answerType?: 'text' | 'number';
};

export type QuestionPayload =
  | MultipleChoicePayload
  | TextInputPayload
  | MatchPairsPayload
  | OrderItemsPayload
  | FillBlankPayload
  | PassageQuestionPayload
  | MultiBlankClozePayload
  | ConstructedResponsePayload
  | DialogueBuilderPayload
  | ListeningQuestionPayload
  | SpeakingPromptPayload
  | ErrorCorrectionPayload
  | ConjugationGridPayload
  | FlashCardPayload;

export type LessonQuestion = {
  id: string;
  type: ExerciseType;
  prompt: string;
  payload: QuestionPayload;
  explanation?: string | null;
};

export function normalizeText(value: unknown) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[¿¡]/g, '')
    .replace(/[.,!?;:]/g, '')
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase();
}

function normalizeTextStrict(value: unknown) {
  return String(value ?? '')
    .normalize('NFC')
    .replace(/[¿¡]/g, '')
    .replace(/[.,!?;:]/g, '')
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
      return textAnswerMatches(answer, payload.acceptedAnswers, payload.answerType);
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
    case 'passage-question': {
      const payload = question.payload as PassageQuestionPayload;
      return normalizeText(answer) === normalizeText(payload.correctAnswer);
    }
    case 'multi-blank-cloze': {
      const payload = question.payload as MultiBlankClozePayload;
      if (!Array.isArray(answer) || answer.length !== payload.blanks.length) return false;
      return payload.blanks.every((blank, index) => {
        const acceptedAnswers = blank.acceptedAnswers ?? [blank.correctAnswer];
        return textAnswerMatches(answer[index], acceptedAnswers, blank.answerType ?? 'text');
      });
    }
    case 'constructed-response': {
      const payload = question.payload as ConstructedResponsePayload;
      const response = String(answer ?? '').trim();
      if (!response) return false;
      if (payload.minCharacters && response.length < payload.minCharacters) return false;
      if (payload.minWords && wordCount(response) < payload.minWords) return false;
      return true;
    }
    case 'dialogue-builder': {
      const payload = question.payload as DialogueBuilderPayload;
      return normalizeText(answer) === normalizeText(payload.correctAnswer);
    }
    case 'listening-question': {
      const payload = question.payload as ListeningQuestionPayload;
      return normalizeText(answer) === normalizeText(payload.correctAnswer);
    }
    case 'speaking-prompt':
      return speakingPromptAnswered(answer);
    case 'error-correction': {
      const payload = question.payload as ErrorCorrectionPayload;
      return textAnswerMatches(answer, payload.acceptedAnswers, 'text');
    }
    case 'conjugation-grid': {
      const payload = question.payload as ConjugationGridPayload;
      if (!answer || typeof answer !== 'object' || Array.isArray(answer)) return false;
      const selected = answer as Record<string, unknown>;
      return payload.rows.every((row) => {
        const rowAnswers = selected[row.label];
        if (!Array.isArray(rowAnswers) || rowAnswers.length !== payload.columns.length) return false;
        return payload.columns.every((_, index) => textAnswerMatches(rowAnswers[index], cellAcceptedAnswers(row.answers[index]), 'text'));
      });
    }
    case 'flash-card': {
      const payload = question.payload as FlashCardPayload;
      if (payload.mode === 'easy') return normalizeText(answer) === normalizeText(payload.correctAnswer);
      return textAnswerMatches(answer, flashCardAcceptedAnswers(payload), payload.answerType ?? 'text');
    }
    default:
      return false;
  }
}

function textAnswerMatches(answer: unknown, acceptedAnswers: string[], answerType: 'text' | 'number') {
  if (answerType === 'number') {
    const numericAnswer = Number(String(answer).trim());
    return Number.isFinite(numericAnswer) && acceptedAnswers.some((accepted) => Number(accepted) === numericAnswer);
  }

  const normalized = normalizeText(answer);
  return acceptedAnswers.some((accepted) => normalizeText(accepted) === normalized);
}

function wordCount(value: string) {
  return value.split(/\s+/).filter(Boolean).length;
}

function speakingPromptAnswered(answer: unknown) {
  if (typeof answer === 'string') return Boolean(answer.trim());
  if (!answer || typeof answer !== 'object' || Array.isArray(answer)) return false;

  const response = answer as Record<string, unknown>;
  return Boolean(response.recorded) || Boolean(String(response.note ?? '').trim()) || Boolean(String(response.transcript ?? '').trim());
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
    case 'passage-question':
      return (question.payload as PassageQuestionPayload).correctAnswer;
    case 'multi-blank-cloze': {
      const payload = question.payload as MultiBlankClozePayload;
      return payload.blanks.map((blank) => blank.correctAnswer).join(', ');
    }
    case 'constructed-response':
      return (question.payload as ConstructedResponsePayload).sampleAnswer ?? 'Use a complete answer.';
    case 'dialogue-builder':
      return (question.payload as DialogueBuilderPayload).correctAnswer;
    case 'listening-question':
      return (question.payload as ListeningQuestionPayload).correctAnswer;
    case 'speaking-prompt':
      return (question.payload as SpeakingPromptPayload).sampleAnswer ?? 'Practice response recorded.';
    case 'error-correction':
      return (question.payload as ErrorCorrectionPayload).acceptedAnswers[0] ?? '';
    case 'conjugation-grid': {
      const payload = question.payload as ConjugationGridPayload;
      return payload.rows
        .flatMap((row) =>
          payload.columns.map((column, index) => `${row.label} ${column}: ${firstCellAnswer(row.answers[index])}`),
        )
        .join(', ');
    }
    case 'flash-card': {
      const payload = question.payload as FlashCardPayload;
      return payload.mode === 'easy' ? (payload.correctAnswer ?? '') : (flashCardAcceptedAnswers(payload)[0] ?? '');
    }
    default:
      return '';
  }
}

export function getAccentFeedback(question: LessonQuestion, answer: unknown) {
  if (question.type === 'text-input') {
    const payload = question.payload as TextInputPayload;
    return accentFeedbackForAnswer(answer, payload.acceptedAnswers, payload.answerType);
  }

  if (question.type === 'error-correction') {
    const payload = question.payload as ErrorCorrectionPayload;
    return accentFeedbackForAnswer(answer, payload.acceptedAnswers, 'text');
  }

  if (question.type === 'multi-blank-cloze') {
    const payload = question.payload as MultiBlankClozePayload;
    if (!Array.isArray(answer)) return null;
    const accentedAnswers = payload.blanks
      .map((blank, index) => accentFeedbackForAnswer(answer[index], blank.acceptedAnswers ?? [blank.correctAnswer], blank.answerType ?? 'text'))
      .filter(Boolean);
    return accentedAnswers.length ? `Accent note: ${accentedAnswers.join(', ')}` : null;
  }

  if (question.type === 'conjugation-grid') {
    const payload = question.payload as ConjugationGridPayload;
    if (!answer || typeof answer !== 'object' || Array.isArray(answer)) return null;
    const selected = answer as Record<string, unknown>;
    const accentedAnswers = payload.rows.flatMap((row) => {
      const rowAnswers = selected[row.label];
      if (!Array.isArray(rowAnswers)) return [];
      return payload.columns
        .map((_, index) => accentFeedbackForAnswer(rowAnswers[index], cellAcceptedAnswers(row.answers[index]), 'text'))
        .filter(Boolean) as string[];
    });
    return accentedAnswers.length ? `Accent note: ${accentedAnswers.join(', ')}` : null;
  }

  if (question.type === 'flash-card') {
    const payload = question.payload as FlashCardPayload;
    if (payload.mode === 'easy') return null;
    return accentFeedbackForAnswer(answer, flashCardAcceptedAnswers(payload), payload.answerType ?? 'text');
  }

  return null;
}

function accentFeedbackForAnswer(answer: unknown, acceptedAnswers: string[], answerType: 'text' | 'number') {
  if (answerType === 'number') return null;

  const relaxedAnswer = normalizeText(answer);
  const strictAnswer = normalizeTextStrict(answer);
  const relaxedMatch = acceptedAnswers.find((accepted) => normalizeText(accepted) === relaxedAnswer);
  if (!relaxedMatch) return null;

  return normalizeTextStrict(relaxedMatch) === strictAnswer ? null : relaxedMatch;
}

function cellAcceptedAnswers(answer: ConjugationGridCellAnswer | undefined) {
  if (!answer) return [''];
  return Array.isArray(answer) ? answer : [answer];
}

function firstCellAnswer(answer: ConjugationGridCellAnswer | undefined) {
  return cellAcceptedAnswers(answer)[0] ?? '';
}

function flashCardAcceptedAnswers(payload: FlashCardPayload) {
  return payload.acceptedAnswers ?? (payload.correctAnswer ? [payload.correctAnswer] : []);
}

export function calculateXp(baseXp: number, correct: number, total: number, heartsRemaining: number) {
  const perfectBonus = correct === total ? 5 : 0;
  const earned = baseXp + correct + perfectBonus;
  return heartsRemaining <= 0 ? Math.max(5, Math.floor(earned / 2)) : earned;
}
