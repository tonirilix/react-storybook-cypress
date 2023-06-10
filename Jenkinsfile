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
                // Stash the installed Cypress binary
                stash includes: 'node_modules/**', name: 'cypress'
            }
        }
        stage('Story') {
            steps {
                sh 'npm run build-storybook'
            }
        }
        stage('e2e') {
            steps {
                // Unstash the Cypress binary
                unstash 'cypress'
                sh 'npm run cypress:headless'
            }
        }
    }
}