import imagemin from "imagemin";
import imageminWebp from "imagemin-webp";
import path from "path";
import { defineConfig } from "vite";
import glob from "fast-glob";
import { fileURLToPath } from "url";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  base: "/sass-dashboard/", 

  plugins: [
    ViteImageOptimizer({
      png: { quality: 86 },
      jpeg: { quality: 86 },
      jpg: { quality: 86 },
    }),

    {
      ...imagemin(["./src/img/**/*.{jpg,png,jpeg}"], {
        destination: "./src/img/webp/",
        plugins: [imageminWebp({ quality: 86 })],
      }),
      apply: "serve",
    },
  ],

 build: {
  minify: false,
  rollupOptions: {
    input: Object.fromEntries(
      glob
        .sync(["./*.html", "./pages/**/*.html"])
        .map((file) => [
          path.relative(__dirname, file).replace(/\.html$/, ""),
          fileURLToPath(new URL(file, import.meta.url)),
        ])
    ),
  },
},
output: {
  assetFileNames: "assets/[name]-[hash][extname]",
},
    })
