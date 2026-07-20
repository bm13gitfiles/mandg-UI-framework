import { expect, Page } from '@playwright/test';
import { WebCommons } from '../../commons/ui/web-commons.ts';
import PageElements from '../page-elements/mandg-page-elements.json' with { type: 'json' };

export class MandgPageSteps {
    page: Page;
    webCommons: WebCommons;

    constructor(page: Page) {
        this.page = page;
        this.webCommons = new WebCommons(page);
    }

    /**
     * Asserts that the OneTrust cookie banner is visible on the page.
     * Waits up to 5 seconds for the banner to appear.
     * 
     * @returns A Promise that resolves if the banner is displayed, or throws an assertion error if it fails to appear.
     */
    async verifyWhetherTheOneTrustCookieBannerIsDisplayed(): Promise<void> {
        const locator = this.page.locator(PageElements['accept-cookies-button']);

        await expect(
            locator,
            'OneTrust Cookie Banner is not displayed.'
        ).toBeVisible({
            timeout: 5000
        });

        console.log('✅ ONETRUST COOKIE BANNER IS DISPLAYED.');
    }

    /**
     * Submits the Lead Generation Form by clicking its submit button.
     * Catches and suppresses any errors if the submission fails.
     * 
     * @returns A Promise that resolves when the click action completes or an error is caught.
     */
    async submitLeadGenForm(): Promise<void> {
        try {
            const locator = PageElements['lead-gen-form-submit-button'];
            await this.webCommons.clickElement(locator);
        } catch (error) {
            console.log('LEAD GEN FORM SUBMISSION FAILED.');
        }
    }

    /**
     * Attempts to find and click the 'Accept' button on the OneTrust Cookie banner.
     * Will wait up to 3 seconds for the banner to appear. If it does not appear, 
     * it assumes the banner is already accepted or not present and gracefully continues.
     * 
     * @returns A Promise that resolves when the banner is successfully clicked or the timeout expires.
     */
    async acceptOneTrustCookieBanner(): Promise<void> {
        try {
            const locator = PageElements['accept-cookies-button'];

            // Wait up to 3 seconds for the banner to appear
            await this.webCommons.waitForElementVisible(locator, 3000);
            await this.webCommons.clickElement(locator);

            // Give the banner a brief moment to animate out of the page so it doesn't get captured in screenshots
            await this.webCommons.waitForSeconds(0.5);
        } catch (error) {
            // If the banner doesn't appear within 3 seconds, we just proceed with the test
            console.log('COOKIE BANNER NOT FOUND OR ALREADY ACCEPTED.');
        }
    }
}
