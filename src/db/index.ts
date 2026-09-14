import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'

import { DEFAULT_DATABASE_URL, getEnv } from '../lib/env'
import * as schema from './schema'

export type Database = ReturnType<typeof createDb>

/**
 * Create a Drizzle database bound to a libsql client.
 * `url` may be a local file (`file:./data/local.db`), `:memory:`, or a Turso URL.
 */
export function createDb(url: string, authToken?: string) {
  const client = createClient(authToken ? { url, authToken } : { url })
  return drizzle(client, { schema })
}

/** Database URL from the environment, falling back to the local dev file. */
export function resolveDatabaseUrl(): string {
  return getEnv('DATABASE_URL') ?? DEFAULT_DATABASE_URL
}

export const db = createDb(resolveDatabaseUrl(), getEnv('DATABASE_AUTH_TOKEN'))
