const CACHE_NAME = "version-1";
const urlsToCache = ["index.html", "offline.html"];

const self = this;
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

self.addEventListener("fetch", (e) => {});

//Activate the sw
self.addEventListener("activate", (e) => {});
