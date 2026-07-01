import { useEffect, useState } from 'preact/hooks';
import { fetchApi, formatDate, percent } from './api';
import { BlockAvatar } from './BlockAvatar';

type ChildStatus = 'active' | 'archived';

type ChildProfile = {
  id: string;
  slug: string;
  displayName: string;
  avatarKey: string;
  levelBand: string;
  gradeLevel: number;
  status: ChildStatus;
};

type DashboardData = {
  parent: { username: string; email: string | null };
  fixedV1Profiles: boolean;
  children: Array<{
    child: ChildProfile;
    stats: {
      xpTotal: number;
      streak: number;
      heartsRemaining: number;
    };
    tracks: Array<{
      id: string;
      slug: string;
      trackGroup: 'scholastic' | 'foundation';
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

const gradeOptions = Array.from({ length: 12 }, (_, index) => index + 1);

export default function ParentDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [createName, setCreateName] = useState('');
  const [createGrade, setCreateGrade] = useState(3);
  const [saving, setSaving] = useState(false);

  const loadDashboard = () =>
    fetchApi<DashboardData>('/api/parent/dashboard')
      .then((nextData) => {
        setData(nextData);
        setError('');
      })
      .catch((reason) => setError(reason.message));

  useEffect(() => {
    loadDashboard();
  }, []);

  async function createChild(event: Event) {
    event.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await fetchApi<{ child: ChildProfile }>('/api/parent/children', {
        method: 'POST',
        body: JSON.stringify({ displayName: createName, gradeLevel: createGrade }),
      });
      setCreateName('');
      setCreateGrade(3);
      setMessage('Child profile created.');
      await loadDashboard();
    } catch (reason) {
      setMessage(reason instanceof Error ? reason.message : 'Child profile could not be saved.');
    } finally {
      setSaving(false);
    }
  }

  async function updateChild(childId: string, payload: Partial<Pick<ChildProfile, 'displayName' | 'gradeLevel' | 'status'>>) {
    setSaving(true);
    setMessage('');
    try {
      await fetchApi<{ child: ChildProfile }>(`/api/parent/children/${encodeURIComponent(childId)}`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
      });
      setMessage('Child profile updated.');
      await loadDashboard();
    } catch (reason) {
      setMessage(reason instanceof Error ? reason.message : 'Child profile could not be saved.');
    } finally {
      setSaving(false);
    }
  }

  if (error) return <p className="block-card p-5 font-black text-berryDark">{error}</p>;
  if (!data) return <p className="text-xl font-black text-muted">Loading parent dashboard...</p>;

  return (
    <section className="space-y-7">
      <div className="block-card p-6 sm:p-8">
        <p className="stat-chip w-fit">Parent account: {data.parent.username}</p>
        <h1 className="mt-4 text-[clamp(3rem,8vw,5.5rem)]">Progress Dashboard</h1>
        <p className="mt-4 max-w-3xl text-lg font-extrabold text-muted">
          Keep an eye on progress, streaks, hearts, and recent lesson activity for every active child profile.
        </p>
      </div>

      <form className="soft-panel grid gap-4 p-5 lg:grid-cols-[1fr_140px_auto]" onSubmit={createChild}>
        <div>
          <label className="block font-black" htmlFor="new-child-name">Child name</label>
          <input
            id="new-child-name"
            value={createName}
            onInput={(event) => setCreateName((event.currentTarget as HTMLInputElement).value)}
            required
            className="mt-2 min-h-[50px] w-full rounded-lg border-[3px] border-ink bg-white px-4 font-extrabold outline-none focus:ring-4 focus:ring-reward"
          />
        </div>
        <div>
          <label className="block font-black" htmlFor="new-child-grade">Grade</label>
          <select
            id="new-child-grade"
            value={createGrade}
            onInput={(event) => setCreateGrade(Number((event.currentTarget as HTMLSelectElement).value))}
            className="mt-2 min-h-[50px] w-full rounded-lg border-[3px] border-ink bg-white px-3 font-extrabold outline-none focus:ring-4 focus:ring-reward"
          >
            {gradeOptions.map((grade) => (
              <option key={grade} value={grade}>Grade {grade}</option>
            ))}
          </select>
        </div>
        <button className="primary-button self-end" type="submit" disabled={saving}>
          Add Child
        </button>
      </form>

      {message && <p className="soft-panel p-4 font-black text-muted">{message}</p>}

      {data.children.length === 0 && (
        <section className="soft-panel p-5">
          <h2 className="text-3xl">No child profiles yet</h2>
        </section>
      )}

      {data.children.map((childSummary) => (
        <ChildPanel
          key={childSummary.child.id}
          childSummary={childSummary}
          saving={saving}
          onSave={(payload) => updateChild(childSummary.child.id, payload)}
        />
      ))}
    </section>
  );
}

function ChildPanel({
  childSummary,
  saving,
  onSave,
}: {
  childSummary: DashboardData['children'][number];
  saving: boolean;
  onSave: (payload: Partial<Pick<ChildProfile, 'displayName' | 'gradeLevel' | 'status'>>) => void;
}) {
  const [displayName, setDisplayName] = useState(childSummary.child.displayName);
  const [gradeLevel, setGradeLevel] = useState(childSummary.child.gradeLevel);
  const isArchived = childSummary.child.status === 'archived';

  useEffect(() => {
    setDisplayName(childSummary.child.displayName);
    setGradeLevel(childSummary.child.gradeLevel);
  }, [childSummary.child.displayName, childSummary.child.gradeLevel]);

  return (
    <section className={`soft-panel p-5 ${isArchived ? 'opacity-75' : ''}`}>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-center gap-4">
          <BlockAvatar avatarKey={childSummary.child.avatarKey} label={childSummary.child.displayName} size="sm" />
          <div>
            <h2 className="text-3xl">{childSummary.child.displayName}</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="stat-chip">Grade {childSummary.child.gradeLevel}</span>
              <span className="stat-chip">{isArchived ? 'Archived' : 'Active'}</span>
              <span className="stat-chip">{childSummary.stats.xpTotal} XP</span>
              <span className="stat-chip">{childSummary.stats.streak} day streak</span>
              <span className="stat-chip">{childSummary.stats.heartsRemaining} hearts</span>
            </div>
          </div>
        </div>
        <form
          className="grid gap-3 sm:grid-cols-[1fr_130px_auto_auto]"
          onSubmit={(event) => {
            event.preventDefault();
            onSave({ displayName, gradeLevel });
          }}
        >
          <input
            aria-label="Child name"
            value={displayName}
            onInput={(event) => setDisplayName((event.currentTarget as HTMLInputElement).value)}
            className="min-h-[44px] rounded-lg border-2 border-ink bg-white px-3 font-extrabold outline-none focus:ring-4 focus:ring-reward"
          />
          <select
            aria-label="Grade"
            value={gradeLevel}
            onInput={(event) => setGradeLevel(Number((event.currentTarget as HTMLSelectElement).value))}
            className="min-h-[44px] rounded-lg border-2 border-ink bg-white px-3 font-extrabold outline-none focus:ring-4 focus:ring-reward"
          >
            {gradeOptions.map((grade) => (
              <option key={grade} value={grade}>Grade {grade}</option>
            ))}
          </select>
          <button className="secondary-button min-h-[44px] px-4 py-2" type="submit" disabled={saving}>
            Save
          </button>
          <button
            className={isArchived ? 'primary-button min-h-[44px] px-4 py-2' : 'danger-button min-h-[44px] px-4 py-2'}
            type="button"
            disabled={saving}
            onClick={() => onSave({ status: isArchived ? 'active' : 'archived' })}
          >
            {isArchived ? 'Unarchive' : 'Archive'}
          </button>
        </form>
      </div>

      {!isArchived && (
        <>
          <div className="mt-5 space-y-5">
            {(['scholastic', 'foundation'] as const).map((trackGroup) => {
              const tracks = childSummary.tracks.filter((track) => track.trackGroup === trackGroup);
              if (tracks.length === 0) return null;

              return (
                <section key={trackGroup}>
                  <h3 className="text-2xl">{trackGroup === 'scholastic' ? 'Scholastic' : 'Foundation'}</h3>
                  <div className="mt-3 grid gap-4 lg:grid-cols-3">
                    {tracks.map((track) => {
                      const progress = percent(track.lessonsCompleted, track.totalLessons);
                      return (
                        <div key={track.id} className="block-card p-4">
                          <h4 className="display-font text-2xl">{track.title}</h4>
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
                </section>
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
        </>
      )}
    </section>
  );
}
