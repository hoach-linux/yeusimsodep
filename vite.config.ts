import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import Pages from "vite-plugin-pages"
import generateSitemap from 'vite-plugin-pages-sitemap'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Pages({
      onRoutesGenerated: routes => (generateSitemap({
        routes,
        hostname: "https://simdep10so.vn/",
        readable: true
      })),
    }),
  ],
});
