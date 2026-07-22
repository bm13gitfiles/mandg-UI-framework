import { test, expect } from '@playwright/test';
import { UICommons } from '../../commons/ui/ui-commons.ts';
import { WebCommons } from '../../commons/ui/web-commons.ts';
import PageElement from "../../page-objects/page-elements/mandg-page-elements.json" with { type: "json" };
import { MandgPageSteps } from '../../page-objects/page-steps/mandg-page-steps.ts';
import { Routes } from '../../commons/constants/Routes.js';

test.afterEach(async ({ }, testInfo) => {
    console.log(`${testInfo.title} - ${testInfo.project.name} - ${testInfo.status}`.toUpperCase());
});


test.describe('One Trust Cookie Banner UI Validation', () => {
    // This overrides the global storageState.json for this specific test block.
    // By passing empty arrays, Playwright starts a fresh session without the accepted cookies.
    test.use({ storageState: { cookies: [], origins: [] } });

    test('OneTrust Cookie Banner Testing', { tag: '@CookieBanner' }, async ({ page }) => {
        const webCommons = new WebCommons(page);

        // Launch the application (homepage) to trigger the banner
        await webCommons.launchApplication(Routes.ONE_TRUST_COOKIE_BANNER_ADVISER);
        await webCommons.waitForPageLoad();

        const mandgPageSteps = new MandgPageSteps(page);
        await mandgPageSteps.verifyWhetherTheOneTrustCookieBannerIsDisplayed();

        // Wait for the banner animation to fully slide up/render
        await webCommons.waitForSeconds(5);

        // Assert the page with the banner visible
        await UICommons.assertPartialPage(page, ['CookieBanner', 'cookie-banner-expected.png']);
    });
});

test.describe('Component UI Validation', () => {
    test.describe.configure({ mode: 'parallel' });

    // --- Complex / Bespoke Components ---

    test('LeadGen Form UI Testing', { tag: '@LeadGenForm' }, async ({ page }) => {
        const webCommons = new WebCommons(page);

        await webCommons.launchApplication(Routes.LEADGEN_FORM_BASE);
        await webCommons.waitForPageLoad();

        await UICommons.ensurePageReadyForTesting(page);
        await UICommons.preparePageForFullPageScreenshot(page);

        const mandgPageSteps = new MandgPageSteps(page);
        await mandgPageSteps.submitLeadGenForm();

        await UICommons.waitForStableHeight(page);
        await UICommons.forceRepaint(page);
        await UICommons.resizeViewportToContent(page);
        await webCommons.waitForSeconds(2);

        // This component requires specific waits or custom logic (add here)


        await UICommons.assertFullPage(page, ['LeadGen Form', 'lead-gen-form-page-expected.png']);
    })

    test('Carousel UI Testing', { tag: '@Carousel' }, async ({ page }) => {
        const webCommons = new WebCommons(page);

        await webCommons.launchApplication(Routes.CAROUSEL);
        await webCommons.waitForPageLoad();
        await UICommons.ensurePageReadyForTesting(page);
        await UICommons.preparePageForFullPageScreenshot(page);

        await UICommons.waitForStableHeight(page);
        await UICommons.forceRepaint(page);
        await UICommons.resizeViewportToContent(page);

        await webCommons.waitForSeconds(3);

        // This component requires specific waits or custom logic (add here)


        await UICommons.assertFullPage(page, ['Carousel', 'carousel-page-expected.png']);
    });

    test('Search UI Testing', { tag: '@Search' }, async ({ page }) => {
        const webCommons = new WebCommons(page);

        await webCommons.launchApplication(Routes.SEARCH);
        await webCommons.waitForPageLoad();
        await UICommons.ensurePageReadyForTesting(page);
        await UICommons.preparePageForFullPageScreenshot(page);

        await UICommons.waitForStableHeight(page);
        await UICommons.forceRepaint(page);
        await UICommons.resizeViewportToContent(page);
        await webCommons.waitForSeconds(1);

        // This component requires specific waits or custom logic (add here)


        await UICommons.assertFullPage(page, ['Search', 'search-page-expected.png']);
    });

    test('Kids Library UI Testing', { tag: '@KidsLibrary' }, async ({ page }) => {
        const webCommons = new WebCommons(page);

        await webCommons.launchApplication(Routes.KIDS_LIBRARY);
        await webCommons.waitForPageLoad();
        await UICommons.ensurePageReadyForTesting(page);
        await UICommons.preparePageForFullPageScreenshot(page);

        await UICommons.waitForStableHeight(page);
        await UICommons.forceRepaint(page);
        await UICommons.resizeViewportToContent(page);

        await webCommons.waitForSeconds(4);


        // This component requires specific waits or custom logic (add here)


        await UICommons.assertFullPage(page, ['Kids Library', 'kids-library-page-expected.png']);
    });

    test('Detailed Egr Table UI Testing', { tag: '@DetailedEgrTable' }, async ({ page }) => {
        const webCommons = new WebCommons(page);

        await webCommons.launchApplication(Routes.DETAILED_EGR);
        await webCommons.waitForPageLoad();
        await UICommons.ensurePageReadyForTesting(page);
        await UICommons.preparePageForFullPageScreenshot(page);


        await UICommons.waitForStableHeight(page);
        await UICommons.forceRepaint(page);
        await UICommons.resizeViewportToContent(page);
        await webCommons.waitForSeconds(2);

        // This component requires specific waits or custom logic (add here)


        await UICommons.assertFullPage(page, ['Detailed Egr Table', 'detailed-egr-page-expected.png']);
    });


    test('Flourish Visualisation UI Testing', { tag: '@Flourish' }, async ({ page }) => {
        test.setTimeout(180000);

        const webCommons = new WebCommons(page);

        // Launch the application
        await webCommons.launchApplication(
            '/adviser/bespoke-components/ui/flourish-visualisation'
        );

        // Ensure the page is fully loaded and ready
        await UICommons.ensurePageReadyForTesting(page);

        // Wait for the page layout to stabilise
        await UICommons.waitForStableHeight(page);
        await UICommons.forceRepaint(page);
        await UICommons.resizeViewportToContent(page);

        await webCommons.waitForSeconds(2);

        // Full-page visual comparison
        await UICommons.assertFullPage(
            page,
            ['Flourish Visualisation', 'flourish-visualisation-page-expected.png']
        );
    });

    // 

    test('Flourish Story UI Testing', { tag: '@Flourish' }, async ({ page }) => {
        test.setTimeout(180000);

        const webCommons = new WebCommons(page);

        // Launch the application
        await webCommons.launchApplication(
            '/adviser/bespoke-components/ui/flourish-story'
        );

        // Ensure the page is fully loaded and ready
        await UICommons.ensurePageReadyForTesting(page);

        // Wait for the page layout to stabilise
        await UICommons.waitForStableHeight(page);
        await UICommons.forceRepaint(page);
        await UICommons.resizeViewportToContent(page);

        // Replace Flourish Story embeds with a deterministic placeholder
        await UICommons.stubFlourishStories(page);

        // Wait for the DOM to stabilise after replacing the component
        await UICommons.waitForStableHeight(page);
        await UICommons.forceRepaint(page);
        await UICommons.resizeViewportToContent(page);

        await webCommons.waitForSeconds(2);

        // Full-page visual comparison
        await UICommons.assertFullPage(
            page,
            ['Flourish Story', 'flourish-story-page-expected.png']
        );
    });


    test('Flourish Scrolly UI Testing', { tag: '@Flourish' }, async ({ page }) => {
        test.setTimeout(180000);

        const webCommons = new WebCommons(page);

        // Launch the application
        await webCommons.launchApplication(
            '/adviser/bespoke-components/ui/flourish-story'
        );

        await UICommons.ensurePageReadyForTesting(page);

        await UICommons.loadLazyFlourish(page);

        await UICommons.freezeFlourish(page);

        await UICommons.waitForStableHeight(page);

        await UICommons.forceRepaint(page);

        await UICommons.assertFullPage(
            page,
            ['Flourish Scrolly', 'flourish-scrolly-page-expected.png']
        );
    });





    test.skip('Inpage Search UI Testing', { tag: '@InpageSearch' }, async ({ page }) => {
        const webCommons = new WebCommons(page);
        const mandgSteps = new MandgPageSteps(page);

        // This test uses the Prod URL directly
        await webCommons.launchApplication(Routes.SEARCH_RESULTSQPARAPLANNERSASSEMBLY2023DOTAXWRAPPERSGOTOHEAVENORIGINHEADERSUGGESTIONTRUE);
        await UICommons.ensurePageReadyForTesting(page);
        await UICommons.preparePageForFullPageScreenshot(page);

        await mandgSteps.acceptOneTrustCookieBanner();
        await webCommons.waitForPageLoad();
        await UICommons.waitForStableHeight(page);
        await UICommons.forceRepaint(page);
        await UICommons.resizeViewportToContent(page);

        await webCommons.waitForSeconds(6);


        await UICommons.assertFullPage(page, ['Inpage Search', 'inpage-search-page-expected.png']);
    });


    test('Back To Top UI Testing', { tag: '@BackToTop' }, async ({ page }) => {
        const webCommons = new WebCommons(page);

        await webCommons.launchApplication(Routes.BACK_TO_TOP);
        await webCommons.waitForPageLoad();

        await UICommons.ensurePageReadyForTesting(page);
        await UICommons.waitForStableHeight(page);
        await UICommons.forceRepaint(page);
        await UICommons.resizeViewportToContent(page);

        await webCommons.waitForSeconds(2);

        // Scroll enough for the component logic to activate
        await UICommons.scrollDown(page, 1000);

        // Freeze it before Playwright starts internally scrolling
        await UICommons.freezeStickyElement(
            page,
            '.sticky-back-to-top-button-container',
            'flex'
        );

        await UICommons.scrollToTop(page);
        await webCommons.waitForSeconds(1);

        await UICommons.assertFullPage(
            page,
            ['Back To Top', 'back-to-top-page-expected.png']
        );
    });



    test('EGR Widget Component UI Testing', { tag: '@EGRWidgetComponent' }, async ({ page }) => {
        const webCommons = new WebCommons(page);

        await webCommons.launchApplication(Routes.EGR_WIDGET_COMPONENT);
        await webCommons.waitForPageLoad();
        await UICommons.ensurePageReadyForTesting(page);

        // Expand viewport so lazy-loaded content becomes visible
        await UICommons.preparePageForFullPageScreenshot(page);

        await webCommons.selectEGRdropdownOption(
            PageElement["egr-product-dropdown"],
            "Flexible Retirement Plan"
        );

        await webCommons.selectEGRdropdownOption(
            PageElement["egr-fund-dropdown"],
            "PruFund Cautious Pension Fund",
            "PruFund Cautious Pension Fund/PruFund Protected Cautious Pension Fund"
        );

        await expect(
            page.locator(PageElement["egr-view-egr-button"])
        ).toBeVisible({ timeout: 1000 });

        await UICommons.waitForStableHeight(page);
        await UICommons.forceRepaint(page);
        await UICommons.resizeViewportToContent(page);

        await webCommons.waitForSeconds(2);

        await UICommons.assertFullPage(
            page,
            ['EGR Widget Component', 'egr-widget-component-page-expected.png']
        );
    });


    test.skip('Document Centre UI Testing', { tag: '@DocumentCentre' }, async ({ page }) => {
        const webCommons = new WebCommons(page);
        const mandgSteps = new MandgPageSteps(page);

        // This test uses the www-stage URL
        await webCommons.launchApplication(Routes.DOCUMENT_CENTRE);
        await webCommons.waitForPageLoad();
        await UICommons.ensurePageReadyForTesting(page);
        await UICommons.preparePageForFullPageScreenshot(page);

        await mandgSteps.acceptOneTrustCookieBanner();



        await UICommons.assertFullPage(page, ['Document Centre', 'document-centre-page-expected.png']);
    });

    test('Video UI Testing', { tag: '@Video' }, async ({ page }) => {
        const webCommons = new WebCommons(page);

        await webCommons.launchApplication(Routes.VIDEO);
        await UICommons.ensurePageReadyForTesting(page);
        await UICommons.preparePageForFullPageScreenshot(page);
        await UICommons.resizeViewportToContent(page);


        await UICommons.assertFullPage(page, ['Video', 'video-page-expected.png']);
    });


    test('Hero Banner Article UI Testing', { tag: '@HeroBannerArticle' }, async ({ page }) => {
        const webCommons = new WebCommons(page);

        await webCommons.launchApplication(Routes.HERO_BANNER_ARTICLE_FINAL);
        await webCommons.waitForPageLoad();
        await UICommons.ensurePageReadyForTesting(page);
        await UICommons.preparePageForFullPageScreenshot(page);

        await UICommons.waitForStableHeight(page);
        await UICommons.forceRepaint(page);
        await UICommons.resizeViewportToContent(page);
        await webCommons.waitForSeconds(2);


        await UICommons.assertFullPage(page, ['Hero Banner Article', 'hero-banner-article-page-expected.png']);
    });

    // Basic Components

    test('Button UI Testing', { tag: '@Button' }, async ({ page }) => {
        const webCommons = new WebCommons(page);

        await webCommons.launchApplication(Routes.BUTTON);
        await webCommons.waitForPageLoad();
        await UICommons.ensurePageReadyForTesting(page);
        await UICommons.preparePageForFullPageScreenshot(page);

        await UICommons.waitForStableHeight(page);
        await UICommons.forceRepaint(page);
        await UICommons.resizeViewportToContent(page);
        await webCommons.waitForSeconds(3);


        await UICommons.assertFullPage(page, ['Button', 'button-page-expected.png']);
    });

    test('Bullet List UI Testing', { tag: '@BulletList' }, async ({ page }) => {
        const webCommons = new WebCommons(page);

        await webCommons.launchApplication(Routes.BULLET_LIST1);
        await webCommons.waitForPageLoad();
        await UICommons.ensurePageReadyForTesting(page);
        await UICommons.preparePageForFullPageScreenshot(page);

        await UICommons.waitForStableHeight(page);
        await UICommons.forceRepaint(page);
        await UICommons.resizeViewportToContent(page);
        await webCommons.waitForSeconds(3);



        await UICommons.assertFullPage(page, ['Bullet List', 'bullet-list-expected.png']);
    });

    test('Separator Component UI Testing', { tag: '@SeparatorComponent' }, async ({ page }) => {
        const webCommons = new WebCommons(page);

        await webCommons.launchApplication(Routes.SEPARATOR_COMPONENT);
        await webCommons.waitForPageLoad();
        await UICommons.ensurePageReadyForTesting(page);
        await UICommons.preparePageForFullPageScreenshot(page);

        await UICommons.waitForStableHeight(page);
        await UICommons.forceRepaint(page);
        await UICommons.resizeViewportToContent(page);
        await webCommons.waitForSeconds(3);


        await UICommons.assertFullPage(page, ['Separator Component', 'separator-component-page-expected.png']);
    });

    test('Tab Component Dark Theme UI Testing', { tag: '@TabComponentDarkTheme' }, async ({ page }) => {
        const webCommons = new WebCommons(page);

        await webCommons.launchApplication(Routes.TAB_COMPONENT_DARK_THEME);
        await webCommons.waitForPageLoad();
        await UICommons.ensurePageReadyForTesting(page);
        await UICommons.preparePageForFullPageScreenshot(page);

        await UICommons.waitForStableHeight(page);
        await UICommons.forceRepaint(page);
        await UICommons.resizeViewportToContent(page);
        await webCommons.waitForSeconds(3);


        await UICommons.assertFullPage(page, ['Tab Component Dark Theme', 'tab-component-dark-theme-page-expected.png']);
    });

    test('Hero Banner With Active Square UI Testing', { tag: '@HeroBannerWithActiveSquare' }, async ({ page }) => {
        const webCommons = new WebCommons(page);

        await webCommons.launchApplication(Routes.HERO_BANNER_WITH_ACTIVE_SQUARE0);
        await webCommons.waitForPageLoad();
        await UICommons.ensurePageReadyForTesting(page);
        await UICommons.preparePageForFullPageScreenshot(page);

        await UICommons.waitForStableHeight(page);
        await UICommons.forceRepaint(page);
        await UICommons.resizeViewportToContent(page);
        await webCommons.waitForSeconds(3);


        await UICommons.assertFullPage(page, ['Hero Banner With Active Square', 'hero-banner-with-active-square-page-expected.png']);
    });

    test('Teaser Banner Article With Image UI Testing', { tag: '@TeaserBannerArticleWithImage' }, async ({ page }) => {
        const webCommons = new WebCommons(page);

        await webCommons.launchApplication(Routes.TEASER_BANNER_ARTICLE_WITH_IMAGE);
        await webCommons.waitForPageLoad();
        await UICommons.ensurePageReadyForTesting(page);
        await UICommons.preparePageForFullPageScreenshot(page);

        await UICommons.waitForStableHeight(page);
        await UICommons.forceRepaint(page);
        await UICommons.resizeViewportToContent(page);
        await webCommons.waitForSeconds(3);


        await UICommons.assertFullPage(page, ['Teaser Banner Article With Image', 'teaser-banner-article-with-image-page-expected.png']);
    });

    test('Hero Teaser Banner 50 50 UI Testing', { tag: '@HeroTeaserBanner5050' }, async ({ page }) => {
        const webCommons = new WebCommons(page);

        await webCommons.launchApplication(Routes.HERO_TEASER_BANNER_50_50);
        await webCommons.waitForPageLoad();
        await UICommons.ensurePageReadyForTesting(page);
        await UICommons.preparePageForFullPageScreenshot(page);

        await UICommons.waitForStableHeight(page);
        await UICommons.forceRepaint(page);
        await UICommons.resizeViewportToContent(page);
        await webCommons.waitForSeconds(3);


        await UICommons.assertFullPage(page, ['Hero Teaser Banner 50 50', 'hero-teaser-banner-50-50-page-expected.png']);
    });

    test('Teaser Banner 60 40 UI Testing', { tag: '@TeaserBanner6040' }, async ({ page }) => {
        const webCommons = new WebCommons(page);

        await webCommons.launchApplication(Routes.TEASER_BANNER_60_401);
        await webCommons.waitForPageLoad();
        await UICommons.ensurePageReadyForTesting(page);
        await UICommons.preparePageForFullPageScreenshot(page);

        await UICommons.waitForStableHeight(page);
        await UICommons.forceRepaint(page);
        await UICommons.resizeViewportToContent(page);
        await webCommons.waitForSeconds(3);


        await UICommons.assertFullPage(page, ['Teaser Banner 60 40', 'teaser-banner-60-401-page-expected.png']);
    });

    test('Text UI Testing', { tag: '@Text' }, async ({ page }) => {
        const webCommons = new WebCommons(page);

        await webCommons.launchApplication(Routes.TEXT);
        await webCommons.waitForPageLoad();
        await UICommons.ensurePageReadyForTesting(page);
        await UICommons.preparePageForFullPageScreenshot(page);

        await UICommons.waitForStableHeight(page);
        await UICommons.forceRepaint(page);
        await UICommons.resizeViewportToContent(page);
        await webCommons.waitForSeconds(3);


        await UICommons.assertFullPage(page, ['Text', 'text-page-expected.png']);
    });

    test('Title Component UI Testing', { tag: '@TitleComponent' }, async ({ page }) => {
        const webCommons = new WebCommons(page);

        await webCommons.launchApplication(Routes.TITLE_COMPONENT);
        await webCommons.waitForPageLoad();
        await UICommons.ensurePageReadyForTesting(page);
        await UICommons.preparePageForFullPageScreenshot(page);

        await UICommons.waitForStableHeight(page);
        await UICommons.forceRepaint(page);
        await UICommons.resizeViewportToContent(page);
        await webCommons.waitForSeconds(3);


        await UICommons.assertFullPage(page, ['Title Component', 'title-component-page-expected.png']);
    });

    test('Footer UI Testing', { tag: '@Footer' }, async ({ page }) => {
        const webCommons = new WebCommons(page);

        await webCommons.launchApplication(Routes.FOOTER);
        await webCommons.waitForPageLoad();
        await UICommons.ensurePageReadyForTesting(page);
        await UICommons.preparePageForFullPageScreenshot(page);

        await UICommons.waitForStableHeight(page);
        await UICommons.forceRepaint(page);
        await UICommons.resizeViewportToContent(page);
        await webCommons.waitForSeconds(3);


        await UICommons.assertFullPage(page, ['Footer', 'footer-page-expected.png']);
    });

    test('List UI Testing', { tag: '@List' }, async ({ page }) => {
        const webCommons = new WebCommons(page);

        await webCommons.launchApplication(Routes.LIST);
        await webCommons.waitForPageLoad();
        await UICommons.ensurePageReadyForTesting(page);
        await UICommons.preparePageForFullPageScreenshot(page);

        await UICommons.waitForStableHeight(page);
        await UICommons.forceRepaint(page);
        await UICommons.resizeViewportToContent(page);
        await webCommons.waitForSeconds(3);


        await UICommons.assertFullPage(page, ['List', 'list-page-expected.png']);
    });

    test('Download Button UI Testing', { tag: '@DownloadButton' }, async ({ page }) => {
        const webCommons = new WebCommons(page);

        await webCommons.launchApplication(Routes.DOWNLOAD_BUTTON);
        await webCommons.waitForPageLoad();
        await UICommons.ensurePageReadyForTesting(page);
        await UICommons.preparePageForFullPageScreenshot(page);

        await UICommons.waitForStableHeight(page);
        await UICommons.forceRepaint(page);
        await UICommons.resizeViewportToContent(page);
        await webCommons.waitForSeconds(3);


        await UICommons.assertFullPage(page, ['Download Button', 'download-button-page-expected.png']);
    });

    test('Print Button UI Testing', { tag: '@PrintButton' }, async ({ page }) => {
        const webCommons = new WebCommons(page);

        await webCommons.launchApplication(Routes.PRINT_BUTTON);
        await webCommons.waitForPageLoad();
        await UICommons.ensurePageReadyForTesting(page);
        await UICommons.preparePageForFullPageScreenshot(page);

        await UICommons.waitForStableHeight(page);
        await UICommons.forceRepaint(page);
        await UICommons.resizeViewportToContent(page);
        await webCommons.waitForSeconds(3);


        await UICommons.assertFullPage(page, ['Print Button', 'print-button-page-expected.png']);
    });

    test('Hero Banner Routing Links UI Testing', { tag: '@HeroBannerRoutingLinks' }, async ({ page }) => {
        const webCommons = new WebCommons(page);

        await webCommons.launchApplication(Routes.HERO_BANNER_ROUTING_LINKS);
        await webCommons.waitForPageLoad();
        await UICommons.ensurePageReadyForTesting(page);
        await UICommons.preparePageForFullPageScreenshot(page);

        await UICommons.waitForStableHeight(page);
        await UICommons.forceRepaint(page);
        await UICommons.resizeViewportToContent(page);
        await webCommons.waitForSeconds(3);


        await UICommons.assertFullPage(page, ['Hero Banner Routing Links', 'hero-banner-routing-links-page-expected.png']);
    });

    test('Teaser With Image And Text UI Testing', { tag: '@TeaserWithImageAndText' }, async ({ page }) => {
        const webCommons = new WebCommons(page);

        await webCommons.launchApplication(Routes.TEASER_WITH_IMAGE_AND_TEXT);
        await webCommons.waitForPageLoad();
        await UICommons.ensurePageReadyForTesting(page);
        await UICommons.preparePageForFullPageScreenshot(page);

        await UICommons.waitForStableHeight(page);
        await UICommons.forceRepaint(page);
        await UICommons.resizeViewportToContent(page);
        await webCommons.waitForSeconds(3);


        await UICommons.assertFullPage(page, ['Teaser With Image And Text', 'teaser-with-image-and-text-page-expected.png']);
    });

    test('Teaser Cards With CTA UI Testing', { tag: '@TeaserCardsWithCTA' }, async ({ page }) => {
        const webCommons = new WebCommons(page);

        await webCommons.launchApplication(Routes.TEASER_CARDS_WITH_CTA);
        await webCommons.waitForPageLoad();

        await UICommons.ensurePageReadyForTesting(page);
        await UICommons.preparePageForFullPageScreenshot(page);
        await UICommons.waitForStableHeight(page);
        await UICommons.removeTrackingPixels(page);
        await UICommons.resizeViewportToContent(page);

        await UICommons.forceRepaint(page);


        await UICommons.assertFullPage(
            page,
            ['Teaser Cards With CTA', 'teaser-cards-with-cta-page-expected.png']
        );
    });


    test('Teaser Testimonial UI Testing', { tag: '@TeaserTestimonial' }, async ({ page }) => {
        const webCommons = new WebCommons(page);

        await webCommons.launchApplication(Routes.TEASER_TESTIMONIAL);
        await webCommons.waitForPageLoad();
        await UICommons.ensurePageReadyForTesting(page);
        await UICommons.preparePageForFullPageScreenshot(page);

        await UICommons.waitForStableHeight(page);
        await UICommons.forceRepaint(page);
        await UICommons.resizeViewportToContent(page);
        await webCommons.waitForSeconds(3);


        await UICommons.assertFullPage(page, ['Teaser Testimonial', 'teaser-testimonial-page-expected.png']);
    });

    test('Teaser Tile With Number UI Testing', { tag: '@TeaserTileWithNumber' }, async ({ page }) => {
        const webCommons = new WebCommons(page);

        await webCommons.launchApplication(Routes.TEASER_TILE_WITH_NUMBER);
        await webCommons.waitForPageLoad();
        await UICommons.ensurePageReadyForTesting(page);
        await UICommons.preparePageForFullPageScreenshot(page);

        await UICommons.waitForStableHeight(page);
        await UICommons.forceRepaint(page);
        await UICommons.resizeViewportToContent(page);
        await webCommons.waitForSeconds(3);


        await UICommons.assertFullPage(page, ['Teaser Tile With Number', 'teaser-tile-with-number-page-expected.png']);
    });

    test('Teaser USP UI Testing', { tag: '@TeaserUSP' }, async ({ page }) => {
        const webCommons = new WebCommons(page);

        await webCommons.launchApplication(Routes.TEASER_USP);
        await webCommons.waitForPageLoad();
        await UICommons.ensurePageReadyForTesting(page);
        await UICommons.preparePageForFullPageScreenshot(page);

        await UICommons.waitForStableHeight(page);
        await UICommons.forceRepaint(page);
        await UICommons.resizeViewportToContent(page);
        await webCommons.waitForSeconds(3);


        await UICommons.assertFullPage(page, ['Teaser USP', 'teaser-usp-page-expected.png']);
    });

    test('Sticky Jumping Links UI Testing', { tag: '@StickyJumpingLinks' }, async ({ page }) => {
        const webCommons = new WebCommons(page);

        await webCommons.launchApplication(Routes.STICKY_JUMPING_LINKS);
        await webCommons.waitForPageLoad();
        await UICommons.ensurePageReadyForTesting(page);
        await UICommons.preparePageForFullPageScreenshot(page);

        await UICommons.waitForStableHeight(page);
        await UICommons.forceRepaint(page);
        await UICommons.resizeViewportToContent(page);
        await webCommons.waitForSeconds(3);


        await UICommons.assertFullPage(page, ['Sticky Jumping Links', 'sticky-jumping-links-page-expected.png']);
    });

    test('Table UI Testing', { tag: '@Table' }, async ({ page }) => {
        const webCommons = new WebCommons(page);

        await webCommons.launchApplication(Routes.TABLE_COMPONENT);
        await webCommons.waitForPageLoad();
        await UICommons.ensurePageReadyForTesting(page);
        await UICommons.preparePageForFullPageScreenshot(page);

        await UICommons.waitForStableHeight(page);
        await UICommons.forceRepaint(page);
        await UICommons.resizeViewportToContent(page);
        await webCommons.waitForSeconds(3);


        await UICommons.assertFullPage(page, ['Table', 'table-component-page-expected.png']);
    });

    test('Right Hand Sticky Variant1 UI Testing', { tag: '@RightHandStickyVariant1' }, async ({ page }) => {
        const webCommons = new WebCommons(page);

        await webCommons.launchApplication(Routes.RIGHT_HAND_STICKY_VARIENT1);
        await webCommons.waitForPageLoad();
        await UICommons.ensurePageReadyForTesting(page);
        await UICommons.preparePageForFullPageScreenshot(page);

        await UICommons.waitForStableHeight(page);
        await UICommons.forceRepaint(page);
        await UICommons.resizeViewportToContent(page);
        await webCommons.waitForSeconds(3);


        await UICommons.assertFullPage(page, ['Right Hand Sticky Variant1', 'right-hand-sticky-variant1-page-expected.png']);
    });

    test('Container Component UI Testing', { tag: '@ContainerComponent' }, async ({ page }) => {
        const webCommons = new WebCommons(page);

        await webCommons.launchApplication(Routes.CONTAINER);
        await webCommons.waitForPageLoad();
        await UICommons.ensurePageReadyForTesting(page);
        await UICommons.preparePageForFullPageScreenshot(page);

        await UICommons.waitForStableHeight(page);
        await UICommons.forceRepaint(page);
        await UICommons.resizeViewportToContent(page);
        await webCommons.waitForSeconds(3);


        await UICommons.assertFullPage(page, ['Container Component', 'container-page-expected.png']);
    });

    test('Right Hand Sticky Variant2 UI Testing', { tag: '@RightHandStickyVariant2' }, async ({ page }) => {
        const webCommons = new WebCommons(page);

        await webCommons.launchApplication(Routes.RIGHT_HAND_STICKY_VARIENT2);
        await webCommons.waitForPageLoad();
        await UICommons.ensurePageReadyForTesting(page);
        await UICommons.preparePageForFullPageScreenshot(page);

        await UICommons.waitForStableHeight(page);
        await UICommons.forceRepaint(page);
        await UICommons.resizeViewportToContent(page);
        await webCommons.waitForSeconds(3);


        await UICommons.assertFullPage(page, ['Right Hand Sticky Variant2', 'right-hand-sticky-variant2-page-expected.png']);
    });

    test('Right Hand Sticky Variant3 UI Testing', { tag: '@RightHandStickyVariant3' }, async ({ page }) => {
        const webCommons = new WebCommons(page);

        await webCommons.launchApplication(Routes.RIGHT_HAND_STICKY_VARIENT3);
        await webCommons.waitForPageLoad();
        await UICommons.ensurePageReadyForTesting(page);
        await UICommons.preparePageForFullPageScreenshot(page);

        await UICommons.waitForStableHeight(page);
        await UICommons.forceRepaint(page);
        await UICommons.resizeViewportToContent(page);
        await webCommons.waitForSeconds(3);


        await UICommons.assertFullPage(page, ['Right Hand Sticky Variant3', 'right-hand-sticky-variant3-page-expected.png']);
    });

    test('Social Share UI Testing', { tag: '@SocialShare' }, async ({ page }) => {
        const webCommons = new WebCommons(page);

        await webCommons.launchApplication(Routes.SOCIAL_SHARE);
        await webCommons.waitForPageLoad();
        await UICommons.ensurePageReadyForTesting(page);
        await UICommons.preparePageForFullPageScreenshot(page);

        await UICommons.waitForStableHeight(page);
        await UICommons.forceRepaint(page);
        await UICommons.resizeViewportToContent(page);
        await webCommons.waitForSeconds(3);


        await UICommons.assertFullPage(page, ['Social Share', 'social-share-page-expected.png']);
    });

    test('Quick Links UI Testing', { tag: '@QuickLinks' }, async ({ page }) => {
        const webCommons = new WebCommons(page);

        await webCommons.launchApplication(Routes.QUICK_LINKS);
        await webCommons.waitForPageLoad();
        await UICommons.ensurePageReadyForTesting(page);
        await UICommons.preparePageForFullPageScreenshot(page);

        await UICommons.waitForStableHeight(page);
        await UICommons.forceRepaint(page);
        await UICommons.resizeViewportToContent(page);
        await webCommons.waitForSeconds(3);


        await UICommons.assertFullPage(page, ['Quick Links', 'quick-links-page-expected.png']);
    });

    test('Equal Height Container UI Testing', { tag: '@EqualHeightContainer' }, async ({ page }) => {
        const webCommons = new WebCommons(page);

        await webCommons.launchApplication(Routes.EQUAL_HEIGHT_CONTAINER1);
        await webCommons.waitForPageLoad();
        await UICommons.ensurePageReadyForTesting(page);
        await UICommons.preparePageForFullPageScreenshot(page);

        await UICommons.waitForStableHeight(page);
        await UICommons.forceRepaint(page);
        await UICommons.resizeViewportToContent(page);
        await webCommons.waitForSeconds(3);


        await UICommons.assertFullPage(page, ['Equal Height Container', 'equal-height-container1-page-expected.png']);
    });

    test('Promo Panel Component UI Testing', { tag: '@PromoPanelComponent' }, async ({ page }) => {
        const webCommons = new WebCommons(page);

        await webCommons.launchApplication(Routes.PROMO_PANEL_COMPONENT);
        await webCommons.waitForPageLoad();
        await UICommons.ensurePageReadyForTesting(page);
        await UICommons.preparePageForFullPageScreenshot(page);

        await UICommons.waitForStableHeight(page);
        await UICommons.forceRepaint(page);
        await UICommons.resizeViewportToContent(page);
        await webCommons.waitForSeconds(5);


        await UICommons.assertFullPage(page, ['Promo Panel Component', 'promo-panel-component-page-expected.png']);
    });

    test('Listing Component Related Links Static UI Testing', { tag: '@ListingComponentRelatedLinksStatic' }, async ({ page }) => {
        const webCommons = new WebCommons(page);

        await webCommons.launchApplication(Routes.LISTING_COMPONENT_RELATED_LINKS_STATIC);
        await webCommons.waitForPageLoad();
        await UICommons.ensurePageReadyForTesting(page);
        await UICommons.preparePageForFullPageScreenshot(page);

        await UICommons.waitForStableHeight(page);
        await UICommons.forceRepaint(page);
        await UICommons.resizeViewportToContent(page);
        await webCommons.waitForSeconds(3);


        await UICommons.assertFullPage(page, ['Listing Component Related Links Static', 'listing-component-related-links-static-page-expected.png']);
    });

    test('Drawer Links UI Testing', { tag: '@DrawerLinks' }, async ({ page }) => {
        const webCommons = new WebCommons(page);

        await webCommons.launchApplication(Routes.DRAWER_LINKS1);
        await webCommons.waitForPageLoad();
        await UICommons.ensurePageReadyForTesting(page);
        await UICommons.preparePageForFullPageScreenshot(page);

        await UICommons.waitForStableHeight(page);
        await UICommons.forceRepaint(page);
        await UICommons.resizeViewportToContent(page);
        await webCommons.waitForSeconds(3);


        await UICommons.assertFullPage(page, ['Drawer Links', 'drawer-links1-page-expected.png']);
    });

    test('Call Us Policy Number UI Testing', { tag: '@CallUsPolicyNumber' }, async ({ page }) => {
        const webCommons = new WebCommons(page);

        await webCommons.launchApplication(Routes.CALL_US_POLICY_NUMBER);
        await webCommons.waitForPageLoad();
        await UICommons.ensurePageReadyForTesting(page);
        await UICommons.preparePageForFullPageScreenshot(page);

        await UICommons.waitForStableHeight(page);
        await UICommons.forceRepaint(page);
        await UICommons.resizeViewportToContent(page);
        await webCommons.waitForSeconds(3);


        await UICommons.assertFullPage(page, ['Call Us Policy Number', 'call-us-policy-number-page-expected.png']);
    });

    test('Online Services UI Testing', { tag: '@OnlineServices' }, async ({ page }) => {
        const webCommons = new WebCommons(page);

        await webCommons.launchApplication(Routes.ONLINE_SERVICE_ILLUSTRATION_UAT1);
        await webCommons.waitForPageLoad();
        await UICommons.ensurePageReadyForTesting(page);
        await UICommons.preparePageForFullPageScreenshot(page);

        await UICommons.waitForStableHeight(page);
        await UICommons.forceRepaint(page);
        await UICommons.resizeViewportToContent(page);
        await webCommons.waitForSeconds(3);


        await UICommons.assertFullPage(page, ['Online Services', 'online-service.illustration.uat1-page-expected.png']);
    });

    test('Reduce Footer UI Testing', { tag: '@ReduceFooter' }, async ({ page }) => {
        const webCommons = new WebCommons(page);

        await webCommons.launchApplication(Routes.REDUCE_FOOTER);
        await webCommons.waitForPageLoad();
        await UICommons.ensurePageReadyForTesting(page);
        await UICommons.preparePageForFullPageScreenshot(page);

        await UICommons.waitForStableHeight(page);
        await UICommons.forceRepaint(page);
        await UICommons.resizeViewportToContent(page);
        await webCommons.waitForSeconds(3);


        await UICommons.assertFullPage(page, ['Reduce Footer', 'reduce-footer-page-expected.png']);
    });

    test('One Trust Cookie Embed UI Testing', { tag: '@OneTrustCookieEmbed' }, async ({ page }) => {
        const webCommons = new WebCommons(page);

        await webCommons.launchApplication(Routes.ONE_TRUST_COOKIE_EMBED);
        await webCommons.waitForPageLoad();
        await UICommons.ensurePageReadyForTesting(page);
        await UICommons.preparePageForFullPageScreenshot(page);

        await UICommons.waitForStableHeight(page);
        await UICommons.forceRepaint(page);
        await UICommons.resizeViewportToContent(page);
        await webCommons.waitForSeconds(3);


        await UICommons.assertFullPage(page, ['One Trust Cookie Embed', 'one-trust-cookie-embed-page-expected.png']);
    });

    test('Table Of Content UI Testing', { tag: '@TableOfContent' }, async ({ page }) => {
        const webCommons = new WebCommons(page);

        await webCommons.launchApplication(Routes.TABLE_OF_CONTENT);
        await webCommons.waitForPageLoad();
        await UICommons.ensurePageReadyForTesting(page);
        await UICommons.preparePageForFullPageScreenshot(page);

        await UICommons.waitForStableHeight(page);
        await UICommons.forceRepaint(page);
        await UICommons.resizeViewportToContent(page);
        await webCommons.waitForSeconds(3);


        await UICommons.assertFullPage(page, ['Table Of Content', 'table-of-content-page-expected.png']);
    });




    // screenshots needs to be updated

    test('Accordion UI Testing', { tag: '@Accordion' }, async ({ page }) => {
        const webCommons = new WebCommons(page);
        await webCommons.launchApplication(Routes.ACCORDION);
        await webCommons.waitForPageLoad();
        await UICommons.ensurePageReadyForTesting(page);
        await UICommons.preparePageForFullPageScreenshot(page);
        await UICommons.waitForStableHeight(page);
        await UICommons.forceRepaint(page);
        await UICommons.resizeViewportToContent(page);
        await webCommons.waitForSeconds(3);

        await UICommons.assertFullPage(page, ['Accordion', 'accordion-page-expected.png']);
    });

    test('Alert UI Testing', { tag: '@Alert' }, async ({ page }) => {
        const webCommons = new WebCommons(page);
        await webCommons.launchApplication(Routes.ALERT_1);
        await webCommons.waitForPageLoad();
        await UICommons.ensurePageReadyForTesting(page);
        await UICommons.preparePageForFullPageScreenshot(page);
        await UICommons.waitForStableHeight(page);
        await UICommons.forceRepaint(page);
        await UICommons.resizeViewportToContent(page);
        await webCommons.waitForSeconds(3);

        await UICommons.assertFullPage(page, ['Alert', 'alert-page-expected.png']);
    });

    test('Breadcrumb UI Testing', { tag: '@Breadcrumb' }, async ({ page }) => {
        const webCommons = new WebCommons(page);
        await webCommons.launchApplication(Routes.BREADCRUMB);
        await webCommons.waitForPageLoad();
        await UICommons.ensurePageReadyForTesting(page);
        await UICommons.preparePageForFullPageScreenshot(page);
        await UICommons.waitForStableHeight(page);
        await UICommons.forceRepaint(page);
        await UICommons.resizeViewportToContent(page);
        await webCommons.waitForSeconds(3);

        await UICommons.assertFullPage(page, ['Breadcrumb', 'breadcrumb-page-expected.png']);
    });

    test('Container UI Testing', { tag: '@Container' }, async ({ page }) => {
        const webCommons = new WebCommons(page);
        await webCommons.launchApplication(Routes.CONTAINER);
        await webCommons.waitForPageLoad();
        await UICommons.ensurePageReadyForTesting(page);
        await UICommons.preparePageForFullPageScreenshot(page);
        await UICommons.waitForStableHeight(page);
        await UICommons.forceRepaint(page);
        await UICommons.resizeViewportToContent(page);
        await webCommons.waitForSeconds(3);

        await UICommons.assertFullPage(page, ['Container', 'container-page-expected.png']);
    });

    test('Image UI Testing', { tag: '@Image' }, async ({ page }) => {
        const webCommons = new WebCommons(page);
        await webCommons.launchApplication(Routes.IMAGE);
        await webCommons.waitForPageLoad();
        await UICommons.ensurePageReadyForTesting(page);
        await UICommons.preparePageForFullPageScreenshot(page);
        await UICommons.waitForStableHeight(page);
        await UICommons.forceRepaint(page);
        await UICommons.resizeViewportToContent(page);
        await webCommons.waitForSeconds(3);

        await UICommons.assertFullPage(page, ['Image', 'image-page-expected.png']);
    });



    test('Tab Component Light Theme UI Testing', { tag: '@TabComponentLightTheme' }, async ({ page }) => {
        const webCommons = new WebCommons(page);
        await webCommons.launchApplication(Routes.TAB_COMPONENT_LIGHT_THEAM);
        await webCommons.waitForPageLoad();
        await UICommons.ensurePageReadyForTesting(page);
        await UICommons.preparePageForFullPageScreenshot(page);
        await UICommons.waitForStableHeight(page);
        await UICommons.forceRepaint(page);
        await UICommons.resizeViewportToContent(page);
        await webCommons.waitForSeconds(3);

        await UICommons.assertFullPage(page, ['Tab Component Light Theme', 'tab-component-light-theme-page-expected.png']);
    });

    test('Title UI Testing', { tag: '@Title' }, async ({ page }) => {
        const webCommons = new WebCommons(page);
        await webCommons.launchApplication(Routes.TITLE);
        await webCommons.waitForPageLoad();
        await UICommons.ensurePageReadyForTesting(page);
        await UICommons.preparePageForFullPageScreenshot(page);
        await UICommons.waitForStableHeight(page);
        await UICommons.forceRepaint(page);
        await UICommons.resizeViewportToContent(page);
        await webCommons.waitForSeconds(3);

        await UICommons.assertFullPage(page, ['Title', 'title-page-expected.png']);
    });





});
