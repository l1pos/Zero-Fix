// vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const GITHUB_REPO_NAME = 'Zero-Limits'; // ✅ Имя репозитория уже здесь

export default defineConfig({
  plugins: [react()],
  // ⭐️ Используйте имя репозитория
  base: `/${GITHUB_REPO_NAME}/`, // ✅ Используется корректная константа
  
  build: {
    // ⭐️ Необходимо для обхода ошибки 'unsafe-eval' на GitHub Pages
    sourcemap: 'hidden', // ✅ Настройка для обхода CSP
  },
});