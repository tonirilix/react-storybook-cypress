pipeline {
    agent {
        docker {
            image 'node:lts-buster-slim'
            args '-p 3000:3000'
        }
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Install Dependencies') {
             steps {                
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
        stage('Parallel') {
            parallel {
                stage('story') {
                    steps {
                        sh 'npm run build-storybook'
                    }
                }        
                stage('msw') {
                    steps {
                        // This is just a test
                        sh 'npm run init-msw'
                    }
                }
            }
        }        
        stage('Front-end') {
            agent {
                docker { image 'cypress/base:18.14.1' }
            }
            steps {
                sh 'npm run cypress:headless'
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