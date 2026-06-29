import { useEffect, useState } from 'preact/hooks';
import { fetchApi, percent } from './api';
import { TrackIcon } from './BlockAvatar';

type TrackData = {
  child: { slug: string; displayName: string };
  track: {
    slug: string;
    subject: 'math' | 'vocabulary' | 'spanish';
    gradeLevel: number;
    title: string;
    description: string;
    color: string;
    accent: string;
  };
  progress: {
    lessonsCompleted: number;
    xpTotal: number;
    currentLesson: null | { id: string; title: string };
  };
  units: Array<{
    id: string;
    title: string;
    description: string;
    lessons: Array<{
      id: string;
      title: string;
      kind: 'standard' | 'mad-minute';
      madMinuteGoal: number | null;
      status: 'locked' | 'available' | 'completed';
      bestScoreCorrect: number;
      bestScoreTotal: number;
    }>;
  }>;
};

export default function TrackOverview({ childSlug, trackSlug }: { childSlug: string; trackSlug: string }) {
  const [data, setData] = useState<TrackData | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchApi<TrackData>(`/api/children/${childSlug}/tracks/${trackSlug}`)
      .then(setData)
      .catch((reason) => setError(reason.message));
  }, [childSlug, trackSlug]);

  if (error) return <p className="block-card p-5 font-black text-berryDark">{error}</p>;
  if (!data) return <p className="text-xl font-black text-muted">Loading the path...</p>;

  const totalLessons = data.units.reduce((sum, unit) => sum + unit.lessons.length, 0);
  const progress = percent(data.progress.lessonsCompleted, totalLessons);

  return (
    <section className="space-y-7">
      <div className="block-card p-6 sm:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <TrackIcon slug={data.track.subject} color={data.track.color} />
            <div>
              <p className="stat-chip w-fit">{data.child.displayName}'s path</p>
              <h1 className="mt-4 text-[clamp(3rem,8vw,5.5rem)]">{data.track.title}</h1>
              <p className="mt-3 max-w-2xl text-lg font-extrabold text-muted">{data.track.description}</p>
            </div>
          </div>
          {data.progress.currentLesson && (
            <a className="primary-button" href={`/kid/${data.child.slug}/lesson/${data.progress.currentLesson.id}/`}>
              Continue
            </a>
          )}
        </div>
        <div className="mt-6 progress-rail" aria-label={`${data.track.title} progress`}>
          <span className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="stat-chip">{data.progress.lessonsCompleted}/{totalLessons} lessons</span>
          <span className="stat-chip">{data.progress.xpTotal} XP</span>
        </div>
      </div>

      <div className="space-y-5">
        {data.units.map((unit) => (
          <section key={unit.id} className="soft-panel p-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-3xl">{unit.title}</h2>
                <p className="mt-2 font-bold text-muted">{unit.description}</p>
              </div>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {unit.lessons.map((lesson) => (
                <a
                  key={lesson.id}
                  href={lesson.status === 'locked' ? undefined : `/kid/${data.child.slug}/lesson/${lesson.id}/`}
                  aria-disabled={lesson.status === 'locked'}
                  className={`block-card p-4 no-underline ${lesson.status === 'locked' ? 'pointer-events-none opacity-55' : ''}`}
                >
                  <span className="stat-chip mb-3">{statusLabel(lesson.status)}</span>
                  <h3 className="text-2xl">{lesson.title}</h3>
                  {lesson.kind === 'mad-minute' ? (
                    <MadMinuteCardStats lesson={lesson} />
                  ) : (
                    lesson.bestScoreTotal > 0 && (
                      <p className="mt-2 font-extrabold text-muted">
                        Best score: {lesson.bestScoreCorrect}/{lesson.bestScoreTotal}
                      </p>
                    )
                  )}
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}

function MadMinuteCardStats({ lesson }: { lesson: TrackData['units'][number]['lessons'][number] }) {
  const goal = lesson.madMinuteGoal ?? 40;
  const progress = Math.min(100, percent(lesson.bestScoreCorrect, goal));

  return (
    <div className="mt-3">
      <div className="flex flex-wrap gap-2">
        <span className="stat-chip">Record: {lesson.bestScoreCorrect} correct</span>
        <span className="stat-chip">Goal: {goal}</span>
      </div>
      <div className="mt-3 progress-rail" aria-label={`${lesson.title} record progress`}>
        <span className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

function statusLabel(status: TrackData['units'][number]['lessons'][number]['status']) {
  if (status === 'completed') return 'Complete';
  if (status === 'available') return 'Ready';
  return 'Locked';
}
