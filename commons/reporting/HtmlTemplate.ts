import { TestResultSummary } from "./ReportBuilder.js";
import { Theme } from "./Theme.js";
import { Components } from "./Components.js";

export class HtmlTemplate {
    static generate(summary: TestResultSummary): string {
        return Components.page(`
            ${Components.header(summary)}
            ${Components.combinedMetrics(summary)}
            ${Components.progress(summary)}
            ${Components.execution(summary)}
            ${Components.failures(summary)}
            ${Components.footer()}
        `);
    }
}