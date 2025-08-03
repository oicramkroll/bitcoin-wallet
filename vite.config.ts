import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.ico',
        'icon-192x192.png',
        'icon-512x512.png',
        'apple-touch-icon.png'
      ],
      manifest: {
        name: 'Bitcoin Wallet PWA',
        short_name: 'BTC Wallet',
        description: 'Gerencie suas carteiras Bitcoin com estilo retrô',
        theme_color: '#222222',
        background_color: '#111111',
        display: 'standalone',
        icons: [
          {
            src: '/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          }
        ]
      }
    })
    ,
  ],
});
