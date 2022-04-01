/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-8777cf9';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./colophon.html","./favicon.png","./index.html","./manifest.json","./roman_pro_zeny_002.html","./roman_pro_zeny_005.html","./roman_pro_zeny_006.html","./roman_pro_zeny_007.html","./roman_pro_zeny_008.html","./roman_pro_zeny_009.html","./roman_pro_zeny_010.html","./roman_pro_zeny_011.html","./roman_pro_zeny_012.html","./roman_pro_zeny_013.html","./roman_pro_zeny_014.html","./roman_pro_zeny_015.html","./roman_pro_zeny_016.html","./roman_pro_zeny_017.html","./roman_pro_zeny_018.html","./roman_pro_zeny_019.html","./roman_pro_zeny_020.html","./roman_pro_zeny_021.html","./roman_pro_zeny_022.html","./roman_pro_zeny_023.html","./roman_pro_zeny_024.html","./roman_pro_zeny_025.html","./roman_pro_zeny_026.html","./roman_pro_zeny_027.html","./roman_pro_zeny_028.html","./roman_pro_zeny_029.html","./roman_pro_zeny_030.html","./roman_pro_zeny_031.html","./roman_pro_zeny_032.html","./roman_pro_zeny_033.html","./roman_pro_zeny_034.html","./roman_pro_zeny_035.html","./roman_pro_zeny_036.html","./roman_pro_zeny_037.html","./roman_pro_zeny_038.html","./roman_pro_zeny_039.html","./roman_pro_zeny_040.html","./roman_pro_zeny_041.html","./roman_pro_zeny_042.html","./roman_pro_zeny_043.html","./fonts/Literata-Italic-var.woff2","./fonts/Literata-var.woff2","./fonts/LiterataTT-TextItalic.woff2","./fonts/LiterataTT-TextRegular.woff2","./fonts/LiterataTT-TextSemibold.woff2","./fonts/LiterataTT_LICENSE.txt","./fonts/SpaceGroteskVF.woff2","./fonts/SpaceGroteskVF_LICENSE.txt","./resources/image001_fmt.png","./resources/image002_fmt.png","./resources/obalka_roman_pro_zeny_fmt.png","./resources/upoutavka_eknihy_fmt.png","./scripts/bundle.js","./style/style.min.css","./template-images/circles.png"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
