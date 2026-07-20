// Import the TestResultSummary structure so we know what data to expect.
import { TestResultSummary } from "./ReportBuilder.js";

// Export the HtmlTemplate class so we can use it to build emails.
export class HtmlTemplate {
    /**
     * Generates a styled HTML email body presenting the test execution summary.
     */
    // A function that takes our test scorecard and returns HTML code for an email.
    static generate(summary: TestResultSummary): string {
        // Calculate the total number of tests run by adding passed, failed, and skipped together.
        const total = summary.passed + summary.failed + summary.skipped;

        // Calculate the pass percentage (e.g. 95.50%). If no tests ran, make it 0.
        const passRateNum = total > 0 ? (summary.passed / total) * 100 : 0;
        const passRate = passRateNum.toFixed(2);

        // Pick a status colour/emoji for the header banner based on how the run went.
        // Email clients don't reliably support CSS conditionals, so this is worked out
        // in plain JS/TS ahead of time and dropped straight into the template.
        const statusColor = summary.failed > 0 ? "#dc2626" : "#16a34a";
        const statusBg = summary.failed > 0 ? "#fef2f2" : "#f0fdf4";
        const statusEmoji = summary.failed > 0 ? "⚠️" : "✅";
        const statusText = summary.failed > 0 ? "Attention needed" : "All clear";

        // Widths (as percentages) for the segmented pass-rate bar. Each segment is
        // rendered as its own table cell so the bar renders consistently even in
        // email clients (like Outlook desktop) that don't support flexbox/grid.
        const passWidth = total > 0 ? (summary.passed / total) * 100 : 0;
        const failWidth = total > 0 ? (summary.failed / total) * 100 : 0;
        const skipWidth = total > 0 ? (summary.skipped / total) * 100 : 0;

        // Create the actual HTML content. The text inside the backticks (` `) is returned as a long string.
        return `
        <html>
            <body style="margin: 0; padding: 0; background: #eef1f5; font-family: 'Segoe UI', Arial, sans-serif;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: #eef1f5; padding: 32px 0;">
                    <tr>
                        <td align="center">
                            <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.08);">

                                <!-- Header: gradient banner with the report title and overall run status -->
                                <tr>
                                    <td style="background: linear-gradient(135deg, #4f46e5, #7c3aed); padding: 28px 32px;">
                                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td>
                                                    <h1 style="margin: 0; color: #ffffff; font-size: 20px; letter-spacing: 0.3px;">
                                                        🎭 Playwright UI Automation Report
                                                    </h1>
                                                    <p style="margin: 4px 0 0; color: #e0e7ff; font-size: 13px;">
                                                        Visual regression run summary
                                                    </p>
                                                </td>
                                                <td align="right">
                                                    <span style="display: inline-block; background: rgba(255,255,255,0.15); color: #ffffff; padding: 6px 14px; border-radius: 999px; font-size: 12px; font-weight: 600;">
                                                        ${statusEmoji} ${statusText}
                                                    </span>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                                <!-- Pass-rate hero: big number + segmented progress bar -->
                                <tr>
                                    <td style="padding: 28px 32px 8px; text-align: center;">
                                        <div style="font-size: 42px; font-weight: 700; color: ${statusColor}; line-height: 1;">
                                            ${passRate}%
                                        </div>
                                        <div style="font-size: 13px; color: #6b7280; margin-top: 4px;">
                                            pass rate across ${total} test${total === 1 ? "" : "s"}
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px 32px 24px;">
                                        <!-- Segmented bar: one table row, three proportionally-sized cells -->
                                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius: 999px; overflow: hidden; height: 10px;">
                                            <tr style="height: 10px;">
                                                ${passWidth > 0 ? `<td style="width: ${passWidth}%; background: #16a34a; font-size: 0; line-height: 0;">&nbsp;</td>` : ""}
                                                ${failWidth > 0 ? `<td style="width: ${failWidth}%; background: #dc2626; font-size: 0; line-height: 0;">&nbsp;</td>` : ""}
                                                ${skipWidth > 0 ? `<td style="width: ${skipWidth}%; background: #d1d5db; font-size: 0; line-height: 0;">&nbsp;</td>` : ""}
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                                <!-- Stat cards: Passed / Failed / Skipped, side by side -->
                                <tr>
                                    <td style="padding: 0 24px 24px;">
                                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td width="33.33%" style="padding: 8px;">
                                                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px;">
                                                        <tr><td style="padding: 14px; text-align: center;">
                                                            <div style="font-size: 22px; font-weight: 700; color: #16a34a;">${summary.passed}</div>
                                                            <div style="font-size: 12px; color: #15803d; margin-top: 2px;">✅ Passed</div>
                                                        </td></tr>
                                                    </table>
                                                </td>
                                                <td width="33.33%" style="padding: 8px;">
                                                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 10px;">
                                                        <tr><td style="padding: 14px; text-align: center;">
                                                            <div style="font-size: 22px; font-weight: 700; color: #dc2626;">${summary.failed}</div>
                                                            <div style="font-size: 12px; color: #b91c1c; margin-top: 2px;">❌ Failed</div>
                                                        </td></tr>
                                                    </table>
                                                </td>
                                                <td width="33.33%" style="padding: 8px;">
                                                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 10px;">
                                                        <tr><td style="padding: 14px; text-align: center;">
                                                            <div style="font-size: 22px; font-weight: 700; color: #6b7280;">${summary.skipped}</div>
                                                            <div style="font-size: 12px; color: #6b7280; margin-top: 2px;">⏭️ Skipped</div>
                                                        </td></tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                                <!-- Run details: environment, browser, duration -->
                                <tr>
                                    <td style="padding: 0 32px 24px;">
                                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: #f9fafb; border-radius: 10px; border: 1px solid #eef0f2;">
                                            <tr>
                                                <td style="padding: 10px 16px; border-bottom: 1px solid #eef0f2; font-size: 13px; color: #6b7280; width: 130px;">Environment</td>
                                                <td style="padding: 10px 16px; border-bottom: 1px solid #eef0f2; font-size: 13px; color: #111827; font-weight: 600;">Stage</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 10px 16px; border-bottom: 1px solid #eef0f2; font-size: 13px; color: #6b7280;">Browser</td>
                                                <td style="padding: 10px 16px; border-bottom: 1px solid #eef0f2; font-size: 13px; color: #111827; font-weight: 600;">Chromium / WebKit</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 10px 16px; font-size: 13px; color: #6b7280;">Duration</td>
                                                <td style="padding: 10px 16px; font-size: 13px; color: #111827; font-weight: 600;">${summary.duration.toFixed(2)}s</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                                <!-- Check if there are any failed tests. If there are, show the error details. -->
                                ${summary.failedTests.length > 0 ? `
                                <tr>
                                    <td style="padding: 0 32px 8px;">
                                        <h3 style="margin: 0 0 12px; color: #b91c1c; font-size: 15px;">Failed Tests</h3>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 0 32px 16px;">
                                        <!-- Loop through every failed test and render it as its own card -->
                                        ${summary.failedTests.map((t: any) => `
                                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: #fef2f2; border-left: 3px solid #dc2626; border-radius: 6px; margin-bottom: 10px;">
                                            <tr>
                                                <td style="padding: 12px 14px;">
                                                    <div style="font-weight: 700; color: #991b1b; font-size: 13px;">&#10060; ${t.name}</div>
                                                    <!-- Use the truncateMessage function to clean up the error text -->
                                                    <div style="margin-top: 6px; color: #7f1d1d; font-size: 12px; font-family: 'Courier New', monospace; white-space: pre-wrap; line-height: 1.5;">${this.truncateMessage(t.failureMessage)}</div>
                                                </td>
                                            </tr>
                                        </table>
                                        `).join("")}
                                    </td>
                                </tr>
                                ` :
                // If there are NO failed tests, show a success banner instead!
                `
                                <tr>
                                    <td style="padding: 0 32px 24px;">
                                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: ${statusBg}; border-radius: 10px;">
                                            <tr><td style="padding: 18px; text-align: center;">
                                                <span style="color: #15803d; font-size: 14px; font-weight: 600;">🎉 All tests passed successfully!</span>
                                            </td></tr>
                                        </table>
                                    </td>
                                </tr>
                                `}

                                <!-- Footer -->
                                <tr>
                                    <td style="padding: 16px 32px 28px; border-top: 1px solid #f0f0f0;">
                                        <p style="margin: 0; color: #9ca3af; font-size: 11px; text-align: center;">
                                            This is an automated message generated by the Playwright Framework.
                                        </p>
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
     * Cleans up console color codes and truncates long error messages for readability.
     */
    // A helper function that takes a long error message and cuts it down so it doesn't break the email layout.
    private static truncateMessage(msg: string, length: number = 300): string {
        // If there is no message, return a default string.
        if (!msg) return "Unknown failure reason.";

        // Remove weird terminal color codes (ANSI escape sequences) that make the text look like gibberish.
        const clean = msg.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '');

        // If the cleaned message is too long, cut it to the max length and add '...'. Otherwise, keep it as is.
        return clean.length > length ? clean.substring(0, length) + "..." : clean;
    }
}