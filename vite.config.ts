import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * GitHub Pages base path.
 *
 *   User site  — repo named `colinkehoe.github.io`  -> "/"
 *   Project site — repo named e.g. `portfolio`      -> "/portfolio/"
 *
 * The CI workflow sets BASE_PATH automatically from the repo name,
 * so you normally don't need to touch this.
 */
const base = process.env.BASE_PATH ?? "/";

export default defineConfig({
  plugins: [react()],
  base,
});
