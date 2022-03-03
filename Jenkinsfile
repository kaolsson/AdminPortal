pipeline {
  agent any
  stages {
    stage('Version') {
      agent any
      steps {
        echo 'Version used in this build and deploy'
        sh 'node -v'
        sh 'npm -v'
      }
    }

    stage('Build') {
      agent any
      steps {
        echo 'Building Smartmaster Client portal'
        sh 'pwd'
        sh 'npm install'
        sh 'npm run build'
        stash(name: 'build-files', includes: '**/build/*, **/build/static/*, **/build/static/js/*, **/build/static/home/*, **/build/static/error/*, **/build/static/docs/*, **/build/static/mock-images/avatars/*, **/build/static/icons/*')
      }
    }

    stage('Deploy') {
      agent any
      steps {
        echo 'Copy build to host 138.197.199.177'
        unstash 'build-files'
        script {
          sh 'ls -l'
          sh 'ls -l ./build'
          sh "scp -r ./build/* root@138.197.199.177:/webaps/www/sm_New"
        }

        script {
          echo 'Move new version to prod and save fallback'
          sh """
          ssh root@138.197.199.177 << ENDSSH
          rm -r /webaps/www/sm_Fallback
          mv /webaps/www/mysmartmaster /webaps/www/sm_Fallback
          mv /webaps/www/sm_New /webaps/www/mysmartmaster
          mkdir /webaps/www/sm_New
          cd /webaps/www
          ls -l
          cd /webaps/www/mysmartmaster
          ls -l
          exit
          ENDSSH """
        }

      }
    }

    stage('Test') {
      agent any
      steps {
        echo 'Test with curl to get response...'
      }
    }

    stage('Cleanup') {
      steps {
        echo 'Clean up the Workspace'
        cleanWs()
      }
    }

  }
}