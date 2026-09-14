import { migrate } from 'drizzle-orm/libsql/migrator'

import type { Database } from './index'

export const MIGRATIONS_FOLDER = 'drizzle'

/** Apply every migration in ./drizzle to the given database. */
export async function runMigrations(database: Database): Promise<void> {
  await migrate(database, { migrationsFolder: MIGRATIONS_FOLDER })
}
