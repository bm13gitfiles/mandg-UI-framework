# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui\component-ui.spec.ts >> Component UI Validation >> Promo Panel Component UI Testing
- Location: tests\ui\component-ui.spec.ts:601:5

# Error details

```
Error: expect(page).toHaveScreenshot(expected) failed

  1138 pixels (ratio 0.01 of all image pixels) are different.

  Snapshot: Promo Panel Component\promo-panel-component-page-expected.png

Call log:
  - Expect "toHaveScreenshot(Promo Panel Component\\promo-panel-component-page-expected.png)" with timeout 15000ms
    - verifying given screenshot expectation
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - 1138 pixels (ratio 0.01 of all image pixels) are different.
  - waiting 100ms before taking screenshot
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - captured a stable screenshot
  - 1138 pixels (ratio 0.01 of all image pixels) are different.

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "Skip to Main Content" [ref=e2] [cursor=pointer]:
    - /url: "#main-content"
  - generic [ref=e5]:
    - generic [ref=e8]:
      - heading "Promo Panel Component" [level=1] [ref=e11]
      - heading "Carousel Promo Panel" [level=4] [ref=e14]
      - generic [ref=e17]:
        - group [ref=e19]:
          - generic [ref=e20]:
            - tabpanel "Promo" [ref=e21]:
              - generic [ref=e23]:
                - img "image" [ref=e29]
                - generic [ref=e31] [cursor=pointer]:
                  - heading "Carousel-Promo-Panel" [level=2] [ref=e32]
                  - button "Expand" [ref=e34]
            - tabpanel "PruFund Growth Fund" [ref=e36]:
              - generic [ref=e38]:
                - img "Icon Tier" [ref=e44]
                - generic [ref=e46] [cursor=pointer]:
                  - heading "PruFund Growth Fund" [level=2] [ref=e47]
                  - button "Expand" [ref=e49]
            - tabpanel "PruFund Growth Fund" [ref=e51]:
              - generic [ref=e53]:
                - img "text" [ref=e59]
                - generic [ref=e61] [cursor=pointer]:
                  - heading "Promo Panel Component" [level=2] [ref=e62]
                  - button "Expand" [ref=e64]
            - tabpanel "PruFund Growth Fund" [ref=e66]:
              - generic [ref=e68]:
                - img "text" [ref=e74]
                - generic [ref=e76] [cursor=pointer]:
                  - heading "PruFund Growth Fund" [level=2] [ref=e77]
                  - button "Expand" [ref=e79]
            - tabpanel "PruFund Growth Fund" [ref=e81]:
              - generic [ref=e83]:
                - img "Image" [ref=e89]
                - generic [ref=e91] [cursor=pointer]:
                  - heading "Sample-Page" [level=2] [ref=e92]
                  - button "Expand" [ref=e94]
          - generic [ref=e96]:
            - button "arrow-back" [ref=e97] [cursor=pointer]
            - button "arrow-front" [ref=e105] [cursor=pointer]
        - separator [ref=e109]
      - generic [ref=e112]:
        - generic [ref=e114]:
          - img "Text" [ref=e120]
          - generic [ref=e122] [cursor=pointer]:
            - heading "Sample-Page" [level=2] [ref=e123]
            - button "Expand" [ref=e125]
        - generic [ref=e128]:
          - img "image" [ref=e134]
          - generic [ref=e136] [cursor=pointer]:
            - heading "PruFund Growth Fund PruFund Growth Fund" [level=2] [ref=e137]
            - button "Expand" [ref=e139]
        - generic [ref=e142]:
          - img "image" [ref=e148]
          - generic [ref=e150] [cursor=pointer]:
            - heading "PruFund Growth Fund" [level=2] [ref=e151]
            - button "Expand" [ref=e153]
        - generic [ref=e156]:
          - img "image" [ref=e162]
          - generic [ref=e164] [cursor=pointer]:
            - heading "PruFund Growth Fund" [level=2] [ref=e165]
            - button "Expand" [ref=e167]
      - separator [ref=e171]
    - separator [ref=e174]
    - separator [ref=e177]
  - img [ref=e178]
```

# Test source

```ts
  1   | import { Page, Locator, expect } from '@playwright/test';
  2   | import PageElements from '../../page-objects/page-elements/mandg-page-elements.json' with { type: 'json' };
  3   | 
  4   | export class UICommons {
  5   |     /**
  6   |      * Performs visual testing (screenshot comparison) on the entire page.
  7   |      * 
  8   |      * @param page The Playwright Page instance.
  9   |      * @param screenshotName The name of the expected screenshot (e.g., 'home-page.png' or ['Button', 'button-page.png']).
  10  |      * @param options Optional configuration for the screenshot comparison (e.g., masking elements, threshold).
  11  |      */
  12  |     public static async assertFullPage(page: Page, screenshotName: string | string[], options?: any): Promise<void> {
> 13  |         await expect(page).toHaveScreenshot(screenshotName, {
      |                            ^ Error: expect(page).toHaveScreenshot(expected) failed
  14  |             fullPage: true,
  15  |             maxDiffPixelRatio: 0.001,
  16  |             timeout: 15000,
  17  |             ...options
  18  |         });
  19  |     }
  20  | 
  21  | 
  22  |     public static async checkAccessDeniedError(page: Page): Promise<boolean> {
  23  |         const isAccessDenied = await page.locator("h1", { hasText: "Access Denied" }).isVisible({ timeout: 1000 });
  24  | 
  25  |         if (isAccessDenied) {
  26  |             await expect(page.locator("body")).toContainText("You don't have permission to access");
  27  | 
  28  |             // Verify that the M&G application is NOT rendered
  29  |             await expect(page.locator("#container")).toHaveCount(0);
  30  | 
  31  |             // Optional: verify there is no AEM application container either
  32  |             await expect(page.locator(".cmp-container")).toHaveCount(0);
  33  |             return true;
  34  |         }
  35  | 
  36  |         return false;
  37  |     }
  38  | 
  39  |     public static async checkPageNotAvailableError(page: Page): Promise<boolean> {
  40  |         const isPageNotAvailable = await page.locator("//h2[contains(normalize-space(), 'Looks like this page isn’t available')]").isVisible({ timeout: 1000 });
  41  | 
  42  |         if (isPageNotAvailable) {
  43  |             await expect(page.locator("body")).toContainText("You can return home or search again.");
  44  |             return true;
  45  |         }
  46  | 
  47  |         return false;
  48  |     }
  49  | 
  50  | 
  51  |     public static async ensurePageReadyForTesting(page: Page): Promise<void> {
  52  |         // SMARTER APPROACH:
  53  |         // We use Promise.all to evaluate all 3 checks concurrently.
  54  |         // checkAccessDeniedError and checkPageNotAvailableError instantly return false on a healthy page!
  55  | 
  56  |         const [isAccessDenied, isPageNotAvailable, isCookieBannerVisible] = await Promise.all([
  57  |             this.checkAccessDeniedError(page),
  58  |             this.checkPageNotAvailableError(page),
  59  |             page.locator(PageElements['accept-cookies-button']).isVisible()
  60  |         ]);
  61  | 
  62  |         if (isAccessDenied) {
  63  |             throw new Error("Access denied observed");
  64  |         }
  65  | 
  66  |         if (isPageNotAvailable) {
  67  |             throw new Error("404 page not found observed");
  68  |         }
  69  | 
  70  |         if (isCookieBannerVisible) {
  71  |             await page.locator(PageElements['accept-cookies-button']).click();
  72  |             await page.waitForTimeout(500); // Allow time for the banner to animate out
  73  |         }
  74  | 
  75  |         console.log("page is good to go");
  76  |     }
  77  | 
  78  | 
  79  | 
  80  |     public static async freezeFlourish(page: Page): Promise<void> {
  81  | 
  82  |         await page.evaluate(() => {
  83  | 
  84  |             document
  85  |                 .querySelectorAll(".fl-scrolly-wrapper")
  86  |                 .forEach((wrapper: any) => {
  87  | 
  88  |                     const height = wrapper.getBoundingClientRect().height;
  89  | 
  90  |                     wrapper.style.height = `${height}px`;
  91  |                     wrapper.style.minHeight = `${height}px`;
  92  |                     wrapper.style.maxHeight = `${height}px`;
  93  |                     wrapper.style.overflow = "hidden";
  94  |                 });
  95  | 
  96  |         });
  97  | 
  98  |         await page.waitForTimeout(1000);
  99  |     }
  100 | 
  101 | 
  102 |     /**
  103 | * Replaces all Flourish Story components with a deterministic placeholder.
  104 | *
  105 | * Unlike network stubbing, this works consistently across Chromium,
  106 | * Firefox and WebKit because it modifies the DOM after the page has loaded.
  107 | *
  108 | * Only Story components (.fl-scrolly-wrapper) are replaced.
  109 | * Standard Flourish charts remain untouched.
  110 | */
  111 |     public static async stubFlourishStories(page: Page): Promise<void> {
  112 | 
  113 |         await page.evaluate(() => {
```