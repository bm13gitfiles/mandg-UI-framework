import { EmailReporter } from "./commons/reporting/EmailReporter.js";
import { ReportBuilder } from "./commons/reporting/ReportBuilder.js";
import { HtmlTemplate } from "./commons/reporting/HtmlTemplate.js";
import { AttachmentCollector } from "./commons/reporting/AttachmentCollector.js";
import * as path from "path";

export default async () => {
    console.log("GLOBAL TEARDOWN: STARTING REPORTING SEQUENCE...");

    try {
        const resultsFile = path.join(process.cwd(), "results.xml");
        const summary = ReportBuilder.buildSummary(resultsFile);
        
        const html = HtmlTemplate.generate(summary);
        
        // Collect screenshots/traces from the outputDir specified in playwright config
        const failureDir = path.join(process.cwd(), "failure-screenshots");
        const attachments = AttachmentCollector.collect(failureDir);

        console.log(`GLOBAL TEARDOWN: FOUND ${attachments.length} ATTACHMENTS.`);

        await EmailReporter.send(html, attachments);
    } catch (error) {
        console.error("GLOBAL TEARDOWN ERROR:", error);
    }
};
