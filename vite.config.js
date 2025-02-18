import { defineConfig } from "vite";
import { unstable_vitePlugin as remix } from "@remix-run/dev";
import { netlifyAdapter } from "@remix-run/dev/adapter";

export default defineConfig({
  plugins: [
    remix({
      adapter: netlifyAdapter(),
    }),
  ],
}); 