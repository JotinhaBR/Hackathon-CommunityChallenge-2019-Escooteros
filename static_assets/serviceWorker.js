
if (location.hostname === "localhost" || location.hostname === "127.0.0.1"){
    var urlHost = location.protocol='//'+location.hostname+':'+location.port;
}else{
    var urlHost =  location.protocol='//'+location.hostname+':'+location.port+'/Hackathon-CommunityChallenge-2019-Escooteros';
}

var CACHE = 'escooteros-v2-5';

// Adicione uma matriz de arquivos ao precache do seu aplicativo
const precacheFiles = [
  urlHost+'/',
  urlHost+'/index.html',
  urlHost+'/static_assets/icons/br.png',
  urlHost+'/static_assets/icons/eua.png',
  urlHost+'/static_assets/logo.png',
  urlHost+'/static_assets/logotipo.png',
  urlHost+'/static_assets/manifest.json',
  urlHost+'/static_assets/backgroundLoading.jpg',
  urlHost+'/static_assets/backgroundScreenHome.jpg',
  urlHost+'/static_assets/videos/indoAteOPatinete.mp4'
];

// TODO: replace the following with the correct offline fallback page i.e.
const offlineFallbackPage = urlHost+'/static_assets/offline.html';

// Adicione uma matriz de regex de caminhos que devem entrar primeiro na rede
const networkFirstPaths = [
  urlHost+'/static_assets/icons/br.png',
  urlHost+'/static_assets/icons/eua.png',
  urlHost+'/static_assets/logo.png',
  urlHost+'/static_assets/logotipo.png',
  urlHost+'/static_assets/manifest.json',
  urlHost+'/static_assets/backgroundLoading.jpg',
  urlHost+'/static_assets/backgroundScreenHome.jpg',
  urlHost+'/static_assets/videos/indoAteOPatinete.mp4'
];

// Adicione uma matriz de regex de caminhos que não devem ser armazenados em cache
const avoidCachingPaths = [
  urlHost+'/',
  urlHost+'/index.html',
  urlHost+'/static_assets/icons/br.png',
  urlHost+'/static_assets/icons/eua.png',
  urlHost+'/static_assets/language/pt-br.json',
  urlHost+'/static_assets/language/en-us.json',
  urlHost+'/static_assets/videos/atropelouPedestre.mp4',
  urlHost+'/static_assets/videos/celularRoubado.mp4',
  urlHost+'/static_assets/videos/estacionouCerto.mp4',
  urlHost+'/static_assets/videos/estacionouErrado.mp4',
  urlHost+'/static_assets/videos/indoAteOPatinete.mp4',
  urlHost+'/static_assets/videos/indoEstacionarPatinete.mp4',
  urlHost+'/static_assets/videos/parouParaPedestrePassarContinuaParaIrEstacionar.mp4',
  urlHost+'/static_assets/videos/patineteDesbloqueado.mp4',
  urlHost+'/static_assets/videos/tresRemadasAcertou.mp4',
  urlHost+'/static_assets/videos/umaRemadaErrou.mp4',
  urlHost+'/static_assets/logo.png',
  urlHost+'/static_assets/logotipo.png',
  urlHost+'/static_assets/manifest.json',
  urlHost+'/static_assets/backgroundLoading.jpg',
  urlHost+'/static_assets/backgroundScreenHome.jpg'
];

function pathComparer(requestUrl, pathRegEx) {
  return requestUrl.match(new RegExp(pathRegEx));
}

function comparePaths(requestUrl, pathsArray) {
  if (requestUrl) {
    for (let index = 0; index < pathsArray.length; index++) {
      const pathRegEx = pathsArray[index];
      if (pathComparer(requestUrl, pathRegEx)) {
        return true;
      }
    }
  }

  return false;
}

self.addEventListener("install", function (event) {
  console.log("[PWA Builder] Install Event processing");

  console.log("[PWA Builder] Skip waiting on install");
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      console.log("[PWA Builder] Caching pages during install");

      return cache.addAll(precacheFiles).then(function () {
        if (offlineFallbackPage === "ToDo-replace-this-name.html") {
          return cache.add(new Response("TODO: Update the value of the offlineFallbackPage constant in the serviceworker."));
        }

        return cache.add(offlineFallbackPage);
      });
    })
  );
});

// Allow sw to control of current page
self.addEventListener("activate", function (event) {
  console.log("[PWA Builder] Claiming clients for current page");
  event.waitUntil(self.clients.claim());
});

// If any fetch fails, it will look for the request in the cache and serve it from there first
self.addEventListener("fetch", function (event) {
  if (event.request.method !== "GET") return;

  if (comparePaths(event.request.url, networkFirstPaths)) {
    networkFirstFetch(event);
  } else {
    cacheFirstFetch(event);
  }
});

function cacheFirstFetch(event) {
  event.respondWith(
    fromCache(event.request).then(
      function (response) {
        // The response was found in the cache so we responde with it and update the entry

        // This is where we call the server to get the newest version of the
        // file to use the next time we show view
        event.waitUntil(
          fetch(event.request).then(function (response) {
            return updateCache(event.request, response);
          })
        );

        return response;
      },
      function () {
        // The response was not found in the cache so we look for it on the server
        return fetch(event.request)
          .then(function (response) {
            // If request was success, add or update it in the cache
            event.waitUntil(updateCache(event.request, response.clone()));

            return response;
          })
          .catch(function (error) {
            // The following validates that the request was for a navigation to a new document
            if (event.request.destination !== "document" || event.request.mode !== "navigate") {
              return;
            }

            console.log("[PWA Builder] Network request failed and no cache." + error);
            // Use the precached offline page as fallback
            return caches.open(CACHE).then(function (cache) {
              cache.match(offlineFallbackPage);
            });
          });
      }
    )
  );
}

function networkFirstFetch(event) {
  event.respondWith(
    fetch(event.request)
      .then(function (response) {
        // If request was success, add or update it in the cache
        event.waitUntil(updateCache(event.request, response.clone()));
        return response;
      })
      .catch(function (error) {
        console.log("[PWA Builder] Network request Failed. Serving content from cache: " + error);
        return fromCache(event.request);
      })
  );
}

function fromCache(request) {
  // Check to see if you have it in the cache
  // Return response
  // If not in the cache, then return error page
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      if (!matching || matching.status === 404) {
        return Promise.reject("no-match");
      }

      return matching;
    });
  });
}

function updateCache(request, response) {
  if (!comparePaths(request.url, avoidCachingPaths)) {
    return caches.open(CACHE).then(function (cache) {
      return cache.put(request, response);
    });
  }

  return Promise.resolve();
}
