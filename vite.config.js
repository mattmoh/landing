import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    mimeTypes: {
      '.md': 'text/markdown',
    },
    port: 3001,
  },
  publicDir: 'public', // Default is 'public', ensure it's not misconfigured
})
