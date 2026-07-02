import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { parse as parseYaml, stringify as stringifyYaml } from 'yaml';

type TrackManifestEntry = {
  slug: string;
  path: string;
  status: 'research_only' | 'ready_for_import' | 'imported';
  hasQuestionSets: boolean;
  readyForImport: boolean;
  imported: boolean;
  importBatch: string | null;
  importedAt: string | null;
  acceptedArtifacts: string[];
  notes: string;
};

type TrackManifest = {
  schemaVersion: number;
  updatedAt: string;
  readyForImportRule: string;
  statuses: Record<string, string>;
  tracks: TrackManifestEntry[];
};

export type PromotionBlocker = {
  track: string;
  file: string;
  message: string;
};

export type GeneratedFile = {
  path: string;
  contents: string;
};

export type PromotionOptions = {
  cwd?: string;
  manifestPath?: string;
  outputRoot?: string;
  dryRun?: boolean;
  markImported?: boolean;
  trackSlugs?: string[];
  includeImported?: boolean;
  now?: Date;
};

export type PromotionResult = {
  selectedTracks: string[];
  generatedFiles: string[];
  blockers: PromotionBlocker[];
  importBatch: string;
  manifestUpdated: boolean;
};

type TrackMeta = {
  gradeLevel: number;
  gradeFolder: string;
  trackFolder: string;
  subject: string;
  subjectForId: string;
  trackId: string;
  trackSlug: string;
  title: string;
  color: string;
  accent: string;
};

type UnitSource = {
  number: number;
  title: string;
  slug: string;
  purpose: string;
};

type LessonSource = {
  unitNumber: number;
  number: number;
  title: string;
  slug: string;
  teachingGoal: string;
  studentOutcome: string;
  keyIdeas: string;
  misconceptionChecks: string;
  introNote: string;
  questions: RuntimeQuestionBlock[];
};

type RuntimeQuestionBlock = {
  key?: unknown;
  type?: unknown;
  prompt?: unknown;
  pairs?: Array<{ left?: unknown; right?: unknown }>;
  [key: string]: unknown;
};

const subjectOrder: Record<string, string> = {
  math: '01',
  vocabulary: '02',
  spanish: '03',
  french: '04',
  latin: '05',
  grammar: '06',
  logic: '07',
  rhetoric: '08',
  literature: '09',
  'history-civics': '10',
  'memory-work': '11',
};

const subjectColors: Record<string, { color: string; accent: string }> = {
  math: { color: '#5b79ff', accent: '#ffd84d' },
  vocabulary: { color: '#ffd84d', accent: '#18bca4' },
  spanish: { color: '#18bca4', accent: '#ff7f45' },
  french: { color: '#3b82f6', accent: '#facc15' },
  grammar: { color: '#7c3aed', accent: '#22c55e' },
  logic: { color: '#0f766e', accent: '#f97316' },
  rhetoric: { color: '#2563eb', accent: '#f59e0b' },
  literature: { color: '#a16207', accent: '#14b8a6' },
  'history-civics': { color: '#475569', accent: '#ef4444' },
  'memory-work': { color: '#be123c', accent: '#38bdf8' },
};

const unsupportedScoredTypes = new Set(['constructed-response', 'speaking-prompt']);
const keyPattern = /^[a-z0-9](?:[a-z0-9_-]*[a-z0-9])?$/;

export async function promoteResearchTracks(options: PromotionOptions = {}): Promise<PromotionResult> {
  const cwd = options.cwd ?? process.cwd();
  const manifestPath = options.manifestPath ?? join(cwd, 'research/track-status.json');
  const outputRoot = options.outputRoot ?? join(cwd, 'src/content/curriculum');
  const dryRun = options.dryRun ?? true;
  const now = options.now ?? new Date();
  const importBatch = importBatchFromDate(now);
  const manifest = readManifest(manifestPath);
  const selected = selectImportTracks(manifest, options);
  const generated: GeneratedFile[] = [];
  const blockers: PromotionBlocker[] = [];

  for (const entry of selected) {
    const trackPath = join(cwd, entry.path);
    const trackBlockers = validateResearchTrack(trackPath, entry.slug);
    blockers.push(...trackBlockers);
    if (trackBlockers.length > 0) continue;
    generated.push(...generateTrackFiles(trackPath, entry.slug, outputRoot));
  }

  if (!dryRun && blockers.length === 0) {
    for (const file of generated) {
      mkdirSync(dirname(file.path), { recursive: true });
      writeFileSync(file.path, file.contents, 'utf8');
    }
    if (options.markImported) {
      updateManifestAfterImport(manifest, selected, importBatch, now);
      writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
    }
  }

  return {
    selectedTracks: selected.map((entry) => entry.slug),
    generatedFiles: generated.map((file) => file.path),
    blockers,
    importBatch,
    manifestUpdated: Boolean(!dryRun && blockers.length === 0 && options.markImported),
  };
}

export function readManifest(path: string): TrackManifest {
  return JSON.parse(readFileSync(path, 'utf8')) as TrackManifest;
}

export function selectImportTracks(manifest: TrackManifest, options: PromotionOptions = {}) {
  const requested = options.trackSlugs ? new Set(options.trackSlugs) : null;
  return manifest.tracks.filter((entry) => {
    if (requested) return requested.has(entry.slug);
    if (options.includeImported) return entry.status === 'ready_for_import' || entry.status === 'imported';
    return entry.status === 'ready_for_import' && entry.readyForImport && !entry.imported;
  });
}

export function validateResearchTrack(trackPath: string, trackSlug: string): PromotionBlocker[] {
  const blockers: PromotionBlocker[] = [];
  for (const artifact of ['03-course-map.md', '05-lesson-briefs.md', '06-question-sets.md']) {
    const artifactPath = join(trackPath, artifact);
    if (!existsSync(artifactPath)) {
      blockers.push({ track: trackSlug, file: artifactPath, message: `Missing required artifact ${artifact}` });
    }
  }
  if (blockers.length > 0) return blockers;

  const questionSetsPath = join(trackPath, '06-question-sets.md');
  const questionSets = parseQuestionSets(readFileSync(questionSetsPath, 'utf8'), questionSetsPath);
  const seenLessonKeys = new Map<string, Set<string>>();

  for (const lesson of questionSets) {
    const seenKeys = seenLessonKeys.get(lesson.lessonKey) ?? new Set<string>();
    seenLessonKeys.set(lesson.lessonKey, seenKeys);
    for (const block of lesson.questions) {
      const question = block.question;
      const key = typeof question.key === 'string' ? question.key : '';
      const type = typeof question.type === 'string' ? question.type : '';
      if (!key) {
        blockers.push({ track: trackSlug, file: questionSetsPath, message: `${block.label} is missing key` });
      } else if (!keyPattern.test(key)) {
        blockers.push({ track: trackSlug, file: questionSetsPath, message: `${block.label} has malformed key "${key}"` });
      } else if (seenKeys.has(key)) {
        blockers.push({ track: trackSlug, file: questionSetsPath, message: `${block.label} duplicates key "${key}"` });
      } else {
        seenKeys.add(key);
      }
      if (unsupportedScoredTypes.has(type)) {
        blockers.push({ track: trackSlug, file: questionSetsPath, message: `${block.label} uses unsupported scored type "${type}"` });
      }
      if (type === 'match-pairs') {
        const duplicateRight = firstDuplicate((question.pairs ?? []).map((pair) => String(pair.right ?? '')));
        if (duplicateRight) {
          blockers.push({ track: trackSlug, file: questionSetsPath, message: `${block.label} duplicates match-pair right label "${duplicateRight}"` });
        }
      }
    }
  }

  return blockers;
}

function generateTrackFiles(trackPath: string, trackSlug: string, outputRoot: string): GeneratedFile[] {
  const courseMapPath = join(trackPath, '03-course-map.md');
  const lessonBriefsPath = join(trackPath, '05-lesson-briefs.md');
  const questionSetsPath = join(trackPath, '06-question-sets.md');
  const courseMap = readFileSync(courseMapPath, 'utf8');
  const lessonBriefs = readFileSync(lessonBriefsPath, 'utf8');
  const questionSets = readFileSync(questionSetsPath, 'utf8');
  const meta = trackMetaFromCourseMap(trackSlug, courseMap);
  const units = parseCourseUnits(courseMap);
  const lessons = mergeLessons(parseLessonBriefs(lessonBriefs), parseQuestionSets(questionSets, questionSetsPath));
  const files: GeneratedFile[] = [];
  const trackDir = join(outputRoot, meta.gradeFolder, meta.trackFolder);

  files.push({
    path: join(trackDir, 'track.yaml'),
    contents: yamlFile({
      id: meta.trackId,
      slug: meta.trackSlug,
      subject: meta.subject,
      title: meta.title,
      description: trackDescription(units),
      color: meta.color,
      accent: meta.accent,
    }),
  });

  for (const unit of units) {
    const unitId = unitIdFor(meta, unit);
    const unitDir = join(trackDir, `${String(unit.number).padStart(2, '0')}-${unit.slug}`);
    files.push({
      path: join(unitDir, 'unit.yaml'),
      contents: yamlFile({
        id: unitId,
        slug: unit.slug,
        title: unit.title,
        description: unit.purpose,
      }),
    });

    for (const lesson of lessons.filter((item) => item.unitNumber === unit.number)) {
      files.push({
        path: join(unitDir, `${String(lesson.number).padStart(2, '0')}-${lesson.slug}.md`),
        contents: lessonMarkdown(meta, unit, lesson),
      });
    }
  }

  return files;
}

function parseCourseUnits(markdown: string): UnitSource[] {
  return splitNumberedSections(markdown, 2, 'Unit').map((section) => ({
    number: section.number,
    title: section.title,
    slug: slugify(section.title),
    purpose: extractSubheadingParagraph(section.body, 'Unit Purpose') || firstParagraph(section.body),
  }));
}

function parseLessonBriefs(markdown: string): Array<Omit<LessonSource, 'questions'>> {
  const lessons: Array<Omit<LessonSource, 'questions'>> = [];
  for (const unit of splitNumberedSections(markdown, 2, 'Unit')) {
    for (const lesson of splitNumberedSections(unit.body, 3, 'Lesson')) {
      lessons.push({
        unitNumber: unit.number,
        number: lesson.number,
        title: lesson.title,
        slug: slugify(lesson.title),
        teachingGoal: extractBoldField(lesson.body, 'Teaching goal'),
        studentOutcome: extractBoldField(lesson.body, 'Student outcome'),
        keyIdeas: extractBoldField(lesson.body, 'Key idea, model, or representation'),
        misconceptionChecks: extractBoldField(lesson.body, 'Likely misconceptions'),
        introNote: extractBoldField(lesson.body, 'Suggested intro/teaching note'),
      });
    }
  }
  return lessons;
}

function parseQuestionSets(markdown: string, filePath: string) {
  const lessons: Array<{
    unitNumber: number;
    lessonNumber: number;
    lessonKey: string;
    questions: Array<{ label: string; question: RuntimeQuestionBlock }>;
  }> = [];
  for (const unit of splitNumberedSections(markdown, 2, 'Unit')) {
    for (const lesson of splitNumberedSections(unit.body, 3, 'Lesson')) {
      const questions: Array<{ label: string; question: RuntimeQuestionBlock }> = [];
      const blockPattern = /```question\r?\n([\s\S]*?)\r?\n```/g;
      let match: RegExpExecArray | null;
      let questionNumber = 0;
      while ((match = blockPattern.exec(lesson.body))) {
        questionNumber += 1;
        try {
          questions.push({
            label: `Unit ${unit.number} Lesson ${lesson.number} question ${questionNumber}`,
            question: parseYaml(match[1]) as RuntimeQuestionBlock,
          });
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          questions.push({
            label: `Unit ${unit.number} Lesson ${lesson.number} question ${questionNumber} malformed YAML: ${message}`,
            question: {},
          });
        }
      }
      lessons.push({
        unitNumber: unit.number,
        lessonNumber: lesson.number,
        lessonKey: `${unit.number}:${lesson.number}`,
        questions,
      });
    }
  }
  if (lessons.length === 0) {
    throw new Error(`No lessons found in question set: ${filePath}`);
  }
  return lessons;
}

function mergeLessons(
  briefs: Array<Omit<LessonSource, 'questions'>>,
  questionSets: ReturnType<typeof parseQuestionSets>,
): LessonSource[] {
  const questionsByLesson = new Map(questionSets.map((lesson) => [lesson.lessonKey, lesson.questions.map((item) => runtimeQuestion(item.question))]));
  return briefs.map((brief) => ({
    ...brief,
    questions: questionsByLesson.get(`${brief.unitNumber}:${brief.number}`) ?? [],
  }));
}

function runtimeQuestion(question: RuntimeQuestionBlock): RuntimeQuestionBlock {
  const cleaned: RuntimeQuestionBlock = { ...question };
  delete cleaned.questionGoal;
  delete cleaned.misconception;
  return cleaned;
}

function lessonMarkdown(meta: TrackMeta, unit: UnitSource, lesson: LessonSource) {
  const frontmatter = `---\n${yamlFile({
    id: lessonIdFor(meta, unit, lesson),
    slug: lesson.slug,
    title: lesson.title,
    xpBase: 10,
  }).trimEnd()}\n---`;
  const sections = [
    markdownSection('Teaching Goal', lesson.teachingGoal),
    markdownSection('Student Outcome', lesson.studentOutcome),
    markdownSection('Key Ideas', lesson.keyIdeas),
    markdownSection('Misconception Checks', lesson.misconceptionChecks),
    markdownSection('Teaching Note', lesson.introNote),
    `## Questions\n\n${lesson.questions.map(questionBlockMarkdown).join('\n\n')}`,
  ].filter(Boolean);
  return `${frontmatter}\n\n${sections.join('\n\n')}\n`;
}

function questionBlockMarkdown(question: RuntimeQuestionBlock) {
  return `\`\`\`question\n${stringifyYaml(question, { lineWidth: 0 }).trimEnd()}\n\`\`\``;
}

function markdownSection(title: string, body: string) {
  return body ? `## ${title}\n\n${body}` : '';
}

function trackMetaFromCourseMap(trackSlug: string, courseMap: string): TrackMeta {
  const trackName = extractTopMatter(courseMap, 'Track') || trackSlug;
  const level = extractTopMatter(courseMap, 'Level') || '';
  const subject = subjectFromTrackName(trackName);
  const gradeLevel = gradeFromTrackSlugOrLevel(trackSlug, level);
  const order = subjectOrder[subject] ?? '99';
  const colors = subjectColors[subject] ?? { color: '#5b79ff', accent: '#ffd84d' };
  const title = titleFor(trackName, level);
  const subjectForId = subject.replace(/-/g, '_');
  return {
    gradeLevel,
    gradeFolder: `grade-${String(gradeLevel).padStart(2, '0')}`,
    trackFolder: `${order}-${subject}`,
    subject,
    subjectForId,
    trackId: `track_grade${gradeLevel}_${subjectForId}`,
    trackSlug: trackSlug.match(/^grade-\d{2}-/) ? `grade-${gradeLevel}-${subject}` : trackSlug,
    title,
    color: colors.color,
    accent: colors.accent,
  };
}

function subjectFromTrackName(trackName: string) {
  const normalized = slugify(trackName);
  if (normalized === 'classical-literature') return 'literature';
  if (normalized === 'history-and-civics') return 'history-civics';
  if (normalized === 'memory-works') return 'memory-work';
  return normalized;
}

function gradeFromTrackSlugOrLevel(trackSlug: string, level: string) {
  const gradeMatch = trackSlug.match(/^grade-(\d{2})-/);
  if (gradeMatch) return Number(gradeMatch[1]);
  const levelMatch = level.match(/Level\s+(\d+)/i);
  if (levelMatch) return Number(levelMatch[1]) + 2;
  throw new Error(`Cannot determine grade level for ${trackSlug}`);
}

function titleFor(trackName: string, level: string) {
  const levelMatch = level.match(/Level\s+(\d+)/i);
  if (!levelMatch) return titleCase(trackName);
  const levelNumber = Number(levelMatch[1]);
  if (trackName === 'Memory Works') return `Memory Work ${levelNumber}`;
  return `${titleCase(trackName)} ${levelNumber}`;
}

function trackDescription(units: UnitSource[]) {
  const unitText = units.slice(0, 5).map((unit) => unit.title.toLowerCase()).join(', ');
  return `Practice with ${unitText}${units.length > 5 ? ', and cumulative review' : ''}.`;
}

function unitIdFor(meta: TrackMeta, unit: UnitSource) {
  return `unit_grade${meta.gradeLevel}_${meta.subjectForId}_u${String(unit.number).padStart(2, '0')}_${snake(unit.slug)}`;
}

function lessonIdFor(meta: TrackMeta, unit: UnitSource, lesson: LessonSource) {
  return `lesson_grade${meta.gradeLevel}_${meta.subjectForId}_u${String(unit.number).padStart(2, '0')}_l${String(lesson.number).padStart(2, '0')}_${snake(lesson.slug)}`;
}

function splitNumberedSections(markdown: string, level: 2 | 3, label: 'Unit' | 'Lesson') {
  const hashes = '#'.repeat(level);
  const pattern = new RegExp(`^${hashes} ${label} (\\d+):\\s*(.+)$`, 'gm');
  const matches = [...markdown.matchAll(pattern)];
  return matches.map((match, index) => {
    const bodyStart = (match.index ?? 0) + match[0].length;
    const bodyEnd = matches[index + 1]?.index ?? markdown.length;
    return {
      number: Number(match[1]),
      title: match[2].trim(),
      body: markdown.slice(bodyStart, bodyEnd).trim(),
    };
  });
}

function extractTopMatter(markdown: string, label: string) {
  const match = markdown.match(new RegExp(`^${label}:\\s*(.+)$`, 'im'));
  return match?.[1]?.trim().replace(/\s+$/g, '') ?? '';
}

function extractSubheadingParagraph(markdown: string, heading: string) {
  const pattern = new RegExp(`^### ${escapeRegExp(heading)}\\s*\\n([\\s\\S]*?)(?=\\n### |\\n## |$)`, 'm');
  const match = markdown.match(pattern);
  return match ? firstParagraph(match[1]) : '';
}

function extractBoldField(markdown: string, label: string) {
  const pattern = new RegExp(`^- \\*\\*${escapeRegExp(label)}:\\*\\*\\s*(.+)$`, 'im');
  return markdown.match(pattern)?.[1]?.trim() ?? '';
}

function firstParagraph(markdown: string) {
  return markdown
    .trim()
    .split(/\n\s*\n/)
    .map((part) => part.replace(/\n/g, ' ').trim())
    .find((part) => part && !part.startsWith('#')) ?? '';
}

function yamlFile(value: Record<string, unknown>) {
  return stringifyYaml(value, { lineWidth: 0 });
}

function updateManifestAfterImport(manifest: TrackManifest, selected: TrackManifestEntry[], importBatch: string, now: Date) {
  const importedAt = now.toISOString();
  const selectedSlugs = new Set(selected.map((entry) => entry.slug));
  manifest.updatedAt = importedAt.slice(0, 10);
  manifest.tracks = manifest.tracks.map((entry) =>
    selectedSlugs.has(entry.slug)
      ? {
          ...entry,
          status: 'imported',
          readyForImport: false,
          imported: true,
          importBatch,
          importedAt,
        }
      : entry,
  );
}

function importBatchFromDate(date: Date) {
  return `v3-${date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z')}`;
}

function slugify(value: string) {
  return value
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .toLowerCase()
    .replace(/_/g, '-')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function snake(value: string) {
  return slugify(value).replace(/-/g, '_');
}

function titleCase(value: string) {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');
}

function firstDuplicate(values: string[]) {
  const seen = new Set<string>();
  for (const value of values) {
    if (seen.has(value)) return value;
    seen.add(value);
  }
  return null;
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export async function runPromotionCli(argv = process.argv.slice(2)) {
  const options = parseArgs(argv);
  const result = await promoteResearchTracks(options);
  console.log(`Selected tracks: ${result.selectedTracks.join(', ') || '(none)'}`);
  console.log(`Import batch: ${result.importBatch}`);
  if (result.generatedFiles.length > 0) {
    console.log('Generated files:');
    for (const file of result.generatedFiles) console.log(`- ${file}`);
  }
  if (result.blockers.length > 0) {
    console.error('Promotion blockers:');
    for (const blocker of result.blockers) console.error(`- ${blocker.track}: ${blocker.message}`);
    process.exitCode = 1;
  } else if (options.dryRun ?? true) {
    console.log('Dry run only; no files written.');
  } else {
    console.log(result.manifestUpdated ? 'Files written and manifest updated.' : 'Files written.');
  }
}

function parseArgs(argv: string[]): PromotionOptions {
  const options: PromotionOptions = { dryRun: true };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--write') options.dryRun = false;
    else if (arg === '--dry-run') options.dryRun = true;
    else if (arg === '--mark-imported') options.markImported = true;
    else if (arg === '--include-imported') options.includeImported = true;
    else if (arg === '--output') options.outputRoot = argv[++index];
    else if (arg === '--manifest') options.manifestPath = argv[++index];
    else if (arg === '--tracks') options.trackSlugs = (argv[++index] ?? '').split(',').map((item) => item.trim()).filter(Boolean);
    else if (arg === '--clean-output' && options.outputRoot) rmSync(options.outputRoot, { recursive: true, force: true });
    else throw new Error(`Unknown argument: ${arg}`);
  }
  return options;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await runPromotionCli();
}
