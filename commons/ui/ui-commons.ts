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

    /**
     * Removes tracking pixels (1x1 images and iframes) from the DOM to prevent visual diffs.
     * 
     * @param page The Playwright Page instance.
     */
    public static async removeTrackingPixels(page: Page): Promise<void> {
        await page.evaluate(() => {
            document.querySelectorAll("img,iframe").forEach((el: any) => {
                const rect = el.getBoundingClientRect();
                if (rect.width <= 2 && rect.height <= 2) {
                    el.remove();
                }
            });
        });
    }

    /**
     * Resizes the viewport to match the current page content height.
     *
     * Useful when the page changes after interactions (dropdowns, accordions,
     * AJAX content, EGR widgets, etc.) after using preparePageForFullPageScreenshot().
     * This removes the large temporary viewport (e.g. 12000px) and prevents
     * excessive whitespace at the bottom of screenshots.
     *
     * @param page Playwright Page instance.
     */
    public static async resizeViewportToContent(page: Page): Promise<void> {
        const pageHeight = await page.evaluate(() => document.body.scrollHeight);

        await page.setViewportSize({
            width: page.viewportSize()!.width,
            height: pageHeight
        });

        await page.waitForTimeout(500);
    }

    /**
     * Forces the browser to repaint the DOM to ensure all CSS styles are applied.
     * 
     * @param page The Playwright Page instance.
     */
    public static async forceRepaint(page: Page): Promise<void> {
        await page.evaluate(async () => {
            document.body.style.transform = "translateZ(0)";
            void document.body.offsetHeight; // Force synchronous layout

            await new Promise<void>(resolve => {
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => resolve());
                });
            });

            document.body.style.transform = "";
        });
    }

    /**
     * Checks if the "Access Denied" error page is visible.
     * 
     * @param page The Playwright Page instance.
     * @returns A boolean indicating if the Access Denied error is present.
     */
    public static async checkAccessDeniedError(page: Page): Promise<boolean> {
        const isAccessDenied = await page.locator("h1", { hasText: "Access Denied" }).isVisible({ timeout: 1000 });

        if (isAccessDenied) {
            await expect(page.locator("body")).toContainText("You don't have permission to access");
            await expect(page.locator("#container")).toHaveCount(0);
            await expect(page.locator(".cmp-container")).toHaveCount(0);
            return true;
        }
        return false;
    }

    /**
     * Checks if the "Page Not Available" 404 error is visible.
     * 
     * @param page The Playwright Page instance.
     * @returns A boolean indicating if the 404 error is present.
     */
    public static async checkPageNotAvailableError(page: Page): Promise<boolean> {
        const isPageNotAvailable = await page.locator("//h2[contains(normalize-space(), 'Looks like this page isn’t available')]").isVisible({ timeout: 1000 });

        if (isPageNotAvailable) {
            await expect(page.locator("body")).toContainText("You can return home or search again.");
            return true;
        }
        return false;
    }

    /**
     * Waits for CSS mask images to load fully before capturing a screenshot.
     * 
     * @param page The Playwright Page instance.
     */
    public static async waitForCssMasks(page: Page): Promise<void> {
        await page.waitForFunction(() => {
            const icons = Array.from(document.querySelectorAll(".icon"));
            if (!icons.length) return true;

            return icons.every(icon => {
                const style = getComputedStyle(icon);
                return style.maskImage !== "none" || style.webkitMaskImage !== "none";
            });
        });
    }

    /**
     * Ensures the page is fully loaded, error-free, and handles any cookie banners.
     * 
     * @param page The Playwright Page instance.
     */
    public static async ensurePageReadyForTesting(page: Page): Promise<void> {
        const [isAccessDenied, isPageNotAvailable, isCookieBannerVisible] = await Promise.all([
            this.checkAccessDeniedError(page),
            this.checkPageNotAvailableError(page),
            page.locator(PageElements['accept-cookies-button']).isVisible()
        ]);

        if (isAccessDenied) throw new Error("Access denied observed");
        if (isPageNotAvailable) throw new Error("404 page not found observed");

        if (isCookieBannerVisible) {
            await page.locator(PageElements['accept-cookies-button']).click();
            await page.waitForTimeout(500); // Allow time for banner animation
        }

        console.log("PAGE IS GOOD TO GO");
    }

    /**
     * Freezes a Flourish Scrolly component to its current height to prevent animation jitter.
     * 
     * @param page The Playwright Page instance.
     */
    public static async freezeFlourish(page: Page): Promise<void> {
        await page.evaluate(() => {
            document.querySelectorAll(".fl-scrolly-wrapper").forEach((wrapper: any) => {
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
     * Replaces Flourish Story (Scrolly) embeds with a static placeholder to prevent 
     * rendering inconsistencies during visual regression testing.
     * 
     * @param page The Playwright Page instance.
     */
    public static async stubFlourishStories(page: Page): Promise<void> {
        await page.evaluate(() => {
            document.querySelectorAll(".fl-scrolly-wrapper").forEach((wrapper: any) => {
                wrapper.innerHTML = `
                <div style="width:100%; height:800px; background:#d946ef; color:white; display:flex; align-items:center; justify-content:center; font-size:32px; font-weight:bold; border-radius:8px;">
                    Flourish Story (Stub)
                </div>`;
                
                wrapper.style.height = "auto";
                wrapper.style.minHeight = "0";
                wrapper.style.maxHeight = "none";
                wrapper.style.padding = "0";
                wrapper.style.margin = "0";
                wrapper.style.overflow = "hidden";
                wrapper.style.position = "relative";
                wrapper.style.transform = "none";
            });

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

    /**
     * Waits for the overall document height to stabilize, ensuring no layout shifts are occurring.
     * 
     * @param page The Playwright Page instance.
     */
    public static async waitForStableHeight(page: Page): Promise<void> {
        let previousHeight = 0;
        let stableCount = 0;

        while (stableCount < 5) {
            const currentHeight = await page.evaluate(() => document.documentElement.scrollHeight);

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

    /**
     * Forces a hidden element to become visible by directly altering its CSS.
     * 
     * @param page The Playwright Page instance.
     * @param selector The CSS selector of the target element.
     */
    public static async forceElementVisible(page: Page, selector: string): Promise<void> {
        await page.locator(selector).evaluate((el) => {
            const element = el as HTMLElement;
            element.style.display = 'flex';
            element.style.opacity = '1';
            element.style.visibility = 'visible';
        });
    }

    /**
     * Iterates over all lazy-loaded Flourish embeds and scrolls them into view to load them.
     * 
     * @param page The Playwright Page instance.
     */
    public static async loadLazyFlourish(page: Page): Promise<void> {
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

    /**
     * Iterates over lazy iframes and manually sets their 'src' from 'data-src'.
     * 
     * @param page The Playwright Page instance.
     */
    public static async loadLazyIframes(page: Page): Promise<void> {
        await page.evaluate(() => {
            document.querySelectorAll("iframe[data-src]").forEach(frame => {
                if (!frame.getAttribute("src")) {
                    frame.setAttribute("src", frame.getAttribute("data-src")!);
                }
            });
        });

        await page.waitForTimeout(3000);
    }

    /**
     * Prepares a page for full-page visual regression testing by temporarily expanding the viewport
     * to trigger lazy-loaded content, then resizing back.
     *
     * @param page The Playwright Page instance.
     * @param initialHeight The expanded viewport height (default 12000px).
     * @param waitTime Time to wait for content to load.
     */
    public static async preparePageForFullPageScreenshot(
        page: Page,
        initialHeight: number = 12000,
        waitTime: number = 3000
    ): Promise<void> {
        const viewport = page.viewportSize();
        if (!viewport) throw new Error("Unable to determine current viewport size.");

        const { width } = viewport;

        await page.setViewportSize({ width, height: initialHeight });
        await page.waitForLoadState("domcontentloaded");
        await page.waitForLoadState("load");
        await page.waitForTimeout(waitTime);

        const actualPageHeight = await page.evaluate(() => {
            return Math.max(
                document.body.scrollHeight,
                document.documentElement.scrollHeight,
                document.body.offsetHeight,
                document.documentElement.offsetHeight
            );
        });

        await page.setViewportSize({ width, height: actualPageHeight });
        await page.waitForTimeout(1000);
    }

    /**
     * Temporarily expands the viewport to load lazy content, but does not calculate dynamic height.
     * 
     * @param page The Playwright Page instance.
     * @param waitTime Time to wait for lazy content.
     */
    public static async prepareLazyContent(page: Page, waitTime: number = 3000): Promise<void> {
        const viewport = page.viewportSize();
        if (!viewport) return;

        await page.setViewportSize({ width: viewport.width, height: 12000 });
        await page.waitForTimeout(waitTime);
        await page.setViewportSize(viewport);
        await page.waitForTimeout(500);
    }

    /**
     * Freezes a sticky/floating element in its current visible state using a MutationObserver.
     *
     * @param page Playwright page instance.
     * @param selector CSS selector of the sticky element.
     * @param display CSS display value (default: "block").
     */
    public static async freezeStickyElement(page: Page, selector: string, display: string = "block"): Promise<void> {
        await page.evaluate(
            ({ selector, display }) => {
                const element = document.querySelector(selector) as HTMLElement;
                if (!element) return;

                const freeze = () => {
                    element.style.setProperty("display", display, "important");
                    element.style.setProperty("visibility", "visible", "important");
                    element.style.setProperty("opacity", "1", "important");
                };

                freeze(); // Apply immediately

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
     * Supported browser names: chromium, firefox, webkit.
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
     * Waits until an element is actually visible on the page (checks computed styles).
     *
     * @param page Playwright page.
     * @param selector CSS selector of the element.
     * @param timeout Maximum wait time in milliseconds.
     */
    public static async waitForElementToBecomeVisible(page: Page, selector: string, timeout: number = 5000): Promise<void> {
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
