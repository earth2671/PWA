const CACHE_NAME = "hosassist-pwa-v1";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./app.js",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];


// ========================================
// Install
// ========================================

self.addEventListener(
  "install",
  function (event) {

    event.waitUntil(

      caches.open(CACHE_NAME)
        .then(function (cache) {

          return cache.addAll(
            FILES_TO_CACHE
          );

        })

    );

    self.skipWaiting();

  }
);


// ========================================
// Activate
// ========================================

self.addEventListener(
  "activate",
  function (event) {

    event.waitUntil(

      caches.keys()
        .then(function (cacheNames) {

          return Promise.all(

            cacheNames.map(
              function (cacheName) {

                if (
                  cacheName !== CACHE_NAME
                ) {

                  return caches.delete(
                    cacheName
                  );

                }

              }
            )

          );

        })

    );

    self.clients.claim();

  }
);


// ========================================
// Fetch
// ========================================

self.addEventListener(
  "fetch",
  function (event) {

    // ไม่ cache Apps Script
    // เพราะระบบจริงอยู่ที่ Apps Script

    if (
      event.request.url.includes(
        "script.google.com"
      )
    ) {

      return;

    }


    event.respondWith(

      fetch(event.request)
        .catch(function () {

          return caches.match(
            event.request
          );

        })

    );

  }
);
