/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config'

// Wrap Vitest in Astro's Vite config so `.astro` components, `astro:*`
// virtual modules and `import.meta.env` resolve the same way as in the app.
export default getViteConfig({
  test: {
    env: {
      DATABASE_URL: ':memory:',
      BETTER_AUTH_SECRET: 'vitest-secret-vitest-secret-vitest-secret',
      BETTER_AUTH_URL: 'http://localhost:4321',
    },
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.vercel/**',
      '**/.astro/**',
      'e2e/**',
    ],
    // Migration and better-auth tests use a real in-memory libsql database.
    testTimeout: 15_000,
    coverage: {
      provider: 'v8',
      // Root config files and .astro templates have no v8-countable statements.
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.test.ts', 'src/test/**'],
      thresholds: { statements: 100, branches: 100, functions: 100, lines: 100 },
    },
  },
})
