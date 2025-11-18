import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import { mockDevServerPlugin } from "vite-plugin-mock-dev-server";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    base: env.VITE_BASE_PATH || "/",
    plugins: [
      react(),
      // HMR을 지원하며, mock/ 폴더를 감지합니다.
      mockDevServerPlugin(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    // Define global constants
    define: {
      __APP_ENV__: JSON.stringify(env.VITE_ENV),
    },
    server: {
      proxy: {
        "^/api": "http://example.com",
      },
    },
  };
});
