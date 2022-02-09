import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import envCompatible from 'vite-plugin-env-compatible';
import { injectHtml } from 'vite-plugin-html';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';
const isProduction = process.env.NODE_ENV === 'production'

import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^~/,
        replacement: ''
      },
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src')
      },
      {
        find: 'https',
        replacement: require.resolve('rollup-plugin-node-builtins')
      }
    ],
    extensions: [
      '.mjs',
      '.js',
      '.ts',
      '.jsx',
      '.tsx',
      '.json',
      '.vue'
    ]
  },
  plugins: [
    vue(),
    vueJsx(),
    viteCommonjs(),
    envCompatible(),
    injectHtml({
      injectData: {
        htmlWebpackPlugin: {
          options: {
            title: 'PPT'
          }
        }
      }
    }),
    Components({
      resolvers: [
        AntDesignVueResolver(),
      ],
    }),
  ],
  base: './',
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@/assets/styles/variable.scss";
          @import "@/assets/styles/mixin.scss";
        `
      },
      less: {
        lessOptions: {
          javascriptEnabled: true,
          modifyVars: {
            'primary-color': '#d14424',
            'text-color': '#41464b',
            'font-size-base': '13px',
            'border-radius-base': '2px'
          }
        },
        javascriptEnabled: true,
        modifyVars: {
          'primary-color': '#d14424',
          'text-color': '#41464b',
          'font-size-base': '13px',
          'border-radius-base': '2px'
        }
      }
    }
  },
  build: {},
  // define global as empty object when in dev
  define: isProduction ? {} : {
    global: {}
  }
})