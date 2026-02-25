import { defineConfig } from '@playwright/test'

export default defineConfig({
    testDir: './e2e',
    fullyParallel: true,
    reporter: 'list',
    use: {
        baseURL: 'http://127.0.0.1:4173',
        trace: 'on-first-retry',
    },
    projects: [
        {
            name: 'desktop-firefox',
            use: {
                browserName: 'firefox',
                viewport: { width: 1280, height: 720 },
            },
        },
        {
            name: 'mobile-firefox',
            use: {
                browserName: 'firefox',
                viewport: { width: 393, height: 851 },
                isMobile: true,
                hasTouch: true,
            },
        },
    ],
    webServer: {
        command: 'pnpm dev --host 127.0.0.1 --port 4173',
        url: 'http://127.0.0.1:4173',
        reuseExistingServer: true,
        timeout: 120 * 1000,
    },
})
