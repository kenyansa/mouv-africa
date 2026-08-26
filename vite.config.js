import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api/core': {
        target: 'https://app.mconnect.africa',
        rewrite: (path) => path.replace(/^\/api\/core/, '/core'),
        changeOrigin: true,
      },
    },
  },
});
