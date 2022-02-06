const StyleLintPlugin = require('stylelint-webpack-plugin')
const proxyUrl = 'https://admin.yibiankeji.com';

module.exports = {
  publicPath: './',
  lintOnSave: false,
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: 9000,
    https: false,
    hotOnly: false,
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: proxyUrl,
        ws: true,
        changeOrigin: true,
      },
    },
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "~@/assets/styles/variable.scss";
          @import "~@/assets/styles/mixin.scss";
        `,
      },
      less: {
        lessOptions: {
          modifyVars: {
            'primary-color': '#d14424',
            'text-color': '#41464b',
            'font-size-base': '13px',
            'border-radius-base': '2px',
          },
          javascriptEnabled: true,
        },
      },
    },
  },
  configureWebpack: {
    plugins: [
      new StyleLintPlugin({
        files: ['src/**/*.{vue,html,css,scss,sass,less}'],
        failOnError: false,
        cache: false,
        fix: false,
      }),
    ],
  },
}