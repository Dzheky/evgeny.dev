import { mkdirSync, rmSync } from 'node:fs'

import { createDb } from '../src/db'
import { runMigrations } from '../src/db/migrate'
import { E2E_DATABASE_FILE } from '../playwright.config'

/** Start every run from an empty, fully migrated database. */
export default async function globalSetup(): Promise<void> {
  mkdirSync('./data', { recursive: true })
  for (const suffix of ['', '-journal', '-wal', '-shm']) {
    rmSync(`${E2E_DATABASE_FILE}${suffix}`, { force: true })
  }
  await runMigrations(createDb(`file:${E2E_DATABASE_FILE}`))
}
