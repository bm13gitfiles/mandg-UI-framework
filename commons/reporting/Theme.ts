export class Theme {
    /* =========================================================================
       Brand Colours
       ========================================================================= */
    public static readonly primary = "#0B5D56"; // Dark Teal
    public static readonly logoTeal = "#3CB381"; // Light Teal for logo box
    public static readonly pageBackground = "#F0EBE1"; // Beige/Cream
    public static readonly white = "#FFFFFF";
    public static readonly border = "#E0DCD2";
    
    // Banner Colours (from new mockup)
    public static readonly bannerBg = "#0F5257"; // Deep dark teal
    public static readonly bannerMint = "#81EDB0"; // Light mint green
    public static readonly bannerPink = "#F183AD"; // Hot pink
    public static readonly bannerTeal = "#1DA67F"; // Vivid teal
    
    /* =========================================================================
       Status / Card Colours (From Mockup)
       ========================================================================= */
    public static readonly block1Blue = "#87AEFA"; // Total
    public static readonly block2Green = "#158467"; // Passed (Also used in progress bar)
    public static readonly block3Red = "#A63215"; // Failed (Also used in progress bar)
    public static readonly block4Pink = "#ED83B6"; // Skipped
    public static readonly barSkipped = "#B46519"; // Brown from the progress bar skipped dot
    public static readonly burgundy = "#660436"; // Used for the failures block
    
    // Risks / Failures block colours
    public static readonly risksBackground = "#F5DFD5"; // Light peach
    public static readonly risksText = "#2E3A46"; // Dark slate blue/grey
    public static readonly risksBullet = "#E85C41"; // Orange/Red square bullet

    /* =========================================================================
       Typography
       ========================================================================= */
    public static readonly fontFamily = `'Segoe UI', 'Helvetica Neue', Arial, sans-serif`;
    public static readonly textPrimary = "#0B5D56"; // Deep teal for headings
    public static readonly textSecondary = "#6F767A"; // Grey
    // Custom font style requested by user
    public static readonly lightBlackFontStyle = `color: #2F2F2F; font-family: 'Infra', sans-serif; font-size: 14px; font-weight: 500; font-style: normal;`;
    
    // Execution Summary Table specific styles
    public static readonly tableTitleFont = `color: #2F2F2F; font-family: 'Infra', sans-serif; font-size: 16px; font-weight: 500; font-style: normal; text-align: left;`;
    public static readonly tableTextFont = `color: #2F2F2F; font-family: 'Infra', sans-serif; font-size: 16px; font-weight: 400; font-style: normal; text-align: left;`;
    public static readonly tableBorderColor = "#ddd8c2";


    /* =========================================================================
       Layout
       ========================================================================= */
    public static readonly reportWidth = "720px";
    public static readonly radiusMedium = "4px"; // Mockup shows very square elements, slightly rounded
}