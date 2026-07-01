import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import {
  TRACKS,
  formatCurriculumSummary,
  getAllQuestions,
  summarizeCurriculum,
  validateCurriculum,
} from '../src/lib/curriculum';
import {
  buildCurriculumSeedStatements,
} from '../src/lib/seed-sql';

const database = 'DB';
const local = process.argv.includes('--remote') ? false : true;
const configIndex = process.argv.indexOf('--config');
const config = configIndex >= 0 ? process.argv[configIndex + 1] : undefined;
const persistToIndex = process.argv.indexOf('--persist-to');
const persistTo = persistToIndex >= 0 ? process.argv[persistToIndex + 1] : undefined;

if (configIndex >= 0 && !config) {
  throw new Error('--config requires a Wrangler config path');
}

if (persistToIndex >= 0 && !persistTo) {
  throw new Error('--persist-to requires a directory path');
}

const statements: string[] = ['PRAGMA foreign_keys = ON;'];
validateCurriculum(TRACKS);
const questions = getAllQuestions();

statements.push(...buildCurriculumSeedStatements(TRACKS, questions));

const seedFile = join(tmpdir(), `buddy-blocks-seed-${Date.now()}.sql`);
writeFileSync(seedFile, `${statements.join('\n')}\n`, 'utf8');

const command = process.platform === 'win32' ? 'npx.cmd' : 'npx';
const args = ['wrangler', 'd1', 'execute', database, local ? '--local' : '--remote', '--file', seedFile];
if (config) args.push('--config', config);
if (local && persistTo) args.push('--persist-to', persistTo);
execFileSync(command, args, { stdio: 'inherit' });

console.log(`Seeded ${database} ${local ? 'locally' : 'remotely'} with curriculum only. Run first setup in the app to create the parent account.`);
console.log(formatCurriculumSummary(summarizeCurriculum(TRACKS)));
