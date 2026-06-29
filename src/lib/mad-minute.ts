import type { MadMinuteConfig } from './lesson-config-core';

export type MadMinuteFact = {
  factor: number;
  multiplier: number;
};

export type MadMinuteSubmittedAttempt = MadMinuteFact & {
  answer: number | string;
};

export type ScoredMadMinuteAttempt = MadMinuteSubmittedAttempt & {
  isCorrect: boolean;
};

export function generateMadMinuteFact(config: MadMinuteConfig, previousFact?: MadMinuteFact | null): MadMinuteFact {
  const minFactor = config.factor === 'mixed' ? (config.minFactor ?? 2) : config.factor;
  const maxFactor = config.factor === 'mixed' ? (config.maxFactor ?? 12) : config.factor;
  const candidates: MadMinuteFact[] = [];

  for (let factor = Math.ceil(Math.min(minFactor, maxFactor)); factor <= Math.floor(Math.max(minFactor, maxFactor)); factor += 1) {
    for (
      let multiplier = Math.ceil(Math.min(config.minMultiplier, config.maxMultiplier));
      multiplier <= Math.floor(Math.max(config.minMultiplier, config.maxMultiplier));
      multiplier += 1
    ) {
      candidates.push({ factor, multiplier });
    }
  }

  const nextCandidates =
    previousFact && candidates.length > 1
      ? candidates.filter((candidate) => !sameMadMinuteFact(candidate, previousFact))
      : candidates;

  return nextCandidates[randomInteger(0, nextCandidates.length - 1)] ?? { factor: minFactor, multiplier: config.minMultiplier };
}

export function isAllowedMadMinuteFact(config: MadMinuteConfig, factor: number, multiplier: number) {
  const minFactor = config.factor === 'mixed' ? (config.minFactor ?? 2) : config.factor;
  const maxFactor = config.factor === 'mixed' ? (config.maxFactor ?? 12) : config.factor;
  return (
    factor >= minFactor &&
    factor <= maxFactor &&
    multiplier >= config.minMultiplier &&
    multiplier <= config.maxMultiplier
  );
}

export function scoreMadMinuteAttempts(config: MadMinuteConfig, attempts: MadMinuteSubmittedAttempt[]) {
  const scored = attempts.map((attempt) => scoreMadMinuteAttempt(config, attempt));
  return {
    scored,
    scoreCorrect: scored.filter((attempt) => attempt.isCorrect).length,
    scoreTotal: scored.length,
  };
}

export function scoreMadMinuteAttempt(
  config: MadMinuteConfig,
  attempt: MadMinuteSubmittedAttempt,
): ScoredMadMinuteAttempt {
  const answer = Number(String(attempt.answer).trim());
  return {
    ...attempt,
    isCorrect:
      Number.isFinite(answer) &&
      isAllowedMadMinuteFact(config, attempt.factor, attempt.multiplier) &&
      answer === attempt.factor * attempt.multiplier,
  };
}

export function calculateMadMinuteXp(baseXp: number, scoreCorrect: number, scoreTotal: number, goalCorrect: number) {
  if (scoreTotal === 0) return 0;
  const goalBonus = scoreCorrect >= goalCorrect ? 10 : 0;
  return Math.min(75, baseXp + scoreCorrect + goalBonus);
}

function sameMadMinuteFact(a: MadMinuteFact, b: MadMinuteFact) {
  return a.factor === b.factor && a.multiplier === b.multiplier;
}

function randomInteger(min: number, max: number) {
  const low = Math.ceil(Math.min(min, max));
  const high = Math.floor(Math.max(min, max));
  return Math.floor(Math.random() * (high - low + 1)) + low;
}
