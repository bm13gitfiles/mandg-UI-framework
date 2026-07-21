import { TestResultSummary } from "./ReportBuilder.js";

export class HtmlTemplate {

    /**
     * Builds the complete HTML email report.
     */
    static generate(summary: TestResultSummary): string {

        // -------------------------------------------------------
        // Calculate execution statistics
        // -------------------------------------------------------

        const total = summary.passed + summary.failed + summary.skipped;

        // 6. Better pass rate and rating
        const passRateNum = total === 0 ? 0 : Math.round((summary.passed / total) * 100);
        const passRateText = passRateNum + "%";

        let rating = "";
        if (passRateNum === 100) rating = "★★★★★ Perfect";
        else if (passRateNum >= 95) rating = "★★★★★ Excellent";
        else if (passRateNum >= 90) rating = "★★★★ Good";
        else if (passRateNum >= 80) rating = "★★★ Fair";
        else rating = "Needs Attention";

        // Progress Bar Widths
        const passWidth = total === 0 ? 0 : (summary.passed / total) * 100;
        const failWidth = total === 0 ? 0 : (summary.failed / total) * 100;
        const skipWidth = total === 0 ? 0 : (summary.skipped / total) * 100;

        // -------------------------------------------------------
        // Decide Report Status
        // -------------------------------------------------------

        // 5. Overall Execution Status
        const reportStatus = summary.failed > 0 ? "FAILED" : "PASSED";
        const statusEmoji = summary.failed > 0 ? "🔴" : "🟢";

        // 7. Dynamic status colour
        let statusColour = "";
        if (passRateNum >= 95) statusColour = "#16a34a"; // Green
        else if (passRateNum >= 90) statusColour = "#ea580c"; // Orange
        else statusColour = "#dc2626"; // Red

        // 3. Execution time in minutes and seconds
        const durationMinutes = Math.floor(summary.duration / 60);
        const durationSeconds = Math.round(summary.duration % 60);
        const executionDuration = `${durationMinutes}m ${durationSeconds}s`;

        // 4. Execution date and time
        const now = new Date();
        const executionDate = now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
        const executionTime = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

        // 12. Dynamic environment
        const environment = process.env.TEST_ENV ? process.env.TEST_ENV.toUpperCase() : "STAGE";

        // 13. Browsers Executed
        const browserCount = 5;

        // -------------------------------------------------------
        // HTML
        // -------------------------------------------------------

        return `
<html>
<head>
<meta charset="UTF-8">
<title>Playwright Automation Report</title>
</head>
<body style="margin:0; padding:0; background:#edf2f7; font-family:Segoe UI,Arial,sans-serif;">

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#edf2f7; padding:40px 0;">
<tr><td align="center">

<table role="presentation" width="700" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:14px; overflow:hidden; box-shadow:0 8px 24px rgba(0,0,0,.12);">

<!-- ===================================================== -->
<!-- HEADER -->
<!-- ===================================================== -->
<tr>
<td style="background:linear-gradient(135deg,#4338ca,#7c3aed); padding:35px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr>
<td>
<div style="font-size:30px; color:white; font-weight:bold;">🎭 Playwright UI Automation</div>
<div style="margin-top:8px; font-size:15px; color:#ddd6fe;">Visual Regression Execution Report</div>
</td>
<td align="right">
<div style="display:inline-block; padding:10px 20px; background:rgba(255,255,255,.18); border-radius:999px; font-size:13px; font-weight:bold; color:white;">
${statusEmoji} ${reportStatus}
</div>
</td>
</tr>
</table>
</td>
</tr>

<!-- ===================================================== -->
<!-- EXECUTIVE DASHBOARD -->
<!-- ===================================================== -->
<tr>
<td style="padding:35px 40px 15px; text-align:center;">
<div style="font-size:64px; font-weight:700; color:${statusColour}; line-height:1;">
${passRateText}
</div>
<div style="margin-top:10px; font-size:16px; font-weight:bold; color:${statusColour};">
${rating}
</div>
<div style="margin-top:8px; font-size:13px; color:#9ca3af;">
${summary.passed} Passed • ${summary.failed} Failed • ${summary.skipped} Skipped
</div>
</td>
</tr>

<!-- ===================================================== -->
<!-- SEGMENTED PROGRESS BAR -->
<!-- ===================================================== -->
<tr>
<td style="padding:5px 40px 35px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="height:14px; border-radius:999px; overflow:hidden; background:#e5e7eb;">
<tr>
${passWidth > 0 ? `<td style="width:${passWidth}%; background:#16a34a; font-size:0; line-height:0;">&nbsp;</td>` : ""}
${failWidth > 0 ? `<td style="width:${failWidth}%; background:#dc2626; font-size:0; line-height:0;">&nbsp;</td>` : ""}
${skipWidth > 0 ? `<td style="width:${skipWidth}%; background:#d1d5db; font-size:0; line-height:0;">&nbsp;</td>` : ""}
</tr>
</table>
</td>
</tr>

<!-- ===================================================== -->
<!-- EXECUTION DETAILS -->
<!-- ===================================================== -->
<tr>
<td style="padding:0 35px 35px;">
<div style="font-size:20px; font-weight:700; color:#111827; margin-bottom:18px;">📋 Execution Details</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb; border-radius:12px; overflow:hidden;">

<tr style="background:#f9fafb;">
<td style="padding:14px 18px; font-weight:600; color:#6b7280; width:180px;">Environment</td>
<td style="padding:14px 18px; color:#111827; font-weight:600;">${environment}</td>
</tr>

<tr>
<td style="padding:14px 18px; font-weight:600; color:#6b7280; border-top:1px solid #f3f4f6;">Framework</td>
<td style="padding:14px 18px; color:#111827; border-top:1px solid #f3f4f6;">M&G UI Automation Framework</td>
</tr>

<tr style="background:#f9fafb;">
<td style="padding:14px 18px; font-weight:600; color:#6b7280; border-top:1px solid #f3f4f6;">Version</td>
<td style="padding:14px 18px; color:#111827; border-top:1px solid #f3f4f6;">1.0.0</td>
</tr>

<tr>
<td style="padding:14px 18px; font-weight:600; color:#6b7280; border-top:1px solid #f3f4f6;">Browsers Executed</td>
<td style="padding:14px 18px; color:#111827; border-top:1px solid #f3f4f6;">${browserCount}</td>
</tr>

<tr style="background:#f9fafb;">
<td style="padding:14px 18px; font-weight:600; color:#6b7280; border-top:1px solid #f3f4f6;">Execution Time</td>
<td style="padding:14px 18px; color:#111827; border-top:1px solid #f3f4f6;">${executionDuration}</td>
</tr>

<tr>
<td style="padding:14px 18px; font-weight:600; color:#6b7280; border-top:1px solid #f3f4f6;">Execution Date</td>
<td style="padding:14px 18px; color:#111827; border-top:1px solid #f3f4f6;">${executionDate} at ${executionTime}</td>
</tr>

<tr style="background:#f9fafb;">
<td style="padding:14px 18px; font-weight:600; color:#6b7280; border-top:1px solid #f3f4f6;">Status</td>
<td style="padding:14px 18px; font-weight:700; color:${statusColour}; border-top:1px solid #f3f4f6;">${statusEmoji} ${reportStatus}</td>
</tr>

</table>
</td>
</tr>

<!-- ===================================================== -->
<!-- TOTAL STATISTICS -->
<!-- ===================================================== -->
<tr>
<td style="padding:0 35px 35px;">
<div style="font-size:20px; font-weight:700; color:#111827; margin-bottom:18px;">📊 Total Statistics</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb; border-radius:12px; overflow:hidden;">
<tr style="background:#eff6ff;">
<td style="padding:14px 18px; font-weight:600; color:#1d4ed8; width:180px;">Tests Executed</td>
<td style="padding:14px 18px; font-weight:700; color:#1e3a8a;">${total}</td>
</tr>
<tr style="background:#ecfdf5;">
<td style="padding:14px 18px; font-weight:600; color:#15803d; border-top:1px solid #bbf7d0;">Passed</td>
<td style="padding:14px 18px; font-weight:700; color:#14532d; border-top:1px solid #bbf7d0;">${summary.passed}</td>
</tr>
<tr style="background:#fff1f2;">
<td style="padding:14px 18px; font-weight:600; color:#b91c1c; border-top:1px solid #fecaca;">Failed</td>
<td style="padding:14px 18px; font-weight:700; color:#7f1d1d; border-top:1px solid #fecaca;">${summary.failed}</td>
</tr>
<tr style="background:#f9fafb;">
<td style="padding:14px 18px; font-weight:600; color:#6b7280; border-top:1px solid #e5e7eb;">Skipped</td>
<td style="padding:14px 18px; font-weight:700; color:#374151; border-top:1px solid #e5e7eb;">${summary.skipped}</td>
</tr>
<tr style="background:#ffffff;">
<td style="padding:14px 18px; font-weight:600; color:#111827; border-top:1px solid #e5e7eb;">Pass Rate</td>
<td style="padding:14px 18px; font-weight:700; color:${statusColour}; border-top:1px solid #e5e7eb;">${passRateText}</td>
</tr>
</table>

</td>
</tr>

<!-- ===================================================== -->
<!-- FAILED TESTS -->
<!-- ===================================================== -->
${summary.failedTests.length > 0 ? `
<tr>
<td style="padding:0 35px 15px;">
<div style="font-size:22px; font-weight:700; color:#dc2626;">❌ Failed Tests</div>
<div style="margin-top:6px; font-size:14px; color:#6b7280;">The following test cases failed during execution.</div>
</td>
</tr>
<tr>
<td style="padding:0 35px 35px;">
${summary.failedTests.map((test: any, index: number) => {
    
    // 8. Better failed test cards parsing
    let reason = "Execution Failure";
    if (test.failureMessage.includes("screenshot")) reason = "Visual Screenshot Mismatch";
    else if (test.failureMessage.includes("Timeout")) reason = "Timeout Exceeded";
    else if (test.failureMessage.includes("expect(")) reason = "Assertion Failure";

    return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:22px; border-radius:12px; overflow:hidden; border:1px solid #fecaca;">
    <tr>
    <td style="background:#dc2626; padding:16px 20px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td><div style="font-size:16px; font-weight:700; color:white;">❌ ${test.name}</div></td>
            <td align="right" style="color:white; font-size:13px;">Failure ${index + 1}</td>
        </tr>
        </table>
    </td>
    </tr>
    <tr>
    <td style="padding:18px; background:#fff5f5;">
        <div style="font-size:13px; font-weight:700; color:#991b1b; margin-bottom:8px;">Reason</div>
        <div style="font-size:14px; color:#374151; margin-bottom:16px;">${reason}</div>

        <div style="font-size:13px; font-weight:700; color:#991b1b; margin-bottom:8px;">Details</div>
        <div style="font-family:Consolas,Courier New,monospace; font-size:12px; line-height:1.7; color:#374151; background:white; padding:14px; border-radius:8px; border:1px solid #f3f4f6; white-space:pre-wrap; word-break:break-word;">
            ${this.truncateMessage(test.failureMessage, 800)}
        </div>
    </td>
    </tr>
    </table>
    `;
}).join("")}
</td>
</tr>
` : `
<tr>
<td style="padding:20px 35px 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ecfdf5; border:1px solid #bbf7d0; border-radius:12px;">
<tr>
<td align="center" style="padding:28px;">
<div style="font-size:48px;">🎉</div>
<div style="margin-top:10px; font-size:20px; font-weight:700; color:#15803d;">All Tests Passed!</div>
<div style="margin-top:8px; font-size:14px; color:#166534;">Excellent! No failures were detected during this execution.</div>
</td>
</tr>
</table>
</td>
</tr>
`}

<!-- ===================================================== -->
<!-- FOOTER -->
<!-- ===================================================== -->
<tr>
<td style="padding:32px; background:#0f172a; text-align:center;">
<div style="font-size:18px; font-weight:bold; color:#ffffff;">🎭 M&G UI Automation Framework</div>
<div style="margin-top:8px; color:#94a3b8; font-size:13px;">Automated Visual Regression Report</div>
<div style="margin-top:18px; height:1px; background:#1e293b;"></div>
<div style="margin-top:18px; color:#64748b; font-size:12px;">Generated by M&G UI Automation Framework</div>
<div style="margin-top:6px; color:#475569; font-size:11px;">${executionDate} at ${executionTime}</div>
</td>
</tr>

</table>
</td>
</tr>
</table>
</body>
</html>
`;
    }

    /**
     * Cleans long error messages before displaying them in the email.
     * Increased limit to 800 for full Playwright stack traces.
     */
    private static truncateMessage(msg: string, length: number = 800): string {
        if (!msg) return "Unknown failure.";

        const clean = msg.replace(
            /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
            ""
        );

        return clean.length > length
            ? clean.substring(0, length) + "..."
            : clean;
    }
}
