const CACHE = 'farouj-offline-v13';
const CORE = [
  './', './index.html', './admin.html', './firebase-config.js',
  './manifest.json', './offline-assets.json',
  './assets/vendor/firebase-app-compat.js',
  './assets/vendor/firebase-database-compat.js',
  './assets/vendor/firebase-auth-compat.js'
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    let offlineAssets = [];
    try {
      const response = await fetch('./offline-assets.json', { cache:'reload' });
      if (response.ok) offlineAssets = await response.json();
    } catch (_) {}
    const cache = await caches.open(CACHE);
    const assets = [...new Set([...CORE, ...offlineAssets])];
    await Promise.allSettled(assets.map(async asset => {
      const response = await fetch(asset, { cache:'reload' });
      if (response.ok) await cache.put(asset, response);
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
  );
  self.clients.claim();
});

// انسخ الاستجابة فوراً قبل أن يستهلكها المتصفح. تأخير clone() إلى داخل
// caches.open() كان يجعل جسم الاستجابة مستخدماً أحياناً، فتظهر أخطاء console.
function cacheResponse(event, request, response) {
  if (!response || !response.ok) return response;
  const responseCopy = response.clone();
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.put(request, responseCopy))
      .catch(() => undefined)
  );
  return response;
}

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      const cached = await caches.match(request);
      const fallback = url.pathname.startsWith('/admin') ? './admin.html' : './index.html';
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 2500);
      try {
        const response = await fetch(request, {cache:'no-store', signal:controller.signal});
        if (!response.ok) throw new Error('Navigation unavailable');
        return cacheResponse(event, request, response);
      } catch (_) {
        return cached || (await caches.match(fallback)) || Response.error();
      } finally { clearTimeout(timer); }
    })());
    return;
  }

  if (/\.(?:webp|jpg|jpeg|png|svg|woff2?)$/i.test(url.pathname)) {
    event.respondWith(
      caches.match(request).then(hit => hit || fetch(request).then(response => {
        return cacheResponse(event, request, response);
      }))
    );
    return;
  }

  event.respondWith(
    fetch(request).then(response => {
      return cacheResponse(event, request, response);
    }).catch(() => caches.match(request))
  );
});
