import { TestResultSummary } from "./ReportBuilder.js";
import { Theme } from "./Theme.js";

import * as fs from "fs";
import * as path from "path";

export class Components {

    static page(content: string): string {
        return `
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin:0; padding:0; background:${Theme.pageBackground}; font-family:${Theme.fontFamily}; color:#333333;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${Theme.pageBackground};">
                <tr>
                    <td align="center">
                        <!-- Main Wrapper -->
                        <table role="presentation" width="${Theme.reportWidth}" cellspacing="0" cellpadding="0" style="margin: 0 auto; background:${Theme.white}; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                            ${content}
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
        `;
    }

    static header(summary: TestResultSummary): string {
        let imageSrc = ''; // Fallback if image isn't found
        try {
            const imagePath = path.resolve(process.cwd(), 'assets/email-banner.png');
            if (fs.existsSync(imagePath)) {
                const base64 = fs.readFileSync(imagePath).toString('base64');
                imageSrc = `data:image/png;base64,${base64}`;
            }
        } catch (e) {
            console.warn("Could not load email banner image.", e);
        }

        return `
        <tr>
            <td style="background:${Theme.bannerBg}; text-align: center;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                    <tr>
                        <td align="center">
                            ${imageSrc ? `<img src="${imageSrc}" alt="M&G UI Automation Framework Banner" style="width:100%; max-width:720px; display:block;" />` : 
                            `<div style="padding: 40px; color: ${Theme.white}; font-size: 24px; font-weight: bold;">M&G UI Automation Test Report</div>`}
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        `;
    }

    static combinedMetrics(summary: TestResultSummary): string {
        let bgImageSrc = ''; // Fallback if image isn't found
        try {
            const imagePath = path.resolve(process.cwd(), 'assets/bg-arrows.png');
            if (fs.existsSync(imagePath)) {
                const base64 = fs.readFileSync(imagePath).toString('base64');
                bgImageSrc = `data:image/png;base64,${base64}`;
            }
        } catch (e) {
            console.warn("Could not load background image.", e);
        }

        const bgAttr = bgImageSrc ? `background="${bgImageSrc}" style="background-image: url('${bgImageSrc}'); background-size: cover; background-position: center;"` : `style="background:${Theme.white};"`;

        return `
        <tr>
            <td ${bgAttr}>
                <!-- Semi-transparent overlay to reduce background opacity -->
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: rgba(255, 255, 255, 0.85);">
                    ${this.executiveSummaryInner(summary)}
                    ${this.statisticsInner(summary)}
                </table>
            </td>
        </tr>
        `;
    }

    private static executiveSummaryInner(summary: TestResultSummary): string {
        const total = summary.passed + summary.failed + summary.skipped;
        const passRate = total === 0 ? 0 : ((summary.passed / total) * 100);

        return `
        <tr>
            <td align="center" style="padding: 40px;">
                <table role="presentation" width="220" cellspacing="0" cellpadding="0" style="background:${Theme.white}; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
                    <tr>
                        <td align="center" style="padding: 20px;">
                            <div style="font-size: 14px; color: ${Theme.textSecondary};">Execution Summary</div>
                            <div style="font-size: 48px; font-weight: bold; color: ${Theme.primary}; margin: 10px 0;">${passRate.toFixed(1)}%</div>
                            <div style="font-size: 14px; color: ${Theme.textSecondary};">Overall Pass Rate</div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        `;
    }

    private static statisticsInner(summary: TestResultSummary): string {
        const total = summary.passed + summary.failed + summary.skipped;

        return `
        <tr>
            <td style="padding: 0 40px 40px;">
                <table role="presentation" width="100%" cellspacing="15" cellpadding="0">
                    <tr>
                        ${this.statBlock(Theme.block1Blue, total.toString(), "Total")}
                        ${this.statBlock(Theme.block2Green, summary.passed.toString(), "Passed")}
                        ${this.statBlock(Theme.block3Red, summary.failed.toString(), "Failed")}
                        ${this.statBlock(Theme.block4Pink, summary.skipped.toString(), "Skipped")}
                    </tr>
                </table>
            </td>
        </tr>
        `;
    }

    private static statBlock(bgColor: string, value: string, label: string): string {
        return `
        <td style="background:${bgColor}; height: 160px; width: 25%; text-align: center; vertical-align: middle;">
            <div style="font-size: 40px; font-weight: bold; color: ${Theme.white};">${value}</div>
            <div style="font-size: 16px; color: ${Theme.white}; margin-top: 5px;">${label}</div>
        </td>
        `;
    }

    static progress(summary: TestResultSummary): string {
        const total = summary.passed + summary.failed + summary.skipped;
        const passedWidth = total === 0 ? 0 : (summary.passed / total) * 100;
        const failedWidth = total === 0 ? 0 : (summary.failed / total) * 100;
        const skippedWidth = total === 0 ? 0 : (summary.skipped / total) * 100;

        return `
        <tr>
            <td style="padding: 0 40px 40px; background:${Theme.white};">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                    <tr>
                        <td style="padding-top: 20px; padding-bottom: 15px;">
                            <div style="font-size: 16px; font-weight: bold; color: ${Theme.primary};">Execution Distribution</div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="height: 16px; border-radius: 8px; overflow: hidden; background: #ddd;">
                                <tr>
                                    ${passedWidth > 0 ? `<td style="width:${passedWidth}%; background:${Theme.block2Green};"></td>` : ""}
                                    ${failedWidth > 0 ? `<td style="width:${failedWidth}%; background:${Theme.block3Red};"></td>` : ""}
                                    ${skippedWidth > 0 ? `<td style="width:${skippedWidth}%; background:${Theme.block4Pink};"></td>` : ""}
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-top: 15px;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                                <tr>
                                    ${this.legendDot(Theme.block2Green, "Passed")}
                                    ${this.legendDot(Theme.block3Red, "Failed")}
                                    ${this.legendDot(Theme.block4Pink, "Skipped")}
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        `;
    }

    private static legendDot(color: string, label: string): string {
        return `
        <td style="font-size: 13px; color: ${Theme.textSecondary}; text-align: center; width: 33%;">
            <span style="display:inline-block; width:12px; height:12px; border-radius:50%; background:${color}; margin-right:8px; vertical-align: middle;"></span>
            <span style="vertical-align: middle;">${label}</span>
        </td>
        `;
    }

    static execution(summary: TestResultSummary): string {
        const executionMinutes = (summary.duration / 60).toFixed(2);
        const executionDate = new Date().toLocaleString("en-GB", {
            day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
        });

        return `
        <tr>
            <td style="padding: 20px 40px 40px; background:${Theme.white};">
                <div style="font-size: 22px; font-weight: bold; color: ${Theme.primary}; margin-bottom: 20px; font-family: ${Theme.fontFamily};">Execution Details</div>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-top: 2px solid ${Theme.primary}; margin-top: 10px;">
                    ${this.detailRow("Environment", "Stage")}
                    ${this.detailRow("Framework", "Playwright")}
                    ${this.detailRow("Execution Time", `${executionMinutes} Minutes`)}
                    ${this.detailRow("Generated", executionDate)}
                </table>
            </td>
        </tr>
        `;
    }

    private static detailRow(label: string, value: string): string {
        return `
        <tr>
            <td style="padding: 16px 10px; border-bottom: 2px solid ${Theme.tableBorderColor}; ${Theme.tableTitleFont} width: 40%;">
                ${label}
            </td>
            <td style="padding: 16px 10px; border-bottom: 2px solid ${Theme.tableBorderColor}; ${Theme.tableTextFont}">
                ${value}
            </td>
        </tr>
        `;
    }

    static failures(summary: TestResultSummary): string {
        const hasFailures = summary.failedTests.length > 0;
        const titleText = hasFailures ? "Failures Observed:" : "No failures observed in this run";
        
        return `
        <tr>
            <td style="padding: 40px 40px 50px; background:${Theme.risksBackground};">
                <div style="font-size: 26px; font-weight: bold; color: ${Theme.risksText}; margin-bottom: ${hasFailures ? '25px' : '0'}; font-family: ${Theme.fontFamily}; ${hasFailures ? '' : 'text-align: center;'}">${titleText}</div>
                ${hasFailures ? `
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                    ${summary.failedTests.map((test, index) => {
                        const cleanMsg = test.failureMessage.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, "");
                        
                        let shortReason = cleanMsg.length > 80 ? cleanMsg.substring(0, 80) + "..." : cleanMsg;
                        
                        if (cleanMsg.includes("Expected an image")) shortReason = "Visual comparison detected differences";
                        if (cleanMsg.includes("Timeout")) shortReason = "Timeout exceeded waiting for element";
                        if (cleanMsg.includes("locator")) shortReason = "Target element not found";
                        
                        return `
                        <tr>
                            <td valign="top" style="width: 24px; padding-top: 5px;">
                                <div style="width: 14px; height: 14px; background: ${Theme.risksBullet};"></div>
                            </td>
                            <td style="padding-bottom: 18px; color: ${Theme.risksText}; font-size: 18px; line-height: 1.5; font-family: ${Theme.fontFamily};">
                                ${test.name}: ${shortReason}
                            </td>
                        </tr>
                        `;
                    }).join("")}
                </table>
                ` : ""}
            </td>
        </tr>
        `;
    }

    static footer(): string {
        return `
        <tr>
            <td style="padding: 30px 40px; background:${Theme.white}; text-align: center; color: ${Theme.textSecondary}; font-size: 12px; border-top: 1px solid ${Theme.border};">
                This report was generated automatically by the M&G UI Automation Framework.<br>
                Powered by Playwright Visual Regression Testing.
            </td>
        </tr>
        `;
    }
}
