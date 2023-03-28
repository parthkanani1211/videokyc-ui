pipeline {
     agent any
     stages {
        stage("Build") {
            steps {
                 sh "sudo yarn installwebui"
                sh "sudo yarn buildwebui"
            }
        }
        stage("Deploy") {
            steps {
                sh "sudo rm -rf /var/www/videokycui"
                 sh "sudo cp -r /var/lib/jenkins/workspace/VideoUI-pipeline/web-ui/build/ /var/www/videokycui/"
            }
        }
    }
}
