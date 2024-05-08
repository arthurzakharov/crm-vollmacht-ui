import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@icons": path.resolve(__dirname, "./src/icons"),
      "@layouts": path.resolve(__dirname, "./src/layouts"),
      "@stories": path.resolve(__dirname, "./src/stories"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@types": path.resolve(__dirname, "./src/types.ts"),
    },
  },
});
