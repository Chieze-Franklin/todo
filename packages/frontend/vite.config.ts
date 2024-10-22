import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
  },
  resolve: {
    alias: {
      unfetch: path.resolve(__dirname, "../../node_modules/unfetch/dist/unfetch.mjs"),
    }
  },
  define: {
    global: {},
  },
})
