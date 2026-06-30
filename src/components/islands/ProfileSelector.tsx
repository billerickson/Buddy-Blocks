import { useEffect, useState } from 'preact/hooks';
import { BlockAvatar } from './BlockAvatar';
import { fetchCachedApi } from './offline/api';

type Child = {
  id: string;
  slug: string;
  displayName: string;
  avatarKey: string;
  levelBand: string;
};

export default function ProfileSelector() {
  const [children, setChildren] = useState<Child[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    fetchCachedApi<{ children: Child[] }>('/api/children', { type: 'children' })
      .then(({ data }) => {
        setChildren(data.children);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, []);

  return (
    <section>
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="stat-chip mb-4 w-fit">Choose your builder</p>
          <h1 className="text-[clamp(3rem,8vw,6rem)]">Who is learning?</h1>
        </div>
        <a className="secondary-button" href="/parent/">
          Parent Dashboard
        </a>
      </div>

      {status === 'loading' && <p className="mt-8 text-xl font-black text-muted">Loading profiles...</p>}
      {status === 'error' && <p className="mt-8 block-card p-5 font-black text-berryDark">Profiles could not load. Try signing in again.</p>}

      {status === 'ready' && (
        <div className="kid-grid mt-8">
          {children.map((child) => (
            <a
              key={child.id}
              href={`/kid/${child.slug}/`}
              className="block-card flex min-h-[260px] flex-col items-center justify-center p-6 text-center no-underline transition-transform hover:-translate-y-1"
            >
              <BlockAvatar avatarKey={child.avatarKey} label={child.displayName} />
              <h2 className="mt-4 text-4xl">{child.displayName}</h2>
              <p className="mt-2 font-extrabold text-muted">{child.levelBand}</p>
              <span className="primary-button mt-5 w-full">Start Building</span>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
