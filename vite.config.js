import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import "dotenv/config";

const basePath = process.env.BASE_PATH || "/";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 8080,
  },
  base: basePath,
});
