import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom", // Ensure you're using jsdom for testing
    globals: true, // Use global test methods like describe, test
    setupFiles: "./vitest.setup.ts", // Path to the setup file
  },
});
