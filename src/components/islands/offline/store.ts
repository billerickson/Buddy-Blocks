const DB_NAME = 'buddy-blocks-offline';
const DB_VERSION = 1;

const API_RESPONSES = 'apiResponses';
const LESSON_PACKS = 'lessonPacks';
const PENDING_COMPLETIONS = 'pendingCompletions';
const SYNC_EVENTS = 'syncEvents';

export type CachedApiResponse<T = unknown> = {
  path: string;
  data: T;
  savedAt: string;
  childSlug?: string;
  type?: string;
};

export type LessonPackRecord = {
  childSlug: string;
  lessonIds: string[];
  trackSlugs: string[];
  savedAt: string;
  version: number;
  completedTrackPacks?: TrackLessonPackRecord[];
};

export type TrackLessonPackRecord = {
  trackSlug: string;
  lessonIds: string[];
  lessonsCached: number;
  savedAt: string;
  version: number;
};

export type PendingCompletionStatus = 'pending' | 'syncing' | 'synced' | 'blocked';

export type PendingCompletion<TBody = unknown, TResult = unknown> = {
  clientAttemptId: string;
  childSlug: string;
  lessonId: string;
  path: string;
  body: TBody;
  localResult: TResult;
  trackSlug?: string;
  createdAt: string;
  updatedAt: string;
  status: PendingCompletionStatus;
  retryCount: number;
  lastError?: string;
  syncedResult?: TResult;
};

export type SyncEventRecord = {
  id: string;
  createdAt: string;
  message: string;
  level: 'info' | 'error';
};

let dbPromise: Promise<IDBDatabase> | null = null;

export function canUseOfflineStorage() {
  return typeof indexedDB !== 'undefined';
}

export async function putApiResponse<T>(
  path: string,
  data: T,
  metadata: Pick<CachedApiResponse, 'childSlug' | 'type'> = {},
) {
  const record: CachedApiResponse<T> = {
    path,
    data,
    childSlug: metadata.childSlug,
    type: metadata.type,
    savedAt: new Date().toISOString(),
  };
  await putRecord(API_RESPONSES, record);
  emitOfflineUpdate();
  return record;
}

export async function getApiResponse<T>(path: string) {
  return getRecord<CachedApiResponse<T>>(API_RESPONSES, path);
}

export async function putLessonPack(record: LessonPackRecord) {
  await putRecord(LESSON_PACKS, record);
  emitOfflineUpdate();
}

export async function getLessonPack(childSlug: string) {
  return getRecord<LessonPackRecord>(LESSON_PACKS, childSlug);
}

export async function getSavedTrackPack(childSlug: string, trackSlug: string) {
  const pack = await getLessonPack(childSlug);
  return pack?.completedTrackPacks?.find((trackPack) => trackPack.trackSlug === trackSlug) ?? null;
}

export async function queuePendingCompletion<TBody, TResult>(
  completion: Omit<PendingCompletion<TBody, TResult>, 'createdAt' | 'updatedAt' | 'status' | 'retryCount'> &
    Partial<Pick<PendingCompletion<TBody, TResult>, 'createdAt' | 'updatedAt' | 'status' | 'retryCount'>>,
) {
  const now = new Date().toISOString();
  const existing = await getPendingCompletion<TBody, TResult>(completion.clientAttemptId);
  const record: PendingCompletion<TBody, TResult> = {
    ...completion,
    createdAt: existing?.createdAt ?? completion.createdAt ?? now,
    updatedAt: now,
    status: completion.status ?? existing?.status ?? 'pending',
    retryCount: completion.retryCount ?? existing?.retryCount ?? 0,
    lastError: existing?.lastError,
    syncedResult: existing?.syncedResult,
  };
  await putRecord(PENDING_COMPLETIONS, record);
  emitOfflineUpdate();
  return record;
}

export async function getPendingCompletion<TBody = unknown, TResult = unknown>(clientAttemptId: string) {
  return getRecord<PendingCompletion<TBody, TResult>>(PENDING_COMPLETIONS, clientAttemptId);
}

export async function listPendingCompletions() {
  const all = await getAllRecords<PendingCompletion>(PENDING_COMPLETIONS);
  return all
    .filter((item) => item.status === 'pending' || item.status === 'syncing' || item.status === 'blocked')
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

export async function countPendingCompletions() {
  return (await listPendingCompletions()).filter((item) => item.status !== 'synced').length;
}

export async function updatePendingCompletion<TResult>(
  clientAttemptId: string,
  updates: Partial<Pick<PendingCompletion<unknown, TResult>, 'status' | 'retryCount' | 'lastError' | 'syncedResult'>>,
) {
  const existing = await getPendingCompletion(clientAttemptId);
  if (!existing) return null;
  const updated = {
    ...existing,
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  await putRecord(PENDING_COMPLETIONS, updated);
  emitOfflineUpdate();
  return updated;
}

export async function clearOfflineData() {
  if (!canUseOfflineStorage()) return;
  const db = await openDb();
  await Promise.all([clearStore(db, API_RESPONSES), clearStore(db, LESSON_PACKS), clearStore(db, PENDING_COMPLETIONS), clearStore(db, SYNC_EVENTS)]);
  emitOfflineUpdate();
}

export async function addSyncEvent(message: string, level: SyncEventRecord['level'] = 'info') {
  const createdAt = new Date().toISOString();
  await putRecord(SYNC_EVENTS, {
    id: `${createdAt}_${Math.random().toString(36).slice(2)}`,
    createdAt,
    message,
    level,
  } satisfies SyncEventRecord);
  emitOfflineUpdate();
}

function openDb() {
  if (!canUseOfflineStorage()) return Promise.reject(new Error('Offline storage is not available.'));
  dbPromise ??= new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(API_RESPONSES)) db.createObjectStore(API_RESPONSES, { keyPath: 'path' });
      if (!db.objectStoreNames.contains(LESSON_PACKS)) db.createObjectStore(LESSON_PACKS, { keyPath: 'childSlug' });
      if (!db.objectStoreNames.contains(PENDING_COMPLETIONS)) {
        const store = db.createObjectStore(PENDING_COMPLETIONS, { keyPath: 'clientAttemptId' });
        store.createIndex('status', 'status');
        store.createIndex('childSlug', 'childSlug');
      }
      if (!db.objectStoreNames.contains(SYNC_EVENTS)) db.createObjectStore(SYNC_EVENTS, { keyPath: 'id' });
    };

    request.onerror = () => reject(request.error ?? new Error('Could not open offline storage.'));
    request.onsuccess = () => resolve(request.result);
  });
  return dbPromise;
}

async function putRecord(storeName: string, value: unknown) {
  const db = await openDb();
  const transaction = db.transaction(storeName, 'readwrite');
  const done = transactionDone(transaction);
  await requestToPromise(transaction.objectStore(storeName).put(value));
  await done;
}

async function getRecord<T>(storeName: string, key: IDBValidKey) {
  if (!canUseOfflineStorage()) return null;
  const db = await openDb();
  const transaction = db.transaction(storeName, 'readonly');
  const done = transactionDone(transaction);
  const value = await requestToPromise<T | undefined>(transaction.objectStore(storeName).get(key));
  await done;
  return value ?? null;
}

async function getAllRecords<T>(storeName: string) {
  if (!canUseOfflineStorage()) return [];
  const db = await openDb();
  const transaction = db.transaction(storeName, 'readonly');
  const done = transactionDone(transaction);
  const value = await requestToPromise<T[]>(transaction.objectStore(storeName).getAll());
  await done;
  return value;
}

async function clearStore(db: IDBDatabase, storeName: string) {
  const transaction = db.transaction(storeName, 'readwrite');
  const done = transactionDone(transaction);
  await requestToPromise(transaction.objectStore(storeName).clear());
  await done;
}

function requestToPromise<T = unknown>(request: IDBRequest<T>) {
  return new Promise<T>((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error('IndexedDB request failed.'));
  });
}

function transactionDone(transaction: IDBTransaction) {
  return new Promise<void>((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error ?? new Error('IndexedDB transaction failed.'));
    transaction.onabort = () => reject(transaction.error ?? new Error('IndexedDB transaction aborted.'));
  });
}

function emitOfflineUpdate() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('buddy-blocks-offline-updated'));
}
