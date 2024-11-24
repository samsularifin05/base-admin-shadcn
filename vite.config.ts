import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { compression } from "vite-plugin-compression2";

import * as path from "path";
import Inspect from "vite-plugin-inspect";
import viteImagemin from "@vheemstra/vite-plugin-imagemin";
import imageminWebp from "imagemin-webp";
const isProduction = process.env.NODE_ENV === "production";

export default defineConfig(() => {
  const timestamp = new Date().getTime();

  return {
    plugins: [
      react(),
      compression({
        algorithm: "gzip"
      }),
      ...(isProduction
        ? []
        : [
            Inspect({
              build: true,
              outputDir: ".vite-inspect"
            })
          ]),
      viteImagemin({
        plugins: {
          jpg: imageminWebp(),
          png: imageminWebp()
        }
      })
    ],
    define: {
      "process.env": process.env
    },
    cacheControl: "max-age=3600",
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@assets": path.resolve(__dirname, "src/assets"),
        "@components": path.resolve(__dirname, "src/components/index.ts")
      }
    },
    css: {
      modules: {
        localsConvention: "camelCase",
        generateScopedName: "[local]_[hash:base64:5]"
      }
    },
    build: {
      minify: "terser",
      emptyOutDir: true,
      outDir: "build",
      sourcemap: false,
      cssCodeSplit: true,
      modulePreload: true,
      chunkSizeWarningLimit: 1000000,
      cacheControl: "max-age=3600",
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return "vendor";
            }
          },
          chunkFileNames: `assets/js/[hash]-${timestamp}.js`,
          entryFileNames: `assets/js/[hash]-${timestamp}.js`,
          assetFileNames: ({ name }) => {
            if (/\.(gif|jpe?g|png|svg|webp|avif)$/.test(name ?? "")) {
              return `assets/images/${name}`;
            }
            if (/\.(ttf|woff2|svg)$/.test(name ?? "")) {
              return `assets/font/[hash]-${timestamp}[extname]`;
            }
            if (/\.css$/.test(name ?? "")) {
              return `assets/css/[hash]-${timestamp}[extname]`;
            }
            return `assets/[hash]-${timestamp}[extname]`;
          }
        }
      }
    },
    server: {
      open: true // Menambahkan ini agar otomatis membuka browser
    }
  };
});
