// Import the Chrome browser driver (chromium) and the setup configuration settings from Playwright.
import { chromium, FullConfig } from '@playwright/test';
// Import our custom steps for interacting with the M&G website.
import { MandgPageSteps } from '../page-objects/page-steps/mandg-page-steps.ts';

// This function runs exactly ONCE before any of your actual tests begin.
async function globalSetup(config: FullConfig) {
  // Let the user know we are starting the setup process.
  console.log('GLOBAL SETUP: LAUNCHING BROWSER TO ACCEPT COOKIES...');
  
  // Launch a brand new Chrome browser in the background.
  const browser = await chromium.launch();
  // Open a new blank tab/page in that browser.
  const page = await browser.newPage();
  
  // Look at our computer's environment variables to see which environment we want to test (e.g. stage, dev, prod).
  // If we didn't specify one, default to 'stage'.
  const env = process.env.TEST_ENV || 'stage';
  
  // Create an empty variable to hold the website URL.
  let baseURL = '';
  
  // If the environment is 'prod', set the URL to the live production site.
  if (env === 'prod') baseURL = 'https://showcase-www.mandg.com';
  // If the environment is 'dev' or 'devx', set the URL to the developer testing site.
  else if (env === 'dev' || env === 'devx') baseURL = 'https://showcase-www-devx.mandg.com';
  // Otherwise, default to the staging (pre-production) site.
  else baseURL = 'https://showcase-www-stage.mandg.com';

  // Tell the browser to go to the chosen URL (specifically the /adviser page).
  await page.goto(`${baseURL}/adviser`);

  // Load up our custom M&G page steps so we can interact with the page.
  const mandgSteps = new MandgPageSteps(page);
  
  // Run the step to click "Accept" on the big OneTrust cookie banner.
  await mandgSteps.acceptOneTrustCookieBanner();

  // Now that the cookie banner is accepted, the browser has a "cookie" saved remembering our choice.
  // We want to save this exact browser state into a file called 'storageState.json'.
  // This means all of our actual tests can load this file and start with cookies ALREADY accepted!
  await page.context().storageState({ path: 'storageState.json' });
  
  // We are done with setup, so we can close this temporary browser.
  await browser.close();
  
  // Let the user know the setup was completely successful.
  console.log('GLOBAL SETUP: COOKIES ACCEPTED AND STATE SAVED TO STORAGESTATE.JSON');
}

// Export this setup function so Playwright knows to use it.
export default globalSetup;
