import * as fs from "fs";
import { XMLParser } from "fast-xml-parser";

export interface TestResultSummary {
    passed: number;
    failed: number;
    skipped: number;
    duration: number;
    failedTests: Array<{ name: string; failureMessage: string }>;
}

export class ReportBuilder {
    static buildSummary(resultsFilePath: string): TestResultSummary {
        if (!fs.existsSync(resultsFilePath)) {
            console.error(`JUNIT RESULTS FILE NOT FOUND AT: ${resultsFilePath}`);
            return { passed: 0, failed: 0, skipped: 0, duration: 0, failedTests: [] };
        }

        const parser = new XMLParser({ ignoreAttributes: false });
        const xml = fs.readFileSync(resultsFilePath, "utf8");
        const report = parser.parse(xml);

        let passed = 0;
        let failed = 0;
        let skipped = 0;
        let duration = 0;
        const failedTests: Array<{ name: string; failureMessage: string }> = [];

        const testsuites = report.testsuites?.testsuite;
        if (!testsuites) return { passed, failed, skipped, duration, failedTests };

        const suitesArray = Array.isArray(testsuites) ? testsuites : [testsuites];

        for (const suite of suitesArray) {
            const suiteTests = parseInt(suite['@_tests'] || '0');
            const suiteFailures = parseInt(suite['@_failures'] || '0');
            const suiteSkipped = parseInt(suite['@_skipped'] || '0');
            const suiteTime = parseFloat(suite['@_time'] || '0');

            failed += suiteFailures;
            skipped += suiteSkipped;
            passed += (suiteTests - suiteFailures - suiteSkipped);
            duration += suiteTime;

            const cases = suite.testcase;
            if (!cases) continue;

            const casesArray = Array.isArray(cases) ? cases : [cases];
            for (const tc of casesArray) {
                if (tc.failure) {
                    const message = typeof tc.failure === 'object' ? tc.failure['@_message'] || tc.failure['#text'] || "Failed" : tc.failure;
                    failedTests.push({
                        name: tc['@_name'] || 'Unknown Test',
                        failureMessage: message
                    });
                }
            }
        }

        return { passed, failed, skipped, duration, failedTests };
    }
}
