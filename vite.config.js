import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/oauth2": "https://api-satusehat.kemkes.go.id/oauth2/v1/",
    }  
  } ,
  plugins: [react()],
})
