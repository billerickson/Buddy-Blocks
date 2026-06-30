import { useEffect } from 'preact/hooks';
import { startOfflineSync } from './api';
import { clearOfflineData } from './store';

export default function OfflineSyncBoot() {
  useEffect(() => {
    const stopSync = startOfflineSync();
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target;
      const link = target instanceof Element ? target.closest<HTMLAnchorElement>('a[href="/logout/"], a[href="/logout"]') : null;
      if (!link) return;

      event.preventDefault();
      const href = link.href;
      if ('serviceWorker' in navigator) navigator.serviceWorker.controller?.postMessage({ type: 'CLEAR_OFFLINE_DATA' });
      void clearOfflineData().finally(() => {
        window.location.href = href;
      });
    };

    document.addEventListener('click', onClick);
    return () => {
      stopSync();
      document.removeEventListener('click', onClick);
    };
  }, []);
  return null;
}
