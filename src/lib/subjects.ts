export type SubjectStarterBadge = {
  key: string;
  label: string;
};

export type SubjectMetadata = {
  key: string;
  label: string;
  sortOrder: number;
  iconKey: 'plus-block' | 'clipboard' | 'speech-bubble' | 'generic-block';
  starterBadge?: SubjectStarterBadge;
};

export const UNKNOWN_SUBJECT_SORT_ORDER = 1000;
export const UNKNOWN_SUBJECT_ICON_KEY: SubjectMetadata['iconKey'] = 'generic-block';

export const SUBJECTS: SubjectMetadata[] = [
  {
    key: 'math',
    label: 'Math',
    sortOrder: 1,
    iconKey: 'plus-block',
    starterBadge: {
      key: 'math-starter',
      label: 'Math Starter',
    },
  },
  {
    key: 'vocabulary',
    label: 'Vocabulary',
    sortOrder: 2,
    iconKey: 'clipboard',
    starterBadge: {
      key: 'word-explorer',
      label: 'Word Explorer',
    },
  },
  {
    key: 'spanish',
    label: 'Spanish',
    sortOrder: 3,
    iconKey: 'speech-bubble',
    starterBadge: {
      key: 'spanish-starter',
      label: 'Spanish Starter',
    },
  },
];

const SUBJECTS_BY_KEY = new Map(SUBJECTS.map((subject) => [subject.key, subject]));

export function getSubjectMetadata(subject: string): SubjectMetadata {
  return SUBJECTS_BY_KEY.get(subject) ?? {
    key: subject,
    label: fallbackSubjectLabel(subject),
    sortOrder: UNKNOWN_SUBJECT_SORT_ORDER,
    iconKey: UNKNOWN_SUBJECT_ICON_KEY,
  };
}

export function getSubjectLabel(subject: string) {
  return getSubjectMetadata(subject).label;
}

export function getStarterBadgeForSubject(subject: string) {
  return getSubjectMetadata(subject).starterBadge ?? null;
}

export function compareSubjectKeys(a: string, b: string) {
  const subjectA = getSubjectMetadata(a);
  const subjectB = getSubjectMetadata(b);
  if (subjectA.sortOrder !== subjectB.sortOrder) return subjectA.sortOrder - subjectB.sortOrder;
  return subjectA.label.localeCompare(subjectB.label, undefined, { numeric: true });
}

function fallbackSubjectLabel(subject: string) {
  return subject
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}
