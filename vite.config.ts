import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: { enabled: true },
      includeAssets: [
        'favicon.ico',
        'logo.svg',
        'pwa-64x64.png',
        'pwa-192x192.png',
        'pwa-512x512.png',
        'maskable-icon-512x512.png',
        'apple-touch-icon-180x180.png',
      ],
      manifest: {
        name: '현진민', // 설치 배너에 표시되는 이름
        short_name: '현진민', // 아이콘 아래에 표시될 이름
        description: '현진 | 학원',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        lang: 'ko',
        display: 'standalone',
        prefer_related_applications: true,
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  server: {
    proxy: {
      '/systemMng': {
        // API 요청 경로를 '/api'로 시작하도록 설정
        target: 'http://localhost:8080', // 프록시할 서버 주소
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // '/api'를 제거하여 실제 API 경로로 전달
      },
    },
  },
});
