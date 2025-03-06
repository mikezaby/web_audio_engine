import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    setupFiles: "test/testSetup.ts",
    include: ["test/**/*.{test,spec}.{ts,tsx}"],
  },
  plugins: [tsconfigPaths()],
});
