import { defineConfig, devices } from '@playwright/test'

// Everything here runs offline: a local Astro dev server on a dedicated port,
// a throwaway SQLite file under ./data, and the locally cached Chromium build.
export const E2E_PORT = 4399
export const E2E_BASE_URL = `http://127.0.0.1:${E2E_PORT}`
export const E2E_DATABASE_FILE = './data/e2e.db'

export default defineConfig({
  testDir: './e2e',
  globalSetup: './e2e/global-setup.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: E2E_BASE_URL,
    trace: 'retain-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'node e2e/dev-server.mjs',
    url: E2E_BASE_URL,
    reuseExistingServer: false,
    stdout: 'pipe',
    stderr: 'pipe',
    timeout: 60_000,
    env: {
      E2E_PORT: String(E2E_PORT),
      DATABASE_URL: `file:${E2E_DATABASE_FILE}`,
      BETTER_AUTH_SECRET: 'e2e-secret-e2e-secret-e2e-secret-e2e-secret',
      BETTER_AUTH_URL: E2E_BASE_URL,
      ASTRO_TELEMETRY_DISABLED: '1',
    },
  },
})
