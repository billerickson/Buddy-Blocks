import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import {
  TRACKS,
  formatCurriculumSummary,
  getAllLessons,
  getAllQuestions,
  summarizeCurriculum,
  validateCurriculum,
} from '../src/lib/curriculum';
import {
  CHILDREN,
  PARENT_EMAIL,
  PARENT_ID,
  PARENT_USERNAME,
  getTracksForChild,
} from '../src/lib/seed-family';
import { hashPassword } from '../src/lib/auth';
import {
  buildChildTrackRepairStatements,
  buildCurriculumSeedStatements,
  insertIgnoreStatement,
  insertWithUpdateStatement,
  upsertStatement,
} from '../src/lib/seed-sql';

const databaseName = 'buddy_blocks';
const local = process.argv.includes('--remote') ? false : true;
const now = new Date().toISOString();
const parentPassword = process.env.BUDDY_BLOCKS_PARENT_PASSWORD || 'blocks';
const { hash, salt } = await hashPassword(parentPassword);

const statements: string[] = ['PRAGMA foreign_keys = ON;'];
validateCurriculum(TRACKS);
const allLessons = getAllLessons();
const questions = getAllQuestions();

// Phase 1: canonical curriculum from Markdown source.
statements.push(...buildCurriculumSeedStatements(TRACKS, questions));

// Phase 2: fixed v1 family/profile data.
statements.push(
  upsertStatement('parents', {
    id: PARENT_ID,
    username: PARENT_USERNAME,
    email: PARENT_EMAIL,
    password_hash: hash,
    password_salt: salt,
    status: 'active',
    created_at: now,
    updated_at: now,
  }),
);

for (const child of CHILDREN) {
  statements.push(
    insertWithUpdateStatement(
      'child_profiles',
      {
        id: child.id,
        parent_id: PARENT_ID,
        slug: child.slug,
        display_name: child.displayName,
        avatar_key: child.avatarKey,
        level_band: child.levelBand,
        grade_level: child.gradeLevel,
        hearts_remaining: 5,
        created_at: now,
        updated_at: now,
      },
      ['parent_id', 'slug', 'display_name', 'avatar_key', 'level_band', 'grade_level', 'updated_at'],
    ),
  );

}

for (const child of CHILDREN) {
  for (const track of getTracksForChild(child)) {
    const firstLesson = track.units[0]?.lessons[0];
    const firstUnit = track.units[0];
    if (!firstLesson || !firstUnit) continue;

    statements.push(
      insertIgnoreStatement('child_track_progress', {
        id: `track_progress_${child.id}_${track.id}`,
        child_profile_id: child.id,
        track_id: track.id,
        current_unit_id: firstUnit.id,
        current_lesson_id: firstLesson.id,
        lessons_completed: 0,
        xp_total: 0,
        updated_at: now,
      }),
    );

    for (const lesson of allLessons.filter((item) => item.track.id === track.id)) {
      const status = lesson.id === firstLesson.id || lesson.kind === 'mad-minute' ? 'available' : 'locked';
      statements.push(
        insertIgnoreStatement('child_lesson_progress', {
          id: `lesson_progress_${child.id}_${lesson.id}`,
          child_profile_id: child.id,
          lesson_id: lesson.id,
          status,
          completed_at: null,
          best_score_correct: 0,
          best_score_total: 0,
        }),
      );
    }

    statements.push(...buildChildTrackRepairStatements(child.id, track.id, now));
  }
}

const seedFile = join(tmpdir(), `buddy-blocks-seed-${Date.now()}.sql`);
writeFileSync(seedFile, `${statements.join('\n')}\n`, 'utf8');

const command = process.platform === 'win32' ? 'npx.cmd' : 'npx';
const args = ['wrangler', 'd1', 'execute', databaseName, local ? '--local' : '--remote', '--file', seedFile];
execFileSync(command, args, { stdio: 'inherit' });

console.log(`Seeded ${databaseName} ${local ? 'locally' : 'remotely'} with parent "${PARENT_USERNAME}" and ${CHILDREN.length} child profiles.`);
console.log(formatCurriculumSummary(summarizeCurriculum(TRACKS)));
