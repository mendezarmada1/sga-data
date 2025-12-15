import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/sga-data/", // Reemplaza 'SGA' con el nombre de tu repositorio si es diferente
})
