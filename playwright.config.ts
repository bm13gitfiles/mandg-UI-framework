import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

const TEST_ENV = process.env.TEST_ENV || 'stage';

const baseURLs = {
  dev: 'https://showcase-www-devx.mandg.com',
  stage: 'https://showcase-www-stage.mandg.com',
  prod: 'https://www.mandg.com'
};

const activeBaseURL = baseURLs[TEST_ENV as keyof typeof baseURLs] || baseURLs.stage;

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  globalSetup: './tests/global-setup.ts',
  timeout: 60000,
  testDir: './tests',
  /* Route snapshots to BaseLineImages folder */
  snapshotDir: './BaseLineImages',
  /* Route failure outputs (traces, diffs, actuals) to failure-screenshots folder */
  outputDir: './failure-screenshots',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 2 : '50%',
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html', { outputFolder: 'reports' }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like await page.goto('') */
    baseURL: activeBaseURL,
    storageState: 'storageState.json',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    deviceScaleFactor: 1,
  },

  /* Configure projects for custom viewports */
  projects: [
    {
      name: 'chrome-desktop',
      use: {
        browserName: 'chromium',
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: 'mac-safari',
      use: {
        browserName: 'webkit',
        viewport: { width: 1920, height: 1080 },
      },
    },

    {
      name: 'chrome-desktop-960px-view',
      use: {
        browserName: 'chromium',
        viewport: { width: 960, height: 600 },
      },
    },
    {
      name: 'mobile',
      use: {
        browserName: 'chromium',
        viewport: { width: 375, height: 667 },
        isMobile: true,
        hasTouch: true,
      },
    },
    {
      name: 'tablet',
      use: {
        browserName: 'chromium',
        viewport: { width: 768, height: 1028 },
        hasTouch: true,
      },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
