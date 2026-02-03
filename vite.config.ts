import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => {
  // Local dev: base = "/"
  // Build deploy lên GitHub Pages: base = "/Profiles/"
  const base = command === "serve" ? "/" : "/Profiles/";

  return defineConfig({
    plugins: [react()],
    base,
    build: {
      outDir: "dist",
      emptyOutDir: true
    }
  });
});
