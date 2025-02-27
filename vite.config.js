export default defineConfig({
  server: {
    port: process.env.PORT || 5174, // Use Render's assigned port
    host: '0.0.0.0' // Allows external access
  }
});
