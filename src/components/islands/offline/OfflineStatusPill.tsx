import { useEffect, useState } from 'preact/hooks';
import { countPendingCompletions, syncPendingCompletions } from './api';

export function OfflineStatusPill({ compact = false }: { compact?: boolean }) {
  const [online, setOnline] = useState(() => (typeof navigator === 'undefined' ? true : navigator.onLine));
  const [pendingCount, setPendingCount] = useState(0);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const refresh = () => {
      setOnline(navigator.onLine);
      countPendingCompletions().then((count) => {
        if (!cancelled) setPendingCount(count);
      });
    };

    refresh();
    window.addEventListener('online', refresh);
    window.addEventListener('offline', refresh);
    window.addEventListener('buddy-blocks-offline-updated', refresh);
    return () => {
      cancelled = true;
      window.removeEventListener('online', refresh);
      window.removeEventListener('offline', refresh);
      window.removeEventListener('buddy-blocks-offline-updated', refresh);
    };
  }, []);

  const label = syncing
    ? 'Syncing'
    : pendingCount > 0
      ? `${pendingCount} waiting to sync`
      : online
        ? 'Online'
        : 'Offline';

  return (
    <div className={`flex flex-wrap items-center gap-2 ${compact ? '' : 'my-3'}`}>
      <span className={`stat-chip ${online ? 'bg-[#d9fff5]' : 'bg-[#fff3eb]'}`}>{label}</span>
      {online && pendingCount > 0 && (
        <button
          className="secondary-button px-4 py-2 text-sm"
          type="button"
          disabled={syncing}
          onClick={async () => {
            setSyncing(true);
            try {
              await syncPendingCompletions();
            } finally {
              setSyncing(false);
            }
          }}
        >
          Sync now
        </button>
      )}
    </div>
  );
}
