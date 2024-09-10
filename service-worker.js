const cacheName = 'site-static-v011';
const assets = [
    '/',
    '/pesquisav011/index.html',
    '/pesquisav011/styles.css',
    '/pesquisav011/script.js',
    '/pesquisav011/manifest.json',
    '/pesquisav011/images/icon-192x192.png',
    '/pesquisav011/images/icon-512x512.png',
    // Adicione outros recursos necessários
];

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna o recurso do cache se disponível
        return response || fetch(event.request).then(fetchResponse => {
          // Se o recurso for buscado com sucesso na rede, adicione-o ao cache
          return caches.open(cacheName).then(cache => {
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          });
        });
      })
  );
});