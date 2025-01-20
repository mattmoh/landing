import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    mimeTypes: {
      '.avif': 'image/avif',
      '.md': 'text/markdown',
      '.pdf': 'application/pdf'
    },
    port: 3000,
    host: '0.0.0.0',
    watch: {
      usePolling: true,
    },
  },
  publicDir: 'public',
})
