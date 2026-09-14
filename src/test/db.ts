import { createDb, type Database } from '../db'
import { runMigrations } from '../db/migrate'

/** A fresh, fully migrated in-memory database for one test. */
export async function createTestDb(): Promise<Database> {
  const database = createDb(':memory:')
  await runMigrations(database)
  return database
}
