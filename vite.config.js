import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const port = Number(process.env.PORT) || 5174;
console.log(`Server running on port ${port}`);

export default defineConfig({
  plugins: [react()],
  server: {
    port, 
    host: "0.0.0.0",
  },
});
