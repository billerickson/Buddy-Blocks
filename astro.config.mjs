import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { execFileSync } from 'node:child_process';
import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');
const site = process.env.ASTRO_SITE ?? env.ASTRO_SITE ?? 'https://buddyblocks.yoursite.com';

function isIndexablePage(url) {
  const { pathname } = new URL(url);
  return pathname === '/' || pathname === '/courses/' || /^\/courses\/[^/]+\/$/.test(pathname);
}

function sourceFileForPathname(pathname) {
  if (pathname === '/') return 'src/pages/index.astro';
  if (pathname === '/courses/') return 'src/pages/courses/index.astro';
  if (/^\/courses\/[^/]+\/$/.test(pathname)) return 'src/pages/courses/[track].astro';
  return null;
}

function gitLastmod(pathname) {
  const sourceFile = sourceFileForPathname(pathname);
  if (!sourceFile) return new Date().toISOString();

  try {
    const output = execFileSync('git', ['log', '-1', '--format=%cI', '--', sourceFile], {
      encoding: 'utf-8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    return output || new Date().toISOString();
  } catch {
    return new Date().toISOString();
  }
}

export default defineConfig({
  integrations: [
    preact(),
    tailwind({ applyBaseStyles: false }),
    sitemap({
      entryLimit: 1000,
      filter: isIndexablePage,
      serialize(item) {
        const { pathname } = new URL(item.url);
        return {
          ...item,
          lastmod: gitLastmod(pathname),
          changefreq: pathname === '/' ? 'weekly' : 'monthly',
          priority: pathname === '/' ? 1 : pathname === '/courses/' ? 0.8 : 0.6,
        };
      },
      chunks: {
        courses(item) {
          return new URL(item.url).pathname.startsWith('/courses/') ? item : undefined;
        },
      },
    }),
  ],
  site,
});
