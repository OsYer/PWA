module.exports = {
  globDirectory: 'build/',
  globPatterns: [
    '**/*.{html,js,css,png,jpg,jpeg,gif,svg,ico,json}',
  ],
  swDest: 'build/service-worker.js',
  runtimeCaching: [
    {
      urlPattern: /\/api\/.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'api-cache',
        networkTimeoutSeconds: 10, // Timeout de red
        plugins: [
          {
            cacheableResponse: { statuses: [0, 200] },
          },
        ],
      },
    },
    {
      urlPattern: /.*\.(?:png|jpg|jpeg|svg|gif)/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'image-cache',
        plugins: [
          {
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 30 * 24 * 60 * 60,
            },
          },
        ],
      },
    },
  ],
  additionalManifestEntries: [
    { url: '/', revision: null },
    { url: '/login', revision: null },
    { url: '/tienda', revision: null },
    { url: '/empresa', revision: null },
  ],
};
