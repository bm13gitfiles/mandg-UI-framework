# M&G UI Automation Framework

This repository contains the Playwright-based UI automation framework used for validating and performing visual regression testing on M&G's bespoke UI components.

## 🚀 Features

- **Visual Regression Testing**: Automated baseline comparisons for 55+ UI components.
- **Global Setup**: Automatically authenticates and accepts the OneTrust Cookie Banner globally to significantly speed up test execution.
- **Parallel Execution**: Components are tested concurrently across multiple worker threads to minimize test suite duration.
- **CI/CD Ready**: Includes a declarative `Jenkinsfile` for seamless integration into Jenkins pipelines with automatic test retries and artifact archiving.
- **Multi-Environment Support**: Easily switch between `stage`, `dev`, and `prod` environments.

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) (Version 18 or higher recommended)
- Git

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/bm13gitfiles/mandg-UI-framework.git
   cd mandg-UI-framework
   ```
2. Install the Node dependencies:
   ```bash
   npm ci
   ```
3. Install Playwright browsers (if running locally for the first time):
   ```bash
   npx playwright install --with-deps
   ```

## 💻 Running the Tests

The framework includes several convenient shortcut scripts in `package.json`:

*   **Run all tests in headless mode**:
    ```bash
    npm run test
    ```
*   **Run a specific component using its tag** (e.g., `@Carousel`):
    ```bash
    npm run test:tag -- "@Carousel"
    ```
*   **Run tests in UI Mode** (Great for debugging and time-traveling):
    ```bash
    npm run test:ui
    ```
*   **Update Visual Baseline Snapshots**:
    ```bash
    npm run test:update
    ```
*   **View HTML Test Report**:
    ```bash
    npm run report
    ```

## 🏗️ Architecture & Key Files

- `tests/ui/component-ui.spec.ts` - The primary test suite containing all hardcoded component visual regression tests.
- `tests/global-setup.ts` - The Playwright global setup script that launches the browser once, accepts cookies, and saves the state to `storageState.json`.
- `playwright.config.ts` - Core configuration defining viewports, retries, environments, and global setup hooks.
- `Jenkinsfile` - The Jenkins pipeline configuration for continuous integration.
- `commons/ui/ui-commons.ts` - Shared UI utilities, including robust stability wait methods (e.g., `waitForStableHeight`, `ensurePageReadyForTesting`).

## 🔄 CI/CD Pipeline

The included `Jenkinsfile` is configured to:
1. Run on any available Jenkins agent.
2. Respect the `TEST_ENV` variable (defaults to `stage`).
3. Automatically retry failed tests up to 2 times (`CI = 'true'`).
4. Archive the HTML `reports/` and `failure-screenshots/` upon completion.
