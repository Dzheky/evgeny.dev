import { existsSync } from 'node:fs'

import { afterEach, describe, expect, it, vi } from 'vitest'

afterEach(() => {
  vi.unstubAllEnvs()
  vi.resetModules()
})

async function load() {
  return (await import('./drizzle.config')).default
}

describe('drizzle config', () => {
  it('points drizzle-kit at the schema and migrations folder', async () => {
    const config = await load()
    expect(config.dialect).toBe('turso')
    expect(config.schema).toBe('./src/db/schema.ts')
    expect(config.out).toBe('./drizzle')
    expect(existsSync(config.schema as string)).toBe(true)
  })

  it('defaults to the local SQLite file when DATABASE_URL is unset', async () => {
    vi.stubEnv('DATABASE_URL', undefined)
    vi.stubEnv('DATABASE_AUTH_TOKEN', undefined)
    const config = await load()
    const credentials = 'dbCredentials' in config ? config.dbCredentials : undefined
    expect(credentials).toEqual({ url: 'file:./data/local.db', authToken: undefined })
  })

  it('reads the database URL and token from the environment', async () => {
    vi.stubEnv('DATABASE_URL', 'libsql://example.turso.io')
    vi.stubEnv('DATABASE_AUTH_TOKEN', 'token')
    const config = await load()
    const credentials = 'dbCredentials' in config ? config.dbCredentials : undefined
    expect(credentials).toEqual({
      url: 'libsql://example.turso.io',
      authToken: 'token',
    })
  })
})
