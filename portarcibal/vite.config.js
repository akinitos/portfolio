// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },

  // Dynamic base: use / in prod on Vercel, /portfolio/ for gh-pages
  base: mode === "production" && process.env.DEPLOY_TARGET === "gh-pages"
    ? "/portfolio/"
    : "/",

  build: { outDir: "docs" }
}));