import { defineConfig } from "vite";
import { unstable_vitePlugin as remix } from "@remix-run/dev";

export default defineConfig({
  plugins: [remix()],
}); 