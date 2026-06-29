import { useEffect, useState } from 'preact/hooks';
import { fetchApi, formatDate, percent } from './api';
import { BlockAvatar } from './BlockAvatar';

type DashboardData = {
  parent: { username: string; email: string };
  fixedV1Profiles: boolean;
  children: Array<{
    child: {
      id: string;
      slug: string;
      displayName: string;
      avatarKey: string;
      levelBand: string;
      gradeLevel: number;
    };
    subjectLevels: Array<{
      subject: string;
      label: string;
      defaultGradeLevel: number;
      overrideGradeLevel: number | null;
      effectiveGradeLevel: number;
    }>;
    stats: {
      xpTotal: number;
      streak: number;
      heartsRemaining: number;
    };
    tracks: Array<{
      id: string;
      slug: string;
      title: string;
      color: string;
      lessonsCompleted: number;
      totalLessons: number;
      xpTotal: number;
    }>;
    badges: Array<{ key: string; label: string }>;
    recentActivity: Array<{
      completed_at: string;
      score_correct: number;
      score_total: number;
      xp_awarded: number;
      lesson_title: string;
      track_title: string;
    }>;
  }>;
};

const GRADE_LEVEL_OPTIONS = Array.from({ length: 12 }, (_, index) => index + 1);

export default function ParentDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState('');
  const [savingLevel, setSavingLevel] = useState('');

  useEffect(() => {
    fetchApi<DashboardData>('/api/parent/dashboard')
      .then(setData)
      .catch((reason) => setError(reason.message));
  }, []);

  if (error) return <p className="block-card p-5 font-black text-berryDark">{error}</p>;
  if (!data) return <p className="text-xl font-black text-muted">Loading parent dashboard...</p>;

  return (
    <section className="space-y-7">
      <div className="block-card p-6 sm:p-8">
        <p className="stat-chip w-fit">Parent account: {data.parent.username}</p>
        <h1 className="mt-4 text-[clamp(3rem,8vw,5.5rem)]">Progress Dashboard</h1>
        <p className="mt-4 max-w-3xl text-lg font-extrabold text-muted">
          Reagan and Ada are fixed v1 profiles. This dashboard focuses on progress, streaks, hearts, and recent lesson activity.
        </p>
      </div>

      {data.children.map((childSummary) => (
        <section key={childSummary.child.id} className="soft-panel p-5">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <BlockAvatar avatarKey={childSummary.child.avatarKey} label={childSummary.child.displayName} size="sm" />
              <div>
                <h2 className="text-3xl">{childSummary.child.displayName}</h2>
                <p className="font-extrabold text-muted">{childSummary.child.levelBand}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="stat-chip">{childSummary.stats.xpTotal} XP</span>
              <span className="stat-chip">{childSummary.stats.streak} day streak</span>
              <span className="stat-chip">{childSummary.stats.heartsRemaining} hearts</span>
            </div>
          </div>

          <div className="mt-5">
            <h3 className="text-2xl">Subject Levels</h3>
            <div className="mt-3 grid gap-3 md:grid-cols-3">
              {childSummary.subjectLevels.map((level) => {
                const saveKey = `${childSummary.child.id}-${level.subject}`;
                return (
                  <label key={level.subject} className="block-card p-4">
                    <span className="text-sm font-black uppercase text-muted">{level.label}</span>
                    <select
                      className="mt-2 min-h-[48px] w-full rounded-lg border-[3px] border-ink bg-white px-3 font-black outline-none focus:ring-4 focus:ring-reward"
                      value={level.overrideGradeLevel ?? ''}
                      disabled={savingLevel === saveKey}
                      onChange={(event) =>
                        void updateSubjectLevel(childSummary.child.id, level.subject, (event.currentTarget as HTMLSelectElement).value)
                      }
                    >
                      <option value="">Default Grade {level.defaultGradeLevel}</option>
                      {GRADE_LEVEL_OPTIONS.map((gradeLevel) => (
                        <option key={gradeLevel} value={gradeLevel}>
                          Grade {gradeLevel}
                        </option>
                      ))}
                    </select>
                    <span className="mt-2 block font-extrabold text-muted">Using Grade {level.effectiveGradeLevel}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {childSummary.tracks.map((track) => {
              const progress = percent(track.lessonsCompleted, track.totalLessons);
              return (
                <div key={track.id} className="block-card p-4">
                  <h3 className="text-2xl">{track.title}</h3>
                  <div className="mt-3 progress-rail">
                    <span className="progress-fill" style={{ width: `${progress}%` }} />
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="stat-chip">{track.lessonsCompleted}/{track.totalLessons}</span>
                    <span className="stat-chip">{track.xpTotal} XP</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <h3 className="text-2xl">Badges</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {childSummary.badges.length ? (
                  childSummary.badges.map((badge) => (
                    <span key={badge.key} className="stat-chip bg-reward">
                      {badge.label}
                    </span>
                  ))
                ) : (
                  <p className="font-bold text-muted">No badges yet.</p>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-2xl">Recent Activity</h3>
              <div className="mt-3 overflow-hidden rounded-lg border-2 border-line bg-white">
                {childSummary.recentActivity.length ? (
                  childSummary.recentActivity.map((activity) => (
                    <div className="grid gap-2 border-b-2 border-line p-3 last:border-b-0 sm:grid-cols-[1fr_auto]" key={`${activity.completed_at}-${activity.lesson_title}`}>
                      <div>
                        <strong>{activity.lesson_title}</strong>
                        <p className="font-bold text-muted">{activity.track_title} · {formatDate(activity.completed_at)}</p>
                      </div>
                      <div className="font-black">
                        {activity.score_correct}/{activity.score_total} · {activity.xp_awarded} XP
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="p-3 font-bold text-muted">No completed lessons yet.</p>
                )}
              </div>
            </div>
          </div>
        </section>
      ))}
    </section>
  );

  async function updateSubjectLevel(childId: string, subject: string, value: string) {
    const saveKey = `${childId}-${subject}`;
    setSavingLevel(saveKey);

    try {
      await fetchApi(`/api/parent/children/${encodeURIComponent(childId)}/subject-levels`, {
        method: 'PATCH',
        body: JSON.stringify({ subject, gradeLevel: value ? Number(value) : null }),
      });
      const refreshed = await fetchApi<DashboardData>('/api/parent/dashboard');
      setData(refreshed);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Could not update the subject level.');
    } finally {
      setSavingLevel('');
    }
  }
}
