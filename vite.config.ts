import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import { compression } from "vite-plugin-compression2";
import * as path from "path";
import Inspect from "vite-plugin-inspect";
import viteImagemin from "@vheemstra/vite-plugin-imagemin";
import imageminWebp from "imagemin-webp";

const isProduction = process.env.NODE_ENV === "production";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const timestamp = new Date().getTime();

  return {
    plugins: [
      react(),
      ...(isProduction
        ? [
            compression({
              algorithm: "gzip"
            }),
            viteImagemin({
              plugins: {
                jpg: imageminWebp(),
                png: imageminWebp()
              }
            })
          ]
        : [
            Inspect({
              build: true,
              outputDir: ".vite-inspect"
            })
          ])
    ],
    define: {
      "process.env": {
        ...env,
        APP_ENV: mode
      }
    },
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
      terserOptions: {
        compress: {
          drop_console: true, // Menghapus console.log di produksi
          drop_debugger: true // Menghapus debugger di produksi
        },
        format: {
          comments: false // Menghapus komentar
        }
      },
      emptyOutDir: true,
      outDir: "build",
      sourcemap: isProduction ? false : true,
      cssCodeSplit: true,
      modulePreload: true,
      chunkSizeWarningLimit: 1000000,
      assetsInlineLimit: 8192, // Inline assets kecil hingga 8KB
      target: "esnext", // Gunakan target ES modern untuk performa terbaik
      ...(isProduction && {
        cacheControl: "max-age=3600"
      }),
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
              return `assets/font/${name}`;
            }
            if (/\.css$/.test(name ?? "")) {
              return `assets/css/[hash]-${timestamp}[extname]`;
            }
            return `assets/[hash]-${timestamp}[extname]`;
          }
        }
      }
    },
    optimizeDeps: {
      include: ["react", "react-dom"], // Optimisasi dependency utama
      exclude: ["some-large-dependency"] // Jangan di-prebundle jika besar
    },
    server: {
      open: true,
      hmr: {
        overlay: true
      },
      watch: {
        usePolling: true // Untuk mendukung WSL/VM jika perlu
      }
    },
    preview: {
      port: 5000, // Port untuk preview build
      strictPort: true // Gagal jika port tidak tersedia
    }
  };
});
