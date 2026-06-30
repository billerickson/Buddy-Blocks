import { useEffect, useState } from 'preact/hooks';
import { getSubjectMetadata } from '../../lib/subjects';
import { percent } from './api';
import { BlockAvatar, TrackIcon } from './BlockAvatar';
import { fetchKidHome, saveLessonPack, type OfflineSource } from './offline/api';
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

export default function KidHome({ childSlug: childSlugProp }: { childSlug?: string }) {
  const childSlug = childSlugFromLocation(childSlugProp);
  const [data, setData] = useState<HomeData | null>(null);
  const [dataSource, setDataSource] = useState<OfflineSource>('network');
  const [error, setError] = useState('');
  const [packStatus, setPackStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [packMessage, setPackMessage] = useState('');

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
          <button
            className="secondary-button mt-3"
            type="button"
            disabled={packStatus === 'saving'}
            onClick={async () => {
              setPackStatus('saving');
              setPackMessage('');
              try {
                const pack = await saveLessonPack(data.child.slug);
                setPackStatus('saved');
                setPackMessage(`${pack.lessonsCached} lessons cached`);
              } catch {
                setPackStatus('error');
                setPackMessage('Could not save lessons offline.');
              }
            }}
          >
            {packStatus === 'saving' ? 'Saving...' : 'Save offline'}
          </button>
          {packMessage && (
            <p className={`mt-3 font-black ${packStatus === 'error' ? 'text-berryDark' : 'text-muted'}`}>
              {packMessage}
            </p>
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
                return (
                  <a key={track.id} href={`/kid/${data.child.slug}/track/${track.slug}/`} className="block-card p-5 no-underline">
                    <div className="flex items-start gap-4">
                      <TrackIcon iconKey={getSubjectMetadata(track.subject).iconKey} color={track.color} />
                      <div className="min-w-0 flex-1">
                        <h3 className="text-3xl">{track.title}</h3>
                        <p className="mt-2 font-bold text-muted">{track.description}</p>
                      </div>
                    </div>
                    <div className="mt-5 progress-rail" aria-label={`${track.title} progress`}>
                      <span className="progress-fill" style={{ width: `${progress}%` }} />
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="stat-chip">{track.lessonsCompleted}/{track.totalLessons} lessons</span>
                      <span className="stat-chip">{track.xpTotal} XP</span>
                    </div>
                  </a>
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
