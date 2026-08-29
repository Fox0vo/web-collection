import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  use: {
    baseURL: "http://127.0.0.1:4322",
  },
  webServer: {
    command: "bun run build && bun run preview -- --host 127.0.0.1 --port 4322",
    url: "http://127.0.0.1:4322/web-collection/",
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
