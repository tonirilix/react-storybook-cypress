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
                sh 'CYPRESS_CACHE_FOLDER=./tmp/Cypress npm install'
                stash includes: 'tmp/Cypress/**', name: 'cypress-cache'
                // sh 'npm run build'
            }
        }
        stage('e2e') {
            steps {
                unstash 'cypress-cache'

                // Run Cypress tests with cache folder
                sh 'CYPRESS_CACHE_FOLDER=./tmp/Cypress npm run cypress:headless'
            }
        }
        stage('Story') {
            steps {
                sh 'npm run build-storybook'
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