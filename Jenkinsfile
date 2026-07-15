pipeline {
    agent any

    environment {
        // You can change 'stage' to 'dev' or 'prod' when running the pipeline manually
        TEST_ENV = 'stage'
        // Playwright uses this flag to automatically enable retries and fail on .only
        CI = 'true'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
                bat 'npx playwright install --with-deps'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                // This uses the shortcut script we added earlier!
                bat 'npm run test'
            }
        }
    }

    post {
        always {
            // Always archive the HTML reports and failure screenshots so you can download them
            archiveArtifacts artifacts: 'reports/**, failure-screenshots/**', allowEmptyArchive: true
        }
        success {
            echo 'All Playwright UI tests passed successfully!'
        }
        failure {
            echo 'Some Playwright UI tests failed. Check the archived failure-screenshots!'
        }
    }
}
