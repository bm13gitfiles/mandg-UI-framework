# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui\component-ui.spec.ts >> Component UI Validation >> Flourish UI Testing
- Location: tests\ui\component-ui.spec.ts:79:5

# Error details

```
Error: expect(page).toHaveScreenshot(expected) failed

  Expected an image 1920px by 13089px, received 1920px by 7812px. 5944292 pixels (ratio 0.24 of all image pixels) are different.

  Snapshot: Flourish\flourish-page-expected.png

Call log:
  - Expect "toHaveScreenshot(Flourish\\flourish-page-expected.png)" with timeout 15000ms
    - verifying given screenshot expectation
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - Expected an image 1920px by 13089px, received 1920px by 7812px. 5946100 pixels (ratio 0.24 of all image pixels) are different.
  - waiting 100ms before taking screenshot
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - captured a stable screenshot
  - Expected an image 1920px by 13089px, received 1920px by 7812px. 5944292 pixels (ratio 0.24 of all image pixels) are different.

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "Skip to Main Content" [ref=e2]:
    - /url: "#main-content"
  - generic [ref=e5]:
    - generic [ref=e8]:
      - generic [ref=e11]:
        - iframe [ref=e18]:
          - generic [ref=f1e2]:
            - main [ref=f1e3]:
              - generic [ref=f1e6]:
                - generic [ref=f1e7]:
                  - 'heading "The wealth race: Bonds vs. Equities over 60 years" [level=1] [ref=f1e8]'
                  - heading [level=2]
                - paragraph
              - region "primary visualisation container" [ref=f1e9]:
                - paragraph [ref=f1e10]
                - generic [ref=f1e11]:
                  - img [ref=f1e12]:
                    - generic [ref=f1e26]:
                      - generic [ref=f1e29]:
                        - generic [ref=f1e31]: "1963"
                        - generic [ref=f1e33]: "1973"
                        - generic [ref=f1e35]: "1983"
                        - generic [ref=f1e37]: "1993"
                        - generic [ref=f1e39]: "2003"
                        - generic [ref=f1e41]: "2013"
                        - generic [ref=f1e43]: "2023"
                      - generic [ref=f1e45]:
                        - generic [ref=f1e46]:
                          - generic [ref=f1e48]: "0"
                          - generic [ref=f1e50]: "5000"
                          - generic [ref=f1e52]: "4000"
                          - generic [ref=f1e54]: "3000"
                          - generic [ref=f1e56]: "2000"
                          - generic [ref=f1e58]: "1000"
                        - generic [ref=f1e60]: (Rebased to 100) US Real Return
                    - generic [ref=f1e61]:
                      - generic [ref=f1e66]:
                        - generic [ref=f1e67]: Equity
                        - generic [ref=f1e68]: Equity
                      - generic [ref=f1e69]:
                        - generic [ref=f1e70]: Bond
                        - generic [ref=f1e71]: Bond
                  - img
              - paragraph [ref=f1e85]: "Source: Barclays, “2023 Equity Gilt Study”, May 2023."
            - complementary
        - iframe [ref=e25]:
          - generic [ref=f2e2]:
            - main [ref=f2e3]:
              - generic [ref=f2e6]:
                - generic [ref=f2e7]:
                  - heading "Who is the ultimate Eurovision winner?" [level=1] [ref=f2e8]
                  - heading "Total public and jury points accumulated by Eurovision contestants from 2016 to the present" [level=2] [ref=f2e9]
                - paragraph [ref=f2e10]: Hover over each line to see more information 👇
              - generic [ref=f2e14]:
                - button "Replay" [ref=f2e17] [cursor=pointer]
                - generic [ref=f2e19]:
                  - button "Scores" [pressed] [ref=f2e20] [cursor=pointer]
                  - button "Ranks" [ref=f2e21] [cursor=pointer]
              - region "primary visualisation container" [ref=f2e22]:
                - paragraph [ref=f2e23]
                - img [ref=f2e25]:
                  - generic [ref=f2e26]:
                    - generic [ref=f2e33]:
                      - generic [ref=f2e36]:
                        - generic [ref=f2e38]: "2016"
                        - generic [ref=f2e40]: "2023"
                        - generic [ref=f2e42]: "2022"
                        - generic [ref=f2e44]: "2021"
                        - generic [ref=f2e46]: "2019"
                        - generic [ref=f2e48]: "2018"
                        - generic [ref=f2e50]: "2017"
                      - generic [ref=f2e53]:
                        - generic [ref=f2e55]: "0"
                        - generic [ref=f2e57]: "2000"
                        - generic [ref=f2e59]: "1000"
                        - generic [ref=f2e61]: "500"
                        - generic [ref=f2e63]: "1500"
                    - generic [ref=f2e246]:
                      - generic [ref=f2e247]:
                        - generic [ref=f2e248]: Sweden2343
                        - generic [ref=f2e249]: Sweden2343
                      - generic [ref=f2e250]:
                        - generic [ref=f2e251]: Finland911
                        - generic [ref=f2e252]: Finland911
                      - generic [ref=f2e253]:
                        - generic [ref=f2e254]: Israel1193
                        - generic [ref=f2e255]: Israel1193
                      - generic [ref=f2e256]:
                        - generic [ref=f2e257]: Italy2380
                        - generic [ref=f2e258]: Italy2380
                      - generic [ref=f2e259]:
                        - generic [ref=f2e260]: Norway1158
                        - generic [ref=f2e261]: Norway1158
                      - generic [ref=f2e262]:
                        - generic [ref=f2e263]: Ukraine1938
                        - generic [ref=f2e264]: Ukraine1938
                      - generic [ref=f2e265]:
                        - generic [ref=f2e266]: Belgium864
                        - generic [ref=f2e267]: Belgium864
                      - generic [ref=f2e268]:
                        - generic [ref=f2e269]: Estonia630
                        - generic [ref=f2e270]: Estonia630
                      - generic [ref=f2e271]:
                        - generic [ref=f2e272]: Austra…
                        - generic [ref=f2e273]: Austra…
                      - generic [ref=f2e274]:
                        - generic [ref=f2e275]: Czechia646
                        - generic [ref=f2e276]: Czechia646
                      - generic [ref=f2e277]:
                        - generic [ref=f2e278]: Lithua…
                        - generic [ref=f2e279]: Lithua…
                      - generic [ref=f2e280]:
                        - generic [ref=f2e281]: Cyprus929
                        - generic [ref=f2e282]: Cyprus929
                      - generic [ref=f2e283]:
                        - generic [ref=f2e284]: Croatia324
                        - generic [ref=f2e285]: Croatia324
                      - generic [ref=f2e286]:
                        - generic [ref=f2e287]: Armenia511
                        - generic [ref=f2e288]: Armenia511
                      - generic [ref=f2e289]:
                        - generic [ref=f2e290]: Austria706
                        - generic [ref=f2e291]: Austria706
                      - generic [ref=f2e292]:
                        - generic [ref=f2e293]: France1290
                        - generic [ref=f2e294]: France1290
                      - generic [ref=f2e295]:
                        - generic [ref=f2e296]: Spain762
                        - generic [ref=f2e297]: Spain762
                      - generic [ref=f2e298]:
                        - generic [ref=f2e299]: Moldova1047
                        - generic [ref=f2e300]: Moldova1047
                      - generic [ref=f2e301]:
                        - generic [ref=f2e302]: Poland537
                        - generic [ref=f2e303]: Poland537
                      - generic [ref=f2e304]:
                        - generic [ref=f2e305]: Switze…
                        - generic [ref=f2e306]: Switze…
                      - generic [ref=f2e307]:
                        - generic [ref=f2e308]: Slovenia247
                        - generic [ref=f2e309]: Slovenia247
                      - generic [ref=f2e310]:
                        - generic [ref=f2e311]: Albania407
                        - generic [ref=f2e312]: Albania407
                      - generic [ref=f2e313]:
                        - generic [ref=f2e314]: Portugal1216
                        - generic [ref=f2e315]: Portugal1216
                      - generic [ref=f2e316]:
                        - generic [ref=f2e317]: Serbia761
                        - generic [ref=f2e318]: Serbia761
                      - generic [ref=f2e319]:
                        - generic [ref=f2e320]: UnitedKingdo…
                        - generic [ref=f2e321]: UnitedKingdo…
                      - generic [ref=f2e322]:
                        - generic [ref=f2e323]: Germa…
                        - generic [ref=f2e324]: Germa…
                      - generic [ref=f2e325]:
                        - generic [ref=f2e326]: Greece536
                        - generic [ref=f2e327]: Greece536
                      - generic [ref=f2e328]:
                        - generic [ref=f2e329]: Nether…
                        - generic [ref=f2e330]: Nether…
                      - generic [ref=f2e331]:
                        - generic [ref=f2e332]: Azerba…
                        - generic [ref=f2e333]: Azerba…
                      - generic [ref=f2e334]:
                        - generic [ref=f2e335]: Romania347
                        - generic [ref=f2e336]: Romania347
                      - generic [ref=f2e337]:
                        - generic [ref=f2e338]: Iceland630
                        - generic [ref=f2e339]: Iceland630
                      - generic [ref=f2e340]:
                        - generic [ref=f2e341]: Malta515
                        - generic [ref=f2e342]: Malta515
                      - generic [ref=f2e343]:
                        - generic [ref=f2e344]: Russia1065
                        - generic [ref=f2e345]: Russia1065
                      - generic [ref=f2e346]:
                        - generic [ref=f2e347]: Bulgaria1258
                        - generic [ref=f2e348]: Bulgaria1258
                      - generic [ref=f2e349]:
                        - generic [ref=f2e350]: SanMarino127
                        - generic [ref=f2e351]: SanMarino127
                      - generic [ref=f2e352]:
                        - generic [ref=f2e353]: NorthMaced…
                        - generic [ref=f2e354]: NorthMaced…
                      - generic [ref=f2e355]:
                        - generic [ref=f2e356]: Denma…
                        - generic [ref=f2e357]: Denma…
                      - generic [ref=f2e358]:
                        - generic [ref=f2e359]: Belarus114
                        - generic [ref=f2e360]: Belarus114
                      - generic [ref=f2e361]:
                        - generic [ref=f2e362]: Ireland136
                        - generic [ref=f2e363]: Ireland136
                      - generic [ref=f2e364]:
                        - generic [ref=f2e365]: Hungary401
                        - generic [ref=f2e366]: Hungary401
                      - generic [ref=f2e367]:
                        - generic [ref=f2e368]: Latvia132
                        - generic [ref=f2e369]: Latvia132
                      - generic [ref=f2e370]:
                        - generic [ref=f2e371]: Georgia104
                        - generic [ref=f2e372]: Georgia104
              - generic [ref=f2e544]:
                - paragraph [ref=f2e545]:
                  - text: "Source:"
                  - link "eurovisionworld.com" [ref=f2e546]:
                    - /url: https://eurovisionworld.com/eurovision/2023
                  - text: • Created with the Flourish
                  - link "Line Chart Race template" [ref=f2e547]:
                    - /url: https://app.flourish.studio/templates#template-horserace
                - paragraph [ref=f2e548]: The chart starts from 2016 due to a major change in the Eurovision voting system, which separated public televoting and jury scores.
            - complementary
      - generic [ref=e28]:
        - generic [ref=e31]:
          - heading "Flourish Fallback Check - Visualisation Image authored" [level=1] [ref=e34]
          - separator [ref=e37]
          - img "alt_txt_img1" [ref=e45]
          - separator [ref=e48]
        - generic [ref=e51]:
          - generic [ref=e54]:
            - heading "Flourish Fallback Check - Story Image authored" [level=1] [ref=e57]
            - separator [ref=e60]
            - generic [ref=e63]:
              - generic [ref=e64]:
                - img "error message" [ref=e65]
                - generic [ref=e67]: Sorry, there has been a problem loading this interactive story
              - img "alt_txt_img2" [ref=e72]
          - separator [ref=e75]
      - separator [ref=e78]
      - generic [ref=e81]:
        - generic [ref=e84]:
          - heading "Flourish Fallback Check - Visualisation Image NOT authored" [level=1] [ref=e87]
          - separator [ref=e90]
          - generic [ref=e94]:
            - img "error message" [ref=e95]
            - generic [ref=e97]: Sorry, there has been a problem loading this item
          - separator [ref=e100]
        - generic [ref=e103]:
          - generic [ref=e106]:
            - heading "Flourish Fallback Check - Story Image NOT authored" [level=1] [ref=e109]
            - separator [ref=e112]
            - generic [ref=e116]:
              - img "error message" [ref=e117]
              - generic [ref=e119]: Sorry, there has been a problem loading this interactive story
          - separator [ref=e122]
        - generic [ref=e129]: Flourish Story (Stub)
      - separator [ref=e132]
    - separator [ref=e135]
    - separator [ref=e138]
  - img [ref=e139]
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