// Name and version of cache
const CACHE_NAME = "edusafe-cache-v2";

// Files to cache
const urlsToCache = [
  "/",
  "/project.html",
  "/project.css",
  "/offline.html",
  "/project.js",
  "/manifest.json",
  "/offline.html",   // fallback page
  "/images/logo.png",
  "/images/banner.jpg"
];

// Install Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate Service Worker (clear old caches)
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch from cache, fallback to network, then offline page
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).catch(() => {
          // Only show offline.html for navigation requests
          if (event.request.mode === "navigate") {
            return caches.match("/offline.html");
          }
        })
      );
    })
  );
});
