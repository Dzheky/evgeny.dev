import { expect, test } from '@playwright/test'

test.describe('home page', () => {
  test('renders the site heading', async ({ page }) => {
    const response = await page.goto('/')
    expect(response?.status()).toBe(200)
    await expect(page).toHaveTitle('evgeny.dev')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('evgeny.dev')
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  })

  test('returns 404 for an unknown route', async ({ page }) => {
    const response = await page.goto('/this-page-does-not-exist')
    expect(response?.status()).toBe(404)
  })
})

test.describe('legacy redirects', () => {
  for (const path of ['/subscribe', '/projects', '/obsidian', '/language-test']) {
    test(`${path} lands on the home page`, async ({ page }) => {
      await page.goto(path)
      await expect(page).toHaveURL('/')
      await expect(page.getByRole('heading', { level: 1 })).toHaveText('evgeny.dev')
    })
  }

  test('the old post URL lands on the home page', async ({ page }) => {
    await page.goto('/posts/my_updated_personal_website')
    await expect(page).toHaveURL('/')
  })
})
