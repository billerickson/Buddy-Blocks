import { z } from 'zod';
import { DEFAULT_MAD_MINUTE_CONFIG, type MadMinuteConfig, type StandardLessonConfig } from './lesson-config-core';
export {
  DEFAULT_MAD_MINUTE_CONFIG,
  isMadMinuteConfig,
  type LessonConfig,
  type LessonKind,
  type MadMinuteConfig,
  type StandardLessonConfig,
} from './lesson-config-core';

export const LessonKindSchema = z.enum(['standard', 'mad-minute']);

export const MediaSchema = z.object({
  image: z
    .object({
      src: z.string().min(1),
      alt: z.string().min(1),
      caption: z.string().optional(),
    })
    .optional(),
  audio: z
    .object({
      src: z.string().min(1),
      label: z.string().optional(),
      transcript: z.string().optional(),
    })
    .optional(),
  video: z
    .object({
      src: z.string().min(1),
      label: z.string().optional(),
    })
    .optional(),
});

export const MadMinuteConfigSchema = z
  .object({
    mode: z.literal('multiplication'),
    factor: z.union([z.number().int().min(2).max(12), z.literal('mixed')]),
    minFactor: z.number().int().min(2).max(12).optional(),
    maxFactor: z.number().int().min(2).max(12).optional(),
    minMultiplier: z.number().int().min(1).max(12),
    maxMultiplier: z.number().int().min(1).max(12),
    durationSeconds: z.number().int().min(10).max(120),
    goalCorrect: z.number().int().min(1).max(120),
  })
  .superRefine((config, context) => {
    const minFactor = config.factor === 'mixed' ? (config.minFactor ?? 2) : config.factor;
    const maxFactor = config.factor === 'mixed' ? (config.maxFactor ?? 12) : config.factor;

    if (minFactor > maxFactor) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'minFactor must be less than or equal to maxFactor',
        path: ['minFactor'],
      });
    }
    if (config.minMultiplier > config.maxMultiplier) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'minMultiplier must be less than or equal to maxMultiplier',
        path: ['minMultiplier'],
      });
    }
  });

export const StandardLessonConfigSchema = z.object({
  intro: z
    .array(
      z.object({
        title: z.string().min(1),
        body: z.string().min(1),
        bullets: z.array(z.coerce.string()).min(1).optional(),
        media: MediaSchema.optional(),
      }),
    )
    .min(1)
    .optional(),
  review: z
    .object({
      mode: z.enum(['deck', 'spaced']).default('deck'),
      label: z.string().optional(),
      shuffleQuestions: z.boolean().optional(),
    })
    .optional(),
});

export function parseMadMinuteConfig(configJson: string | null | undefined): MadMinuteConfig {
  if (!configJson) return DEFAULT_MAD_MINUTE_CONFIG;

  try {
    const parsed = MadMinuteConfigSchema.safeParse(JSON.parse(configJson));
    if (!parsed.success) return DEFAULT_MAD_MINUTE_CONFIG;
    return normalizeMadMinuteConfig(parsed.data);
  } catch {
    return DEFAULT_MAD_MINUTE_CONFIG;
  }
}

export function parseStandardLessonConfig(configJson: string | null | undefined): StandardLessonConfig | null {
  if (!configJson) return null;

  try {
    const parsed = StandardLessonConfigSchema.safeParse(JSON.parse(configJson));
    if (!parsed.success) return null;
    if (!parsed.data.intro && !parsed.data.review) return null;
    return parsed.data;
  } catch {
    return null;
  }
}

function normalizeMadMinuteConfig(config: MadMinuteConfig): MadMinuteConfig {
  const minFactor = config.factor === 'mixed' ? (config.minFactor ?? 2) : config.factor;
  const maxFactor = config.factor === 'mixed' ? (config.maxFactor ?? 12) : config.factor;

  return {
    ...config,
    minFactor,
    maxFactor,
  };
}
