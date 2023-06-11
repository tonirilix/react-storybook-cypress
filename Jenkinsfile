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
        stage('Build') {
            steps {
                sh 'npm install'
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
                        sh 'npm install'
                        sh 'npm run cypress:headless'
                    }
                }
            }
        }        
    }

    // post {
    //     always {
    //         // Stash Cypress cache for future runs
    //         stash includes: 'tmp/Cypress/**', name: 'cypress-cache'
    //     }
    // }
}