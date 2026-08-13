export type OfflineDownloadState = 'idle' | 'saving' | 'saved' | 'error';

export function OfflineDownloadButton({
  state,
  title,
  onClick,
}: {
  state: OfflineDownloadState;
  title: string;
  onClick: () => void | Promise<void>;
}) {
  const saved = state === 'saved';
  const saving = state === 'saving';
  const errored = state === 'error';
  const label = saving
    ? `Saving ${title} offline`
    : saved
      ? `${title} saved offline`
      : errored
        ? `Retry saving ${title} offline`
        : `Save ${title} offline`;

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
