const { GenerateSW } = require('workbox-webpack-plugin')

module.exports = {
  chainWebpack: (config) => {
    config
      .when(process.env.NODE_ENV === 'development', (config) => {
        config.devtool('source-map')
      })
      .when(process.env.NODE_ENV === 'production', (config) => {
        config.optimization.minimize(true)
      })

    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => ({
        ...options,
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('ion-')
        }
      }))
  },

  pwa: {
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js', // your custom service worker
      exclude: [/\.map$/, /_redirects/],
    },
    name: 'Palace of Goodz',
    themeColor: '#1a1a1a',
    manifestOptions: {
      short_name: 'POG',
      start_url: '.',
      display: 'standalone',
      background_color: '#1a1a1a',
      icons: [
        {
          src: 'img/icons/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'img/icons/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    }
  }
}
