const STATIC_CACHE = 'buddy-blocks-static-v6';
const PAGE_CACHE = 'buddy-blocks-pages-v2';
const API_CACHE = 'buddy-blocks-api-v2';
const OFFLINE_DB_NAME = 'buddy-blocks-offline-v3';
const STALE_OFFLINE_DB_NAMES = ['buddy-blocks-offline'];
const STATIC_ASSETS = ['/manifest.webmanifest', '/icons/buddy-blocks-bb-large.svg', '/icons/moxie.svg'];
const CURRENT_CACHES = new Set([STATIC_CACHE, PAGE_CACHE, API_CACHE]);

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(STATIC_CACHE).then((cache) => cache.addAll(STATIC_ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      caches.keys().then((keys) =>
        Promise.all(keys.filter((key) => key.startsWith('buddy-blocks-') && !CURRENT_CACHES.has(key)).map((key) => caches.delete(key))),
      ),
      ...STALE_OFFLINE_DB_NAMES.map((name) => deleteOfflineDatabase(name)),
    ]),
  );
  self.clients.claim();
});

self.addEventListener('message', (event) => {
  const data = event.data || {};
  if (data.type === 'CACHE_URLS' && Array.isArray(data.urls)) {
    const work = cacheUrls(data.urls.filter((url) => typeof url === 'string'));
    if (event.waitUntil) event.waitUntil(work);
  }
  if (data.type === 'CLEAR_OFFLINE_DATA') {
    const work = clearOfflineData();
    if (event.waitUntil) event.waitUntil(work);
  }
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  if (url.origin !== self.location.origin) return;

  if (isLogoutPath(url.pathname)) {
    event.respondWith(clearOfflineData().then(() => fetch(event.request)));
    return;
  }

  if (event.request.method !== 'GET') return;

  if (isStaticAsset(url.pathname)) {
    event.respondWith(staleWhileRevalidate(event.request, STATIC_CACHE));
    return;
  }

  if (isChildSafeApi(url.pathname)) {
    event.respondWith(networkFirst(event.request, API_CACHE));
    return;
  }

  if (isKidPage(url.pathname) || isShellPath(url.pathname)) {
    event.respondWith(networkFirst(event.request, PAGE_CACHE, shellFallbackFor(url.pathname)));
  }
});

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const refresh = fetch(request)
    .then((response) => {
      if (isCacheableResponse(response)) void cache.put(request, response.clone());
      return response;
    })
    .catch(() => null);

  return cached || (await refresh) || Response.error();
}

async function networkFirst(request, cacheName, fallbackPath) {
  const cache = await caches.open(cacheName);
  try {
    const response = await fetch(request);
    if (isCacheableResponse(response)) await cache.put(request, response.clone());
    return response;
  } catch {
    const cached = await cache.match(request);
    if (cached) return cached;
    if (fallbackPath) {
      const fallback = await cache.match(fallbackPath);
      if (fallback) return fallback;
    }
    return Response.error();
  }
}

async function cacheUrls(urls) {
  const cache = await caches.open(PAGE_CACHE);
  await Promise.all(
    urls.map(async (url) => {
      try {
        const response = await fetch(new Request(url, { credentials: 'same-origin' }));
        if (isCacheableResponse(response)) await cache.put(url, response);
      } catch {
        // Offline packs can still use IndexedDB cached lesson data if a shell request fails.
      }
    }),
  );
}

async function clearOfflineData() {
  const keys = await caches.keys();
  await Promise.all(keys.filter((key) => key.startsWith('buddy-blocks-')).map((key) => caches.delete(key)));
  await Promise.all([OFFLINE_DB_NAME, ...STALE_OFFLINE_DB_NAMES].map((name) => deleteOfflineDatabase(name)));
}

function deleteOfflineDatabase(name) {
  if (!('indexedDB' in self)) return Promise.resolve();
  return new Promise((resolve) => {
    const request = indexedDB.deleteDatabase(name);
    request.onsuccess = () => resolve();
    request.onerror = () => resolve();
    request.onblocked = () => resolve();
  });
}

function isStaticAsset(pathname) {
  return pathname.startsWith('/_astro/') || pathname.startsWith('/icons/') || pathname === '/manifest.webmanifest';
}

function isChildSafeApi(pathname) {
  return (
    pathname === '/api/children' ||
    /^\/api\/children\/[^/]+\/home$/.test(pathname) ||
    /^\/api\/children\/[^/]+\/tracks\/[^/]+\/offline-pack$/.test(pathname) ||
    /^\/api\/children\/[^/]+\/tracks\/[^/]+$/.test(pathname) ||
    /^\/api\/children\/[^/]+\/lessons\/[^/]+$/.test(pathname)
  );
}

function isKidPage(pathname) {
  return /^\/kid\/[^/]+(?:\/(?:track|lesson)\/[^/]+)?\/?$/.test(pathname);
}

function isShellPath(pathname) {
  return pathname === '/profiles/' || pathname === '/kid/shell/' || pathname === '/kid/track-shell/' || pathname === '/kid/lesson-shell/';
}

function isLogoutPath(pathname) {
  return pathname === '/logout' || pathname === '/logout/';
}

function shellFallbackFor(pathname) {
  const normalized = pathname.replace(/\/$/, '');
  if (/^\/kid\/[^/]+\/track\/[^/]+$/.test(normalized)) return '/kid/track-shell/';
  if (/^\/kid\/[^/]+\/lesson\/[^/]+$/.test(normalized)) return '/kid/lesson-shell/';
  if (/^\/kid\/[^/]+$/.test(normalized)) return '/kid/shell/';
  if (pathname === '/profiles/' || pathname === '/profiles') return '/profiles/';
  return null;
}

function isCacheableResponse(response) {
  return response && response.ok && !response.redirected && response.type !== 'opaqueredirect';
}
