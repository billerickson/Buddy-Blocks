export const MULTIPLICATION_MIN_FACTOR = 1;
export const MULTIPLICATION_MAX_FACTOR = 12;
export const MULTIPLICATION_MIN_MULTIPLIER = 1;
export const MULTIPLICATION_MAX_MULTIPLIER = 12;
export const MULTIPLICATION_TIMED_DURATIONS = [60, 120] as const;

export type MultiplicationMode = 'practice' | 'timed';
export type MultiplicationInputMethod = 'keyboard' | 'voice';
export type MultiplicationSessionInputMethod = MultiplicationInputMethod | 'mixed';

export type MultiplicationFact = {
  factor: number;
  multiplier: number;
};

export type MultiplicationConfig = {
  mode: MultiplicationMode;
  selectedFactors: number[];
  durationSeconds: 60 | 120 | null;
};

export type MultiplicationAttempt = MultiplicationFact & {
  answer: number | string;
  responseMs?: number;
  inputMethod?: MultiplicationInputMethod;
};

export type MultiplicationMasteryStats = {
  attempts: number;
  correct: number;
  correctStreak: number;
  bestKeyboardResponseMs: number | null;
};

export type MultiplicationMasteryLevel = 'new' | 'learning' | 'fluent';

export function normalizeSelectedFactors(values: readonly number[]) {
  return Array.from(
    new Set(
      values.filter(
        (value) =>
          Number.isInteger(value) && value >= MULTIPLICATION_MIN_FACTOR && value <= MULTIPLICATION_MAX_FACTOR,
      ),
    ),
  ).sort((a, b) => a - b);
}

export function buildMultiplicationFactPool(selectedFactors: readonly number[]) {
  const factors = normalizeSelectedFactors(selectedFactors);
  return factors.flatMap((factor) =>
    Array.from(
      { length: MULTIPLICATION_MAX_MULTIPLIER - MULTIPLICATION_MIN_MULTIPLIER + 1 },
      (_, index) => ({ factor, multiplier: MULTIPLICATION_MIN_MULTIPLIER + index }),
    ),
  );
}

export function buildMultiplicationDeck(
  selectedFactors: readonly number[],
  options: {
    previousFact?: MultiplicationFact | null;
    mastery?: ReadonlyMap<string, MultiplicationMasteryStats>;
    adaptive?: boolean;
    random?: () => number;
  } = {},
) {
  const random = options.random ?? Math.random;
  const facts = buildMultiplicationFactPool(selectedFactors);
  const weightedFacts = options.adaptive
    ? facts.flatMap((fact) => Array.from({ length: practiceWeight(options.mastery?.get(multiplicationFactKey(fact))) }, () => fact))
    : facts;
  const deck = shuffleMultiplicationFacts(weightedFacts, random);

  if (options.previousFact && deck.length > 1 && sameMultiplicationFact(deck[0], options.previousFact)) {
    const swapIndex = deck.findIndex((fact) => !sameMultiplicationFact(fact, options.previousFact!));
    if (swapIndex > 0) [deck[0], deck[swapIndex]] = [deck[swapIndex], deck[0]];
  }

  return avoidAdjacentDuplicateFacts(deck);
}

export function requeueMissedMultiplicationFact(
  deck: readonly MultiplicationFact[],
  fact: MultiplicationFact,
  spacing = 3,
) {
  const next = [...deck];
  const insertAt = Math.min(next.length, Math.max(0, Math.floor(spacing)));
  next.splice(insertAt, 0, fact);
  return next;
}

export function scoreMultiplicationAttempts(config: MultiplicationConfig, attempts: readonly MultiplicationAttempt[]) {
  const scored = attempts.map((attempt) => ({
    ...attempt,
    isCorrect: scoreMultiplicationAttempt(config, attempt),
  }));

  return {
    scored,
    scoreCorrect: scored.filter((attempt) => attempt.isCorrect).length,
    scoreTotal: scored.length,
  };
}

export function scoreMultiplicationAttempt(config: MultiplicationConfig, attempt: MultiplicationAttempt) {
  const answer = Number(String(attempt.answer).trim());
  return (
    Number.isFinite(answer) &&
    isAllowedMultiplicationFact(config, attempt) &&
    answer === attempt.factor * attempt.multiplier
  );
}

export function isAllowedMultiplicationFact(config: Pick<MultiplicationConfig, 'selectedFactors'>, fact: MultiplicationFact) {
  const selectedFactors = normalizeSelectedFactors(config.selectedFactors);
  return (
    selectedFactors.includes(fact.factor) &&
    Number.isInteger(fact.multiplier) &&
    fact.multiplier >= MULTIPLICATION_MIN_MULTIPLIER &&
    fact.multiplier <= MULTIPLICATION_MAX_MULTIPLIER
  );
}

export function calculateMultiplicationXp(scoreCorrect: number, scoreTotal: number) {
  if (scoreTotal < 10 || scoreCorrect <= 0) return 0;
  const accuracy = scoreCorrect / scoreTotal;
  const accuracyBonus = accuracy >= 0.9 ? 5 : accuracy >= 0.75 ? 2 : 0;
  return Math.min(30, 5 + Math.floor(scoreCorrect / 5) + accuracyBonus);
}

export function multiplicationMasteryLevel(stats: MultiplicationMasteryStats | null | undefined): MultiplicationMasteryLevel {
  if (!stats || stats.attempts === 0) return 'new';
  const accuracy = stats.correct / stats.attempts;
  const fluentSpeed = stats.bestKeyboardResponseMs === null || stats.bestKeyboardResponseMs <= 5_000;
  return stats.correct >= 4 && stats.correctStreak >= 3 && accuracy >= 0.8 && fluentSpeed ? 'fluent' : 'learning';
}

export function multiplicationFactKey(fact: MultiplicationFact) {
  return `${fact.factor}x${fact.multiplier}`;
}

export function multiplicationSelectionKey(
  selectedFactors: readonly number[],
  durationSeconds: number | null,
  inputMethod: MultiplicationSessionInputMethod,
) {
  return `${normalizeSelectedFactors(selectedFactors).join(',')}|${durationSeconds ?? 'practice'}|${inputMethod}`;
}

export function parseSpokenMultiplicationAnswer(alternatives: readonly string[]) {
  for (const alternative of alternatives) {
    const parsed = parseSpokenNumber(alternative);
    if (parsed !== null && parsed >= 0 && parsed <= MULTIPLICATION_MAX_FACTOR * MULTIPLICATION_MAX_MULTIPLIER) {
      return parsed;
    }
  }
  return null;
}

export function parseSpokenNumber(value: string) {
  const normalized = value
    .toLowerCase()
    .replace(/[-–—]/g, ' ')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!normalized) return null;

  const digitMatch = normalized.match(/\b\d{1,3}\b/);
  if (digitMatch) return Number(digitMatch[0]);

  const speech = normalized.replace(/\b(?:equals|equal) to\b/g, ' ').replace(/\s+/g, ' ').trim();
  const ignored = new Set(['the', 'answer', 'is', 'equals', 'equal']);
  const homophones: Record<string, string> = {
    won: 'one',
    to: 'two',
    too: 'two',
    for: 'four',
    fore: 'four',
    ate: 'eight',
  };
  const tokens = speech
    .split(' ')
    .filter((token) => !ignored.has(token))
    .map((token) => homophones[token] ?? token)
    .filter((token) => token !== 'and');
  if (tokens.length === 0) return null;

  const smallNumbers: Record<string, number> = {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    ten: 10,
    eleven: 11,
    twelve: 12,
    thirteen: 13,
    fourteen: 14,
    fifteen: 15,
    sixteen: 16,
    seventeen: 17,
    eighteen: 18,
    nineteen: 19,
  };
  const tens: Record<string, number> = {
    twenty: 20,
    thirty: 30,
    forty: 40,
    fifty: 50,
    sixty: 60,
    seventy: 70,
    eighty: 80,
    ninety: 90,
  };

  let total = 0;
  let current = 0;
  let recognized = false;
  for (const token of tokens) {
    if (token in smallNumbers) {
      current += smallNumbers[token];
      recognized = true;
      continue;
    }
    if (token in tens) {
      current += tens[token];
      recognized = true;
      continue;
    }
    if (token === 'hundred') {
      current = Math.max(1, current) * 100;
      recognized = true;
      continue;
    }
    return null;
  }

  total += current;
  return recognized ? total : null;
}

function shuffleMultiplicationFacts(facts: readonly MultiplicationFact[], random: () => number) {
  const shuffled = facts.map((fact) => ({ ...fact }));
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

function avoidAdjacentDuplicateFacts(facts: MultiplicationFact[]) {
  for (let index = 1; index < facts.length; index += 1) {
    if (!sameMultiplicationFact(facts[index], facts[index - 1])) continue;
    const swapIndex = facts.findIndex((fact, candidateIndex) => candidateIndex > index && !sameMultiplicationFact(fact, facts[index - 1]));
    if (swapIndex > index) [facts[index], facts[swapIndex]] = [facts[swapIndex], facts[index]];
  }
  return facts;
}

function practiceWeight(stats: MultiplicationMasteryStats | undefined) {
  if (!stats || stats.attempts === 0) return 2;
  if (multiplicationMasteryLevel(stats) === 'fluent') return 1;
  const accuracy = stats.correct / stats.attempts;
  return accuracy < 0.6 || stats.correctStreak === 0 ? 3 : 2;
}

function sameMultiplicationFact(a: MultiplicationFact | undefined, b: MultiplicationFact | undefined) {
  return Boolean(a && b && a.factor === b.factor && a.multiplier === b.multiplier);
}
