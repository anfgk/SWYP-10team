import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";
import path from "path";
import fs from "fs";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode === "development";

  return {
    plugins: [react(), tailwindcss(), svgr()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: isDev
      ? {
          https: {
            key: fs.readFileSync("./cert/localhost+1-key.pem"),
            cert: fs.readFileSync("./cert/localhost+1.pem"),
          },
        }
      : {},
  };
});
