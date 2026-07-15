import { chromium, FullConfig } from '@playwright/test';
import { MandgPageSteps } from '../page-objects/page-steps/mandg-page-steps.ts';

async function globalSetup(config: FullConfig) {
  console.log('Global Setup: Launching browser to accept cookies...');
  
  // Launch a new browser instance
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Extract baseURL from the first project in Playwright config
  const baseURL = config.projects[0].use.baseURL || 'https://showcase-www-stage.mandg.com';

  // Navigate to the base application
  await page.goto(`${baseURL}/adviser`);

  // Handle the OneTrust Cookie Banner globally
  const mandgSteps = new MandgPageSteps(page);
  await mandgSteps.acceptOneTrustCookieBanner();

  // Save the authenticated state of the browser
  await page.context().storageState({ path: 'storageState.json' });
  await browser.close();
  
  console.log('Global Setup: Cookies accepted and state saved to storageState.json');
}

export default globalSetup;
