<div align="center">
  <img src="assets/final_presentation_slide.gif" alt="M&G UI Automation Framework Banner" width="100%">
  

  <h1>M&G UI Automation Framework</h1>
  <p><i>A high-performance, visually-driven testing framework powered by Playwright</i></p>
</div>

---

This repository contains the official UI automation framework used for validating and performing visual regression testing on M&G's bespoke web components.

## 🌟 Framework Overview

The framework is designed to capture, compare, and validate pixel-perfect screenshots of **56+ bespoke UI components** across **5 responsive viewport profiles** and multiple browser engines (Chromium, Firefox and WebKit).

Every component is automatically validated across:

- 🖥️ Large Desktop
- 💻 Standard Desktop (960px Responsive)
- 🍎 Mac Safari Desktop
- 📱 Tablet
- 📱 Mobile

This ensures a consistent user experience across all supported browsers and devices while detecting even the smallest visual regressions before they reach production.

### Key Capabilities:

- **Visual Regression Testing**: Automated baseline comparisons to detect any visual UI anomalies.
- **5 Viewport Responsive Validation**: Every component is validated across Large Desktop, Standard Desktop (960px), Mac Safari Desktop, Tablet and Mobile to ensure responsive consistency.
- **Cross Browser Testing**: Supports Chromium, Firefox and WebKit rendering engines.
- **Global Authentication Setup**: Instantly bypasses the OneTrust Cookie Banner for all tests using shared browser state.
- **Tag-Based Execution**: Run specific modules or bespoke components dynamically.
- **Robust Wait Strategies**: Custom `UICommons` wrappers that ensure elements (videos, Flourish embeds, carousels, images and lazy-loaded content) are fully loaded before capturing snapshots.
- **Reusable Visual Helpers**: Purpose-built helper methods for handling sticky elements, lazy loading, page stabilisation and responsive rendering.
- **Parallel Execution**: Execute visual tests efficiently across multiple workers.
- **Continuous Integration (CI/CD)**: Deeply integrated with Jenkins for automated nightly, scheduled or pull request validations.

---

## 📱 Five Viewport Responsive Validation

Unlike traditional UI automation frameworks that validate only a single desktop viewport, this framework validates every bespoke component across **five predefined M&G viewport configurations**.

| Viewport | Purpose |
| :--- | :--- |
| 🖥️ Large Desktop | Primary desktop experience |
| 💻 Standard Desktop (960px) | Responsive desktop layout |
| 🍎 Mac Safari Desktop | Safari-specific rendering validation |
| 📱 Tablet | Tablet responsiveness |
| 📱 Mobile | Mobile responsiveness |

Testing each component across all five viewport profiles ensures:

- Responsive layouts remain visually consistent.
- Images and videos render correctly.
- Typography and spacing remain unchanged.
- Sticky components behave consistently.
- Browser-specific rendering issues are detected early.
- Mobile and tablet layouts are validated alongside desktop experiences.

---

## 🏗️ Architecture & Component Flow

```mermaid
graph TD
    A[Jenkins Trigger / Local Run] --> B{Playwright Config}
    B --> C[Global Setup: Accept Cookies]
    C -->|Saves| D[(storageState.json)]
    D --> E[Playwright Workers]
    
    subgraph Parallel Execution
        E --> F1[Carousel Test]
        E --> F2[Promo Panel Test]
        E --> F3[Kids Library Test]
    end

    F1 --> G[UI Commons]
    F2 --> G
    F3 --> G
    
    G -->|Ensures Page Ready| H[Visual Assertion]
    H -->|Compare| I{Baseline Images}
    
    I -->|Match| J[Pass]
    I -->|Mismatch| K[Fail & Capture Diff]
```

### 📂 Directory Structure & File Purposes

```text
mandg-UI-framework/
├── .env                       # (Ignored in Git) Stores secure Microsoft Graph API credentials.
├── .gitignore                 # Prevents sensitive files (like .env or large zips) from being committed.
├── playwright.config.ts       # The main orchestration brain; sets viewports, timeouts, and report generation.
├── global-teardown.ts         # Runs after all tests finish. Zips reports and triggers the EmailReporter.
├── Jenkinsfile                # Declarative CI/CD pipeline definition.
├── README.md                  # This documentation file.
│
├── BaseLineImages/            # The 'source of truth' pristine screenshots for visual comparison.
├── failure-screenshots/       # (Auto-generated) Holds visual diffs and traces of failed tests.
├── reports/                   # (Auto-generated) The HTML report output folder.
│
├── commons/
│   ├── reporting/             # Fully automated email reporting system.
│   │   ├── AttachmentCollector.ts # Gathers failure screenshots and reports for emailing.
│   │   ├── EmailReporter.ts       # Uses OAuth 2.0 & Graph API to securely dispatch the final email.
│   │   ├── HtmlTemplate.ts        # Generates the beautiful HTML body of the email.
│   │   └── ReportBuilder.ts       # Parses the raw XML test results to calculate passed/failed stats.
│   └── ui/                    # Reusable framework utilities.
│       ├── ui-commons.ts          # Advanced visual test helpers (handling sticky headers, lazy loading, etc).
│       └── web-commons.ts         # Standard web interaction wrappers (clicks, typing, assertions).
│
├── page-objects/
│   ├── page-elements/             # JSON files containing web element locators.
│   └── page-steps/                # Abstractions for complex user flows (e.g., mandg-page-steps.ts).
│
└── tests/
    ├── global-setup.ts        # Runs before tests start. Bypasses cookie banners and saves the browser state.
    └── ui/
        └── component-ui.spec.ts   # The primary test suite containing all 295+ bespoke UI tests.
```

---

## 🚀 Getting Started

### 1. Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v18+)
- Git

### 2. Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/bm13gitfiles/mandg-UI-framework.git
cd mandg-UI-framework
npm ci
```

If this is your first time running Playwright on this machine, install the required browsers:

```bash
npx playwright install --with-deps
```

---

## 💻 Execution Guide

We have exposed several simple NPM commands to make running your tests incredibly easy.

| Command | Action |
| :--- | :--- |
| `npm run test` | Runs the entire suite of 295+ visual regression tests in headless mode. |
| `npm run test--ui` | Opens the **Playwright UI**, allowing you to visually debug failures and replay every test step. |
| `npm run ss--update` | Updates the baseline screenshots. Run this only after an approved UI change. |
| `npm run test--tags -- "@Carousel"` | Executes only the tagged component. |
| `npm run test--report` | Opens the Playwright HTML Report after execution. |
| `npm run test--1920chrome` | Runs tests exclusively on the Large Desktop (1920x1080) Chromium viewport. |
| `npm run test--1920safari` | Runs tests exclusively on the Mac Safari Desktop viewport. |
| `npm run test--960` | Runs tests exclusively on the Standard Desktop (960px) responsive viewport. |
| `npm run test--mobile` | Runs tests exclusively on the Mobile (375x667) viewport. |
| `npm run test--tab` | Runs tests exclusively on the Tablet (768x1028) viewport. |
| `npm run test--stage` | Executes the entire test suite against the **STAGE** environment. |
| `npm run test--devx` | Executes the entire test suite against the **DEVX** environment. |
| `npm run test--prod` | Executes the entire test suite against the **PROD** environment. |

---

## 🧠 Core Concepts

### Global Setup

Instead of having every single test navigate to the application and manually accept the OneTrust Cookie Banner (which wastes time), the framework uses a `global-setup.ts` file. Playwright runs this file **once** before the test suite begins. It accepts the cookies and saves the browser session into `storageState.json`. Every subsequent test launches with those cookies already injected.

### Stability Logic (`UICommons`)

UI testing is prone to flakiness due to dynamic images, lazy-loading, animations, sticky elements and browser-specific rendering behaviour.

Our reusable `UICommons.ts` library provides specialised helpers including:

- `waitForStableHeight`
- `ensurePageReadyForTesting`
- `preparePageForFullPageScreenshot`
- `freezeStickyElement`
- `stubFlourishStories`
- `loadLazyIframes`

These helpers ensure deterministic screenshots across browsers and all five supported viewport configurations.

---

## 🚀 Why Playwright?

Unlike cloud-based visual testing platforms, this framework performs **native browser rendering** and **pixel-perfect screenshot comparison** directly using Playwright.

### Advantages

- ✅ Native Playwright visual comparison
- ✅ Pixel-perfect screenshot validation
- ✅ No external cloud dependency
- ✅ No licensing costs
- ✅ Cross-browser testing
- ✅ Five responsive viewport validation
- ✅ Fully local execution
- ✅ Easily extensible through reusable helper methods
- ✅ CI/CD friendly
- ✅ Deterministic screenshot generation

---

## ⚖️ Framework Comparison

The table below highlights the capabilities and design goals of the M&G UI Automation Framework compared with other commonly used visual testing solutions.

| Feature | M&G UI Framework | AET | Applitools |
| :--- | :---: | :---: | :---: |
| Built on Playwright | ✅ | ❌ | Partial |
| Native browser screenshots | ✅ | Yes | No |
| Pixel-perfect visual comparison | ✅ | Yes | AI-assisted |
| Cross-browser testing | ✅ | Limited | Yes |
| Five responsive viewport profiles | ✅ | Configurable | Configurable |
| Parallel execution | ✅ | Limited | Yes |
| Runs locally | ✅ | Yes | Cloud-first |
| External cloud dependency | No | No | Yes |
| Open-source technology stack | ✅ | Yes | No |
| Jenkins integration | ✅ | Yes | Yes |
| Azure DevOps integration | ✅ | Yes | Yes |
| Docker support | ✅ | Yes | Yes |
| Reusable helper framework | ✅ | No | No |
| Lazy-loading stabilisation | ✅ | No | No |
| Sticky element handling | ✅ | No | No |
| Flourish component support | ✅ | No | No |
| Video loading helpers | ✅ | No | No |
| Custom component preparation | ✅ | No | No |
| Configurable screenshot tolerances | ✅ | Limited | Limited |
| Licensing | Free | Free | Commercial |

> **Note:** This comparison is intended to highlight the design goals and capabilities of the M&G UI Automation Framework rather than rank competing tools. The framework focuses on deterministic, pixel-perfect visual regression testing using Playwright's native screenshot engine, while platforms such as Applitools provide AI-assisted visual validation and AET focuses on screenshot-based UI comparison.

## 🔄 CI/CD Integration (Jenkins)

The included `Jenkinsfile` allows you to plug this framework directly into Jenkins.

```mermaid
sequenceDiagram
    participant GitHub
    participant Jenkins
    participant Playwright Docker
    
    GitHub->>Jenkins: Push / PR Trigger
    Jenkins->>Playwright Docker: Pulls Code & Installs Deps
    Playwright Docker->>Playwright Docker: npm run test
    
    alt Tests Pass
        Playwright Docker-->>Jenkins: Exit 0 (Success)
        Jenkins->>Jenkins: Archive HTML Report
    else Tests Fail
        Playwright Docker-->>Jenkins: Exit 1 (Failure)
        Jenkins->>Jenkins: Archive HTML Report & failure screenshots
    end
```

To configure in Jenkins:

1. Create a **Pipeline** job.
2. Select **Pipeline script from SCM**.
3. Choose **Git** and point it to this repository.
4. Attach the required Jenkins credentials (PAT).

Jenkins automatically performs retries for flaky tests (up to two attempts) because the `CI='true'` flag is passed directly into `playwright.config.ts`.

---

## ☁️ Azure DevOps Integration

This repository is fully integrated with Azure DevOps pipelines via the `azure-pipelines.yml` file.

### Triggering a Run in Azure DevOps
1. Navigate to your Azure DevOps project pipelines.
2. Click **Run Pipeline**.
3. Under the **Parameters** dropdown, select your target **Test Environment** (`devx`, `stage`, or `prod`).
4. Click **Run**.

### Pipeline Artifacts
The pipeline automatically publishes the following artifacts when the run completes:
- **`playwright-html-report`**: The full HTML suite report. Download and open `index.html` to view it.
- **`failure-screenshots`**: Captures of visual mismatches or page errors (only generated if a test fails).

---

## 📧 Microsoft Graph API Email Reporting

This framework features a fully automated reporting engine that runs during the `global-teardown.ts` phase. Upon completion of the test suite, it collects the HTML report, gathers any failure screenshots, and securely emails a comprehensive summary to the stakeholders.

### 🌟 Reporting Enhancements & Features
- **Corporate Branding**: Pixel-perfect HTML email templates styled with M&G's brand guidelines, featuring elegant typography (`Infra` & `Georgia`), custom colours (deep teal, beige), and dynamic background imagery.
- **Embedded Assets**: Backgrounds and banners are base64-encoded on-the-fly during teardown, effectively bypassing strict corporate email client blockers that often strip external image links.
- **Dynamic Execution Summary**: Automatically calculates and beautifully presents overall pass rates, execution duration, environment, and visual distributions of passed/failed/skipped components.
- **Intelligent Zero-Failure Handling**: Delivers a bespoke, elegant success message when all tests pass, ensuring a polished experience for stakeholders.
- **Cross-Platform Compatibility**: Built using robust, table-based HTML architecture to guarantee maximum cross-platform rendering consistency across Microsoft Outlook, Gmail, and mobile email clients.

### Configuration (`.env`)

To enable the email reporting, you must configure a `.env` file in the root directory (this file is strictly ignored by Git for security). It requires Microsoft Graph API OAuth 2.0 credentials:

```properties
# Microsoft Graph API Credentials
GRAPH_CLIENT_ID=your_client_id_here
GRAPH_CLIENT_SECRET=your_client_secret_here
GRAPH_TENANT_ID=common
GRAPH_REFRESH_TOKEN=your_long_lived_refresh_token_here
```

The `EmailReporter.ts` class automatically exchanges the `GRAPH_REFRESH_TOKEN` for a short-lived access token on every single test run, ensuring secure, headless authentication without any manual intervention.

### 🎨 Customizing the Email Report

The email reporting module is designed to be highly modular and easily customizable. All reporting logic is contained within the `commons/reporting/` directory:

- **`Theme.ts`**: The central design system. Modify this file to globally update brand colours, background shades, font families (e.g., `Infra`, `Georgia`), font sizes, and table border styling.
- **`Components.ts`**: The structural building blocks of the email. Edit this file to alter how specific sections are presented (e.g., aligning text, modifying the bespoke success quote, or adjusting the footer layout).
- **`HtmlTemplate.ts`**: The layout orchestrator. Modify this file to change the order of components or group metrics together.
- **`assets/`**: Replace `email-banner.png` or `bg-arrows.png` in this directory to instantly update the base64-encoded imagery used in the report header and backgrounds.

---
