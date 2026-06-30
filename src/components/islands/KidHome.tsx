import { useEffect, useState } from 'preact/hooks';
import { getSubjectMetadata } from '../../lib/subjects';
import { percent } from './api';
import { BlockAvatar, TrackIcon } from './BlockAvatar';
import { fetchKidHome, getSavedTrackPack, saveTrackLessonPack, type OfflineSource } from './offline/api';
import { OfflineStatusPill } from './offline/OfflineStatusPill';
import { childSlugFromLocation } from './route-params';

const LANGUAGE_SUBJECTS = new Set(['spanish', 'french', 'latin']);

type HomeData = {
  child: {
    slug: string;
    displayName: string;
    avatarKey: string;
    heartsRemaining: number;
  };
  stats: {
    xpTotal: number;
    streak: number;
    heartsRemaining: number;
  };
  recommendedLesson: null | {
    id: string;
    title: string;
    trackTitle: string;
    unitTitle: string;
  };
  practiceSets: Array<{
    id: string;
    lessonId: string;
    subject: string;
    subjectLabel: string;
    title: string;
    source: string | null;
    pinned: boolean;
    expiresAt: string | null;
  }>;
  tracks: Array<{
    id: string;
    slug: string;
    subject: string;
    trackGroup: 'scholastic' | 'foundation';
    gradeLevel: number;
    title: string;
    description: string;
    color: string;
    accent: string;
    lessonsCompleted: number;
    totalLessons: number;
    xpTotal: number;
    currentLesson: null | { id: string; title: string };
  }>;
  badges: Array<{ key: string; label: string }>;
};

type TrackPackUiState = {
  state: 'idle' | 'saving' | 'saved' | 'error';
  lessonsCached?: number;
};

export default function KidHome({ childSlug: childSlugProp }: { childSlug?: string }) {
  const childSlug = childSlugFromLocation(childSlugProp);
  const [data, setData] = useState<HomeData | null>(null);
  const [dataSource, setDataSource] = useState<OfflineSource>('network');
  const [error, setError] = useState('');
  const [trackPackStates, setTrackPackStates] = useState<Record<string, TrackPackUiState>>({});

  useEffect(() => {
    if (!childSlug) {
      setError('Child path not found.');
      return;
    }

    fetchKidHome<HomeData>(childSlug)
      .then((result) => {
        setData(result.data);
        setDataSource(result.source);
      })
      .catch((reason) => setError(reason.message));
  }, [childSlug]);

  useEffect(() => {
    if (!childSlug || !data) return undefined;

    let cancelled = false;
    const refreshSavedTrackPacks = async () => {
      const entries = await Promise.all(
        data.tracks.map(async (track) => {
          const pack = await getSavedTrackPack(childSlug, track.slug);
          return [track.slug, pack] as const;
        }),
      );
      if (cancelled) return;
      setTrackPackStates((current) => {
        const next = { ...current };
        for (const [trackSlug, pack] of entries) {
          if (!pack || next[trackSlug]?.state === 'saving') continue;
          next[trackSlug] = { state: 'saved', lessonsCached: pack.lessonsCached };
        }
        return next;
      });
    };

    void refreshSavedTrackPacks();
    window.addEventListener('buddy-blocks-offline-updated', refreshSavedTrackPacks);
    return () => {
      cancelled = true;
      window.removeEventListener('buddy-blocks-offline-updated', refreshSavedTrackPacks);
    };
  }, [childSlug, data]);

  if (error) return <p className="block-card p-5 font-black text-berryDark">{error}</p>;
  if (!data) return <p className="text-xl font-black text-muted">Stacking your lesson blocks...</p>;

  const trackGroups = [
    { key: 'scholastic', title: 'Scholastic', tracks: data.tracks.filter((track) => track.trackGroup === 'scholastic') },
    {
      key: 'foundation',
      title: 'Foundation',
      tracks: data.tracks.filter((track) => track.trackGroup === 'foundation' && !LANGUAGE_SUBJECTS.has(track.subject)),
    },
    {
      key: 'language',
      title: 'Language',
      tracks: data.tracks.filter((track) => LANGUAGE_SUBJECTS.has(track.subject)),
    },
  ];

  return (
    <section className="space-y-8">
      <OfflineStatusPill />
      <div className="grid gap-5 lg:grid-cols-[1fr_0.72fr]">
        <div className="block-card p-6 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <BlockAvatar avatarKey={data.child.avatarKey} label={data.child.displayName} />
            <div>
              <p className="stat-chip w-fit">Ready to build</p>
              <h1 className="mt-4 text-[clamp(3rem,9vw,5.8rem)]">{data.child.displayName}</h1>
              <div className="mt-4 flex flex-wrap gap-3">
                <span className="stat-chip">{data.stats.xpTotal} XP</span>
                <span className="stat-chip">{data.stats.streak} day streak</span>
                <span className="stat-chip">{data.stats.heartsRemaining} hearts</span>
              </div>
            </div>
          </div>
        </div>

        <div className="block-card flex flex-col justify-between p-6 sm:p-8">
          <div>
            <div className="flex flex-wrap gap-2">
              <p className="stat-chip w-fit">Next block</p>
              {dataSource === 'cache' && <p className="stat-chip w-fit bg-[#fff3eb]">Cached</p>}
            </div>
            <h2 className="mt-4 text-3xl">{data.recommendedLesson?.title || 'All caught up'}</h2>
            <p className="mt-3 font-extrabold text-muted">
              {data.recommendedLesson
                ? `${data.recommendedLesson.trackTitle} · ${data.recommendedLesson.unitTitle}`
                : 'Every seeded lesson in this path is complete.'}
            </p>
          </div>
          {data.recommendedLesson && (
            <a className="primary-button mt-6" href={`/kid/${data.child.slug}/lesson/${data.recommendedLesson.id}/`}>
              Continue Lesson
            </a>
          )}
        </div>
      </div>

      {data.practiceSets.length > 0 && (
        <section className="space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="stat-chip w-fit">Weekly practice</p>
              <h2 className="mt-3 text-4xl">School words</h2>
            </div>
          </div>
          <div className="track-grid">
            {data.practiceSets.map((practiceSet) => (
              <a
                key={practiceSet.id}
                href={`/kid/${data.child.slug}/lesson/${practiceSet.lessonId}/`}
                className="block-card p-5 no-underline"
              >
                <div className="flex items-start gap-4">
                  <TrackIcon iconKey={getSubjectMetadata(practiceSet.subject).iconKey} color="bg-[#50c2ff]" />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap gap-2">
                      <span className="stat-chip">{practiceSet.subjectLabel}</span>
                      {practiceSet.pinned && <span className="stat-chip bg-reward">Pinned</span>}
                    </div>
                    <h3 className="mt-3 text-3xl">{practiceSet.title}</h3>
                    <p className="mt-2 font-bold text-muted">
                      {practiceSet.source ?? (practiceSet.expiresAt ? `Due ${new Date(practiceSet.expiresAt).toLocaleDateString()}` : 'Vocabulary')}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {trackGroups.map((group) => {
        if (group.tracks.length === 0) return null;

        return (
          <section key={group.key} className="space-y-4">
            <h2 className="text-4xl">{group.title}</h2>
            <div className="track-grid">
              {group.tracks.map((track) => {
                const progress = percent(track.lessonsCompleted, track.totalLessons);
                const packState = trackPackStates[track.slug] ?? { state: 'idle' };
                return (
                  <article key={track.id} className="block-card p-5">
                    <div className="flex items-start gap-4">
                      <a href={`/kid/${data.child.slug}/track/${track.slug}/`} className="flex min-w-0 flex-1 items-start gap-4 no-underline">
                        <TrackIcon iconKey={getSubjectMetadata(track.subject).iconKey} color={track.color} />
                        <div className="min-w-0 flex-1">
                          <h3 className="text-3xl">{track.title}</h3>
                          <p className="mt-2 font-bold text-muted">{track.description}</p>
                        </div>
                      </a>
                    </div>
                    <a href={`/kid/${data.child.slug}/track/${track.slug}/`} className="mt-5 block no-underline">
                      <div className="progress-rail" aria-label={`${track.title} progress`}>
                        <span className="progress-fill" style={{ width: `${progress}%` }} />
                      </div>
                    </a>
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <span className="stat-chip">{track.lessonsCompleted}/{track.totalLessons} lessons</span>
                      <span className="stat-chip">{track.xpTotal} XP</span>
                      <TrackOfflineButton
                        state={packState.state}
                        trackTitle={track.title}
                        onClick={async () => {
                          if (packState.state === 'saving') return;
                          setTrackPackStates((current) => ({
                            ...current,
                            [track.slug]: { ...current[track.slug], state: 'saving' },
                          }));
                          try {
                            const pack = await saveTrackLessonPack(data.child.slug, track.slug);
                            setTrackPackStates((current) => ({
                              ...current,
                              [track.slug]: { state: 'saved', lessonsCached: pack.lessonsCached },
                            }));
                          } catch {
                            setTrackPackStates((current) => ({
                              ...current,
                              [track.slug]: { ...current[track.slug], state: 'error' },
                            }));
                          }
                        }}
                      />
                      {packState.state === 'error' && <span className="stat-chip bg-[#ffe1ea]">Offline save failed</span>}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        );
      })}

      <section className="soft-panel p-5">
        <h2 className="text-3xl">Badges</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {data.badges.length ? (
            data.badges.map((badge) => (
              <span key={badge.key} className="stat-chip border-ink bg-reward">
                {badge.label}
              </span>
            ))
          ) : (
            <p className="font-extrabold text-muted">Finish a lesson to snap in your first badge.</p>
          )}
        </div>
      </section>
    </section>
  );
}

function TrackOfflineButton({
  state,
  trackTitle,
  onClick,
}: {
  state: TrackPackUiState['state'];
  trackTitle: string;
  onClick: () => void | Promise<void>;
}) {
  const saved = state === 'saved';
  const saving = state === 'saving';
  const errored = state === 'error';
  const label = saving
    ? `Saving ${trackTitle} offline`
    : saved
      ? `${trackTitle} saved offline`
      : errored
        ? `Retry saving ${trackTitle} offline`
        : `Save ${trackTitle} offline`;

  return (
    <button
      className={`offline-icon-button offline-block ${saved ? 'is-saved' : ''} ${saving ? 'is-saving' : ''} ${errored ? 'is-error' : ''}`}
      type="button"
      aria-label={label}
      aria-pressed={saved}
      title={label}
      disabled={saving}
      onClick={() => void onClick()}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3v11" />
        <path d="M7 9l5 5 5-5" />
        <path d="M5 19h14" />
      </svg>
      {saved && (
        <span className="status-check" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M5 12.5l4.5 4.5L19 7" />
          </svg>
        </span>
      )}
    </button>
  );
}
