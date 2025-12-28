import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    jsxRuntime: 'automatic',
  })],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: './src/setupTests.js',
    css: true,
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
})
