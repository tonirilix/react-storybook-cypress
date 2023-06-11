pipeline {
    agent {
        docker {
            image 'node:lts-buster-slim'
            args '-p 3000:3000'
            // image 'cypress/base:18.14.1'
        }
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Install Dependencies') {
             steps {
                // Install system dependencies
                sh 'sudo apt-get update'
                sh 'sudo apt-get install -y libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb'

                // Check if Cypress cache exists
                script {
                    if (!fileExists('/home/node/.cache/Cypress')) {
                        // Install Cypress dependencies
                        sh 'npm ci'
                        // Cache the Cypress binary
                        stash includes: 'node_modules/**, .cache/Cypress/**', name: 'cypress-cache'
                        sh 'npm run cy:verify'
                    }
                }

                // Unstash the Cypress cache
                unstash 'cypress-cache'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('e2e') {
            parallel {
                stage('Story') {
                    steps {
                        sh 'npm run build-storybook'
                    }
                }        
                stage('e2e') {
                    steps {
                        sh 'npm run cypress:headless'
                    }
                }
            }
        }        
    }

    post {
        always {
            // Stash the Cypress cache for future runs
            stash includes: 'node_modules/**, .cache/Cypress/**', name: 'cypress-cache'

        }
    }
}