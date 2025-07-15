import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') }
  },
  base: process.env.VITE_BASE_PATH || "/portfolio",
  build: { outDir: 'docs' },
  server: { historyApiFallback: true },
}))