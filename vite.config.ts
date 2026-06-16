import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    allowedHosts: [
      "nickthiru.dev",
      "localhost",
      "127.0.0.1",
      "lunchroom-ladybug-appliance.ngrok-free.dev",
    ],
  },
});
