pipeline {
    agent {
        docker {
            image 'cypress/base:18.14.1'
        }
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Install') {
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

        stage('start local server') {
            steps {
                sh 'nohup npm run storybook:ci &'
                // sh 'npm run build-storybook'
                // sh 'npx --yes http-server storybook-static --port 6006 --silent &'
            }
        }

        stage('Run cypress') {
            steps {
                sh 'npm run cy:verify'
                sh './scripts/wait_for_200.sh'
                sh 'npm run cy:headless'
            }
        }
    }

    post {
        always {
            // echo 'Stopping local server'
            // sh 'pkill -f storybook'
            // Stash the Cypress cache for future runs
            stash includes: 'node_modules/**, .cache/Cypress/**', name: 'cypress-cache'
        }
        // always {
        //     // Stash the Cypress cache for future runs
        //     stash includes: 'node_modules/**, .cache/Cypress/**', name: 'cypress-cache'
        //     echo 'Stopping local server'
        //     sh 'pkill -f http-server'
        // }
    }
}