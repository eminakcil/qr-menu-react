import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

const BASE_PATH = __dirname

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.join(BASE_PATH, 'src'),
      },
      {
        find: '@components',
        replacement: path.join(BASE_PATH, 'src', 'components'),
      },
    ],
  },
})
