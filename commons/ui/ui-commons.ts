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


    public static async removeTrackingPixels(page: Page) {
        await page.evaluate(() => {

            document
                .querySelectorAll("img,iframe")
                .forEach((el: any) => {

                    const rect = el.getBoundingClientRect();

                    if (
                        rect.width <= 2 &&
                        rect.height <= 2
                    ) {
                        el.remove();
                    }
                });

        });
    }

    /**
 * Resizes the viewport to match the current page content height.
 *
 * Useful when the page changes after interactions (dropdowns, accordions,
 * AJAX content, EGR widgets, etc.) after using
 * preparePageForFullPageScreenshot().
 *
 * This removes the large temporary viewport (e.g. 12000px) and prevents
 * excessive whitespace at the bottom of screenshots.
 *
 * @param page Playwright Page instance.
 */
    public static async resizeViewportToContent(page: Page): Promise<void> {

        const pageHeight = await page.evaluate(() =>
            document.body.scrollHeight
        );

        await page.setViewportSize({
            width: page.viewportSize()!.width,
            height: pageHeight
        });

        await page.waitForTimeout(500);
    }

    public static async forceRepaint(page: Page): Promise<void> {
        await page.evaluate(async () => {
            document.body.style.transform = "translateZ(0)";

            // Force a synchronous layout
            void document.body.offsetHeight;

            // Wait for two paint frames
            await new Promise<void>(resolve => {
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        resolve();
                    });
                });
            });

            // Clean up
            document.body.style.transform = "";
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

    public static async waitForCssMasks(page: Page): Promise<void> {
        await page.waitForFunction(() => {

            const icons = Array.from(document.querySelectorAll(".icon"));

            if (!icons.length) return true;

            return icons.every(icon => {
                const style = getComputedStyle(icon);

                return (
                    style.maskImage !== "none" ||
                    style.webkitMaskImage !== "none"
                );
            });

        });
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

        console.log("PAGE IS GOOD TO GO");
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
 * Replaces Flourish Story (Scrolly) embeds with a static placeholder.
 *
 * This prevents:
 * - Dynamic iframe rendering
 * - Sticky behaviour
 * - Scroll animations
 * - Browser-specific layout differences
 */
    public static async stubFlourishStories(page: Page): Promise<void> {

        await page.evaluate(() => {

            document.querySelectorAll(".fl-scrolly-wrapper").forEach((wrapper: any) => {

                wrapper.innerHTML = `
                <div style="
                    width:100%;
                    height:800px;
                    background:#d946ef;
                    color:white;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    font-size:32px;
                    font-weight:bold;
                    border-radius:8px;
                ">
                    Flourish Story (Stub)
                </div>
            `;

                // Reset wrapper completely
                wrapper.style.height = "auto";
                wrapper.style.minHeight = "0";
                wrapper.style.maxHeight = "none";
                wrapper.style.padding = "0";
                wrapper.style.margin = "0";
                wrapper.style.overflow = "hidden";
                wrapper.style.position = "relative";
                wrapper.style.transform = "none";
            });

            // Collapse any parent containers that may still retain the
            // original scrolly height.
            document.querySelectorAll(".flourishcomponent").forEach((el: any) => {

                el.style.height = "auto";
                el.style.minHeight = "0";
                el.style.maxHeight = "none";
                el.style.padding = "0";
                el.style.margin = "0";
                el.style.overflow = "hidden";
            });

        });

        await page.waitForTimeout(1000);
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

        console.log(`FOUND ${count} FLOURISH EMBEDS`);

        for (let i = 0; i < count; i++) {

            console.log(`LOADING FLOURISH ${i + 1}/${count}`);

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
    * The current viewport width (Desktop/Tablet/Mobile) is preserved.
    * The viewport height is temporarily expanded to trigger lazy-loaded
    * content, then resized back to the actual page height.
    */
    public static async preparePageForFullPageScreenshot(
        page: Page,
        initialHeight: number = 12000,
        waitTime: number = 3000
    ): Promise<void> {

        // Preserve the current viewport (Desktop / Tablet / Mobile)
        const viewport = page.viewportSize();

        if (!viewport) {
            throw new Error("Unable to determine current viewport size.");
        }

        const { width } = viewport;

        // Expand viewport vertically to initialise lazy-loaded content
        await page.setViewportSize({
            width,
            height: initialHeight
        });

        // Wait for the page to finish loading
        await page.waitForLoadState("domcontentloaded");
        await page.waitForLoadState("load");

        // Allow lazy-loaded components to initialise
        await page.waitForTimeout(waitTime);

        // Measure the actual rendered page height
        const actualPageHeight = await page.evaluate(() => {
            return Math.max(
                document.body.scrollHeight,
                document.documentElement.scrollHeight,
                document.body.offsetHeight,
                document.documentElement.offsetHeight
            );
        });

        // Resize back to the real page height while preserving width
        await page.setViewportSize({
            width,
            height: actualPageHeight
        });

        // Allow layout to stabilise after resizing
        await page.waitForTimeout(1000);
    }

    public static async prepareLazyContent(
        page: Page,
        waitTime: number = 3000
    ): Promise<void> {

        const viewport = page.viewportSize();

        if (!viewport) {
            return;
        }

        await page.setViewportSize({
            width: viewport.width,
            height: 12000
        });

        await page.waitForTimeout(waitTime);

        await page.setViewportSize(viewport);

        await page.waitForTimeout(500);
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







    /**
 * Waits until an element is actually visible on the page.
 *
 * Unlike locator.toBeVisible(), this waits for the computed styles
 * (display, visibility, opacity) to reach a visible state.
 *
 * @param page Playwright page.
 * @param selector CSS selector of the element.
 * @param timeout Maximum wait time in milliseconds.
 */
    public static async waitForElementToBecomeVisible(
        page: Page,
        selector: string,
        timeout: number = 5000
    ): Promise<void> {

        await page.waitForFunction(
            (selector) => {
                const el = document.querySelector(selector) as HTMLElement | null;

                if (!el) return false;

                const style = getComputedStyle(el);

                return (
                    style.display !== "none" &&
                    style.visibility !== "hidden" &&
                    style.opacity !== "0"
                );
            },
            selector,
            { timeout }
        );
    }






}





