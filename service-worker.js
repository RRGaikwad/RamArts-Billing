const CACHE_NAME = "ramarts-v4";
const PRE_CACHE_RESOURCES = [
  "./",
  "./RamArts%20Billing%20Receipt_01.html",
  "./manifest.json",
  "./RamArts%20Icon.png",
  "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=EB+Garamond:ital,wght@0,400;0,600;1,400&family=Source+Sans+3:wght@400;600&family=Montserrat:wght@700&display=swap",
  "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"
];

// Pre-cache resources on install
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRE_CACHE_RESOURCES);
    })
  );
});

// Clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Cache-first, network fallback
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});
