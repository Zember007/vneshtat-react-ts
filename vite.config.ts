import { defineConfig } from 'vite'
import { resolve } from 'path'
import svgr from "vite-plugin-svgr";
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  server: {
    port: 3000
  }
})
