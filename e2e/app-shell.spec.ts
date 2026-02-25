import { expect, test } from '@playwright/test'

test('app shell renders expected content', async ({ page }) => {
    await page.goto('/')

    await expect(
        page.getByRole('heading', { name: 'React + TypeScript + Tailwind' }),
    ).toBeVisible()

    await expect(page.getByText('Frontend project initialized successfully.')).toBeVisible()
})
