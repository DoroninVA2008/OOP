import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  server: {
    port: 1488,
    open: true,
    host: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // '@' будет указывать на папку src/
    },
  },
});