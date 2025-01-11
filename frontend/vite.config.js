import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/emsblog/",  //For githubpages hosting, put URL path name for our website as base of our defineConfig.
        //At the moment, we are not buying a domain name, so need to define same as repository name
  build: {
      outDir: 'dist' // Ensure the output directory matches the deploy script
  }
})