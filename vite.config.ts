import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  // Repo GitHub Pages dạng: https://toanpham241997-cmyk.github.io/Profiles/
  // => base phải là /Profiles/
  base: "/Profiles/",

  plugins: [react()],

  // Vite project nằm trong thư mục client
  root: path.resolve(__dirname, "client"),

  resolve: {
    alias: {
      // FIX DỨT ĐIỂM: @ phải trỏ tới client/src
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },

  build: {
    // Output cho pages: dist (ở root repo)
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
  },
});
