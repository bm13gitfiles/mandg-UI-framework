import { Page, Locator, expect } from '@playwright/test';
import { title } from 'node:process';


export class WebCommons {

    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    //Common method to generate WebElement from the locator
    async element(locator: string): Promise<Locator> {
        return this.page.locator(locator);
    }


    //Common method to click the link and verify the page title
    async clickAndVerifyTitleAndGoBack(locator: string, expectedTitle: string) {
        const element = await this.element(locator);
        await element.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.page).toHaveTitle(expectedTitle);
        await this.page.goBack();
    }


    async waitForSeconds(seconds: number): Promise<void> {
        // Convert seconds to milliseconds
        await this.page.waitForTimeout(seconds * 1000);
    }




    async clickAndVerifyTitleAndCloseTab(locator: string, expectedTitle: string) {
        const element = await this.element(locator);

        // Ensure the element is visible and scrolled into view before clicking
        await element.scrollIntoViewIfNeeded();

        try {
            const [newPage] = await Promise.all([
                this.page.context().waitForEvent('page', { timeout: 40000 }), // Increase timeout slightly
                element.click({ force: true }) // Force the click in case of overlays
            ]);

            // Wait for 'load' instead of 'domcontentloaded' for external login pages
            await newPage.waitForLoadState('load');

            // Verify title
            await expect(newPage).toHaveTitle(expectedTitle);

            // Clean up
            await newPage.close();
        } catch (error) {
            console.error(`Failed to open or verify new tab for locator: ${locator}`);
            throw error;
        }
    }

    //Common method to navigate back
    async navigateBack() {
        await this.page.goBack();
    }



    //Compare the Title
    async validateTheTitle(expectedTitle: string) {
        const actualTitle = await this.page.title();
        await expect(actualTitle, `Title mismatch!`).toBe(expectedTitle);

    }

    async getPageTitle(page: Page): Promise<string> {
        return await page.title();
    }



    //Common method to launch the URL dynamically based on environment
    async launchApplication(urlOrPath: string, isMainSite: boolean = false, title?: string): Promise<void> {
        const env = process.env.TEST_ENV || 'stage';
        let path = urlOrPath;

        // If an absolute URL is passed, extract the path and auto-detect the site type
        if (urlOrPath.startsWith('http')) {
            const urlObj = new URL(urlOrPath);
            path = urlObj.pathname + urlObj.search + urlObj.hash;
            
            if (urlObj.hostname === 'www.mandg.com' || urlObj.hostname === 'www-stage.mandg.com' || urlObj.hostname === 'www-devx.mandg.com') {
                isMainSite = true;
            } else {
                isMainSite = false;
            }
        }

        let host = '';

        if (isMainSite) {
            if (env === 'prod') host = 'https://www.mandg.com';
            else if (env === 'dev' || env === 'devx') host = 'https://www-devx.mandg.com';
            else host = 'https://www-stage.mandg.com';
        } else {
            if (env === 'prod') host = 'https://showcase-www.mandg.com';
            else if (env === 'dev' || env === 'devx') host = 'https://showcase-www-devx.mandg.com';
            else host = 'https://showcase-www-stage.mandg.com';
        }

        const fullUrl = `${host}${path.startsWith('/') ? path : '/' + path}`;
        await this.page.goto(fullUrl);
        
        if (title) {
            await expect(this.page).toHaveTitle(title);
        }
    }

    //Common method to scroll to the element
    async scrollToElement(locator: string) {
        const element = await this.element(locator);
        await element.scrollIntoViewIfNeeded();
    }

    //Common method to click the WebElement
    async clickElement(locator: string) {
        const element = await this.element(locator);
        await element.click();
    }


    //Common method to Double click the WebElement
    async doubleClickElement(locator: string) {
        const element = await this.element(locator);
        await element.dblclick();
    }

    //Common method to Force click the WebElement
    async forceClickElement(locator: string) {
        const element = await this.element(locator);
        await element.click({ force: true });
    }

    //Common method to clear text from the element
    async clearTheTextBox(locator: string) {
        const element = await this.element(locator);
        await element.clear();
    }

    //Common method to type text from the element
    async typeIntoTheTextBox(locator: string, text: string) {
        const element = await this.element(locator);
        await element.scrollIntoViewIfNeeded();
        await element.clear();
        await element.fill(text)
    }


    //Common method to select the value from the dropdown
    async selectValueFromDropdown(locator: string, option: string) {
        const element = await this.element(locator);
        await element.scrollIntoViewIfNeeded();
        await element.selectOption(option);

    }

    //Common method to get the value entered in textBox
    async getTextfromInput(locator: string): Promise<string> {
        const element = await this.element(locator);
        await this.scrollToElement(locator);
        return await element.inputValue();
    }


    //Common method to get the value entered in textBox
    async getText(locator: string): Promise<string | null> {
        const element = await this.element(locator);
        await this.scrollToElement(locator);
        return await element.textContent();
    }


    //Common method to get the attribute value from the element
    async getElementAttribute(locator: string, attribute: string): Promise<string | null> {
        const element = await this.element(locator);
        await this.scrollToElement(locator);
        return await element.getAttribute(attribute);
    }


    //Common method to upload a file to an element
    async uploadFile(locator: string, filepath: string): Promise<void> {
        const element = await this.element(locator);
        await this.scrollToElement(locator);
        await element.setInputFiles(filepath);
    }


    //Common method to check element is visible
    async checkIfElementVisible(locator: string) {
        const element = await this.element(locator);
        return await element.isVisible();
    }

    //Common method is check element is enabled
    async checkIfElementEnabled(locator: string) {
        const element = await this.element(locator);
        return await element.isEnabled();
    }

    //Common method is check element is Hidden
    async checkIfElementHidden(locator: string) {
        const element = await this.element(locator);
        return await element.isHidden();
    }

    //Common method to wait for an element to be visible
    async waitForElementVisible(locator: string, timeout: number = 3000) {
        const element = await this.element(locator);
        await element.waitFor({ state: 'visible', timeout: timeout });
    }

    //Common method to handle alert popup

    async handleAlert(action: 'accept' | 'dismiss', promptText?: string): Promise<void> {
        this.page.on('dialog', async (dialog) => {
            if (action === 'accept') {
                await dialog.accept(promptText);
            }
            else {
                await dialog.dismiss();
            }
        })
    }



    //Common method to Take Screenshot
    async takeScreenshot(path: string): Promise<void> {
        await this.page.screenshot({ path });
    }


    //Common method to compare text values
    async compareText(actual: string, expected: string) {
        if (actual !== expected) {
            throw new Error(`Expected value - ${expected} not matched with Actual - ${actual}`);
        }
        else {
            console.log("Pokemon #0132")
        }
    }


    //Common method to compare text values using Assert
    async compareTextAssert(locator: string, expectedText: string) {
        const element = await this.element(locator);
        await expect(element).toHaveText(expectedText);

    }

    //Press enter button
    async pressEnterButton() {
        await this.page.keyboard.press('Enter');
    }

    //Common method to close the current tab
    async closeCurrentTab() {
        await this.page.close();
    }

    //Common method to switch to the newly opened tab
    async switchToNewTab() {
        // 1. Get all open pages in the current browser context
        const pages = this.page.context().pages();

        // 2. Identify the last opened page
        const newPage = pages[pages.length - 1];

        if (!newPage) {
            throw new Error("No new tab/page found to switch to.");
        }

        // 3. Bring the tab to the physical foreground (visual)
        await newPage.bringToFront();

        // 4. IMPORTANT: Update the class property so other methods use the new tab
        this.page = newPage;
    }


    //Common method to wait until the page is completely loaded
    async waitForPageLoad() {
        await this.page.waitForLoadState('load');
        await this.page.waitForLoadState('domcontentloaded');
    }

    //Common method to scroll to 1000px down
    async scrollTo1000pxDown() {
        await this.page.mouse.wheel(0, 1000);
    }


    async getEnvironment(page: Page): Promise<string> {
        const currentUrl = page.url();
        const hostname = new URL(currentUrl).hostname;

        // Map hostnames to environments
        if (hostname === 'www.mandg.com') {
            return 'prod';
        } else if (hostname === 'www-stage.mandg.com') {
            return 'stage';
        } else if (hostname === 'www-dev.mandg.com') {
            return 'dev';
        } else {
            return 'unknown';
        }
    }



    async clickByRole(role: Parameters<Page['getByRole']>[0], name: string) {
        await this.page.getByRole(role, { name }).click();
    }

    async clickByLabel(label: string) {
        await this.page.getByLabel(label, { exact: true }).click();
    }


    async selectEGRdropdownOption(
        dropdownLocator: string,
        optionLabel: string,
        optionDataKey?: string
    ): Promise<void> {

        await this.page.locator(dropdownLocator).click();

        const nativeSelect = this.page.locator(
            "div[data-testid='hidden-select-container'] select"
        );

        if (await nativeSelect.count()) {
            try {
                await nativeSelect.selectOption({ label: optionLabel });
                return;
            } catch {
                // Fall back to React list
            }
        }

        const option = optionDataKey
            ? this.page.locator(
                `li[role='option'][data-key="${optionDataKey}"]`
            )
            : this.page.locator("li[role='option']").filter({
                hasText: optionLabel
            }).first();

        await expect(option).toBeVisible({ timeout: 10000 });
        await option.click({ force: true });
    }

}