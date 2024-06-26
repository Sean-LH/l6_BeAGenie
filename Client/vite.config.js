import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const isDevEnv = false
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      '/api':{
        target: !isDevEnv? "https://l6-beagenie.onrender.com/" : 'http://localhost:9000',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
