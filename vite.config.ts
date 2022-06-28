import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
const path = require('path')
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  resolve:{
    alias:{
      '@' : path.resolve(__dirname, './src')
    },
  },
  plugins: [react()]
})
