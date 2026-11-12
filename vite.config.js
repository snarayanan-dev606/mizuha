import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        whyMizuha: resolve(__dirname, 'why-mizuha.html'),
        philosophy: resolve(__dirname, 'philosophy.html'),
        purification: resolve(__dirname, 'purification.html'),
        product: resolve(__dirname, 'product.html'),
        commitment: resolve(__dirname, 'commitment.html'),
        contact: resolve(__dirname, 'contact.html')
      }
    }
  }
});
