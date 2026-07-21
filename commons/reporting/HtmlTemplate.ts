import { TestResultSummary } from "./ReportBuilder.js";

export class HtmlTemplate {

    /**
     * Builds the complete HTML email report.
     *
     * This report is compatible with:
     * • Outlook Desktop
     * • Outlook Web
     * • Gmail
     * • Office365
     * • Apple Mail
     *
     * Tables are intentionally used instead of Flex/Grid because
     * Outlook uses the Microsoft Word rendering engine.
     */
    static generate(summary: TestResultSummary): string {

        // -------------------------------------------------------
        // Calculate execution statistics
        // -------------------------------------------------------

        const total =
            summary.passed +
            summary.failed +
            summary.skipped;

        const passRate =
            total === 0
                ? 0
                : ((summary.passed / total) * 100);

        const passRateText =
            passRate.toFixed(2);

        // Progress Bar Widths

        const passWidth =
            total === 0 ? 0 :
                (summary.passed / total) * 100;

        const failWidth =
            total === 0 ? 0 :
                (summary.failed / total) * 100;

        const skipWidth =
            total === 0 ? 0 :
                (summary.skipped / total) * 100;

        // -------------------------------------------------------
        // Decide Report Status
        // -------------------------------------------------------

        const reportStatus =
            summary.failed > 0
                ? "FAILED"
                : "PASSED";

        const statusEmoji =
            summary.failed > 0
                ? "❌"
                : "✅";

        const statusColour =
            summary.failed > 0
                ? "#dc2626"
                : "#16a34a";

        const statusBackground =
            summary.failed > 0
                ? "#fff5f5"
                : "#f0fdf4";

        // Execution Time

        const executionDate =
            new Date().toLocaleString();

        // -------------------------------------------------------
        // HTML
        // -------------------------------------------------------

        return `
<html>

<head>

<meta charset="UTF-8">

<title>Playwright Automation Report</title>

</head>

<body style="
margin:0;
padding:0;
background:#edf2f7;
font-family:Segoe UI,Arial,sans-serif;
">

<table
role="presentation"
width="100%"
cellpadding="0"
cellspacing="0"
style="
background:#edf2f7;
padding:40px 0;
">

<tr>

<td align="center">

<table
role="presentation"
width="700"
cellpadding="0"
cellspacing="0"
style="
background:#ffffff;
border-radius:14px;
overflow:hidden;
box-shadow:0 8px 24px rgba(0,0,0,.12);
">

<!-- ===================================================== -->
<!-- HEADER -->
<!-- ===================================================== -->

<tr>

<td
style="
background:linear-gradient(135deg,#4338ca,#7c3aed);
padding:35px;
">

<table
role="presentation"
width="100%"
cellpadding="0"
cellspacing="0">

<tr>

<td>

<div
style="
font-size:30px;
color:white;
font-weight:bold;
">

🎭 Playwright UI Automation

</div>

<div
style="
margin-top:8px;
font-size:15px;
color:#ddd6fe;
">

Visual Regression Execution Report

</div>

</td>

<td align="right">

<div
style="
display:inline-block;
padding:10px 20px;
background:rgba(255,255,255,.18);
border-radius:999px;
font-size:13px;
font-weight:bold;
color:white;
">

${statusEmoji}
${reportStatus}

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

<td
style="
padding:35px 40px 15px;
text-align:center;
">

<div
style="
font-size:64px;
font-weight:700;
color:${statusColour};
line-height:1;
">

${passRateText}%

</div>

<div
style="
margin-top:10px;
font-size:16px;
color:#6b7280;
">

Overall Pass Rate

</div>

<div
style="
margin-top:8px;
font-size:13px;
color:#9ca3af;
">

${summary.passed} Passed • ${summary.failed} Failed • ${summary.skipped} Skipped

</div>

</td>

</tr>

<!-- ===================================================== -->
<!-- SEGMENTED PROGRESS BAR -->
<!-- ===================================================== -->

<tr>

<td
style="
padding:5px 40px 35px;
">

<table
role="presentation"
width="100%"
cellpadding="0"
cellspacing="0"
style="
height:14px;
border-radius:999px;
overflow:hidden;
background:#e5e7eb;
">

<tr>

${passWidth > 0
? `<td
style="
width:${passWidth}%;
background:#16a34a;
font-size:0;
line-height:0;
">&nbsp;</td>`
: ""}

${failWidth > 0
? `<td
style="
width:${failWidth}%;
background:#dc2626;
font-size:0;
line-height:0;
">&nbsp;</td>`
: ""}

${skipWidth > 0
? `<td
style="
width:${skipWidth}%;
background:#d1d5db;
font-size:0;
line-height:0;
">&nbsp;</td>`
: ""}

</tr>

</table>

</td>

</tr>

<!-- ===================================================== -->
<!-- SUMMARY CARDS -->
<!-- ===================================================== -->

<tr>

<td
style="
padding:0 25px 35px;
">

<table
role="presentation"
width="100%"
cellpadding="0"
cellspacing="0">

<tr>

<!-- PASSED -->

<td
width="25%"
style="padding:8px;">

<table
width="100%"
style="
background:#ecfdf5;
border:1px solid #bbf7d0;
border-radius:12px;
">

<tr>

<td
align="center"
style="padding:20px;">

<div
style="
font-size:32px;
font-weight:bold;
color:#16a34a;
">

${summary.passed}

</div>

<div
style="
margin-top:8px;
font-size:14px;
color:#15803d;
font-weight:600;
">

✅ Passed

</div>

</td>

</tr>

</table>

</td>

<!-- FAILED -->

<td
width="25%"
style="padding:8px;">

<table
width="100%"
style="
background:#fff1f2;
border:1px solid #fecaca;
border-radius:12px;
">

<tr>

<td
align="center"
style="padding:20px;">

<div
style="
font-size:32px;
font-weight:bold;
color:#dc2626;
">

${summary.failed}

</div>

<div
style="
margin-top:8px;
font-size:14px;
color:#b91c1c;
font-weight:600;
">

❌ Failed

</div>

</td>

</tr>

</table>

</td>

<!-- SKIPPED -->

<td
width="25%"
style="padding:8px;">

<table
width="100%"
style="
background:#f9fafb;
border:1px solid #e5e7eb;
border-radius:12px;
">

<tr>

<td
align="center"
style="padding:20px;">

<div
style="
font-size:32px;
font-weight:bold;
color:#6b7280;
">

${summary.skipped}

</div>

<div
style="
margin-top:8px;
font-size:14px;
color:#6b7280;
font-weight:600;
">

⏭ Skipped

</div>

</td>

</tr>

</table>

</td>

<!-- TOTAL -->

<td
width="25%"
style="padding:8px;">

<table
width="100%"
style="
background:#eff6ff;
border:1px solid #bfdbfe;
border-radius:12px;
">

<tr>

<td
align="center"
style="padding:20px;">

<div
style="
font-size:32px;
font-weight:bold;
color:#2563eb;
">

${total}

</div>

<div
style="
margin-top:8px;
font-size:14px;
color:#1d4ed8;
font-weight:600;
">

🧪 Total

</div>

</td>

</tr>

</table>

</td>

</tr>

</table>

</td>

</tr>

<!-- ===================================================== -->
<!-- EXECUTION DETAILS -->
<!-- ===================================================== -->

<tr>

<td
style="
padding:0 35px 35px;
">

<div
style="
font-size:20px;
font-weight:700;
color:#111827;
margin-bottom:18px;
">

📋 Execution Details

</div>

<table
role="presentation"
width="100%"
cellpadding="0"
cellspacing="0"
style="
border:1px solid #e5e7eb;
border-radius:12px;
overflow:hidden;
">

<tr style="background:#f9fafb;">

<td
style="
padding:14px 18px;
font-weight:600;
color:#6b7280;
width:180px;
">

Environment

</td>

<td
style="
padding:14px 18px;
color:#111827;
font-weight:600;
">

Stage

</td>

</tr>

<tr>

<td
style="
padding:14px 18px;
font-weight:600;
color:#6b7280;
border-top:1px solid #f3f4f6;
">

Framework

</td>

<td
style="
padding:14px 18px;
color:#111827;
border-top:1px solid #f3f4f6;
">

Playwright + TypeScript

</td>

</tr>

<tr style="background:#f9fafb;">

<td
style="
padding:14px 18px;
font-weight:600;
color:#6b7280;
border-top:1px solid #f3f4f6;
">

Execution Time

</td>

<td
style="
padding:14px 18px;
color:#111827;
border-top:1px solid #f3f4f6;
">

${summary.duration.toFixed(2)} seconds

</td>

</tr>

<tr>

<td
style="
padding:14px 18px;
font-weight:600;
color:#6b7280;
border-top:1px solid #f3f4f6;
">

Generated On

</td>

<td
style="
padding:14px 18px;
color:#111827;
border-top:1px solid #f3f4f6;
">

${executionDate}

</td>

</tr>

<tr style="background:#f9fafb;">

<td
style="
padding:14px 18px;
font-weight:600;
color:#6b7280;
border-top:1px solid #f3f4f6;
">

Status

</td>

<td
style="
padding:14px 18px;
font-weight:700;
color:${statusColour};
border-top:1px solid #f3f4f6;
">

${statusEmoji} ${reportStatus}

</td>

</tr>

</table>

</td>

</tr>

<!-- ===================================================== -->
<!-- EXECUTION SUMMARY -->
<!-- ===================================================== -->

<tr>

<td
style="
padding:0 35px 35px;
">

<div
style="
font-size:20px;
font-weight:700;
color:#111827;
margin-bottom:18px;
">

📊 Execution Summary

</div>

<table
role="presentation"
width="100%"
cellpadding="0"
cellspacing="12">

<tr>

<td
style="
background:#eff6ff;
border-radius:12px;
padding:20px;
text-align:center;
">

<div
style="
font-size:14px;
color:#2563eb;
font-weight:600;
">

Pass Rate

</div>

<div
style="
font-size:34px;
font-weight:700;
color:#1d4ed8;
margin-top:8px;
">

${passRateText}%

</div>

</td>

<td
style="
background:#f9fafb;
border-radius:12px;
padding:20px;
text-align:center;
">

<div
style="
font-size:14px;
color:#6b7280;
font-weight:600;
">

Tests Executed

</div>

<div
style="
font-size:34px;
font-weight:700;
color:#111827;
margin-top:8px;
">

${total}

</div>

</td>

</tr>

</table>

</td>

</tr>

<!-- ===================================================== -->
<!-- FAILED TESTS -->
<!-- ===================================================== -->

${summary.failedTests.length > 0 ? \`

<tr>

<td
style="
padding:0 35px 15px;
">

<div
style="
font-size:22px;
font-weight:700;
color:#dc2626;
">

❌ Failed Tests

</div>

<div
style="
margin-top:6px;
font-size:14px;
color:#6b7280;
">

The following test cases failed during execution.

</div>

</td>

</tr>

<tr>

<td
style="
padding:0 35px 35px;
">

${summary.failedTests.map((test:any,index:number)=>\`

<table
role="presentation"
width="100%"
cellpadding="0"
cellspacing="0"
style="
margin-bottom:22px;
border-radius:12px;
overflow:hidden;
border:1px solid #fecaca;
">

<!-- Header -->

<tr>

<td
style="
background:#dc2626;
padding:16px 20px;
">

<table
role="presentation"
width="100%"
cellpadding="0"
cellspacing="0">

<tr>

<td>

<div
style="
font-size:16px;
font-weight:700;
color:white;
">

❌ ${test.name}

</div>

</td>

<td
align="right"
style="
color:white;
font-size:13px;
">

Failure ${index+1}

</td>

</tr>

</table>

</td>

</tr>

<!-- Body -->

<tr>

<td
style="
padding:18px;
background:#fff5f5;
">

<div
style="
font-size:13px;
font-weight:700;
color:#991b1b;
margin-bottom:8px;
">

Failure Message

</div>

<div
style="
font-family:Consolas,Courier New,monospace;
font-size:12px;
line-height:1.7;
color:#374151;
background:white;
padding:14px;
border-radius:8px;
border:1px solid #f3f4f6;
white-space:pre-wrap;
word-break:break-word;
">

${this.truncateMessage(test.failureMessage,450)}

</div>

</td>

</tr>

<!-- Footer -->

<tr>

<td
style="
padding:14px 18px;
background:#fafafa;
border-top:1px solid #f3f4f6;
">

<table
role="presentation"
width="100%">

<tr>

<td
style="
font-size:12px;
color:#6b7280;
">

📍 Status

</td>

<td
align="right"
style="
font-size:12px;
font-weight:600;
color:#dc2626;
">

Failed

</td>

</tr>

</table>

</td>

</tr>

</table>

\`).join("")}

</td>

</tr>

\`
:
\`
<tr>

<td
style="
padding:20px 35px 40px;
">

<table
role="presentation"
width="100%"
cellpadding="0"
cellspacing="0"
style="
background:#ecfdf5;
border:1px solid #bbf7d0;
border-radius:12px;
">

<tr>

<td
align="center"
style="
padding:28px;
">

<div
style="
font-size:48px;
">

🎉

</div>

<div
style="
margin-top:10px;
font-size:20px;
font-weight:700;
color:#15803d;
">

All Tests Passed!

</div>

<div
style="
margin-top:8px;
font-size:14px;
color:#166534;
">

Excellent! No failures were detected during this execution.

</div>

</td>

</tr>

</table>

</td>

</tr>

\`}

                                <!-- Footer -->
                                <tr>
                                    <td style="padding:32px;background:#0f172a;text-align:center;">

                                        <div style="font-size:18px;font-weight:bold;color:#ffffff;">
                                            🎭 Playwright UI Automation Framework
                                        </div>

                                        <div style="margin-top:8px;color:#94a3b8;font-size:13px;">
                                            Automated Visual Regression Report
                                        </div>

                                        <div style="margin-top:18px;height:1px;background:#1e293b;"></div>

                                        <div style="margin-top:18px;color:#64748b;font-size:12px;">
                                            Generated automatically by your Playwright Framework
                                        </div>

                                        <div style="margin-top:6px;color:#475569;font-size:11px;">
                                            © ${new Date().getFullYear()} UI Automation
                                        </div>

                                    </td>
                                </tr>

                            </table>
                        </td>
                    </tr>
                </table>
            </body>
        </html>
        \`;
    }


    /**
     * Cleans long error messages before displaying them in the email.
     */
    private static truncateMessage(msg: string, length: number = 400): string {

        if (!msg)
            return "Unknown failure.";

        const clean = msg.replace(
            /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
            ""
        );

        return clean.length > length
            ? clean.substring(0, length) + "..."
            : clean;
    }

}
