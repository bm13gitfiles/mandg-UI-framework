pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.55.0-noble'
            args '--ipc=host'
        }
    }

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
                sh 'npm ci'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                // This uses the shortcut script we added earlier!
                sh 'npm run test'
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
