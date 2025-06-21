import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    react(),
    dts({
      entryRoot: "src",
      outDir: "dist",
    }),
  ],
  resolve: {
    alias: {
      fs: "./src/empty-module.js",
      path: "./src/empty-module.js",
      http: "./src/empty-module.js",
      https: "./src/empty-module.js",
      crypto: "./src/empty-module.js",
      stream: "./src/empty-module.js",
      buffer: "./src/empty-module.js",
      zlib: "./src/empty-module.js",
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
  },
  build: {
    lib: {
      entry: "src/index.ts",
      name: "Q5React",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format === "es" ? "mjs" : "js"}`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime", "q5"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          q5: "q5",
        },
        exports: "named",
      },
    },
  },
});
