import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT || 5174,
    host: "0.0.0.0",
  },
  optimizeDeps: {
    exclude: ["antd"], // Exclude Ant Design from dependency optimization
  },
});
