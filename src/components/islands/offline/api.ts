import { fetchApi } from '../api';
import {
  addSyncEvent,
  countPendingCompletions,
  getApiResponse,
  getLessonPack,
  listPendingCompletions,
  putApiResponse,
  putLessonPack,
  queuePendingCompletion,
  updatePendingCompletion,
  type LessonPackRecord,
} from './store';

const CACHE_VERSION = 1;
const DEFAULT_PACK_SIZE = 5;
const SHELL_URLS = ['/profiles/', '/kid/shell/', '/kid/track-shell/', '/kid/lesson-shell/'];

export type OfflineSource = 'network' | 'cache' | 'queued';

export type OfflineResult<T> = {
  data: T;
  source: OfflineSource;
  savedAt?: string;
};

export type TrackLike = {
  slug: string;
};

export type HomeLike = {
  recommendedLesson?: null | { id: string };
  practiceSets?: Array<{ lessonId: string }>;
  tracks: TrackLike[];
};

export type TrackDataLike = {
  track: { slug: string };
  units: Array<{
    lessons: Array<{
      id: string;
      status: 'locked' | 'available' | 'completed';
    }>;
  }>;
};

export type CompletionEnvelope = {
  result: {
    lessonAttemptId: string;
    scoreCorrect: number;
    scoreTotal: number;
    xpAwarded: number;
    heartsRemaining: number;
    streak: number;
    nextLesson: null | { id: string; title: string; trackTitle: string; unitTitle: string };
    syncStatus?: 'queued' | 'synced';
    clientAttemptId?: string;
  };
};

export type LessonCompletionBody = {
  clientAttemptId?: string;
  startedAt: string;
  attempts: unknown[];
};

export type LessonPackSummary = LessonPackRecord & {
  lessonsCached: number;
};

let syncInFlight: Promise<number> | null = null;

export function fetchKidHome<T>(childSlug: string) {
  return fetchCachedApi<T>(`/api/children/${encodeURIComponent(childSlug)}/home`, {
    childSlug,
    type: 'child-home',
  });
}

export function fetchKidTrack<T>(childSlug: string, trackSlug: string) {
  return fetchCachedApi<T>(`/api/children/${encodeURIComponent(childSlug)}/tracks/${encodeURIComponent(trackSlug)}`, {
    childSlug,
    type: 'child-track',
  });
}

export function fetchKidLesson<T>(childSlug: string, lessonId: string) {
  return fetchCachedApi<T>(`/api/children/${encodeURIComponent(childSlug)}/lessons/${encodeURIComponent(lessonId)}`, {
    childSlug,
    type: 'child-lesson',
  });
}

export async function fetchCachedApi<T>(
  path: string,
  metadata: { childSlug?: string; type?: string } = {},
): Promise<OfflineResult<T>> {
  try {
    const data = await fetchApi<T>(path);
    await putApiResponse(path, data, metadata);
    void syncPendingCompletions();
    return { data, source: 'network' };
  } catch (error) {
    const cached = await getApiResponse<T>(path);
    if (cached) return { data: cached.data, source: 'cache', savedAt: cached.savedAt };
    throw error;
  }
}

export async function saveLessonPack(childSlug: string, maxLessons = DEFAULT_PACK_SIZE): Promise<LessonPackSummary> {
  const homePath = `/api/children/${encodeURIComponent(childSlug)}/home`;
  const home = await fetchApi<HomeLike>(homePath);
  await putApiResponse(homePath, home, { childSlug, type: 'child-home' });

  const trackResponses: TrackDataLike[] = [];
  for (const track of home.tracks) {
    const path = `/api/children/${encodeURIComponent(childSlug)}/tracks/${encodeURIComponent(track.slug)}`;
    const trackData = await fetchApi<TrackDataLike>(path);
    await putApiResponse(path, trackData, { childSlug, type: 'child-track' });
    trackResponses.push(trackData);
  }

  const lessonIds = selectOfflineLessonIds(home, trackResponses, maxLessons);
  for (const lessonId of lessonIds) {
    const path = `/api/children/${encodeURIComponent(childSlug)}/lessons/${encodeURIComponent(lessonId)}`;
    const lessonData = await fetchApi<unknown>(path);
    await putApiResponse(path, lessonData, { childSlug, type: 'child-lesson' });
  }

  await cacheShellUrls(childSlug, home.tracks.map((track) => track.slug), lessonIds);

  const record: LessonPackRecord = {
    childSlug,
    lessonIds,
    trackSlugs: home.tracks.map((track) => track.slug),
    savedAt: new Date().toISOString(),
    version: CACHE_VERSION,
  };
  await putLessonPack(record);
  return { ...record, lessonsCached: lessonIds.length };
}

export function selectOfflineLessonIds(home: HomeLike, tracks: TrackDataLike[], maxLessons = DEFAULT_PACK_SIZE) {
  const lessonIds: string[] = [];
  const addLesson = (lessonId?: string | null) => {
    if (!lessonId || lessonIds.includes(lessonId) || lessonIds.length >= maxLessons) return;
    lessonIds.push(lessonId);
  };

  addLesson(home.recommendedLesson?.id);
  for (const practiceSet of home.practiceSets ?? []) addLesson(practiceSet.lessonId);

  for (const track of tracks) {
    for (const unit of track.units) {
      for (const lesson of unit.lessons) {
        if (lesson.status === 'available') addLesson(lesson.id);
      }
    }
  }

  return lessonIds;
}

export async function submitLessonCompletion<T extends CompletionEnvelope>({
  childSlug,
  lessonId,
  body,
  localResult,
  trackSlug,
}: {
  childSlug: string;
  lessonId: string;
  body: LessonCompletionBody;
  localResult: T;
  trackSlug?: string;
}): Promise<OfflineResult<T> & { clientAttemptId: string }> {
  const clientAttemptId = body.clientAttemptId || createClientAttemptId();
  const bodyWithAttemptId = { ...body, clientAttemptId };
  const path = `/api/children/${encodeURIComponent(childSlug)}/lessons/${encodeURIComponent(lessonId)}`;

  try {
    if (isProbablyOffline()) throw new TypeError('Offline');
    const data = await fetchApi<T>(path, {
      method: 'POST',
      body: JSON.stringify(bodyWithAttemptId),
    });
    void refreshCachedLessonContext(childSlug, lessonId, trackSlug, data);
    void syncPendingCompletions();
    return { data, source: 'network', clientAttemptId };
  } catch (error) {
    if (!shouldQueueForOffline(error)) throw error;

    const queuedResult = {
      ...localResult,
      result: {
        ...localResult.result,
        syncStatus: 'queued',
        clientAttemptId,
      },
    };
    await queuePendingCompletion({
      clientAttemptId,
      childSlug,
      lessonId,
      path,
      trackSlug,
      body: bodyWithAttemptId,
      localResult: queuedResult,
    });
    await addSyncEvent(`Saved ${lessonId} offline for ${childSlug}.`);
    return { data: queuedResult, source: 'queued', clientAttemptId };
  }
}

export function startOfflineSync() {
  if (typeof window === 'undefined') return () => {};

  const sync = () => {
    void syncPendingCompletions();
  };
  window.addEventListener('online', sync);
  window.addEventListener('focus', sync);
  document.addEventListener('visibilitychange', sync);
  sync();

  return () => {
    window.removeEventListener('online', sync);
    window.removeEventListener('focus', sync);
    document.removeEventListener('visibilitychange', sync);
  };
}

export async function syncPendingCompletions() {
  if (syncInFlight) return syncInFlight;
  syncInFlight = syncPendingCompletionsNow().finally(() => {
    syncInFlight = null;
  });
  return syncInFlight;
}

export { countPendingCompletions, getLessonPack };

async function syncPendingCompletionsNow() {
  if (isProbablyOffline()) return 0;

  const pending = (await listPendingCompletions()).filter((item) => item.status === 'pending' || item.status === 'syncing');
  let synced = 0;

  for (const item of pending) {
    try {
      await updatePendingCompletion(item.clientAttemptId, { status: 'syncing', lastError: undefined });
      const data = await fetchApi<CompletionEnvelope>(item.path, {
        method: 'POST',
        body: JSON.stringify(item.body),
      });
      await updatePendingCompletion(item.clientAttemptId, {
        status: 'synced',
        syncedResult: data,
        lastError: undefined,
      });
      await refreshCachedLessonContext(item.childSlug, item.lessonId, item.trackSlug, data);
      await addSyncEvent(`Synced ${item.lessonId} for ${item.childSlug}.`);
      synced += 1;
    } catch (error) {
      const retryCount = item.retryCount + 1;
      await updatePendingCompletion(item.clientAttemptId, {
        status: 'pending',
        retryCount,
        lastError: error instanceof Error ? error.message : 'Sync failed.',
      });
      await addSyncEvent(`Could not sync ${item.lessonId}; will retry.`, 'error');
    }
  }

  return synced;
}

async function refreshCachedLessonContext(
  childSlug: string,
  lessonId: string,
  trackSlug: string | undefined,
  completion: CompletionEnvelope,
) {
  if (isProbablyOffline()) return;

  await refreshCachePath(`/api/children/${encodeURIComponent(childSlug)}/home`, childSlug, 'child-home');
  await refreshCachePath(`/api/children/${encodeURIComponent(childSlug)}/lessons/${encodeURIComponent(lessonId)}`, childSlug, 'child-lesson');
  if (trackSlug) await refreshCachePath(`/api/children/${encodeURIComponent(childSlug)}/tracks/${encodeURIComponent(trackSlug)}`, childSlug, 'child-track');
  if (completion.result.nextLesson) {
    await refreshCachePath(
      `/api/children/${encodeURIComponent(childSlug)}/lessons/${encodeURIComponent(completion.result.nextLesson.id)}`,
      childSlug,
      'child-lesson',
    );
  }
}

async function refreshCachePath(path: string, childSlug: string, type: string) {
  try {
    const data = await fetchApi<unknown>(path);
    await putApiResponse(path, data, { childSlug, type });
  } catch {
    // Cache refresh should not block sync completion.
  }
}

async function cacheShellUrls(childSlug: string, trackSlugs: string[], lessonIds: string[]) {
  if (typeof window === 'undefined') return;
  const urls = [
    ...SHELL_URLS,
    `/kid/${encodeURIComponent(childSlug)}/`,
    ...trackSlugs.map((trackSlug) => `/kid/${encodeURIComponent(childSlug)}/track/${encodeURIComponent(trackSlug)}/`),
    ...lessonIds.map((lessonId) => `/kid/${encodeURIComponent(childSlug)}/lesson/${encodeURIComponent(lessonId)}/`),
  ];

  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({ type: 'CACHE_URLS', urls });
  }

  if (!('caches' in window)) return;
  try {
    const cache = await caches.open('buddy-blocks-pages-v1');
    await Promise.all(urls.map((url) => fetch(url, { credentials: 'same-origin' }).then((response) => cache.put(url, response))));
  } catch {
    // The IndexedDB lesson pack is the source of truth; page cache failures can be retried later.
  }
}

function createClientAttemptId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return `client_attempt_${crypto.randomUUID()}`;
  return `client_attempt_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

function isProbablyOffline() {
  return typeof navigator !== 'undefined' && navigator.onLine === false;
}

function shouldQueueForOffline(error: unknown) {
  if (isProbablyOffline()) return true;
  if (error instanceof TypeError) return true;
  const message = error instanceof Error ? error.message : String(error);
  return /failed to fetch|network|offline/i.test(message);
}
