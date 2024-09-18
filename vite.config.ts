import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
  ],
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      { find: '@styles', replacement: '/src/styles' },
      { find: '@components', replacement: '/src/components' },
      { find: '@shared', replacement: '/src/components/shared' },
      { find: '@pages', replacement: '/src/pages' },
    ],
  },
});
