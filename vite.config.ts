import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

// Vite configuration for React frontend development and production build
export default defineConfig({
  // Configure plugins: React support and Tailwind CSS compiler
  plugins: [react(), tailwindcss()],

  // Define module aliases for clean imports across the project
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
    },
  },

  // Directory paths for client source and static assets
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  publicDir: path.resolve(import.meta.dirname, "client", "public"),

  // Output directory for production build
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },

  // Local development server configuration
  server: {
    host: true,
    port: 5173,
  },
});
