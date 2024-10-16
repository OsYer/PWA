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
      },
      {
        urlPattern: /.*\.(?:png|jpg|jpeg|svg|gif)/,
        handler: 'CacheFirst',
      },
    ],
    // Agrega aquí las rutas que quieres que estén disponibles offline
    additionalManifestEntries: [
      { url: '/', revision: null },
      { url: '/login', revision: null },
      { url: '/tienda', revision: null },
      { url: '/empresa', revision: null },
    ],
  };
  