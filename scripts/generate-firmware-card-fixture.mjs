#!/usr/bin/env node

import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, isAbsolute, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(scriptDirectory, '..');
const outputRoot = resolve(repositoryRoot, 'firmware/esp32-p4/.artifacts/hil');
const allowedCounts = new Set([0, 1, 10, 100, 2500]);
const fixtureSource = 'buddy-blocks-hil:content-scale';

function usage() {
  return `Usage:
  node scripts/generate-firmware-card-fixture.mjs \\
    --child-id <child_profile_id> --count <0|1|10|100|2500> \\
    --output firmware/esp32-p4/.artifacts/hil/<name>.sql [--force]
  node scripts/generate-firmware-card-fixture.mjs --self-test`;
}

function parseArguments(argv) {
  const options = { force: false, selfTest: false };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === '--force') {
      options.force = true;
      continue;
    }
    if (argument === '--self-test') {
      options.selfTest = true;
      continue;
    }
    if (!['--child-id', '--count', '--output'].includes(argument)) {
      throw new Error(`Unknown argument: ${argument}`);
    }
    const value = argv[index + 1];
    if (!value || value.startsWith('--')) {
      throw new Error(`Missing value for ${argument}`);
    }
    options[argument.slice(2).replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())] = value;
    index += 1;
  }
  return options;
}

function validateOptions(options) {
  if (!options.childId || !/^[A-Za-z0-9_-]{1,128}$/.test(options.childId)) {
    throw new Error('Child ID must use 1-128 letters, digits, underscores, or hyphens.');
  }
  const count = Number(options.count);
  if (!Number.isSafeInteger(count) || !allowedCounts.has(count)) {
    throw new Error('Count must be exactly 0, 1, 10, 100, or 2500.');
  }
  if (!options.output || !options.output.endsWith('.sql')) {
    throw new Error('Output must be a .sql file below firmware/esp32-p4/.artifacts/hil/.');
  }
  const outputPath = resolve(repositoryRoot, options.output);
  const outputRelative = relative(outputRoot, outputPath);
  if (!outputRelative || outputRelative.startsWith('..') || isAbsolute(outputRelative)) {
    throw new Error('Output must be a file below firmware/esp32-p4/.artifacts/hil/.');
  }
  return { count, outputPath };
}

function sqlString(value) {
  return `'${String(value).replaceAll("'", "''")}'`;
}

function fixturePrefix(childId) {
  const suffix = childId.replaceAll('-', '_').slice(-32);
  return `buddy_hil_scale_${suffix}`;
}

function valuesStatement(table, columns, rows) {
  if (rows.length === 0) return '';
  return `INSERT INTO ${table} (${columns.join(', ')}) VALUES\n${rows
    .map((row) => `  (${row.join(', ')})`)
    .join(',\n')};\n`;
}

export function generateFixtureSql(childId, count) {
  if (!/^[A-Za-z0-9_-]{1,128}$/.test(childId) || !allowedCounts.has(count)) {
    throw new Error('Invalid fixture inputs.');
  }
  const prefix = fixturePrefix(childId);
  const sectionCount = Math.ceil(count / 100);
  const lines = [
    '-- Generated Buddy Blocks ESP32-P4 hardware-in-the-loop fixture.',
    '-- Review before applying. This deletes only rows with the exact HIL source for this child.',
    'PRAGMA foreign_keys=ON;',
    `DELETE FROM practice_sets WHERE child_profile_id = ${sqlString(childId)} AND source = ${sqlString(fixtureSource)};`,
    '',
  ];

  if (count > 0) {
    const sectionRows = [];
    for (let sectionIndex = 0; sectionIndex < sectionCount; sectionIndex += 1) {
      const sectionNumber = sectionIndex + 1;
      sectionRows.push([
        sqlString(`${prefix}_section_${String(sectionNumber).padStart(2, '0')}`),
        sqlString(childId),
        sqlString('vocabulary'),
        sqlString(`HIL scale ${count} cards ${sectionNumber}/${sectionCount}`),
        sqlString(fixtureSource),
        sqlString('active'),
        sectionIndex === 0 ? '1' : '0',
        'NULL',
        'NULL',
        'NULL',
        "datetime('now')",
        "datetime('now')",
      ]);
    }
    lines.push(valuesStatement(
      'practice_sets',
      ['id', 'child_profile_id', 'subject', 'title', 'source', 'status', 'pinned',
        'starts_at', 'expires_at', 'archived_at', 'created_at', 'updated_at'],
      sectionRows,
    ));

    for (let firstCard = 0; firstCard < count; firstCard += 100) {
      const cardRows = [];
      const lastCard = Math.min(count, firstCard + 100);
      for (let cardIndex = firstCard; cardIndex < lastCard; cardIndex += 1) {
        const cardNumber = cardIndex + 1;
        const sectionNumber = Math.floor(cardIndex / 100) + 1;
        const sortOrder = cardIndex % 100 + 1;
        cardRows.push([
          sqlString(`${prefix}_card_${String(cardNumber).padStart(4, '0')}`),
          sqlString(`${prefix}_section_${String(sectionNumber).padStart(2, '0')}`),
          sqlString(`HIL front ${String(cardNumber).padStart(4, '0')}`),
          sqlString(`HIL back ${String(cardNumber).padStart(4, '0')}`),
          sqlString(`HIL clue ${String(cardNumber).padStart(4, '0')}`),
          sqlString('[]'),
          String(sortOrder),
        ]);
      }
      lines.push(valuesStatement(
        'practice_set_cards',
        ['id', 'practice_set_id', 'term', 'definition', 'example',
          'accepted_answers_json', 'sort_order'],
        cardRows,
      ));
    }
  }

  lines.push(
    `INSERT INTO child_content_revisions (child_profile_id, flash_cards_revision, updated_at)
VALUES (${sqlString(childId)}, 1, datetime('now'))
ON CONFLICT(child_profile_id) DO UPDATE SET
  flash_cards_revision = child_content_revisions.flash_cards_revision + 1,
  updated_at = excluded.updated_at;`,
    '',
    `SELECT COUNT(DISTINCT practice_sets.id) AS hil_sections,
       COUNT(practice_set_cards.id) AS hil_cards
FROM practice_sets
LEFT JOIN practice_set_cards ON practice_set_cards.practice_set_id = practice_sets.id
WHERE practice_sets.child_profile_id = ${sqlString(childId)}
  AND practice_sets.source = ${sqlString(fixtureSource)};`,
    '',
  );
  return lines.join('\n');
}

function countOccurrences(value, pattern) {
  return [...value.matchAll(pattern)].length;
}

function runSelfTest() {
  for (const count of allowedCounts) {
    const sql = generateFixtureSql('child_hil_123', count);
    const expectedSections = Math.ceil(count / 100);
    if (countOccurrences(sql, /buddy_hil_scale_child_hil_123_section_\d{2}'/g) !==
        expectedSections + count) {
      throw new Error(`Section reference count mismatch for ${count}.`);
    }
    if (countOccurrences(sql, /buddy_hil_scale_child_hil_123_card_\d{4}'/g) !== count) {
      throw new Error(`Card row count mismatch for ${count}.`);
    }
    if (!sql.includes("source = 'buddy-blocks-hil:content-scale'")) {
      throw new Error('Fixture cleanup is not scoped by the exact HIL source.');
    }
    if (!sql.includes('flash_cards_revision = child_content_revisions.flash_cards_revision + 1')) {
      throw new Error('Fixture does not advance the device content revision.');
    }
  }
  for (const invalidCount of [-1, 2, 2501]) {
    try {
      generateFixtureSql('child_hil_123', invalidCount);
      throw new Error(`Invalid count ${invalidCount} was accepted.`);
    } catch (error) {
      if (error.message.startsWith('Invalid count')) throw error;
    }
  }
  console.log('firmware card fixture generator: PASS');
}

async function main() {
  let options;
  try {
    options = parseArguments(process.argv.slice(2));
    if (options.selfTest) {
      runSelfTest();
      return;
    }
    const { count, outputPath } = validateOptions(options);
    const sql = generateFixtureSql(options.childId, count);
    await mkdir(dirname(outputPath), { recursive: true });
    await writeFile(outputPath, sql, { encoding: 'utf8', flag: options.force ? 'w' : 'wx' });
    const displayPath = relative(repositoryRoot, outputPath);
    console.log(`Generated ${count}-card HIL fixture SQL: ${displayPath}`);
    console.log('This command did not modify D1. Review the SQL before explicitly applying it.');
    console.log(
      `npx wrangler d1 execute DB --config wrangler.deploy.jsonc --remote --file ${displayPath}`,
    );
  } catch (error) {
    console.error(error.message);
    console.error(usage());
    process.exitCode = 2;
  }
}

await main();
