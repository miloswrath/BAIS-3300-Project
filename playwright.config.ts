import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
    testDir: 'e2e',
    use: {
        baseURL: 'http://127.0.0.1:4175',
        trace: 'on-first-retry',
    },
    webServer: {
        command: 'pnpm dev --host 127.0.0.1 --port 4175',
        url: 'http://127.0.0.1:4175',
        reuseExistingServer: true,
        timeout: 120000,
    },
    projects: [
        {
            name: 'mobile-chromium',
            use: { ...devices['Pixel 5'] },
        },
        {
            name: 'desktop-chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
})