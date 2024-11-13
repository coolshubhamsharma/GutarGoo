import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      "/api":{  // whenever we are going to send request to "/api" it will prefix it with the target Url
        target: "http://localhost:8080"
      }
    }
  }   
})
