import { drizzleAdapter } from '@better-auth/drizzle-adapter'
import { betterAuth } from 'better-auth'

import { db, type Database } from '../db'
import * as schema from '../db/schema'
import { DEFAULT_AUTH_URL, getEnv } from './env'

export interface AuthConfig {
  secret?: string
  baseURL?: string
}

/** Build a better-auth instance bound to the given database. */
export function createAuth(database: Database, config: AuthConfig = {}) {
  return betterAuth({
    database: drizzleAdapter(database, { provider: 'sqlite', schema }),
    secret: config.secret ?? getEnv('BETTER_AUTH_SECRET'),
    baseURL: config.baseURL ?? getEnv('BETTER_AUTH_URL') ?? DEFAULT_AUTH_URL,
    emailAndPassword: { enabled: true },
  })
}

export type Auth = ReturnType<typeof createAuth>

export const auth = createAuth(db)
