import { defineConfig } from 'vite';
import { resolve } from 'path';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';
import nodePolyfills from 'rollup-plugin-node-polyfills';

export default defineConfig(() => {
  return {
    // base: '/vanilla-app-template/',
    define: {
      global: 'globalThis',
    },
    root: './src',
    build: {
      sourcemap: true,
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'src/index.html'),
          gallery: resolve(__dirname, 'src/1-gallery.html'),
          form: resolve(__dirname, 'src/2-form.html'),
        },
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          entryFileNames: '[name].js',
          assetFileNames: 'assets/[name]-[hash][extname]',
        },
        plugins: [nodePolyfills()],
      },
      outDir: '../dist',
      emptyOutDir: true,
    },
    optimizeDeps: {
      esbuildOptions: {
        define: {
          global: 'globalThis',
        },
      },
    },
    plugins: [
      injectHTML(),
      FullReload(['./src/**/**.html']),
      SortCss({
        sort: 'mobile-first',
      }),
    ],
  };
});
