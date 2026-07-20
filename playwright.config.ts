// Import the main configuration tools from Playwright.
import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
// This is the main brain/control panel for the entire automation framework.
export default defineConfig({
  // Tell Playwright which file to run BEFORE any tests start (used to accept cookies).
  globalSetup: './tests/global-setup.ts',
  
  // Tell Playwright which file to run AFTER all tests finish (used to send the email report).
  globalTeardown: './global-teardown.ts',
  
  // Maximum time (in milliseconds) one single test is allowed to run before it is considered stuck/failed (60 seconds).
  timeout: 60000,
  
  // The folder where Playwright should look to find your test files.
  testDir: './tests',
  
  // The folder where Playwright stores the perfect "baseline" images used for visual comparison.
  snapshotDir: './BaseLineImages',
  
  // The folder where Playwright should dump error logs, traces, and screenshots if a test fails.
  outputDir: './failure-screenshots',
  
  // Tells Playwright to run tests at the exact same time (parallel) to speed things up.
  fullyParallel: true,
  
  // If someone accidentally left a 'test.only()' in the code (which skips all other tests), fail the run if it's on a CI server (like Jenkins).
  forbidOnly: !!process.env.CI,
  
  // If a test fails, try it one more time automatically (but only if running on a CI server).
  retries: process.env.CI ? 1 : 0,
  
  // How many test lanes (workers) to run at once. Uses 2 on CI servers, or 50% of your computer's CPU power if running locally.
  workers: process.env.CI ? 2 : '50%',
  
  // Tells Playwright what kind of reports to generate when the tests finish.
  reporter: [
    // Generate a beautiful interactive HTML website report and put it in the 'reports' folder.
    ['html', { outputFolder: 'reports' }],
    // Generate a raw XML data report (which our Email script reads) and name it 'results.xml'.
    ['junit', { outputFile: 'results.xml' }]
  ],
  
  /* Shared settings for all the projects below. */
  use: {
    // Tell all tests to load the 'storageState.json' file (created in global-setup) so cookies are already accepted.
    storageState: 'storageState.json',

    // If a test fails and we have to retry it, record a "Trace" (a step-by-step time machine recording of the test).
    trace: 'on-first-retry',
    
    // Set the screen density/sharpness. 1 is standard. This stops screenshots from looking blurry or wrong on high-res monitors.
    deviceScaleFactor: 1,
  },

  /* Configure different browsers and screen sizes (called 'projects') to run our tests against. */
  projects: [
    // Project 1: Standard Desktop running Google Chrome.
    {
      name: 'chrome-desktop', // A friendly name for this project.
      use: {
        browserName: 'chromium', // Use the Chromium (Chrome) engine.
        viewport: { width: 1920, height: 1080 }, // Set the screen size to standard 1080p HD.
      },
    },
    
    // Project 2: Standard Desktop running Apple Safari.
    {
      name: 'mac-safari',
      use: {
        browserName: 'webkit', // Use the WebKit (Safari) engine.
        viewport: { width: 1920, height: 1080 },
      },
    },

    // Project 3: Desktop Chrome, but with a smaller window size.
    {
      name: 'chrome-desktop-960px-view',
      use: {
        browserName: 'chromium',
        viewport: { width: 960, height: 600 },
      },
    },
    
    // Project 4: Simulating a Mobile Phone.
    {
      name: 'mobile',
      use: {
        browserName: 'chromium',
        viewport: { width: 375, height: 667 }, // iPhone size.
        isMobile: true, // Tell Playwright to pretend this is a real mobile device.
        hasTouch: true, // Enable touch events (like swiping/tapping).
      },
    },
    
    // Project 5: Simulating a Tablet (like an iPad).
    {
      name: 'tablet',
      use: {
        browserName: 'chromium',
        viewport: { width: 768, height: 1028 }, // iPad size.
        hasTouch: true,
      },
    },
  ],
});
