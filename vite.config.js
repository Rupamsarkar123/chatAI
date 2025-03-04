import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // Use the default React plugin

export default defineConfig({
  plugins: [react()],
  server: {
    port: Number(process.env.PORT) || 5174,
    host: "0.0.0.0",
    strictPort: true,
    allowedHosts: [
      "chatai-1-il4g.onrender.com", //  correct frontend Render URL
      "localhost",
    ],
  },
});

