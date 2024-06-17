import * as path from "path";
import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: { port: 5000, watch: {usePolling: true} },
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "./src") },
      { find: "@views", replacement: path.resolve(__dirname, "./src/views") },
      { find: "@components", replacement: path.resolve(__dirname, "./src/components") },
      { find: "@types", replacement: path.resolve(__dirname, "./src/types") },
      { find: "@utils", replacement: path.resolve(__dirname, "./src/utils") },
    ],
  },
});
