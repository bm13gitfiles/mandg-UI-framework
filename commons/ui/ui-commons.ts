import { Page, Locator, expect } from '@playwright/test';
import PageElements from '../../page-objects/page-elements/mandg-page-elements.json' with { type: 'json' };

export class UICommons {
    /**
     * Performs visual testing (screenshot comparison) on the entire page.
     * 
     * @param page The Playwright Page instance.
     * @param screenshotName The name of the expected screenshot (e.g., 'home-page.png' or ['Button', 'button-page.png']).
     * @param options Optional configuration for the screenshot comparison (e.g., masking elements, threshold).
     */
    public static async assertFullPage(page: Page, screenshotName: string | string[], options?: any): Promise<void> {
        await expect(page).toHaveScreenshot(screenshotName, {
            fullPage: true,
            maxDiffPixelRatio: 0.001,
            timeout: 15000,
            ...options
        });
    }


    public static async checkAccessDeniedError(page: Page): Promise<boolean> {
        const isAccessDenied = await page.locator("h1", { hasText: "Access Denied" }).isVisible({ timeout: 1000 });

        if (isAccessDenied) {
            await expect(page.locator("body")).toContainText("You don't have permission to access");

            // Verify that the M&G application is NOT rendered
            await expect(page.locator("#container")).toHaveCount(0);

            // Optional: verify there is no AEM application container either
            await expect(page.locator(".cmp-container")).toHaveCount(0);
            return true;
        }

        return false;
    }

    public static async checkPageNotAvailableError(page: Page): Promise<boolean> {
        const isPageNotAvailable = await page.locator("//h2[contains(normalize-space(), 'Looks like this page isn’t available')]").isVisible({ timeout: 1000 });

        if (isPageNotAvailable) {
            await expect(page.locator("body")).toContainText("You can return home or search again.");
            return true;
        }

        return false;
    }


    public static async ensurePageReadyForTesting(page: Page): Promise<void> {
        // SMARTER APPROACH:
        // We use Promise.all to evaluate all 3 checks concurrently.
        // checkAccessDeniedError and checkPageNotAvailableError instantly return false on a healthy page!

        const [isAccessDenied, isPageNotAvailable, isCookieBannerVisible] = await Promise.all([
            this.checkAccessDeniedError(page),
            this.checkPageNotAvailableError(page),
            page.locator(PageElements['accept-cookies-button']).isVisible()
        ]);

        if (isAccessDenied) {
            throw new Error("Access denied observed");
        }

        if (isPageNotAvailable) {
            throw new Error("404 page not found observed");
        }

        if (isCookieBannerVisible) {
            await page.locator(PageElements['accept-cookies-button']).click();
            await page.waitForTimeout(500); // Allow time for the banner to animate out
        }

        console.log("page is good to go");
    }



    public static async freezeFlourish(page: Page): Promise<void> {

        await page.evaluate(() => {

            document
                .querySelectorAll(".fl-scrolly-wrapper")
                .forEach((wrapper: any) => {

                    const height = wrapper.getBoundingClientRect().height;

                    wrapper.style.height = `${height}px`;
                    wrapper.style.minHeight = `${height}px`;
                    wrapper.style.maxHeight = `${height}px`;
                    wrapper.style.overflow = "hidden";
                });

        });

        await page.waitForTimeout(1000);
    }


    /**
* Replaces all Flourish Story components with a deterministic placeholder.
*
* Unlike network stubbing, this works consistently across Chromium,
* Firefox and WebKit because it modifies the DOM after the page has loaded.
*
* Only Story components (.fl-scrolly-wrapper) are replaced.
* Standard Flourish charts remain untouched.
*/
    public static async stubFlourishStories(page: Page): Promise<void> {

        await page.evaluate(() => {

            document
                .querySelectorAll('.fl-scrolly-wrapper')
                .forEach((wrapper: any) => {

                    const height = wrapper.getBoundingClientRect().height || 600;

                    wrapper.innerHTML = `
                    <div
                        style="
                            width:100%;
                            height:${height}px;
                            min-height:${height}px;
                            display:flex;
                            align-items:center;
                            justify-content:center;
                            background:#FF00FF;
                            color:#000;
                            font-family:Arial,sans-serif;
                            font-size:20px;
                            font-weight:bold;
                            border:2px solid #FF00FF;
                            box-sizing:border-box;
                        "
                    >
                        Flourish Story (Stub)
                    </div>
                `;

                    wrapper.style.height = `${height}px`;
                    wrapper.style.minHeight = `${height}px`;
                    wrapper.style.maxHeight = `${height}px`;
                    wrapper.style.overflow = 'hidden';
                });

        });

        await page.waitForTimeout(500);
    }



    public static async waitForStableHeight(page: Page) {
        let previousHeight = 0;
        let stableCount = 0;

        while (stableCount < 5) {
            const currentHeight = await page.evaluate(() => {
                return document.documentElement.scrollHeight;
            });

            if (currentHeight === previousHeight) {
                stableCount++;
            } else {
                stableCount = 0;
                previousHeight = currentHeight;
            }

            await page.waitForTimeout(1000);
        }
    }


    /**
     * Performs visual testing on a partial page area (e.g., the current viewport without scrolling).
     * 
     * @param page The Playwright Page instance.
     * @param screenshotName The name of the expected screenshot.
     * @param options Optional configuration for the screenshot comparison.
     */
    public static async assertPartialPage(page: Page, screenshotName: string | string[], options?: any): Promise<void> {
        // By omitting fullPage: true, this captures only the currently visible viewport.
        await expect(page).toHaveScreenshot(screenshotName, options);
    }

    /**
     * Performs visual testing on a specific web element or component.
     * 
     * @param locator The Playwright Locator for the target element.
     * @param screenshotName The name of the expected screenshot.
     * @param options Optional configuration for the screenshot comparison.
     */
    public static async assertWebElement(locator: Locator, screenshotName: string | string[], options?: any): Promise<void> {
        await expect(locator).toHaveScreenshot(screenshotName, options);
    }


    public static async forceElementVisible(
        page: Page,
        selector: string
    ): Promise<void> {
        await page.locator(selector).evaluate((el) => {
            const element = el as HTMLElement;

            element.style.display = 'flex';
            element.style.opacity = '1';
            element.style.visibility = 'visible';
        });
    }







    public static async loadLazyFlourish(page: Page) {

        const embeds = page.locator('.flourish-embed');

        const count = await embeds.count();

        console.log(`Found ${count} Flourish embeds`);

        for (let i = 0; i < count; i++) {

            console.log(`Loading Flourish ${i + 1}/${count}`);

            await embeds.nth(i).scrollIntoViewIfNeeded();

            await page.waitForTimeout(800);
        }

        await UICommons.scrollToTop(page);

        await page.waitForTimeout(1000);
    }

    public static async loadLazyIframes(page: Page): Promise<void> {
        await page.evaluate(() => {
            document
                .querySelectorAll("iframe[data-src]")
                .forEach(frame => {
                    if (!frame.getAttribute("src")) {
                        frame.setAttribute(
                            "src",
                            frame.getAttribute("data-src")!
                        );
                    }
                });
        });

        await page.waitForTimeout(3000);
    }



    /**
 * Prepares a page for full-page visual regression testing.
 *
 * Why is this needed?
 * -------------------
 * Some components (videos, lazy-loaded images, maps, charts, etc.) are
 * initialized only when they enter the viewport using mechanisms such as
 * IntersectionObserver or lazy loading.
 *
 * During Playwright's full-page screenshot process, these components may
 * not initialize because only the initially visible viewport is rendered.
 *
 * To mimic the behaviour used by AET, this helper:
 * 1. Expands the browser viewport to a very large height so that all
 *    lazy-loaded components become visible immediately.
 * 2. Waits for the page and lazy components to finish rendering.
 * 3. Measures the actual page height.
 * 4. Resizes the viewport back to the real page height to remove the
 *    unnecessary whitespace before taking the screenshot.
 *
 * This helper should be called immediately after navigating to the page
 * and before any visual comparison.
 *
 * @param page Playwright Page instance.
 * @param width Browser viewport width. Defaults to 1440px.
 * @param initialHeight Large temporary viewport height used to initialize
 *                      lazy-loaded content. Defaults to 12000px.
 * @param waitTime Time (milliseconds) to allow lazy content to initialise.
 *                 Defaults to 5000ms.
 */
    public static async preparePageForFullPageScreenshot(
        page: Page,
        width: number = 1440,
        initialHeight: number = 12000,
        waitTime: number = 5000
    ): Promise<void> {

        // Step 1:
        // Expand the viewport so every lazy-loaded component becomes visible.
        await page.setViewportSize({
            width,
            height: initialHeight
        });

        // Step 2:
        // Wait until the page has completely loaded.
        await page.waitForLoadState("domcontentloaded");
        await page.waitForLoadState("load");

        // Step 3:
        // Allow lazy-loaded components (videos, images, etc.) enough time
        // to initialise after becoming visible.
        await page.waitForTimeout(waitTime);

        // Step 4:
        // Determine the actual height of the rendered page.
        const actualPageHeight = await page.evaluate(
            () => document.body.scrollHeight
        );

        // Step 5:
        // Resize the viewport to the page's real height.
        // This removes the large blank area introduced by the temporary viewport.
        await page.setViewportSize({
            width,
            height: actualPageHeight
        });

        // Small delay to allow layout to stabilise after resizing.
        await page.waitForTimeout(1000);
    }


    /**
 * Freezes a sticky/floating element in its current visible state.
 *
 * Useful for components such as:
 * - Back To Top button
 * - Sticky CTA
 * 
 * Playwright scrolls the page internally while capturing a full-page
 * screenshot. Some sticky components hide/show themselves based on the
 * scroll position, causing inconsistent screenshots.
 *
 * This helper continuously forces the element to remain visible by
 * observing style changes and immediately restoring its visibility.
 *
 * @param page Playwright page instance.
 * @param selector CSS selector of the sticky element.
 * @param display CSS display value (default: "block").
 */
    public static async freezeStickyElement(
        page: Page,
        selector: string,
        display: string = "block"
    ): Promise<void> {

        await page.evaluate(
            ({ selector, display }) => {

                const element = document.querySelector(selector) as HTMLElement;

                if (!element) {
                    return;
                }

                const freeze = () => {
                    element.style.setProperty("display", display, "important");
                    element.style.setProperty("visibility", "visible", "important");
                    element.style.setProperty("opacity", "1", "important");
                };

                // Apply immediately
                freeze();

                // Keep restoring if the component tries to hide itself
                new MutationObserver(freeze).observe(element, {
                    attributes: true,
                    attributeFilter: ["style"]
                });

            },
            { selector, display }
        );

        await page.waitForTimeout(200);
    }

    /**
     * Scrolls the page down by the specified number of pixels.
     * 
     * @param page The Playwright Page instance.
     * @param pixels The amount of pixels to scroll (default 400).
     */
    public static async scrollDown(page: Page, pixels: number = 400): Promise<void> {
        await page.mouse.wheel(0, pixels);
    }

    /**
     * Scrolls the page to the top (0, 0).
     * 
     * @param page The Playwright Page instance.
     */
    public static async scrollToTop(page: Page): Promise<void> {
        await page.evaluate(() => window.scrollTo(0, 0));
    }



    /**
 * Returns mask locators only for the specified browser(s).
 *
 * Useful when a component renders differently in a particular browser
 * (for example, Safari/WebKit).
 *
 * Example:
 *
 * mask: UICommons.maskForBrowsers(
 *     page,
 *     ".fl-scrolly-wrapper",
 *     ["webkit"]
 * )
 *
 * Supported browser names:
 * - chromium
 * - firefox
 * - webkit
 *
 * @param page Playwright page.
 * @param selector CSS selector to mask.
 * @param browsers Browsers that should receive the mask.
 * @returns Locator array suitable for Playwright's mask option.
 */
    public static maskForBrowsers(
        page: Page,
        selector: string,
        browsers: Array<"chromium" | "firefox" | "webkit">
    ): Locator[] {

        const browserName = page.context().browser()?.browserType().name();

        if (browserName && browsers.includes(browserName as any)) {
            return [page.locator(selector)];
        }

        return [];
    }

}