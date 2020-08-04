pipeline {
  agent any
  
  tools {
        nodejs "node"
  }

  stages {
    stage('Build') {
      steps {
        git 'https://github.com/gaganshera/node-app.git'
        
        sh 'npm i'
      }
      post {
        success {
            sh "npm test"
        }
      }
    }
  }
}