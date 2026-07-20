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

        // Start keeping score with zeros.
        let passed = 0;
        let failed = 0;
        let skipped = 0;
        let duration = 0;
        
        // Create an empty list to hold the failed test details.
        const failedTests: Array<{ name: string; failureMessage: string }> = [];

        // Try to find the section in the report called 'testsuites'.
        const testsuites = report.testsuites?.testsuite;
        
        // If there are no test suites, return the empty scorecard.
        if (!testsuites) return { passed, failed, skipped, duration, failedTests };

        // Sometimes there is one suite, sometimes multiple. This ensures it's always treated as a list.
        const suitesArray = Array.isArray(testsuites) ? testsuites : [testsuites];

        // Look at every test suite one by one.
        for (const suite of suitesArray) {
            // Read the total number of tests from the report.
            const suiteTests = parseInt(suite['@_tests'] || '0');
            // Read the number of failed tests.
            const suiteFailures = parseInt(suite['@_failures'] || '0');
            // Read the number of skipped tests.
            const suiteSkipped = parseInt(suite['@_skipped'] || '0');
            // Read how much time this suite took to run.
            const suiteTime = parseFloat(suite['@_time'] || '0');

            // Add this suite's failures to the total failure count.
            failed += suiteFailures;
            // Add this suite's skipped tests to the total skipped count.
            skipped += suiteSkipped;
            // Calculate passed tests by subtracting failures and skipped from the total.
            passed += (suiteTests - suiteFailures - suiteSkipped);
            // Add this suite's time to the total duration.
            duration += suiteTime;

            // Get the list of individual test cases inside this suite.
            const cases = suite.testcase;
            // If there are no test cases, skip to the next suite.
            if (!cases) continue;

            // Ensure the test cases are treated as a list.
            const casesArray = Array.isArray(cases) ? cases : [cases];
            
            // Look at every individual test case one by one.
            for (const tc of casesArray) {
                // Check if this test case has a 'failure' recorded.
                if (tc.failure) {
                    // Extract the error message, checking different possible formats.
                    const message = typeof tc.failure === 'object' ? tc.failure['@_message'] || tc.failure['#text'] || "Failed" : tc.failure;
                    
                    // Add the failed test's name and error message to our failed tests list.
                    failedTests.push({
                        name: tc['@_name'] || 'Unknown Test',
                        failureMessage: message
                    });
                }
            }
        }

        // Return the final calculated scorecard.
        return { passed, failed, skipped, duration, failedTests };
    }
}
