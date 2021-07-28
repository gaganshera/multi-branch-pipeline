pipeline {
  agent any
  
  environment {
    scannerHome = tool 'sonar_scanner';
  }
  tools {
    nodejs "nodejs"
    dockerTool 'docker'
  }
  options {
    timestamps()

    timeout(time: 1, unit: 'HOURS')

    buildDiscarder(logRotator(daysToKeepStr: '10', numToKeepStr: '20'))

    parallelsAlwaysFailFast()
  }

  stages {
    stage('Checkout') {
      steps {
        git 'https://github.com/gaganshera/node-app.git'
      }
    }
    stage('Build') {
      steps {
        sh 'npm i'
      }
    }
    stage('Tests') {
      steps {
        sh 'npm test'
      }
    }
    stage('SonarQube analysis') {
      steps {
        withSonarQubeEnv('SonarQube') {
          sh "${scannerHome}/bin/sonar-scanner"
        }
        sleep 10
        timeout(time: 30, unit: 'SECONDS') {
            // Parameter indicates whether to set pipeline to UNSTABLE if Quality Gate fails
            // true = set pipeline to UNSTABLE, false = don't
            waitForQualityGate abortPipeline: true
        }
      }
    }
    stage('Docker build') {
      steps {
        sh 'docker build -t gaganshera/node-app:${BUILD_NUMBER} --no-cache .'
      }
    }
    stage('Docker push to Dockerhub') {
      steps {
        script {
          withDockerRegistry(credentialsId: 'dockerhub', toolName: 'docker') {
            sh 'docker push gaganshera/node-app:${BUILD_NUMBER}'
          }
        }
      }
    }
    stage('Remove previous container') {
      steps {
        script {
          try {
            sh 'docker rm -f $(docker ps --filter "name=node-app" -aq)'
          } catch(err) {
            echo err.getMessage()
          }
        }
      }
    }
    stage('Deployments') {
        parallel {
            stage('Docker start container') {
              steps {
                sh 'docker run -d --name node-app -p 4002:3010 gaganshera/node-app:${BUILD_NUMBER}'
              }
            }
            stage('Kubernetes Deployment') {
              steps {
                sh 'kubectl apply -f k8s/deployment.yaml'
              }
            }
        }
    }
  }
}
