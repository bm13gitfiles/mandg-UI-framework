// Import the file system module so we can read files from the computer.
import * as fs from "fs";
// Import a tool called XMLParser that translates XML code into easy-to-read Javascript objects.
import { XMLParser } from "fast-xml-parser";

/**
 * Represents a summary of the test execution results.
 */
// Define a structure that holds the final scorecard for our tests.
export interface TestResultSummary {
    // The number of tests that succeeded.
    passed: number;
    // The number of tests that failed.
    failed: number;
    // The number of tests that were skipped or ignored.
    skipped: number;
    // How long the tests took to run in seconds.
    duration: number;
    // A list containing the names and error messages of the tests that failed.
    failedTests: Array<{ name: string; failureMessage: string }>;
}

// Export the ReportBuilder class so other files can use it.
export class ReportBuilder {
    /**
     * Parses a Playwright JUnit XML results file to build a high-level summary
     * of the test execution.
     */
    // A function that reads the test results file and creates the scorecard.
    static buildSummary(resultsFilePath: string): TestResultSummary {
        // Check if the results file actually exists.
        if (!fs.existsSync(resultsFilePath)) {
            // If it's missing, print an error message to the console.
            console.error(`JUNIT RESULTS FILE NOT FOUND AT: ${resultsFilePath}`);
            // Return an empty scorecard with zeros everywhere.
            return { passed: 0, failed: 0, skipped: 0, duration: 0, failedTests: [] };
        }

        // Create a new XML Parser tool to read the file.
        const parser = new XMLParser({ ignoreAttributes: false });
        // Read the actual text inside the results file.
        const xml = fs.readFileSync(resultsFilePath, "utf8");
        // Convert the XML text into a Javascript object we can interact with.
        const report = parser.parse(xml);

        // 1. Read summary from the root node (Highest Priority)
        const root = report.testsuites ?? {};
        const totalTests = parseInt(root["@_tests"] || "0");
        const failed = parseInt(root["@_failures"] || "0");
        const skipped = parseInt(root["@_skipped"] || "0");
        const duration = parseFloat(root["@_time"] || "0");

        const passed = totalTests - failed - skipped;
        
        // Create an empty list to hold the failed test details.
        const failedTests: Array<{ name: string; failureMessage: string }> = [];

        // Try to find the section in the report called 'testsuites'.
        const testsuites = report.testsuites?.testsuite;
        
        // If there are no test suites, return the calculated scorecard early.
        if (!testsuites) return { passed, failed, skipped, duration, failedTests };

        // Sometimes there is one suite, sometimes multiple. This ensures it's always treated as a list.
        const suitesArray = Array.isArray(testsuites) ? testsuites : [testsuites];

        // Look at every test suite one by one.
        for (const suite of suitesArray) {
            // Get the list of individual test cases inside this suite.
            const cases = suite.testcase;
            // If there are no test cases, skip to the next suite.
            if (!cases) continue;

            // Ensure the test cases are treated as a list.
            const casesArray = Array.isArray(cases) ? cases : [cases];
            
            // Look at every individual test case one by one.
            for (const tc of casesArray) {
                // 2. Better failure parsing
                if (tc.failure !== undefined) {
                    let message = "Failed";

                    if (typeof tc.failure === "string") {
                        message = tc.failure;
                    } else if (typeof tc.failure === "object") {
                        message =
                            tc.failure["@_message"] ??
                            tc.failure["#text"] ??
                            JSON.stringify(tc.failure);
                    }

                    // Add the failed test's name and error message to our failed tests list.
                    failedTests.push({
                        name: tc['@_name'] ?? 'Unknown Test',
                        failureMessage: message
                    });
                }
            }
        }

        // Return the final calculated scorecard.
        return { passed, failed, skipped, duration, failedTests };
    }
}
