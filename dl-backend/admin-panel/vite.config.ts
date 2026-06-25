import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/panel/',
  build: {
    outDir: '../public/panel',
    emptyOutDir: true,
  },
  server: {
    proxy: {
      '/api': 'http://localhost:1337',
      '/uploads': 'http://localhost:1337',
    },
  },
});
