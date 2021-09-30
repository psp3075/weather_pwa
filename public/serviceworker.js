const CACHE_NAME = "version-1";
const urlsToCache = ["index.html", "offline.html"];
let deferredPrompt;

const self = this;
self.addEventListener("beforeinstallprompt", (e) => {
  deferredPrompt = e;
  console.log(`'beforeinstallprompt' event was fired.`);
});
// Initialize deferredPrompt for use later to show browser install prompt.

//Install sw
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");

      return cache.addAll(urlsToCache);
    })
  );
});

//listen for requests

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then(() => {
      return fetch(e.request).catch(() => caches.match("offline.html"));
    })
  );
});

//Activate the sw
self.addEventListener("activate", (e) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);

  e.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
