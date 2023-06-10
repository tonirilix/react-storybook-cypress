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
                cache(config: 'cypress-cache', key: 'cypress-cache', paths: ['tmp/Cypress'])
                sh 'CYPRESS_CACHE_FOLDER=./tmp/Cypress npm install'
                sh 'npm run build'
            }
        }
        stage('Story') {
            steps {
                sh 'npm run build-storybook'
            }
        }
        stage('e2e') {
            steps {
                cache(config: 'cypress-cache', key: 'cypress-cache', paths: ['tmp/Cypress'])

                // Run Cypress tests with cache folder
                sh 'CYPRESS_CACHE_FOLDER=./tmp/Cypress npm run cypress:headless'
            }
        }
    }
    
    post {
        always {
        // Save the cache for reuse
        cache(config: 'cypress-cache', key: 'cypress-cache', paths: ['tmp/Cypress'])
        }
    }
}