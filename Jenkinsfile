pipeline {
    agent any
    tools {
        nodejs 'NodeJS_16' 
    }
    environment {
        RENDER_SERVICE_URL = 'https://gallery-c1yd.onrender.com' 
        SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/<your-webhook-url>' // Replace with your Slack webhook URL
        SLACK_CHANNEL = '#YourFirstName_IP1' // Replace with your Slack channel name
    }
    stages {
        stage('Install Dependencies') {
            steps {
                echo 'Installing project dependencies...'
                sh 'npm install'
            }
        }
        
        stage('Build') {
            steps {
                echo 'Building the application...'
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'npm test'
            }
            post {
                failure {
                    echo 'Tests failed. Sending Slack notification...'
                    slackSend (
                        channel: env.SLACK_CHANNEL,
                        color: '#ff0000',
                        message: "Build ${env.BUILD_NUMBER} failed during tests. Please check Jenkins logs."
                    )
                    error('Tests failed. Stopping the pipeline.')
                }
            }
        }

        stage('Deploy to Render') {
            steps {
                echo 'Deploying to Render...'
                sh '''
                curl -X POST -H "Authorization: Bearer <your-render-api-key>" \
                -H "Content-Type: application/json" \
                -d '{
                    "serviceId": "<your-service-id>",
                    "clearCache": false
                }' \
                https://api.render.com/v1/services/<your-service-id>/deploys
                '''
            }
        }

        stage('Slack Notification') {
            steps {
                echo 'Sending Slack notification...'
                slackSend (
                    channel: env.SLACK_CHANNEL,
                    color: '#36a64f',
                    message: "Build ${env.BUILD_NUMBER} deployed successfully! View it here: ${env.RENDER_SERVICE_URL}"
                )
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
            slackSend (
                channel: env.SLACK_CHANNEL,
                color: '#36a64f',
                message: "Pipeline completed successfully! Build ${env.BUILD_NUMBER} deployed. View it here: ${env.RENDER_SERVICE_URL}"
            )
        }
        failure {
            echo 'Pipeline failed!'
            slackSend (
                channel: env.SLACK_CHANNEL,
                color: '#ff0000',
                message: "Pipeline failed during build ${env.BUILD_NUMBER}. Check logs for details."
            )
        }
    }
}
