import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    port: Number(process.env.PORT) || 10000,
    host: "0.0.0.0",
    strictPort: true,
    allowedHosts: ["chatai-1-2enq.onrender.com"], // Add your Render domain
  },
});
