pipeline {
  agent any
  
  environment {
    scannerHome = tool 'sonar_scanner';
  }
  tools {
    nodejs "node"
    dockerTool 'docker'
  }
  options {
    timestamps()

    timeout(time: 1, unit: 'HOURS')

    buildDiscarder(logRotator(daysToKeepStr: '10', numToKeepStr: '20'))
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
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
          docker.withRegistry('', '7808e1b4-b2b9-47d2-81fb-a92f4296837f') {
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
    stage('Docker start container') {
      steps {
        sh 'docker run -d --name node-app -p 4002:3010 gaganshera/node-app:${BUILD_NUMBER}'
      }
    }
  }
}