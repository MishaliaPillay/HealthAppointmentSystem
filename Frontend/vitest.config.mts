import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts", // if you have one
    coverage: {
      reporter: ["text", "json", "html"], // view in terminal, json file, and HTML report
      exclude: [
        "node_modules/",
        "test/",
        "tests/",
        "**/*.test.tsx",
        "**/*.test.ts",
      ], // adjust as needed
    },
  },
});
