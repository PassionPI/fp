/// <reference types="vitest" />
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  test: {},
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["cjs", "es"],
    },
  },
});
