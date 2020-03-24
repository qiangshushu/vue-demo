module.exports = {
  productionSourceMap: false,
  devServer: {
    host: '0.0.0.0',
    port: 8081,
    proxy: {
      '/api': {
        target: process.env.VUE_APP_HOST,
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  css: {
    sourceMap: process.env.NODE_ENV === 'development',
    loaderOptions: {
      less: {
        sourceMap: process.env.NODE_ENV === 'development',
        javascriptEnabled: true
      }
    }
  },
  chainWebpack: config => {
    config.plugins.delete('prefetch').delete('preload');
    config.resolve.symlinks(true);
    config
      .when(process.env.NODE_ENV === 'development', config => config.devtool('cheap-source-map'))
      .when(process.env.NODE_ENV !== 'development', config => {
        config.optimization.minimizer();
      });
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();
    svgRule
      .test(/\.svg$/)
      .use('url-loader')
      .loader('url-loader')
      .end();

    // image exclude
    const fontsRule = config.module.rule('fonts');

    fontsRule.uses.clear();
    fontsRule
      .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/)
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 100000
      })
      .end();

    const entry = config.entry('app');
    if (process.env.VUE_APP_BUILD_MODE === 'MOCK') {
      entry.add('@/mock').end();
    }
  }
};
