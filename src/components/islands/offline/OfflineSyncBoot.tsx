import { useEffect } from 'preact/hooks';
import { startOfflineSync } from './api';

export default function OfflineSyncBoot() {
  useEffect(() => startOfflineSync(), []);
  return null;
}
