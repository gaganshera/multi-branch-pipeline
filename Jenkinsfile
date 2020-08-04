pipeline {
  agent any
  
  environment {
    scannerHome = tool 'sonar_scanner';
  }
  tools {
    nodejs "node"
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
  }
}