// Import our custom email sender that uses Microsoft Graph to send emails.
import { EmailReporter } from "./commons/reporting/EmailReporter.js";
// Import our report builder that tallies up the final scores (passed/failed tests).
import { ReportBuilder } from "./commons/reporting/ReportBuilder.js";
// Import the tool that builds the beautiful HTML email structure.
import { HtmlTemplate } from "./commons/reporting/HtmlTemplate.js";
// Import the tool that searches for any failure screenshots to attach to the email.
import { AttachmentCollector } from "./commons/reporting/AttachmentCollector.js";
// Import Node's 'path' module to safely build folder paths.
import * as path from "path";
// Import Node's 'fs' (File System) module to read and rename files on the computer.
import * as fs from "fs";

// Export this function as the "default" so Playwright knows this is the main teardown script.
export default async () => {
    // Print a message so we know the test run is completely finished and reporting is starting.
    console.log("GLOBAL TEARDOWN: STARTING REPORTING SEQUENCE...");

    try {
        // Point exactly to where Playwright saved the raw XML test results file.
        const resultsFile = path.join(process.cwd(), "results.xml");
        
        // Pass that XML file into our ReportBuilder to get a clean scorecard summary.
        const summary = ReportBuilder.buildSummary(resultsFile);

        // Feed that scorecard into our HtmlTemplate to generate the final email body.
        const html = HtmlTemplate.generate(summary);

        // Define the folder where Playwright drops the final HTML test report.
        const reportsDir = path.join(process.cwd(), "reports");
        const attachments: any[] = [];
        
        // Check to make sure the reports folder actually exists.
        if (fs.existsSync(reportsDir)) {
            // Find the default report file (index.html).
            const indexFile = path.join(reportsDir, "index.html");
            // Define what we want to rename it to (Test-report.html).
            const renamedFile = path.join(reportsDir, "Test-report.html");
            
            // If the original index.html exists...
            if (fs.existsSync(indexFile)) {
                // Rename it to Test-report.html so it looks professional in the email.
                fs.renameSync(indexFile, renamedFile);
            }

            // If our newly renamed file now exists...
            if (fs.existsSync(renamedFile)) {
                // Add it to our list of email attachments!
                attachments.push({
                    filename: "Test-report.html", // The name that will appear in the email.
                    path: renamedFile // Where to find the file on the computer.
                });
                console.log("GLOBAL TEARDOWN: ATTACHED HTML REPORT SUCCESSFULLY.");
            }
        }

        // Print exactly how many attachments we found (should be 1).
        console.log(`GLOBAL TEARDOWN: FOUND ${attachments.length} ATTACHMENTS.`);

        // Pass the HTML email body, attachments, and scorecard to the EmailReporter to send it!
        await EmailReporter.send(html, attachments, summary);
    } catch (error) {
        // If anything crashes during this whole process, catch it and print the error so we can fix it.
        console.error("GLOBAL TEARDOWN ERROR:", error);
    }
};
