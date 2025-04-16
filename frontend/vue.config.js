module.exports = {
  chainWebpack: (config) => {
    // Environment-specific configurations
    config
      .when(process.env.NODE_ENV === 'development', (config) => {
        config.devtool('source-map') // Enable source maps in development for easier debugging
      })
      .when(process.env.NODE_ENV === 'production', (config) => {
        config.optimization.minimize(true) // Minimize code for better performance in production
      })

    // Support custom elements with 'ion-' prefix
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => ({
        ...options,
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('ion-') // Treat 'ion-' tags as custom elements
        }
      }))
  }
}

