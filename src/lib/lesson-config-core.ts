import type { QuestionMedia } from './lesson-engine';

export type LessonKind = 'standard' | 'mad-minute';

export type MadMinuteConfig = {
  mode: 'multiplication';
  factor: number | 'mixed';
  minFactor?: number;
  maxFactor?: number;
  minMultiplier: number;
  maxMultiplier: number;
  durationSeconds: number;
  goalCorrect: number;
};

export type StandardLessonConfig = {
  intro?: Array<{
    title: string;
    body: string;
    bullets?: string[];
    media?: QuestionMedia;
  }>;
  review?: {
    mode?: 'deck' | 'spaced';
    label?: string;
    shuffleQuestions?: boolean;
  };
};

export type LessonConfig = MadMinuteConfig | StandardLessonConfig;

export const DEFAULT_MAD_MINUTE_CONFIG: MadMinuteConfig = {
  mode: 'multiplication',
  factor: 'mixed',
  minFactor: 2,
  maxFactor: 12,
  minMultiplier: 1,
  maxMultiplier: 12,
  durationSeconds: 60,
  goalCorrect: 40,
};

export function isMadMinuteConfig(config: LessonConfig | null | undefined): config is MadMinuteConfig {
  if (!config || typeof config !== 'object') return false;
  const candidate = config as Partial<MadMinuteConfig>;
  return candidate.mode === 'multiplication' && (candidate.factor === 'mixed' || typeof candidate.factor === 'number');
}
