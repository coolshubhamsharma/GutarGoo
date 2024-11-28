import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      "/api":{  // whenever we are going to send request to "/api" it will prefix it with the target Url also when we are using proxy , the server we are sending the request to , starts to think that the request is coming from its own server due to which it dosent give CORS Error 
        target: "http://localhost:8080"
      }
    }
  }   
})
