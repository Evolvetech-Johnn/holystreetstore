import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Configurações para desenvolvimento
    port: 5173,
    host: true,
    // Headers para evitar cache durante desenvolvimento
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  },
  build: {
    // Otimizações para produção
    minify: 'terser',
    sourcemap: false,
    // Adicionar hash aos arquivos para evitar cache
    rollupOptions: {
      output: {
        // Adicionar hash aos nomes dos arquivos
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
        manualChunks: {
          vendor: ['react', 'react-dom'],
          icons: ['@heroicons/react']
        }
      }
    }
  },
  // Configurações para preview/produção
  preview: {
    port: 4173,
    host: true,
    // Headers para produção
    headers: {
      'Cache-Control': 'public, max-age=31536000, immutable'
    }
  }
})
