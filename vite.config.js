import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa' // 1. Importa el plugin

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // 2. Añade el plugin con la configuración
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'SnackBox Tienda',
        short_name: 'SnackBox',
        description: 'Juguitos, Alfajores y Más. Tu pausa perfecta.',
        theme_color: '#213F5B', // Color primario de tu marca
        background_color: '#ffffff',
        icons: [
          {
            src: 'android-chrome-192x192.png', // Asegúrate que este archivo exista en /public
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'android-chrome-512x512.png', // Asegúrate que este archivo exista en /public
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})