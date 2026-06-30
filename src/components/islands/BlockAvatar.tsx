import type { SubjectMetadata } from '../../lib/subjects';

type Props = {
  avatarKey?: string;
  label: string;
  size?: 'sm' | 'lg';
};

const AVATAR_COLORS: Record<string, { block: string; tab: string; base: string }> = {
  'berry-builder': { block: '#e63e80', tab: '#18bca4', base: '#fff1f7' },
  'teal-tinkerer': { block: '#18bca4', tab: '#ffd84d', base: '#f0fff9' },
  'gold-builder': { block: '#ffd84d', tab: '#5b79ff', base: '#fff9dd' },
};

export function BlockAvatar({ avatarKey = 'berry-builder', label, size = 'lg' }: Props) {
  const colors = AVATAR_COLORS[avatarKey] || AVATAR_COLORS['berry-builder'];
  const dimensions = size === 'lg' ? 'h-28 w-28' : 'h-16 w-16';

  return (
    <svg className={dimensions} viewBox="0 0 160 160" role="img" aria-label={`${label} avatar`}>
      <rect x="18" y="22" width="124" height="124" rx="26" fill={colors.base} stroke="#242134" strokeWidth="7" />
      <rect x="38" y="58" width="84" height="78" rx="18" fill={colors.block} stroke="#242134" strokeWidth="7" />
      <rect x="60" y="31" width="40" height="32" rx="12" fill={colors.tab} stroke="#242134" strokeWidth="6" />
      <circle cx="64" cy="93" r="6" fill="#242134" />
      <circle cx="96" cy="93" r="6" fill="#242134" />
      <path d="M64 113 Q80 127 98 113" fill="none" stroke="#242134" strokeWidth="6" strokeLinecap="round" />
      <text x="80" y="151" textAnchor="middle" fontFamily="Fredoka, sans-serif" fontSize="20" fontWeight="700" fill="#242134">
        {label.slice(0, 1)}
      </text>
    </svg>
  );
}

export function TrackIcon({ iconKey, color = '#5b79ff' }: { iconKey: SubjectMetadata['iconKey']; color?: string }) {
  if (iconKey === 'clipboard') {
    return (
      <svg className="h-16 w-16" viewBox="0 0 100 100" aria-hidden="true">
        <rect x="18" y="24" width="64" height="58" rx="12" fill="#ffd84d" stroke="#242134" strokeWidth="6" />
        <rect x="34" y="13" width="32" height="18" rx="8" fill="#18bca4" stroke="#242134" strokeWidth="5" />
        <path d="M31 45 H69 M31 59 H61" stroke="#242134" strokeWidth="5" strokeLinecap="round" />
      </svg>
    );
  }

  if (iconKey === 'speech-bubble') {
    return (
      <svg className="h-16 w-16" viewBox="0 0 100 100" aria-hidden="true">
        <path d="M17 27 H83 V67 H58 L42 82 V67 H17 Z" fill="#18bca4" stroke="#242134" strokeWidth="6" strokeLinejoin="round" />
        <rect x="36" y="16" width="28" height="16" rx="7" fill="#ff7f45" stroke="#242134" strokeWidth="5" />
        <text x="50" y="54" textAnchor="middle" fontFamily="Fredoka, sans-serif" fontSize="21" fontWeight="700" fill="#ffffff">
          si
        </text>
      </svg>
    );
  }

  if (iconKey === 'plus-block') {
    return (
      <svg className="h-16 w-16" viewBox="0 0 100 100" aria-hidden="true">
        <rect x="17" y="20" width="66" height="66" rx="14" fill={color} stroke="#242134" strokeWidth="6" />
        <rect x="38" y="8" width="24" height="18" rx="8" fill="#ffd84d" stroke="#242134" strokeWidth="5" />
        <path d="M31 53 H69 M50 34 V72" stroke="#fff" strokeWidth="8" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg className="h-16 w-16" viewBox="0 0 100 100" aria-hidden="true">
      <rect x="17" y="20" width="66" height="66" rx="14" fill={color} stroke="#242134" strokeWidth="6" />
      <rect x="38" y="8" width="24" height="18" rx="8" fill="#ffd84d" stroke="#242134" strokeWidth="5" />
      <circle cx="50" cy="53" r="12" fill="#fff" />
    </svg>
  );
}
