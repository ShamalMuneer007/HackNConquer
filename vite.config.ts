import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "esnext",
  },
  esbuild: {
    target: "es2022", // or 'esnext' for the latest features
  },
  define: {
    global: "globalThis",
  },
});
