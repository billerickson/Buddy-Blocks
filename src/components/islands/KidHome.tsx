import { useEffect, useState } from 'preact/hooks';
import { getSubjectMetadata } from '../../lib/subjects';
import { fetchApi, percent } from './api';
import { BlockAvatar, TrackIcon } from './BlockAvatar';
import { childSlugFromLocation } from './route-params';

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
  tracks: Array<{
    id: string;
    slug: string;
    subject: string;
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
  const [error, setError] = useState('');

  useEffect(() => {
    if (!childSlug) {
      setError('Child path not found.');
      return;
    }

    fetchApi<HomeData>(`/api/children/${childSlug}/home`)
      .then(setData)
      .catch((reason) => setError(reason.message));
  }, [childSlug]);

  if (error) return <p className="block-card p-5 font-black text-berryDark">{error}</p>;
  if (!data) return <p className="text-xl font-black text-muted">Stacking your lesson blocks...</p>;

  return (
    <section className="space-y-8">
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
            <p className="stat-chip w-fit">Next block</p>
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

      <div className="track-grid">
        {data.tracks.map((track) => {
          const progress = percent(track.lessonsCompleted, track.totalLessons);
          return (
            <a key={track.id} href={`/kid/${data.child.slug}/track/${track.slug}/`} className="block-card p-5 no-underline">
              <div className="flex items-start gap-4">
                <TrackIcon iconKey={getSubjectMetadata(track.subject).iconKey} color={track.color} />
                <div className="min-w-0 flex-1">
                  <h2 className="text-3xl">{track.title}</h2>
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
