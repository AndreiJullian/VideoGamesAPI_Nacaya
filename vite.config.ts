import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  server: {
    proxy: {
      "/api/rawg": {
        target: "http://localhost:9999",
        changeOrigin: true,
        rewrite: () =>
          "/.netlify/functions/rawg",
      },
    },
  },
});