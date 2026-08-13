import { fetchApi } from '../api';
import {
  addSyncEvent,
  countPendingCompletions,
  getApiResponse,
  getLessonPack,
  getPendingCompletion,
  getSavedFactsLab,
  getSavedTrackPack,
  listPendingCompletions,
  putApiResponse,
  putLessonPack,
  queuePendingCompletion,
  updatePendingCompletion,
  type LessonPackRecord,
  type FactsLabPackRecord,
  type TrackLessonPackRecord,
} from './store';

const CACHE_VERSION = 4;
const DEFAULT_PACK_SIZE = 5;
const SHELL_URLS = ['/profiles/', '/kid/shell/', '/kid/track-shell/', '/kid/lesson-shell/', '/kid/facts-shell/'];
const PAGE_CACHE_NAME = 'buddy-blocks-pages-v3';
const STATIC_CACHE_NAME = 'buddy-blocks-static-v7';

export type OfflineSource = 'network' | 'cache' | 'queued';

export type OfflineResult<T> = {
  data: T;
  source: OfflineSource;
  savedAt?: string;
};

export async function getQueuedCompletionResult<T>(clientAttemptId: string) {
  const completion = await getPendingCompletion<unknown, T>(clientAttemptId);
  return completion
    ? { status: completion.status, syncedResult: completion.syncedResult }
    : null;
}

export type TrackLike = {
  slug: string;
  lessonsCompleted?: number;
  xpTotal?: number;
  currentLesson?: null | { id: string; title: string };
};

export type HomeLike = {
  stats?: {
    xpTotal?: number;
    heartsRemaining?: number;
  };
  recommendedLesson?: null | { id: string; title?: string; trackTitle?: string; unitTitle?: string; trackSlug?: string };
  practiceSets?: Array<{ lessonId: string }>;
  tracks: TrackLike[];
};

type LessonStatus = 'locked' | 'available' | 'completed';

type LessonLink = {
  id: string;
  title: string;
  trackTitle: string;
  unitTitle: string;
  trackSlug?: string;
};

export type TrackDataLike = {
  child?: { slug: string };
  track: { slug: string; title?: string };
  progress?: {
    lessonsCompleted: number;
    xpTotal: number;
    currentLesson: null | { id: string; title: string };
  };
  units: Array<{
    title?: string;
    lessons: Array<{
      id: string;
      title?: string;
      status: LessonStatus;
      completedAt?: string | null;
      bestScoreCorrect?: number;
      bestScoreTotal?: number;
    }>;
  }>;
};

export type LessonDataLike = {
  progress?: {
    status?: LessonStatus;
    completedAt?: string | null;
    bestScoreCorrect?: number;
    bestScoreTotal?: number;
  };
  lesson: {
    id: string;
    title: string;
    unit: { title: string };
    track: { slug: string; title: string };
  };
};

export type TrackOfflinePack = {
  child: { slug: string };
  track: { slug: string; title: string };
  progress: TrackDataLike['progress'];
  units: TrackDataLike['units'];
  lessons: LessonDataLike[];
};

export type CompletionEnvelope = {
  result: {
    lessonAttemptId: string;
    scoreCorrect: number;
    scoreTotal: number;
    xpAwarded: number;
    heartsRemaining: number;
    streak: number;
    nextLesson: null | LessonLink;
    syncStatus?: 'queued' | 'synced';
    clientAttemptId?: string;
  };
};

export type LessonCompletionBody = {
  clientAttemptId?: string;
  startedAt: string;
  attempts: unknown[];
};

export type MultiplicationSessionBody = {
  clientAttemptId?: string;
  mode: 'practice' | 'timed';
  selectedFactors: number[];
  durationSeconds: 60 | 120 | null;
  inputMethod: 'keyboard' | 'voice';
  startedAt: string;
  attempts: unknown[];
};

export type LessonPackSummary = LessonPackRecord & {
  lessonsCached: number;
};

export type TrackLessonPackSummary = TrackLessonPackRecord & {
  childSlug: string;
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

export function fetchMultiplicationOverview<T>(childSlug: string) {
  return fetchCachedApi<T>(`/api/children/${encodeURIComponent(childSlug)}/multiplication`, {
    childSlug,
    type: 'multiplication-overview',
  });
}

export async function saveMultiplicationOffline<T>(childSlug: string, overview?: T): Promise<FactsLabPackRecord> {
  const overviewPath = `/api/children/${encodeURIComponent(childSlug)}/multiplication`;
  const data = overview ?? (await fetchApi<T>(overviewPath));
  await putApiResponse(overviewPath, data, { childSlug, type: 'multiplication-overview' });

  const assetsCached = await cacheOfflinePages(
    ['/kid/facts-shell/', `/kid/${encodeURIComponent(childSlug)}/facts/`],
    true,
  );
  const savedAt = new Date().toISOString();
  const factsLab: FactsLabPackRecord = { assetsCached, savedAt, version: CACHE_VERSION };
  const existing = await getLessonPack(childSlug);
  await putLessonPack(
    mergeLessonPackRecord(existing, {
      childSlug,
      lessonIds: [],
      trackSlugs: [],
      savedAt,
      version: CACHE_VERSION,
      factsLab,
    }),
  );
  await addSyncEvent(`Saved Facts Lab offline for ${childSlug}.`);
  return factsLab;
}

export async function fetchCachedApi<T>(
  path: string,
  metadata: { childSlug?: string; type?: string } = {},
): Promise<OfflineResult<T>> {
  let data: T;

  try {
    data = await fetchApi<T>(path);
  } catch (error) {
    try {
      const cached = await getApiResponse<T>(path);
      if (cached) return { data: cached.data, source: 'cache', savedAt: cached.savedAt };
    } catch {
      // Offline storage is optional. Preserve the network error when Safari cannot open IndexedDB.
    }
    throw error;
  }

  // A successful network response must remain usable when IndexedDB is unavailable or stalls.
  void putApiResponse(path, data, metadata).catch(() => {});
  void syncPendingCompletions().catch(() => {});
  return { data, source: 'network' };
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
  await putLessonPack(mergeLessonPackRecord(await getLessonPack(childSlug), record));
  return { ...record, lessonsCached: lessonIds.length };
}

export async function saveTrackLessonPack(childSlug: string, trackSlug: string): Promise<TrackLessonPackSummary> {
  const homePath = `/api/children/${encodeURIComponent(childSlug)}/home`;
  const trackPath = `/api/children/${encodeURIComponent(childSlug)}/tracks/${encodeURIComponent(trackSlug)}`;
  const packPath = `${trackPath}/offline-pack`;

  const home = await fetchApi<HomeLike>(homePath);
  await putApiResponse(homePath, home, { childSlug, type: 'child-home' });

  const pack = await fetchApi<TrackOfflinePack>(packPath);
  await putApiResponse(trackPath, trackResponseFromPack(pack), { childSlug, type: 'child-track' });
  await putApiResponse(packPath, pack, { childSlug, type: 'child-track-offline-pack' });

  const lessonIds = selectTrackLessonIds(pack);
  for (const lessonData of pack.lessons) {
    const path = `/api/children/${encodeURIComponent(childSlug)}/lessons/${encodeURIComponent(lessonData.lesson.id)}`;
    await putApiResponse(path, lessonData, { childSlug, type: 'child-lesson' });
  }

  await cacheShellUrls(childSlug, [trackSlug], lessonIds);

  const savedAt = new Date().toISOString();
  const trackPack: TrackLessonPackRecord = {
    trackSlug,
    lessonIds,
    lessonsCached: lessonIds.length,
    savedAt,
    version: CACHE_VERSION,
  };
  await putLessonPack(
    mergeLessonPackRecord(await getLessonPack(childSlug), {
      childSlug,
      lessonIds,
      trackSlugs: [trackSlug],
      savedAt,
      version: CACHE_VERSION,
      completedTrackPacks: [trackPack],
    }),
  );
  await addSyncEvent(`Saved ${pack.track.title || trackSlug} offline for ${childSlug}.`);
  return { ...trackPack, childSlug };
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

export function selectTrackLessonIds(pack: TrackOfflinePack) {
  return uniqueStrings(pack.lessons.map((lessonData) => lessonData.lesson.id));
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
    const shouldQueue = shouldQueueForOffline(error) || (await shouldQueueLockedCachedLesson(error, childSlug, lessonId, trackSlug));
    if (!shouldQueue) throw error;

    let queuedResult = {
      ...localResult,
      result: {
        ...localResult.result,
        syncStatus: 'queued',
        clientAttemptId,
      },
    };
    const nextLesson = await applyLocalLessonCompletion(childSlug, lessonId, trackSlug, queuedResult);
    if (nextLesson) {
      queuedResult = {
        ...queuedResult,
        result: {
          ...queuedResult.result,
          nextLesson,
        },
      };
    }
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

export async function submitMultiplicationSession<T>({
  childSlug,
  body,
  localResult,
}: {
  childSlug: string;
  body: MultiplicationSessionBody;
  localResult: T;
}): Promise<OfflineResult<T> & { clientAttemptId: string }> {
  const clientAttemptId = body.clientAttemptId || createClientAttemptId();
  const bodyWithAttemptId = { ...body, clientAttemptId };
  const path = `/api/children/${encodeURIComponent(childSlug)}/multiplication/sessions`;

  try {
    if (isProbablyOffline()) throw new TypeError('Offline');
    const data = await fetchApi<T>(path, { method: 'POST', body: JSON.stringify(bodyWithAttemptId) });
    void refreshCachedMultiplicationContext(childSlug);
    void syncPendingCompletions();
    return { data, source: 'network', clientAttemptId };
  } catch (error) {
    if (!shouldQueueForOffline(error)) throw error;
    const queuedResult = withQueuedFactsResult(localResult, clientAttemptId);
    await queuePendingCompletion({
      clientAttemptId,
      childSlug,
      lessonId: 'multiplication-facts',
      kind: 'multiplication',
      path,
      body: bodyWithAttemptId,
      localResult: queuedResult,
    });
    await addSyncEvent(`Saved multiplication facts offline for ${childSlug}.`);
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

export { countPendingCompletions, getLessonPack, getSavedFactsLab, getSavedTrackPack };

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
      if (item.kind === 'multiplication') await refreshCachedMultiplicationContext(item.childSlug);
      else await refreshCachedLessonContext(item.childSlug, item.lessonId, item.trackSlug, data);
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
      break;
    }
  }

  return synced;
}

async function refreshCachedMultiplicationContext(childSlug: string) {
  if (isProbablyOffline()) return;
  await refreshCachePath(`/api/children/${encodeURIComponent(childSlug)}/home`, childSlug, 'child-home');
  await refreshCachePath(
    `/api/children/${encodeURIComponent(childSlug)}/multiplication`,
    childSlug,
    'multiplication-overview',
  );
}

function withQueuedFactsResult<T>(localResult: T, clientAttemptId: string): T {
  if (!localResult || typeof localResult !== 'object') return localResult;
  const envelope = localResult as T & { result?: Record<string, unknown> };
  if (!envelope.result) return localResult;
  return {
    ...envelope,
    result: { ...envelope.result, syncStatus: 'queued', clientAttemptId },
  };
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

async function applyLocalLessonCompletion<T extends CompletionEnvelope>(
  childSlug: string,
  lessonId: string,
  trackSlug: string | undefined,
  completion: T,
): Promise<LessonLink | null> {
  if (!trackSlug) return null;

  try {
    const trackPath = `/api/children/${encodeURIComponent(childSlug)}/tracks/${encodeURIComponent(trackSlug)}`;
    const cachedTrack = await getApiResponse<TrackDataLike>(trackPath);
    if (!cachedTrack) return null;

    const trackData = cloneJson(cachedTrack.data);
    const lessons = flattenTrackLessons(trackData);
    const currentIndex = lessons.findIndex((item) => item.lesson.id === lessonId);
    if (currentIndex < 0) return null;

    const current = lessons[currentIndex];
    const wasCompleted = current.lesson.status === 'completed';
    const completedAt = new Date().toISOString();
    const bestScoreCorrect = Math.max(current.lesson.bestScoreCorrect ?? 0, completion.result.scoreCorrect);

    current.lesson.status = 'completed';
    current.lesson.completedAt = current.lesson.completedAt ?? completedAt;
    current.lesson.bestScoreCorrect = bestScoreCorrect;
    current.lesson.bestScoreTotal = completion.result.scoreTotal;

    const next = lessons.slice(currentIndex + 1).find((item) => item.lesson.status !== 'completed') ?? null;
    if (next && next.lesson.status === 'locked') next.lesson.status = 'available';

    const nextLesson = next
      ? {
          id: next.lesson.id,
          title: next.lesson.title || 'Next lesson',
          trackTitle: trackData.track.title || 'Track',
          unitTitle: next.unit.title || 'Unit',
          trackSlug,
        }
      : null;

    if (trackData.progress) {
      if (!wasCompleted) trackData.progress.lessonsCompleted += 1;
      trackData.progress.xpTotal += completion.result.xpAwarded;
      trackData.progress.currentLesson = next ? { id: next.lesson.id, title: next.lesson.title || 'Next lesson' } : null;
    }

    await putApiResponse(trackPath, trackData, { childSlug, type: 'child-track' });
    await updateCachedLessonProgress(childSlug, lessonId, {
      status: 'completed',
      completedAt,
      bestScoreCorrect,
      bestScoreTotal: completion.result.scoreTotal,
    });
    if (next) {
      await updateCachedLessonProgress(childSlug, next.lesson.id, {
        status: 'available',
        completedAt: null,
        bestScoreCorrect: next.lesson.bestScoreCorrect ?? 0,
        bestScoreTotal: next.lesson.bestScoreTotal ?? 0,
      });
    }
    await updateCachedHomeAfterLocalCompletion(childSlug, trackSlug, lessonId, completion, nextLesson, wasCompleted);

    return nextLesson;
  } catch {
    return null;
  }
}

async function updateCachedLessonProgress(
  childSlug: string,
  lessonId: string,
  progress: Required<NonNullable<LessonDataLike['progress']>>,
) {
  const path = `/api/children/${encodeURIComponent(childSlug)}/lessons/${encodeURIComponent(lessonId)}`;
  const cachedLesson = await getApiResponse<LessonDataLike>(path);
  if (!cachedLesson) return;

  const lessonData = cloneJson(cachedLesson.data);
  lessonData.progress = {
    ...(lessonData.progress ?? {}),
    ...progress,
  };
  await putApiResponse(path, lessonData, { childSlug, type: 'child-lesson' });
}

async function updateCachedHomeAfterLocalCompletion<T extends CompletionEnvelope>(
  childSlug: string,
  trackSlug: string,
  lessonId: string,
  completion: T,
  nextLesson: LessonLink | null,
  wasCompleted: boolean,
) {
  const homePath = `/api/children/${encodeURIComponent(childSlug)}/home`;
  const cachedHome = await getApiResponse<HomeLike>(homePath);
  if (!cachedHome) return;

  const home = cloneJson(cachedHome.data);
  const track = home.tracks.find((item) => item.slug === trackSlug);
  if (track) {
    if (!wasCompleted && typeof track.lessonsCompleted === 'number') track.lessonsCompleted += 1;
    if (typeof track.xpTotal === 'number') track.xpTotal += completion.result.xpAwarded;
    track.currentLesson = nextLesson ? { id: nextLesson.id, title: nextLesson.title } : null;
  }
  if (home.stats) {
    if (typeof home.stats.xpTotal === 'number') home.stats.xpTotal += completion.result.xpAwarded;
    home.stats.heartsRemaining = completion.result.heartsRemaining;
  }
  if (!home.recommendedLesson || home.recommendedLesson.id === lessonId || home.recommendedLesson.trackSlug === trackSlug) {
    home.recommendedLesson = nextLesson;
  }

  await putApiResponse(homePath, home, { childSlug, type: 'child-home' });
}

async function shouldQueueLockedCachedLesson(
  error: unknown,
  childSlug: string,
  lessonId: string,
  trackSlug: string | undefined,
) {
  if (!trackSlug) return false;
  const message = error instanceof Error ? error.message : String(error);
  if (!/lesson_locked/i.test(message)) return false;

  const trackPath = `/api/children/${encodeURIComponent(childSlug)}/tracks/${encodeURIComponent(trackSlug)}`;
  const cachedTrack = await getApiResponse<TrackDataLike>(trackPath);
  if (!cachedTrack) return false;

  const lesson = flattenTrackLessons(cachedTrack.data).find((item) => item.lesson.id === lessonId)?.lesson;
  return Boolean(lesson && lesson.status !== 'locked');
}

function flattenTrackLessons(trackData: TrackDataLike) {
  return trackData.units.flatMap((unit) => unit.lessons.map((lesson) => ({ unit, lesson })));
}

function trackResponseFromPack(pack: TrackOfflinePack): TrackDataLike {
  return {
    child: pack.child,
    track: pack.track,
    progress: pack.progress,
    units: pack.units,
  };
}

function mergeLessonPackRecord(existing: LessonPackRecord | null, incoming: LessonPackRecord): LessonPackRecord {
  const incomingTrackPacks = incoming.completedTrackPacks ?? [];
  const replacedTrackSlugs = new Set(incomingTrackPacks.map((trackPack) => trackPack.trackSlug));
  const completedTrackPacks = [
    ...(existing?.completedTrackPacks ?? []).filter((trackPack) => !replacedTrackSlugs.has(trackPack.trackSlug)),
    ...incomingTrackPacks,
  ];

  return {
    childSlug: incoming.childSlug,
    lessonIds: uniqueStrings([...(existing?.lessonIds ?? []), ...incoming.lessonIds]),
    trackSlugs: uniqueStrings([...(existing?.trackSlugs ?? []), ...incoming.trackSlugs]),
    savedAt: incoming.savedAt,
    version: CACHE_VERSION,
    completedTrackPacks,
    factsLab: incoming.factsLab ?? existing?.factsLab,
  };
}

function uniqueStrings(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}

function cloneJson<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
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

  await cacheOfflinePages(urls);
}

async function cacheOfflinePages(urls: string[], strict = false) {
  if (typeof window === 'undefined' || !('caches' in window)) {
    if (strict) throw new Error('Offline downloads are not supported in this browser.');
    return 0;
  }

  const pageCache = await caches.open(PAGE_CACHE_NAME);
  const assetUrls = new Set<string>();
  const failures: string[] = [];

  for (const url of uniqueStrings(urls)) {
    try {
      const response = await fetch(url, { credentials: 'same-origin' });
      if (!response.ok || response.redirected) throw new Error(`Could not cache ${url}.`);
      await pageCache.put(url, response.clone());
      if (response.headers.get('content-type')?.includes('text/html')) {
        for (const assetUrl of extractOfflineAssetUrls(await response.text(), new URL(url, window.location.origin).href)) {
          assetUrls.add(assetUrl);
        }
      }
    } catch {
      failures.push(url);
    }
  }

  if (strict && failures.length > 0) throw new Error('Could not finish saving Facts Lab for offline use.');
  const assetsCached = await cacheOfflineAssets(assetUrls, strict);
  if (strict && assetsCached === 0) throw new Error('Could not save the Facts Lab app files.');
  return assetsCached;
}

async function cacheOfflineAssets(initialUrls: Iterable<string>, strict: boolean) {
  const cache = await caches.open(STATIC_CACHE_NAME);
  const queued = Array.from(initialUrls);
  const seen = new Set<string>();
  let cached = 0;

  while (queued.length > 0) {
    const assetUrl = queued.shift();
    if (!assetUrl || seen.has(assetUrl)) continue;
    seen.add(assetUrl);

    try {
      const response = await fetch(assetUrl, { credentials: 'same-origin' });
      if (!response.ok || response.redirected) throw new Error(`Could not cache ${assetUrl}.`);
      await cache.put(assetUrl, response.clone());
      cached += 1;

      const pathname = new URL(assetUrl).pathname;
      if (/\.(?:css|m?js)$/.test(pathname)) {
        const source = await response.text();
        for (const dependencyUrl of extractOfflineAssetUrls(source, assetUrl)) {
          if (!seen.has(dependencyUrl)) queued.push(dependencyUrl);
        }
      }
    } catch {
      if (strict) throw new Error('Could not finish saving the Facts Lab app files.');
    }
  }

  return cached;
}

export function extractOfflineAssetUrls(source: string, baseUrl: string) {
  const base = new URL(baseUrl);
  const candidates = new Set<string>();
  const quotedValuePattern = /["'`]((?:\/|\.\.?\/)[^"'`\s<>]+)["'`]/g;
  const cssUrlPattern = /url\(\s*["']?([^"')\s]+)["']?\s*\)/g;

  for (const pattern of [quotedValuePattern, cssUrlPattern]) {
    for (const match of source.matchAll(pattern)) candidates.add(match[1]);
  }

  return Array.from(candidates)
    .map((candidate) => {
      try {
        const url = new URL(candidate.replace(/&amp;/g, '&'), base);
        url.hash = '';
        return url;
      } catch {
        return null;
      }
    })
    .filter((url): url is URL => Boolean(url && url.origin === base.origin && isOfflineAssetPath(url.pathname)))
    .map((url) => url.href);
}

function isOfflineAssetPath(pathname: string) {
  if (pathname === '/manifest.webmanifest') return true;
  if (!pathname.startsWith('/_astro/') && !pathname.startsWith('/icons/')) return false;
  return /\.(?:css|m?js|woff2?|ttf|otf|svg|png|jpe?g|gif|webp|avif|ico)$/.test(pathname);
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
