import { Page, Locator, expect } from '@playwright/test';

export class WebCommons {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Resolves a string locator into a Playwright Locator object.
     * 
     * @param locator The CSS or XPath selector string.
     * @returns A Promise resolving to a Playwright Locator.
     */
    async element(locator: string): Promise<Locator> {
        return this.page.locator(locator);
    }

    /**
     * Clicks an element, waits for the page to load, verifies the new page title,
     * and then navigates back to the previous page.
     * 
     * @param locator The CSS or XPath selector of the element to click.
     * @param expectedTitle The expected title of the subsequent page.
     */
    async clickAndVerifyTitleAndGoBack(locator: string, expectedTitle: string): Promise<void> {
        const element = await this.element(locator);
        await element.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.page).toHaveTitle(expectedTitle);
        await this.page.goBack();
    }

    /**
     * Pauses test execution for a specified number of seconds.
     * 
     * @param seconds The number of seconds to wait.
     */
    async waitForSeconds(seconds: number): Promise<void> {
        await this.page.waitForTimeout(seconds * 1000);
    }

    /**
     * Clicks an element that opens a new tab, verifies the title of the new tab, 
     * and then closes the new tab.
     * 
     * @param locator The CSS or XPath selector of the element to click.
     * @param expectedTitle The expected title of the newly opened tab.
     */
    async clickAndVerifyTitleAndCloseTab(locator: string, expectedTitle: string): Promise<void> {
        const element = await this.element(locator);
        await element.scrollIntoViewIfNeeded();

        try {
            const [newPage] = await Promise.all([
                this.page.context().waitForEvent('page', { timeout: 40000 }),
                element.click({ force: true })
            ]);

            await newPage.waitForLoadState('load');
            await expect(newPage).toHaveTitle(expectedTitle);
            await newPage.close();
        } catch (error) {
            console.error(`FAILED TO OPEN OR VERIFY NEW TAB FOR LOCATOR: ${locator}`);
            throw error;
        }
    }

    /**
     * Navigates back to the previous page in the browser history.
     */
    async navigateBack(): Promise<void> {
        await this.page.goBack();
    }

    /**
     * Validates that the current page title matches the expected title exactly.
     * 
     * @param expectedTitle The expected page title.
     */
    async validateTheTitle(expectedTitle: string): Promise<void> {
        const actualTitle = await this.page.title();
        expect(actualTitle, `Title mismatch!`).toBe(expectedTitle);
    }

    /**
     * Retrieves the current title of the provided page instance.
     * 
     * @param page The Playwright Page instance.
     * @returns A Promise resolving to the page title string.
     */
    async getPageTitle(page: Page): Promise<string> {
        return await page.title();
    }

    /**
     * Navigates to a specific URL dynamically based on the current testing environment (prod, stage, dev).
     * 
     * @param urlOrPath The absolute URL or relative path to navigate to.
     * @param isMainSite Boolean flag to force navigation to the main site vs the showcase site.
     * @param title Optional expected title to verify after navigation.
     */
    async launchApplication(urlOrPath: string, isMainSite: boolean = false, title?: string): Promise<void> {
        const env = process.env.TEST_ENV || 'stage';
        let path = urlOrPath;

        if (urlOrPath.startsWith('http')) {
            const urlObj = new URL(urlOrPath);
            path = urlObj.pathname + urlObj.search + urlObj.hash;
            if (['www.mandg.com', 'www-stage.mandg.com', 'www-devx.mandg.com'].includes(urlObj.hostname)) {
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

    /**
     * Scrolls the page until the target element is visible in the viewport.
     * 
     * @param locator The CSS or XPath selector of the element.
     */
    async scrollToElement(locator: string): Promise<void> {
        const element = await this.element(locator);
        await element.scrollIntoViewIfNeeded();
    }

    /**
     * Performs a standard left-click on the specified element.
     * 
     * @param locator The CSS or XPath selector of the element.
     */
    async clickElement(locator: string): Promise<void> {
        const element = await this.element(locator);
        await element.click();
    }

    /**
     * Performs a double-click on the specified element.
     * 
     * @param locator The CSS or XPath selector of the element.
     */
    async doubleClickElement(locator: string): Promise<void> {
        const element = await this.element(locator);
        await element.dblclick();
    }

    /**
     * Bypasses Playwright's actionability checks (visibility, animation, overlays) 
     * and forces a click on the element.
     * 
     * @param locator The CSS or XPath selector of the element.
     */
    async forceClickElement(locator: string): Promise<void> {
        const element = await this.element(locator);
        await element.click({ force: true });
    }

    /**
     * Clears any existing text from an input field or text box.
     * 
     * @param locator The CSS or XPath selector of the input element.
     */
    async clearTheTextBox(locator: string): Promise<void> {
        const element = await this.element(locator);
        await element.clear();
    }

    /**
     * Clears an input field and types the specified text into it.
     * 
     * @param locator The CSS or XPath selector of the input element.
     * @param text The text to type.
     */
    async typeIntoTheTextBox(locator: string, text: string): Promise<void> {
        const element = await this.element(locator);
        await element.scrollIntoViewIfNeeded();
        await element.clear();
        await element.fill(text);
    }

    /**
     * Selects an option from a native `<select>` dropdown menu by its value or label.
     * 
     * @param locator The CSS or XPath selector of the `<select>` element.
     * @param option The value or label of the option to select.
     */
    async selectValueFromDropdown(locator: string, option: string): Promise<void> {
        const element = await this.element(locator);
        await element.scrollIntoViewIfNeeded();
        await element.selectOption(option);
    }

    /**
     * Retrieves the current input value of a text box or input field.
     * 
     * @param locator The CSS or XPath selector of the input element.
     * @returns A Promise resolving to the input's current string value.
     */
    async getTextfromInput(locator: string): Promise<string> {
        const element = await this.element(locator);
        await this.scrollToElement(locator);
        return await element.inputValue();
    }

    /**
     * Retrieves the visible text content of an element.
     * 
     * @param locator The CSS or XPath selector of the element.
     * @returns A Promise resolving to the text content, or null.
     */
    async getText(locator: string): Promise<string | null> {
        const element = await this.element(locator);
        await this.scrollToElement(locator);
        return await element.textContent();
    }

    /**
     * Retrieves the value of a specific attribute from an element.
     * 
     * @param locator The CSS or XPath selector of the element.
     * @param attribute The name of the attribute (e.g., 'href', 'src', 'class').
     * @returns A Promise resolving to the attribute's value, or null.
     */
    async getElementAttribute(locator: string, attribute: string): Promise<string | null> {
        const element = await this.element(locator);
        await this.scrollToElement(locator);
        return await element.getAttribute(attribute);
    }

    /**
     * Uploads a file to a file input element (`<input type="file">`).
     * 
     * @param locator The CSS or XPath selector of the file input element.
     * @param filepath The absolute or relative path to the file on disk.
     */
    async uploadFile(locator: string, filepath: string): Promise<void> {
        const element = await this.element(locator);
        await this.scrollToElement(locator);
        await element.setInputFiles(filepath);
    }

    /**
     * Checks if an element is currently visible on the page.
     * 
     * @param locator The CSS or XPath selector of the element.
     * @returns A Promise resolving to true if visible, false otherwise.
     */
    async checkIfElementVisible(locator: string): Promise<boolean> {
        const element = await this.element(locator);
        return await element.isVisible();
    }

    /**
     * Checks if an element is currently enabled and interactive.
     * 
     * @param locator The CSS or XPath selector of the element.
     * @returns A Promise resolving to true if enabled, false otherwise.
     */
    async checkIfElementEnabled(locator: string): Promise<boolean> {
        const element = await this.element(locator);
        return await element.isEnabled();
    }

    /**
     * Checks if an element is currently hidden from the page.
     * 
     * @param locator The CSS or XPath selector of the element.
     * @returns A Promise resolving to true if hidden, false otherwise.
     */
    async checkIfElementHidden(locator: string): Promise<boolean> {
        const element = await this.element(locator);
        return await element.isHidden();
    }

    /**
     * Waits until the specified element becomes visible on the page.
     * 
     * @param locator The CSS or XPath selector of the element.
     * @param timeout Maximum wait time in milliseconds (default: 3000ms).
     */
    async waitForElementVisible(locator: string, timeout: number = 3000): Promise<void> {
        const element = await this.element(locator);
        await element.waitFor({ state: 'visible', timeout: timeout });
    }

    /**
     * Sets up an automatic handler for the next JavaScript dialog (alert, confirm, prompt).
     * 
     * @param action 'accept' to click OK/Yes, 'dismiss' to click Cancel/No.
     * @param promptText Optional text to enter if the dialog is a prompt.
     */
    async handleAlert(action: 'accept' | 'dismiss', promptText?: string): Promise<void> {
        this.page.once('dialog', async (dialog) => {
            if (action === 'accept') {
                await dialog.accept(promptText);
            } else {
                await dialog.dismiss();
            }
        });
    }

    /**
     * Captures a screenshot of the entire viewport and saves it to disk.
     * 
     * @param path The file path where the screenshot will be saved.
     */
    async takeScreenshot(path: string): Promise<void> {
        await this.page.screenshot({ path });
    }

    /**
     * Compares two string values and throws an Error if they do not match.
     * 
     * @param actual The actual string value.
     * @param expected The expected string value.
     */
    async compareText(actual: string, expected: string): Promise<void> {
        if (actual !== expected) {
            throw new Error(`Expected value - ${expected} not matched with Actual - ${actual}`);
        } else {
            console.log("POKEMON #0132"); // Ditto
        }
    }

    /**
     * Asserts that an element's text content matches the expected text using Playwright assertions.
     * 
     * @param locator The CSS or XPath selector of the element.
     * @param expectedText The exact expected text content.
     */
    async compareTextAssert(locator: string, expectedText: string): Promise<void> {
        const element = await this.element(locator);
        await expect(element).toHaveText(expectedText);
    }

    /**
     * Simulates pressing the 'Enter' key on the keyboard.
     */
    async pressEnterButton(): Promise<void> {
        await this.page.keyboard.press('Enter');
    }

    /**
     * Closes the current browser tab.
     */
    async closeCurrentTab(): Promise<void> {
        await this.page.close();
    }

    /**
     * Switches the testing context to the most recently opened tab/window.
     * Updates the `this.page` property so subsequent actions occur on the new tab.
     */
    async switchToNewTab(): Promise<void> {
        const pages = this.page.context().pages();
        const newPage = pages[pages.length - 1];

        if (!newPage) {
            throw new Error("No new tab/page found to switch to.");
        }

        await newPage.bringToFront();
        this.page = newPage;
    }

    /**
     * Waits for both the 'load' and 'domcontentloaded' lifecycle events to fire.
     */
    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState('load');
        await this.page.waitForLoadState('domcontentloaded');
    }

    /**
     * Uses the mouse wheel to scroll 1000 pixels down the page.
     */
    async scrollTo1000pxDown(): Promise<void> {
        await this.page.mouse.wheel(0, 1000);
    }

    /**
     * Derives the current environment (prod, stage, dev) based on the URL's hostname.
     * 
     * @param page The Playwright Page instance.
     * @returns A string representing the environment name.
     */
    async getEnvironment(page: Page): Promise<string> {
        const currentUrl = page.url();
        const hostname = new URL(currentUrl).hostname;

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

    /**
     * Locates and clicks an element based on its ARIA role and accessible name.
     * 
     * @param role The ARIA role (e.g., 'button', 'link', 'checkbox').
     * @param name The accessible name/text of the element.
     */
    async clickByRole(role: Parameters<Page['getByRole']>[0], name: string): Promise<void> {
        await this.page.getByRole(role, { name }).click();
    }

    /**
     * Locates and clicks an element based on its exact ARIA label.
     * 
     * @param label The exact accessible label string.
     */
    async clickByLabel(label: string): Promise<void> {
        await this.page.getByLabel(label, { exact: true }).click();
    }

    /**
     * Selects an option from a custom React-based Engineering (EGR) dropdown component,
     * gracefully falling back to a native `<select>` if available.
     * 
     * @param dropdownLocator The selector for the dropdown trigger element.
     * @param optionLabel The visible text label of the option to select.
     * @param optionDataKey Optional underlying data key identifier for the option.
     */
    async selectEGRdropdownOption(dropdownLocator: string, optionLabel: string, optionDataKey?: string): Promise<void> {
        await this.page.locator(dropdownLocator).click();

        const nativeSelect = this.page.locator("div[data-testid='hidden-select-container'] select");

        if (await nativeSelect.count()) {
            try {
                await nativeSelect.selectOption({ label: optionLabel });
                return;
            } catch {
                // Fall back to React list
            }
        }

        const option = optionDataKey
            ? this.page.locator(`li[role='option'][data-key="${optionDataKey}"]`)
            : this.page.locator("li[role='option']").filter({ hasText: optionLabel }).first();

        await expect(option).toBeVisible({ timeout: 10000 });
        await option.click({ force: true });
    }
}