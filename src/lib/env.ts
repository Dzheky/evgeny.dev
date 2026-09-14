/**
 * Server-side environment access.
 *
 * Reads `process.env` so the same code works in the Astro server runtime,
 * in Vitest, and under the better-auth / drizzle-kit CLIs (which load these
 * modules outside Vite, where `import.meta.env` is not populated).
 */
export function getEnv(name: string): string | undefined {
  const value = process.env[name]
  return value === undefined || value === '' ? undefined : value
}

export function requireEnv(name: string): string {
  const value = getEnv(name)
  if (value === undefined) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

export const DEFAULT_DATABASE_URL = 'file:./data/local.db'
export const DEFAULT_AUTH_URL = 'http://localhost:4321'
