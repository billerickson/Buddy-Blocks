import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const curriculum = defineCollection({
  loader: glob({
    base: './src/content/curriculum',
    pattern: '**/*.md',
    generateId: ({ entry }) => entry.replace(/\.md$/, '').replaceAll('/', '__'),
  }),
  schema: z.object({}).passthrough(),
});

export const collections = { curriculum };
