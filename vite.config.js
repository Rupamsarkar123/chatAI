import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: Number(process.env.PORT) || 5174, // Ensure it's a number
    host: "0.0.0.0", // Allows external access
  },
});
