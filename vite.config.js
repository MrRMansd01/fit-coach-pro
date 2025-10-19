import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
      '@/components': path.resolve(__dirname, './components'),
      '@/pages': path.resolve(__dirname, './pages'),
      '@/entities': path.resolve(__dirname, './entities'),
      '@/api': path.resolve(__dirname, './api'),
      '@/utils': path.resolve(__dirname, './utils'),
    },
  },
  server: {
    port: 3000,
    host: true,
    open: true,
    strictPort: false,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', '@tanstack/react-query']
  }
})