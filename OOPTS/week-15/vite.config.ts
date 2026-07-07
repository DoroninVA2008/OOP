import { defineConfig } from 'vite';
export default defineConfig({
  test: {
    globals: true, // Чтобы не импортировать describe, it, expect в каждый файл
  },
});