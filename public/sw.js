// Service Worker for VidGrab PWA

const CACHE_NAME = 'vidgrab-v1';
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/icon-192x192.png',
  '/icon-512x512.png',
];

// Install event - cache static assets
self.addEventListener('install', (event: ExtendableEvent) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching static assets');
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('Some assets could not be cached:', err);
      });
    })
  );
  (self as any).skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event: ExtendableEvent) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  (self as any).clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event: FetchEvent) => {
  const { request } = event;

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip external API requests to backend
  if (request.url.includes('vidgrab-server')) {
    event.respondWith(
      fetch(request).catch(() => {
        return new Response('Network error', { status: 503 });
      })
    );
    return;
  }

  // Cache-first strategy for static assets
  event.respondWith(
    caches.match(request).then((response) => {
      return (
        response ||
        fetch(request)
          .then((res) => {
            // Cache successful responses
            if (res && res.status === 200 && res.type === 'basic') {
              const responseToCache = res.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(request, responseToCache);
              });
            }
            return res;
          })
          .catch(() => {
            // Return cached response if offline
            return caches.match(request);
          })
      );
    })
  );
});

// Message handler for skip waiting
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    (self as any).skipWaiting();
  }
});
