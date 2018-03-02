// Version of the offline cache (change this value everytime you want to update cache)
var CACHE_NAME = 'version_01'              

// Add a path you want to cache in this list.
var URLS = [                
  '/',
  '/index.html',
  '/about.html',
  '/index.css',
  'celeste.html',
  'celeste.js',
  'dusk.html',
  'dusk.js',
  'hug.html',
  'hug.js',
  'lair.html',
  'lair.js',
  'mistigri.html',
  'mistigri.js',
  'pool.html',
  'pool.js',
  'racer.html',
  'racer.js',
  'shooter.html',
  'shooter.js',
  'tempest.html',
  'tempest.js',
  'tower.html',
  'tower.js'
]
console.log(navigator)
console.log(navigator.geolocation)

// Respond with cached resources
// This is called everytime the browser requests resources from the server
self.addEventListener('fetch', function (e) {
  console.log('fetch request : ' + e.request.url)
  e.respondWith(
    caches.match(e.request).then(function (request) {
      if (request) {
        // if cache is available, respond with cache
        console.log('responding with cache : ' + e.request.url)
        return request
      } else {
        // if there are no cache, try fetching request
        console.log('file is not cached, fetching : ' + e.request.url)
        return fetch(e.request)
      }
    })
  )
})

// Cache resources
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('installing cache : ' + CACHE_NAME)
      // cache everything listed on URLS list 
      return cache.addAll(URLS)
    })
  )
})

// Delete outdated caches
self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      // `keyList` contains all cache names under appname.glitch.me domain
      return Promise.all(keyList.map(function (key, i) {
        if (keyList[i] !== CACHE_NAME) {
          console.log('deleting cache : ' + keyList[i] )
          return caches.delete(keyList[i])
        }
      }))
    })
  )
})