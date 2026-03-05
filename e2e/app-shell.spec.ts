import { expect, test } from '@playwright/test'

test('app shell renders expected content', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByRole('banner')).toBeVisible()
    await expect(page.getByRole('main')).toBeVisible()
    await expect(page.getByRole('contentinfo')).toBeVisible()

    await expect(page.getByRole('heading', { level: 1, name: 'Obsidian Artifact Co.' })).toBeVisible()
})

test('previous collection page renders semantic shell and heading content', async ({ page }) => {
    await page.goto('/previous-collection')

    await expect(page.getByRole('banner')).toBeVisible()
    await expect(page.getByRole('main')).toBeVisible()
    await expect(page.getByRole('contentinfo')).toBeVisible()

    await expect(page.getByRole('heading', { level: 1, name: 'SS 25' })).toBeVisible()
    await expect(page.getByText('Previous Collections')).toBeVisible()
})

test('previous collection supporting block responds across breakpoints', async ({ page }, testInfo) => {
    await page.goto('/previous-collection')

    const featuredMediaRegion = page.getByRole('region', { name: 'Featured media' })
    const supportingRegion = page.getByRole('region', { name: 'Supporting content' })

    await expect(featuredMediaRegion).toBeVisible()
    await expect(supportingRegion).toBeVisible()

    const featuredMediaBox = await featuredMediaRegion.boundingBox()
    const supportingRegionBox = await supportingRegion.boundingBox()

    expect(featuredMediaBox).not.toBeNull()
    expect(supportingRegionBox).not.toBeNull()

    expect(supportingRegionBox!.y).toBeGreaterThan(featuredMediaBox!.y + featuredMediaBox!.height * 0.72)

    if (testInfo.project.name === 'mobile-chromium') {
        expect(featuredMediaBox!.width).toBeLessThan(420)
    }

    if (testInfo.project.name === 'desktop-chromium') {
        expect(featuredMediaBox!.width).toBeGreaterThan(680)
        expect(featuredMediaBox!.height).toBeGreaterThan(330)
    }
})

test('previous collection page exposes basic accessibility semantics', async ({ page }) => {
    await page.goto('/previous-collection')

    await expect(page.getByRole('navigation', { name: 'Primary' })).toBeVisible()
    await expect(page.getByRole('navigation', { name: 'Bottom' })).toBeVisible()

    await expect(page.getByRole('img', { name: 'Featured SS 25 obsidian artifact displayed in a room interior.' })).toBeVisible()

    await expect(page.getByRole('heading', { level: 1, name: 'SS 25' })).toBeVisible()
    await expect(page.getByRole('heading', { level: 2, name: 'Featured media' })).toBeVisible()
    await expect(page.getByRole('heading', { level: 2, name: 'Supporting content' })).toBeVisible()

    await expect(page.getByRole('link', { name: 'Go to Collections' })).toHaveAttribute('aria-current', 'page')
})

test('collection archive adapts to mobile and desktop layouts', async ({ page }, testInfo) => {
    await page.goto('/')

    const archiveItems = page.getByLabel('Previous collections list').locator('li')
    const firstCard = archiveItems.nth(0)
    const secondCard = archiveItems.nth(1)

    await expect(firstCard).toBeVisible()
    await expect(secondCard).toBeVisible()

    const firstBox = await firstCard.boundingBox()
    const secondBox = await secondCard.boundingBox()

    expect(firstBox).not.toBeNull()
    expect(secondBox).not.toBeNull()

    if (testInfo.project.name === 'mobile-chromium') {
        expect(secondBox!.y).toBeGreaterThan(firstBox!.y + firstBox!.height * 0.6)
    }

    if (testInfo.project.name === 'desktop-chromium') {
        expect(Math.abs(secondBox!.y - firstBox!.y)).toBeLessThan(12)
        expect(secondBox!.x).toBeGreaterThan(firstBox!.x)
    }
})

test('current collection selector exposes responsive accessible controls', async ({ page }, testInfo) => {
    await page.goto('/')

    const selector = page.getByLabel('Current collection image selector')
    await expect(selector).toBeVisible()
    await expect(page.locator('#current-collection-status')).toContainText('Currently showing slide 1 of 3')

    await page.getByRole('button', { name: 'Show current collection image 2' }).click()

    const activeButton = page.getByRole('button', { name: 'Show current collection image 2' })
    await expect(activeButton).toHaveAttribute('aria-pressed', 'true')
    await expect(page.locator('#current-collection-status')).toContainText('Currently showing slide 2 of 3')

    const buttons = selector.getByRole('button')
    const firstButton = buttons.nth(0)
    const secondButton = buttons.nth(1)
    const firstBox = await firstButton.boundingBox()
    const secondBox = await secondButton.boundingBox()

    expect(firstBox).not.toBeNull()
    expect(secondBox).not.toBeNull()

    if (testInfo.project.name === 'mobile-chromium') {
        expect(Math.abs(secondBox!.y - firstBox!.y)).toBeLessThan(12)
        expect(secondBox!.x).toBeGreaterThan(firstBox!.x)
    }

    if (testInfo.project.name === 'desktop-chromium') {
        expect(secondBox!.y).toBeGreaterThan(firstBox!.y)
        expect(Math.abs(secondBox!.x - firstBox!.x)).toBeLessThan(12)
    }
})
