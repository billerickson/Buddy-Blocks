#!/usr/bin/env node

import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, join, resolve } from 'node:path';

const [inputDirectory, outputPath] = process.argv.slice(2);
if (!inputDirectory || !outputPath) {
  console.error('Usage: generate-sha256sums.mjs <directory> <output-file>');
  process.exit(2);
}

const outputName = basename(outputPath);
const extensions = new Set(['.bin', '.json', '.txt']);
const files = readdirSync(inputDirectory)
  .filter((name) => name !== outputName)
  .filter((name) => extensions.has(name.slice(name.lastIndexOf('.'))))
  .sort();

if (files.length === 0) {
  console.error('No release artifacts found for SHA-256 manifest.');
  process.exit(2);
}

const lines = files.map((name) => {
  const digest = createHash('sha256').update(readFileSync(join(inputDirectory, name))).digest('hex');
  return `${digest}  ${name}`;
});
writeFileSync(resolve(outputPath), `${lines.join('\n')}\n`, { mode: 0o600 });
