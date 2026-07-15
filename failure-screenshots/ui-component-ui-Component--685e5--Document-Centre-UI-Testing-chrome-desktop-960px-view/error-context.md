# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui\component-ui.spec.ts >> Component UI Validation >> Document Centre UI Testing
- Location: tests\ui\component-ui.spec.ts:183:5

# Error details

```
Error: expect(page).toHaveScreenshot(expected) failed

  Expected an image 960px by 3943px, received 960px by 3942px. 

  Snapshot: Document Centre\document-centre-page-expected.png

Call log:
  - Expect "toHaveScreenshot(Document Centre\\document-centre-page-expected.png)" with timeout 15000ms
    - verifying given screenshot expectation
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - Expected an image 960px by 3943px, received 960px by 2954px. 520902 pixels (ratio 0.14 of all image pixels) are different.
  - waiting 100ms before taking screenshot
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - Expected an image 960px by 2954px, received 960px by 3942px. 520901 pixels (ratio 0.14 of all image pixels) are different.
  - waiting 250ms before taking screenshot
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - captured a stable screenshot
  - Expected an image 960px by 3943px, received 960px by 3942px.

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "Skip to Main Content" [ref=e2] [cursor=pointer]:
    - /url: "#main-content"
  - generic [ref=e5]:
    - generic:
      - generic:
        - generic:
          - generic:
            - generic:
              - generic:
                - dialog "banner closed"
              - generic [ref=e9]:
                - link "M and G logo" [ref=e11] [cursor=pointer]:
                  - /url: https://www.mandg.com/adviser
                  - img "M and G logo" [ref=e12]
                - list [ref=e14]:
                  - listitem
                  - listitem [ref=e15]:
                    - button [ref=e16] [cursor=pointer]
                  - listitem [ref=e19]:
                    - button [ref=e20] [cursor=pointer]
    - navigation "Breadcrumb" [ref=e23]:
      - list [ref=e24]:
        - listitem [ref=e25]:
          - link "Adviser services" [ref=e26] [cursor=pointer]:
            - /url: /adviser
            - generic [ref=e27]: Adviser services
    - generic [ref=e30]:
      - generic [ref=e34]:
        - region "Notifications alt+T"
        - generic [ref=e36]:
          - generic [ref=e37]:
            - heading "Document centre" [level=1] [ref=e38]
            - paragraph [ref=e40]: What are you looking for?
            - generic [ref=e43]:
              - textbox "Search for keyword or document code" [ref=e44]
              - button "Search" [ref=e45] [cursor=pointer]
          - img "icon layered squares" [ref=e51]
        - generic [ref=e52]:
          - list [ref=e55]:
            - listitem [ref=e56]:
              - button "Products" [ref=e57] [cursor=pointer]:
                - generic [ref=e58]: Products
              - list [ref=e61]:
                - listitem [ref=e62]:
                  - button "Retirement Planning" [ref=e64] [cursor=pointer]:
                    - generic [ref=e65]: Retirement Planning
                - listitem [ref=e67]:
                  - generic [ref=e68]:
                    - checkbox "Prudential ISA" [ref=e69]
                    - generic [ref=e71] [cursor=pointer]: Prudential ISA
                - listitem [ref=e72]:
                  - button "Investment Bonds" [ref=e74] [cursor=pointer]:
                    - generic [ref=e75]: Investment Bonds
                - listitem [ref=e77]:
                  - generic [ref=e78]:
                    - checkbox "Oeic Fund Range" [ref=e79]
                    - generic [ref=e81] [cursor=pointer]: Oeic Fund Range
                - listitem [ref=e82]:
                  - button "Estate Planning" [ref=e84] [cursor=pointer]:
                    - generic [ref=e85]: Estate Planning
                - listitem [ref=e87]:
                  - button "Openwork" [ref=e89] [cursor=pointer]:
                    - generic [ref=e90]: Openwork
            - listitem [ref=e92]:
              - button "Funds" [ref=e93] [cursor=pointer]:
                - generic [ref=e94]: Funds
              - list [ref=e97]:
                - listitem [ref=e98]:
                  - generic [ref=e99]:
                    - checkbox "Prufund range" [ref=e100]
                    - generic [ref=e102] [cursor=pointer]: Prufund range
                - listitem [ref=e103]:
                  - button "Risk managed fund range" [ref=e105] [cursor=pointer]:
                    - generic [ref=e106]: Risk managed fund range
                - listitem [ref=e108]:
                  - generic [ref=e109]:
                    - checkbox "With-Profits fund" [ref=e110]
                    - generic [ref=e112] [cursor=pointer]: With-Profits fund
            - listitem [ref=e113]:
              - button "Document type" [ref=e114] [cursor=pointer]:
                - generic [ref=e115]: Document type
              - list [ref=e118]:
                - listitem [ref=e119]:
                  - generic [ref=e120]:
                    - checkbox "Adviser guides" [ref=e121]
                    - generic [ref=e123] [cursor=pointer]: Adviser guides
                - listitem [ref=e124]:
                  - generic [ref=e125]:
                    - checkbox "Application" [ref=e126]
                    - generic [ref=e128] [cursor=pointer]: Application
                - listitem [ref=e129]:
                  - generic [ref=e130]:
                    - checkbox "Bonus declaration" [ref=e131]
                    - generic [ref=e133] [cursor=pointer]: Bonus declaration
                - listitem [ref=e134]:
                  - generic [ref=e135]:
                    - checkbox "Brochure" [ref=e136]
                    - generic [ref=e138] [cursor=pointer]: Brochure
                - listitem [ref=e139]:
                  - generic [ref=e140]:
                    - checkbox "CFPPFM" [ref=e141]
                    - generic [ref=e143] [cursor=pointer]: CFPPFM
                - listitem [ref=e144]:
                  - generic [ref=e145]:
                    - checkbox "Client guides" [ref=e146]
                    - generic [ref=e148] [cursor=pointer]: Client guides
                - listitem [ref=e149]:
                  - generic [ref=e150]:
                    - checkbox "Due diligence & third party reports" [ref=e151]
                    - generic [ref=e153] [cursor=pointer]: Due diligence & third party reports
                - listitem [ref=e154]:
                  - generic [ref=e155]:
                    - checkbox "Estate planning" [ref=e156]
                    - generic [ref=e158] [cursor=pointer]: Estate planning
                - listitem [ref=e159]:
                  - generic [ref=e160]:
                    - checkbox "Fund factsheets" [ref=e161]
                    - generic [ref=e163] [cursor=pointer]: Fund factsheets
                - listitem [ref=e164]:
                  - generic [ref=e165]:
                    - checkbox "Fund information" [ref=e166]
                    - generic [ref=e168] [cursor=pointer]: Fund information
                - listitem [ref=e169]:
                  - generic [ref=e170]:
                    - checkbox "Guide" [ref=e171]
                    - generic [ref=e173] [cursor=pointer]: Guide
                - listitem [ref=e174]:
                  - generic [ref=e175]:
                    - checkbox "Key features" [ref=e176]
                    - generic [ref=e178] [cursor=pointer]: Key features
                - listitem [ref=e179]:
                  - generic [ref=e180]:
                    - checkbox "Market update" [ref=e181]
                    - generic [ref=e183] [cursor=pointer]: Market update
                - listitem [ref=e184]:
                  - generic [ref=e185]:
                    - checkbox "PPFM" [ref=e186]
                    - generic [ref=e188] [cursor=pointer]: PPFM
                - listitem [ref=e189]:
                  - generic [ref=e190]:
                    - checkbox "Sales aids" [ref=e191]
                    - generic [ref=e193] [cursor=pointer]: Sales aids
                - listitem [ref=e194]:
                  - generic [ref=e195]:
                    - checkbox "Servicing forms" [ref=e196]
                    - generic [ref=e198] [cursor=pointer]: Servicing forms
                - listitem [ref=e199]:
                  - generic [ref=e200]:
                    - checkbox "Supplement" [ref=e201]
                    - generic [ref=e203] [cursor=pointer]: Supplement
                - listitem [ref=e204]:
                  - generic [ref=e205]:
                    - checkbox "Target market information" [ref=e206]
                    - generic [ref=e208] [cursor=pointer]: Target market information
                - listitem [ref=e209]:
                  - generic [ref=e210]:
                    - checkbox "Terms and conditions" [ref=e211]
                    - generic [ref=e213] [cursor=pointer]: Terms and conditions
                - listitem [ref=e214]:
                  - generic [ref=e215]:
                    - checkbox "Top up application" [ref=e216]
                    - generic [ref=e218] [cursor=pointer]: Top up application
          - generic [ref=e219]:
            - heading "Documents" [level=3] [ref=e220]
            - generic [ref=e221]:
              - generic [ref=e222]:
                - generic [ref=e223]: Document
                - generic [ref=e224]:
                  - generic [ref=e225]: Document type
                  - generic [ref=e226]: Cat code
              - list [ref=e227]:
                - listitem [ref=e228]:
                  - 'link "PruFund Growth Fund – ARC Peer Review Independent fund peer review report for the PruFund Growth Fund from ARC. Last updated: 14 Jul 26 genm100095509" [ref=e229] [cursor=pointer]':
                    - /url: https://www.mandg.com/assets/shared/documents/en/genm100095509.pdf
                    - generic [ref=e230]:
                      - generic [ref=e231]:
                        - generic [ref=e232]: PruFund Growth Fund – ARC Peer Review
                        - paragraph [ref=e233]: Independent fund peer review report for the PruFund Growth Fund from ARC.
                        - paragraph [ref=e236]: "Last updated: 14 Jul 26"
                      - generic [ref=e240]: genm100095509
                - listitem [ref=e241]:
                  - 'link "Retirement Account – Expression of Wish Form Complete this form to inform Prudential how you would wish any death payments to be distributed from your Retirement Account. Last updated: 10 Jul 26 Servicing forms Application RACF167903" [ref=e242] [cursor=pointer]':
                    - /url: https://www.mandg.com/assets/shared/documents/en/racf167903.pdf
                    - generic [ref=e243]:
                      - generic [ref=e244]:
                        - generic [ref=e245]: Retirement Account – Expression of Wish Form
                        - paragraph [ref=e246]: Complete this form to inform Prudential how you would wish any death payments to be distributed from your Retirement Account.
                        - paragraph [ref=e249]: "Last updated: 10 Jul 26"
                      - generic [ref=e250]:
                        - generic [ref=e251]:
                          - generic [ref=e252]: Servicing forms
                          - generic [ref=e253]: Application
                        - generic [ref=e255]: RACF167903
                - listitem [ref=e256]:
                  - 'link "Offshore – UK Non-UK – Bare Trust for Settlor Form Complete this form to set up a settlor. Last updated: 27 Jun 26 Estate Planning INVM11307" [ref=e257] [cursor=pointer]':
                    - /url: https://www.mandg.com/assets/shared/documents/en/invm11307.pdf
                    - generic [ref=e258]:
                      - generic [ref=e259]:
                        - generic [ref=e260]: Offshore – UK Non-UK – Bare Trust for Settlor Form
                        - paragraph [ref=e261]: Complete this form to set up a settlor.
                        - paragraph [ref=e264]: "Last updated: 27 Jun 26"
                      - generic [ref=e265]:
                        - generic [ref=e267]: Estate Planning
                        - generic [ref=e269]: INVM11307
                - listitem [ref=e270]:
                  - 'link "PruFund Growth (Euro) Fund Factsheet – International A fund factsheet for the PruFund Growth (Euro) International Fund. Last updated: 23 Jun 26 Fund factsheets INVF10936" [ref=e271] [cursor=pointer]':
                    - /url: https://www.mandg.com/assets/shared/documents/en/invf10936.pdf
                    - generic [ref=e272]:
                      - generic [ref=e273]:
                        - generic [ref=e274]: PruFund Growth (Euro) Fund Factsheet – International
                        - paragraph [ref=e275]: A fund factsheet for the PruFund Growth (Euro) International Fund.
                        - paragraph [ref=e278]: "Last updated: 23 Jun 26"
                      - generic [ref=e279]:
                        - generic [ref=e281]: Fund factsheets
                        - generic [ref=e283]: INVF10936
                - listitem [ref=e284]:
                  - 'link "PruFund Funds – Synaptic Risk Ratings Report (1-10 scale) Last updated: 23 Jun 26 GENM1039606" [ref=e285] [cursor=pointer]':
                    - /url: https://www.mandg.com/assets/shared/documents/en/genm1039606.pdf
                    - generic [ref=e286]:
                      - generic [ref=e287]:
                        - generic [ref=e288]: PruFund Funds – Synaptic Risk Ratings Report (1-10 scale)
                        - paragraph [ref=e291]: "Last updated: 23 Jun 26"
                      - generic [ref=e295]: GENM1039606
                - listitem [ref=e296]:
                  - 'link "PruFund in numbers sales aid A one page summary of the latest key statistics behind the PruFund range of funds. Last updated: 22 Jun 26 Sales aids Fund information PRUS100270607" [ref=e297] [cursor=pointer]':
                    - /url: https://www.mandg.com/assets/shared/documents/en/prus100270607.pdf
                    - generic [ref=e298]:
                      - generic [ref=e299]:
                        - generic [ref=e300]: PruFund in numbers sales aid
                        - paragraph [ref=e301]: A one page summary of the latest key statistics behind the PruFund range of funds.
                        - paragraph [ref=e304]: "Last updated: 22 Jun 26"
                      - generic [ref=e305]:
                        - generic [ref=e306]:
                          - generic [ref=e307]: Sales aids
                          - generic [ref=e308]: Fund information
                        - generic [ref=e310]: PRUS100270607
                - listitem [ref=e311]:
                  - 'link "Retirement Account – Available Funds List A list of the funds available for the Retirement Account. Last updated: 19 Jun 26 Fund information INVL650501" [ref=e312] [cursor=pointer]':
                    - /url: https://www.mandg.com/assets/shared/documents/en/monthly-fund-list.pdf
                    - generic [ref=e313]:
                      - generic [ref=e314]:
                        - generic [ref=e315]: Retirement Account – Available Funds List
                        - paragraph [ref=e316]: A list of the funds available for the Retirement Account.
                        - paragraph [ref=e319]: "Last updated: 19 Jun 26"
                      - generic [ref=e320]:
                        - generic [ref=e322]: Fund information
                        - generic [ref=e324]: INVL650501
                - listitem [ref=e325]:
                  - 'link "Prudential Dynamic Growth Funds – Quarterly Update A quarterly update for the Dynamic Growth funds. Last updated: 18 Jun 26 Market update Fund information INVB390004" [ref=e326] [cursor=pointer]':
                    - /url: https://www.mandg.com/assets/shared/documents/en/invb390004.pdf
                    - generic [ref=e327]:
                      - generic [ref=e328]:
                        - generic [ref=e329]: Prudential Dynamic Growth Funds – Quarterly Update
                        - paragraph [ref=e330]: A quarterly update for the Dynamic Growth funds.
                        - paragraph [ref=e333]: "Last updated: 18 Jun 26"
                      - generic [ref=e334]:
                        - generic [ref=e335]:
                          - generic [ref=e336]: Market update
                          - generic [ref=e337]: Fund information
                        - generic [ref=e339]: INVB390004
                - listitem [ref=e340]:
                  - 'link "Defaqto PruFund Q&A Report Defaqto''s independent annual assessment of the PruFund range of funds Last updated: 15 Jun 26 GENM100905200" [ref=e341] [cursor=pointer]':
                    - /url: https://www.mandg.com/assets/shared/documents/en/genm100905200.pdf
                    - generic [ref=e342]:
                      - generic [ref=e343]:
                        - generic [ref=e344]: Defaqto PruFund Q&A Report
                        - paragraph [ref=e345]: Defaqto's independent annual assessment of the PruFund range of funds
                        - paragraph [ref=e348]: "Last updated: 15 Jun 26"
                      - generic [ref=e352]: GENM100905200
                - listitem [ref=e353]:
                  - 'link "Prudential Guaranteed Income Plan - Death Benefit & Surrender Value sales aid A sales aid explaining the death benefit and surrender value for the Prudential Guaranteed Income Plan. Last updated: 14 Jun 26 Sales aids GIPM101067001" [ref=e354] [cursor=pointer]':
                    - /url: https://www.mandg.com/assets/shared/documents/en/gipm101067001.pdf
                    - generic [ref=e355]:
                      - generic [ref=e356]:
                        - generic [ref=e357]: Prudential Guaranteed Income Plan - Death Benefit & Surrender Value sales aid
                        - paragraph [ref=e358]: A sales aid explaining the death benefit and surrender value for the Prudential Guaranteed Income Plan.
                        - paragraph [ref=e361]: "Last updated: 14 Jun 26"
                      - generic [ref=e362]:
                        - generic [ref=e364]: Sales aids
                        - generic [ref=e366]: GIPM101067001
            - generic [ref=e368]:
              - button "Previous" [disabled] [ref=e369]:
                - generic [ref=e371]: Previous
              - generic [ref=e372]:
                - button "Page 1" [ref=e373] [cursor=pointer]: "1"
                - button "Page 2" [ref=e374] [cursor=pointer]: "2"
                - button "Page 3" [ref=e375] [cursor=pointer]: "3"
                - generic [ref=e376]: ...
                - button "Page 29" [ref=e377] [cursor=pointer]: "29"
              - button "Next" [ref=e378] [cursor=pointer]:
                - generic [ref=e379]: Next
      - separator [ref=e383]
    - generic [ref=e389]:
      - separator [ref=e392]
      - heading "Related links" [level=2] [ref=e395]
      - separator [ref=e398]
      - paragraph [ref=e401]: The following documents are accessible only through these quick links. They are not included in the document centre.
      - list [ref=e404]:
        - listitem [ref=e405]:
          - link "Key Information Documents (KIDs) and Investment Option Documents (IODs)" [ref=e406] [cursor=pointer]:
            - /url: https://www.mandg.com/adviser/products/investments/key-information-documents
            - paragraph [ref=e409]: Key Information Documents (KIDs) and Investment Option Documents (IODs)
        - listitem [ref=e412]:
          - link "Legacy products literature" [ref=e413] [cursor=pointer]:
            - /url: https://www.mandg.com/adviser/products/legacy
            - paragraph [ref=e416]: Legacy products literature
        - listitem [ref=e419]:
          - link "OEIC Fund Range literature" [ref=e420] [cursor=pointer]:
            - /url: https://www.mandg.com/adviser/products/investments/oeic#viewkeydocuments
            - paragraph [ref=e423]: OEIC Fund Range literature
      - list [ref=e428]:
        - listitem [ref=e429]:
          - link "Prudential ISA literature, including application form" [ref=e430] [cursor=pointer]:
            - /url: https://www.mandg.com/adviser/products/investments/isa
            - paragraph [ref=e433]: Prudential ISA literature, including application form
        - listitem [ref=e436]:
          - link "Access interactive fund factsheets" [ref=e437] [cursor=pointer]:
            - /url: https://www.fundslibrary.co.uk/FundsLibrary.BrandedTools/Pru/FundCentral/Life
            - paragraph [ref=e440]: Access interactive fund factsheets
      - separator [ref=e445]
      - separator [ref=e448]
    - generic [ref=e452]:
      - generic [ref=e455]:
        - generic [ref=e458]:
          - link "M&G logo" [ref=e463] [cursor=pointer]:
            - /url: /adviser
            - img "M&G logo" [ref=e464]
          - generic [ref=e467]:
            - generic [ref=e469]:
              - paragraph [ref=e470]: About M&G
              - list [ref=e471]:
                - listitem [ref=e472]:
                  - link "Who M&G are" [ref=e473] [cursor=pointer]:
                    - /url: /adviser/about
                    - text: Who we are
                - listitem [ref=e474]:
                  - link "Sustainability & ESG" [ref=e475] [cursor=pointer]:
                    - /url: https://www.mandg.com/footer/sustainability-disclosures
            - generic [ref=e477]:
              - paragraph [ref=e478]: Useful links
              - list [ref=e479]:
                - listitem [ref=e480]:
                  - link "Contact us" [ref=e481] [cursor=pointer]:
                    - /url: /adviser/contact-us
                - listitem [ref=e482]:
                  - link "Online Services" [ref=e483] [cursor=pointer]:
                    - /url: /adviser/online-services
                    - text: Login to online services
                - listitem [ref=e484]:
                  - link "PruFund Range" [ref=e485] [cursor=pointer]:
                    - /url: /adviser/funds/prufund
                    - text: PruFund range
            - generic [ref=e487]:
              - paragraph [ref=e488]: Adviser services
              - list [ref=e489]:
                - listitem [ref=e490]:
                  - link "Document Centre" [ref=e491] [cursor=pointer]:
                    - /url: /adviser/services/document-centre
                    - text: Document centre
                - listitem [ref=e492]:
                  - link "Due Diligence" [ref=e493] [cursor=pointer]:
                    - /url: /adviser/services/third-party-reports
                    - text: Due diligence
                - listitem [ref=e494]:
                  - link "Estate Planning" [ref=e495] [cursor=pointer]:
                    - /url: /adviser/services/estate-planning
                    - text: Estate planning
            - generic [ref=e497]:
              - paragraph [ref=e498]: Other links
              - list [ref=e499]:
                - listitem [ref=e500]:
                  - link "M&G group" [ref=e501] [cursor=pointer]:
                    - /url: https://group.mandg.com/
                    - text: M&G Group
                - listitem [ref=e502]:
                  - link "M&G Careers" [ref=e503] [cursor=pointer]:
                    - /url: https://group.mandg.com/careers
                - listitem [ref=e504]:
                  - link "M&G Investor Relations" [ref=e505] [cursor=pointer]:
                    - /url: https://group.mandg.com/investors
                - listitem [ref=e506]:
                  - link "M&G Investments" [ref=e507] [cursor=pointer]:
                    - /url: https://www.mandginvestments.com/
          - generic [ref=e510]:
            - generic [ref=e512]:
              - generic [ref=e513]: Social
              - list [ref=e514]:
                - listitem [ref=e515]:
                  - link "LinkedIn" [ref=e516] [cursor=pointer]:
                    - /url: https://www.linkedin.com/showcase/mandgforadvisers/
            - generic [ref=e522]:
              - list [ref=e523]:
                - listitem [ref=e524]:
                  - link "Terms & Conditions" [ref=e525] [cursor=pointer]:
                    - /url: /adviser/site-information/terms-and-conditions
                - listitem [ref=e526]:
                  - link "Privacy Policy" [ref=e527] [cursor=pointer]:
                    - /url: /adviser/site-information/privacy
                - listitem [ref=e528]:
                  - link "Cookie Policy" [ref=e529] [cursor=pointer]:
                    - /url: /adviser/site-information/cookies
              - list [ref=e530]:
                - listitem [ref=e531]:
                  - link "Accessibility" [ref=e532] [cursor=pointer]:
                    - /url: /adviser/site-information/accessibility
                - listitem [ref=e533]:
                  - link "Modern Slavery Act" [ref=e534] [cursor=pointer]:
                    - /url: https://group.mandg.com/site-services/modern-slavery
        - generic [ref=e539]:
          - paragraph [ref=e540]:
            - text: The information provided is by Prudential Distribution Ltd, and/or M&G Wealth Investments LLP, Investment Funds Direct Limited, Prudential International Assurance and/or The Prudential Assurance Company.
            - text: To understand M&G's business and brands, you can view our
            - link "To understand M&G's business and brands, you can view our Corporate and Regulatory Information" [ref=e541] [cursor=pointer]:
              - /url: /adviser/site-information/legal-notice/corporate-regulatory-information
              - text: Corporate & Regulatory Information
            - text: .
          - paragraph [ref=e542]: © M&G 2026
      - separator [ref=e545]
  - img [ref=e546]
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