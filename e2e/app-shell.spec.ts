import { expect, test } from '@playwright/test'

test('app shell renders expected content', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByRole('banner')).toBeVisible()
    await expect(page.getByRole('main')).toBeVisible()
    await expect(page.getByRole('contentinfo')).toBeVisible()

    await expect(page.getByRole('heading', { level: 1, name: 'Obsidian Artifact Co.' })).toBeVisible()
})
