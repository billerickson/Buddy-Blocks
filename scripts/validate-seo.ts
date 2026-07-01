import { existsSync } from 'node:fs';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { parse } from 'node-html-parser';

type PageAudit = {
  file: string;
  route: string;
  title: string;
  description: string;
};

const distDir = path.join(process.cwd(), 'dist');
const titleRange = { min: 30, max: 65 };
const descriptionRange = { min: 70, max: 200 };

if (!existsSync(distDir)) {
  throw new Error('dist/ does not exist. Run `npm run build` before SEO validation.');
}

const htmlFiles = (await listHtmlFiles(distDir)).filter(isIndexableHtmlFile);
const audits: PageAudit[] = [];
const errors: string[] = [];

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf-8');
  const document = parse(html);
  const route = routeFromFile(file);
  const title = document.querySelector('title')?.text.trim() ?? '';
  const description = document.querySelector('meta[name="description"]')?.getAttribute('content')?.trim() ?? '';
  const robots = document.querySelector('meta[name="robots"]')?.getAttribute('content') ?? '';
  const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? '';
  const jsonLd = document.querySelector('script[type="application/ld+json"]')?.text.trim() ?? '';
  const h1Count = document.querySelectorAll('h1').length;
  const imagesWithoutAlt = document.querySelectorAll('img').filter((image) => !image.hasAttribute('alt'));

  if (h1Count !== 1) errors.push(`${route}: expected exactly one h1, found ${h1Count}.`);
  if (!title) errors.push(`${route}: missing title.`);
  if (title && (title.length < titleRange.min || title.length > titleRange.max)) {
    errors.push(`${route}: title length ${title.length} is outside ${titleRange.min}-${titleRange.max}.`);
  }
  if (!description) errors.push(`${route}: missing meta description.`);
  if (description && (description.length < descriptionRange.min || description.length > descriptionRange.max)) {
    errors.push(
      `${route}: description length ${description.length} is outside ${descriptionRange.min}-${descriptionRange.max}.`,
    );
  }
  if (!robots.includes('index, follow')) errors.push(`${route}: robots meta should include "index, follow".`);
  if (!canonical) errors.push(`${route}: missing canonical link.`);
  if (!jsonLd) errors.push(`${route}: missing JSON-LD structured data.`);
  if (imagesWithoutAlt.length > 0) errors.push(`${route}: ${imagesWithoutAlt.length} image(s) missing alt attributes.`);

  audits.push({ file, route, title, description });
}

for (const [field, label] of [
  ['title', 'title'],
  ['description', 'description'],
] as const) {
  const seen = new Map<string, string>();
  for (const audit of audits) {
    const value = audit[field];
    if (!value) continue;
    const existing = seen.get(value);
    if (existing) errors.push(`${audit.route}: duplicate ${label} also used by ${existing}.`);
    else seen.set(value, audit.route);
  }
}

if (errors.length > 0) {
  throw new Error(`SEO validation failed:\n${errors.map((error) => `- ${error}`).join('\n')}`);
}

console.log(`SEO validation passed for ${audits.length} public page(s).`);

async function listHtmlFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) return listHtmlFiles(entryPath);
      return entry.name.endsWith('.html') ? [entryPath] : [];
    }),
  );
  return files.flat();
}

function isIndexableHtmlFile(file: string) {
  const route = routeFromFile(file);
  return route === '/' || route === '/courses/' || /^\/courses\/[^/]+\/$/.test(route);
}

function routeFromFile(file: string) {
  const relative = path.relative(distDir, file).replaceAll(path.sep, '/');
  if (relative === 'index.html') return '/';
  return `/${relative.replace(/index\.html$/, '')}`;
}
