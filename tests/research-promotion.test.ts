import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { loadCurriculumFromRoot, validateCurriculum } from '../src/lib/curriculum';
import { promoteResearchTracks } from '../scripts/research-promotion';

describe('research promotion workflow', () => {
  it('selects ready-for-import tracks by default and reports generated paths on dry run', async () => {
    const root = createTempWorkspace();
    writeManifest(root, [
      manifestTrack('grammar-1', 'ready_for_import'),
      manifestTrack('logic-1', 'research_only'),
      manifestTrack('spanish-1', 'imported'),
    ]);
    writeResearchTrack(root, 'grammar-1', { track: 'Grammar', level: 'Level 1' });
    writeResearchTrack(root, 'logic-1', { track: 'Logic', level: 'Level 1' });
    writeResearchTrack(root, 'spanish-1', { track: 'Spanish', level: 'Level 1' });

    const result = await promoteResearchTracks({
      cwd: root,
      outputRoot: join(root, 'out'),
      now: new Date('2026-07-01T12:00:00.000Z'),
    });

    expect(result.selectedTracks).toEqual(['grammar-1']);
    expect(result.blockers).toEqual([]);
    expect(result.generatedFiles.map((file) => file.replace(root, '<root>'))).toEqual([
      '<root>/out/grade-03/06-grammar/track.yaml',
      '<root>/out/grade-03/06-grammar/01-sentence-foundations/unit.yaml',
      '<root>/out/grade-03/06-grammar/01-sentence-foundations/01-complete-thoughts.md',
    ]);
  });

  it('writes promoted curriculum, preserves hints, and strips author-only metadata', async () => {
    const root = createTempWorkspace();
    const outputRoot = join(root, 'out');
    writeManifest(root, [manifestTrack('grammar-1', 'ready_for_import')]);
    writeResearchTrack(root, 'grammar-1', {
      track: 'Grammar',
      level: 'Level 1',
      lessonTitle: 'Anchor Facts: Twos, Fives, And Tens',
    });

    const result = await promoteResearchTracks({
      cwd: root,
      outputRoot,
      dryRun: false,
      now: new Date('2026-07-01T12:00:00.000Z'),
    });

    expect(result.blockers).toEqual([]);
    const tracks = loadCurriculumFromRoot(outputRoot);
    validateCurriculum(tracks, { requireQuestionKeys: true });
    expect(tracks[0]).toMatchObject({
      id: 'track_grade3_grammar',
      slug: 'grammar-1',
      subject: 'grammar',
      title: 'Grammar 1',
    });
    expect(tracks[0]?.units[0]?.lessons[0]?.questions[0]).toMatchObject({
      key: 'u01_l01_q01_complete_sentence',
      hint: 'Ask whether it tells a whole idea.',
    });
    expect(tracks[0]?.units[0]?.lessons[0]?.title).toBe('Anchor Facts: Twos, Fives, And Tens');

    const lessonFile = readFileSync(result.generatedFiles.find((file) => file.endsWith('01-anchor-facts-twos-fives-and-tens.md'))!, 'utf8');
    expect(lessonFile).toContain('hint: Ask whether it tells a whole idea.');
    expect(lessonFile).not.toContain('questionGoal');
    expect(lessonFile).not.toContain('misconception');
  });

  it('blocks unsupported scored question types before promotion', async () => {
    const root = createTempWorkspace();
    writeManifest(root, [manifestTrack('grammar-1', 'ready_for_import')]);
    writeResearchTrack(root, 'grammar-1', {
      track: 'Grammar',
      level: 'Level 1',
      questionType: 'constructed-response',
      extraQuestionFields: `minWords: 8
sampleAnswer: It tells a complete thought.`,
    });

    const result = await promoteResearchTracks({ cwd: root, outputRoot: join(root, 'out') });

    expect(result.generatedFiles).toEqual([]);
    expect(result.blockers.map((blocker) => blocker.message)).toContain(
      'Unit 1 Lesson 1 question 1 uses unsupported scored type "constructed-response"',
    );
  });

  it('records import batches in the manifest after a successful write', async () => {
    const root = createTempWorkspace();
    writeManifest(root, [manifestTrack('grammar-1', 'ready_for_import')]);
    writeResearchTrack(root, 'grammar-1', { track: 'Grammar', level: 'Level 1' });

    const result = await promoteResearchTracks({
      cwd: root,
      outputRoot: join(root, 'out'),
      dryRun: false,
      markImported: true,
      now: new Date('2026-07-01T12:34:56.000Z'),
    });
    const manifest = JSON.parse(readFileSync(join(root, 'research/track-status.json'), 'utf8'));

    expect(result.manifestUpdated).toBe(true);
    expect(manifest.tracks[0]).toMatchObject({
      status: 'imported',
      readyForImport: false,
      imported: true,
      importBatch: 'v3-20260701T123456Z',
      importedAt: '2026-07-01T12:34:56.000Z',
    });
  });
});

function createTempWorkspace() {
  const root = mkdtempSync(join(tmpdir(), 'buddy-blocks-promotion-'));
  mkdirSync(join(root, 'research'), { recursive: true });
  return root;
}

function writeManifest(root: string, tracks: Array<ReturnType<typeof manifestTrack>>) {
  writeFileSync(
    join(root, 'research/track-status.json'),
    `${JSON.stringify(
      {
        schemaVersion: 1,
        updatedAt: '2026-07-01',
        readyForImportRule: 'Ready tracks have question sets.',
        statuses: {},
        tracks,
      },
      null,
      2,
    )}\n`,
    'utf8',
  );
}

function manifestTrack(slug: string, status: 'research_only' | 'ready_for_import' | 'imported') {
  return {
    slug,
    path: `research/${slug}`,
    status,
    hasQuestionSets: status !== 'research_only',
    readyForImport: status === 'ready_for_import',
    imported: status === 'imported',
    importBatch: status === 'imported' ? 'existing-batch' : null,
    importedAt: status === 'imported' ? '2026-07-01T00:00:00.000Z' : null,
    acceptedArtifacts: ['01-research-brief.md', '02-level-blueprint.md', '03-course-map.md', '04-unit-design-briefs/', '05-lesson-briefs.md', '06-question-sets.md'],
    notes: '',
  };
}

function writeResearchTrack(
  root: string,
  slug: string,
  {
    track,
    level,
    questionType = 'multiple-choice',
    extraQuestionFields = `choices:
  - The lantern glowed.
  - After the rain.
correctAnswer: The lantern glowed.`,
    lessonTitle = 'Complete Thoughts',
  }: { track: string; level: string; questionType?: string; extraQuestionFields?: string; lessonTitle?: string },
) {
  const dir = join(root, 'research', slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(
    join(dir, '03-course-map.md'),
    `# ${track} Course Map

Track: ${track}
Level: ${level}

## Unit 1: Sentence Foundations

### Unit Purpose

Build complete-sentence awareness.
`,
    'utf8',
  );
  writeFileSync(
    join(dir, '05-lesson-briefs.md'),
    `# ${track} Lesson Briefs

## Unit 1: Sentence Foundations

### Lesson 1: ${lessonTitle}

- **Teaching goal:** Teach complete thoughts.
- **Student outcome:** The student can identify a complete sentence.
- **Key idea, model, or representation:** A sentence tells a whole idea.
- **Likely misconceptions:** Treating any long phrase as complete.
- **Suggested intro/teaching note:** Compare a sentence with a fragment.
`,
    'utf8',
  );
  writeFileSync(
    join(dir, '06-question-sets.md'),
    `# ${track} Question Sets

## Unit 1: Sentence Foundations

### Lesson 1: ${lessonTitle}

\`\`\`question
key: u01_l01_q01_complete_sentence
type: ${questionType}
prompt: Which word group is complete?
${extraQuestionFields}
explanation: A complete sentence tells a whole thought.
hint: Ask whether it tells a whole idea.
questionGoal: Recognize a complete sentence.
misconception: Treating a fragment as complete.
\`\`\`
`,
    'utf8',
  );
}
