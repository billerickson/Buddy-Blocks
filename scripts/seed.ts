import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { CHILDREN, PARENT_EMAIL, PARENT_ID, PARENT_USERNAME, TRACKS, getAllLessons, getAllQuestions } from '../src/lib/content';
import { hashPassword } from '../src/lib/auth';

const databaseName = 'buddy_blocks';
const local = process.argv.includes('--remote') ? false : true;
const now = new Date().toISOString();
const parentPassword = process.env.BUDDY_BLOCKS_PARENT_PASSWORD || 'blocks';
const { hash, salt } = await hashPassword(parentPassword);

const statements: string[] = ['PRAGMA foreign_keys = ON;'];

upsert('parents', {
  id: PARENT_ID,
  username: PARENT_USERNAME,
  email: PARENT_EMAIL,
  password_hash: hash,
  password_salt: salt,
  status: 'active',
  created_at: now,
  updated_at: now,
});

for (const child of CHILDREN) {
  insertWithUpdate(
    'child_profiles',
    {
      id: child.id,
      parent_id: PARENT_ID,
      slug: child.slug,
      display_name: child.displayName,
      avatar_key: child.avatarKey,
      level_band: child.levelBand,
      hearts_remaining: 5,
      created_at: now,
      updated_at: now,
    },
    ['parent_id', 'slug', 'display_name', 'avatar_key', 'level_band', 'updated_at'],
  );
}

TRACKS.forEach((track, trackIndex) => {
  upsert('tracks', {
    id: track.id,
    slug: track.slug,
    title: track.title,
    description: track.description,
    color: track.color,
    accent: track.accent,
    sort_order: trackIndex + 1,
  });

  track.units.forEach((unit, unitIndex) => {
    upsert('units', {
      id: unit.id,
      track_id: track.id,
      slug: unit.slug,
      title: unit.title,
      description: unit.description,
      sort_order: unitIndex + 1,
    });

    unit.lessons.forEach((lesson, lessonIndex) => {
      upsert('lessons', {
        id: lesson.id,
        unit_id: unit.id,
        slug: lesson.slug,
        title: lesson.title,
        sort_order: lessonIndex + 1,
        xp_base: lesson.xpBase,
      });
    });
  });
});

for (const question of getAllQuestions()) {
  upsert('questions', {
    id: question.id,
    lesson_id: question.lessonId,
    type: question.type,
    prompt: question.prompt,
    payload_json: JSON.stringify(question.payload),
    explanation: question.explanation ?? null,
    sort_order: question.sortOrder,
  });
}

for (const child of CHILDREN) {
  for (const track of TRACKS) {
    const firstLesson = track.units[0]?.lessons[0];
    const firstUnit = track.units[0];
    if (!firstLesson || !firstUnit) continue;

    insertIgnore('child_track_progress', {
      id: `track_progress_${child.id}_${track.id}`,
      child_profile_id: child.id,
      track_id: track.id,
      current_unit_id: firstUnit.id,
      current_lesson_id: firstLesson.id,
      lessons_completed: 0,
      xp_total: 0,
      updated_at: now,
    });

    for (const lesson of getAllLessons().filter((item) => item.track.id === track.id)) {
      insertIgnore('child_lesson_progress', {
        id: `lesson_progress_${child.id}_${lesson.id}`,
        child_profile_id: child.id,
        lesson_id: lesson.id,
        status: lesson.id === firstLesson.id ? 'available' : 'locked',
        completed_at: null,
        best_score_correct: 0,
        best_score_total: 0,
      });
    }
  }
}

const seedFile = join(tmpdir(), `buddy-blocks-seed-${Date.now()}.sql`);
writeFileSync(seedFile, `${statements.join('\n')}\n`, 'utf8');

const command = process.platform === 'win32' ? 'npx.cmd' : 'npx';
const args = ['wrangler', 'd1', 'execute', databaseName, local ? '--local' : '--remote', '--file', seedFile];
execFileSync(command, args, { stdio: 'inherit' });

console.log(`Seeded ${databaseName} ${local ? 'locally' : 'remotely'} with parent "${PARENT_USERNAME}" and ${CHILDREN.length} child profiles.`);

function upsert(table: string, row: Record<string, unknown>) {
  insertWithUpdate(
    table,
    row,
    Object.keys(row).filter((column) => column !== 'id' && column !== 'created_at'),
  );
}

function insertWithUpdate(table: string, row: Record<string, unknown>, updateColumns: string[]) {
  const columns = Object.keys(row);
  const updates = updateColumns.map((column) => `${column} = excluded.${column}`).join(', ');
  statements.push(
    `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${columns.map((column) => sql(row[column])).join(', ')}) ON CONFLICT(id) DO UPDATE SET ${updates};`,
  );
}

function insertIgnore(table: string, row: Record<string, unknown>) {
  const columns = Object.keys(row);
  statements.push(
    `INSERT OR IGNORE INTO ${table} (${columns.join(', ')}) VALUES (${columns.map((column) => sql(row[column])).join(', ')});`,
  );
}

function sql(value: unknown) {
  if (value === null || value === undefined) return 'NULL';
  if (typeof value === 'number') return String(value);
  return `'${String(value).replaceAll("'", "''")}'`;
}

