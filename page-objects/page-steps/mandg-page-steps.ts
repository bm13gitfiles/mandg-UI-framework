import { Page } from '@playwright/test';
import { WebCommons } from '../../commons/ui/web-commons.ts';
import PageElements from '../page-elements/mandg-page-elements.json' with { type: 'json' };

export class MandgPageSteps {
    page: Page;
    webCommons: WebCommons;

    constructor(page: Page) {
        this.page = page;
        this.webCommons = new WebCommons(page);
    }

    async acceptOneTrustCookieBanner() {
        try {
            const locator = PageElements['accept-cookies-button'];

            // Wait up to 3 seconds for the banner to appear
            await this.webCommons.waitForElementVisible(locator, 3000);
            await this.webCommons.clickElement(locator);

            // Give the banner a brief moment to animate out of the page so it doesn't get captured in the screenshot
            await this.webCommons.waitForSeconds(0.5);
        } catch (error) {
            // If the banner doesn't appear within 3 seconds, we just proceed with the test
            console.log('Cookie banner not found or already accepted.');
        }
    }
}
