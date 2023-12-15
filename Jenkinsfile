pipeline {
    agent any
    environment {
        mongo_url = "mongodb+srv://vivektangudu:viv@cluster0.czt49fi.mongodb.net/"
        JWT_SECRET = "SECRETLEL"
    }
    stages {
        stage('Stage 1: Git Clone') {
            steps {
                git branch: 'main',
                url: 'https://github.com/harsha-deep/Lib'
            }
        }
        stage('Stage 2: Remove npm proxy') {
            steps {
                sh 'npm config rm proxy'
                sh 'npm config rm http-proxy'
                sh 'npm config rm https-proxy'
            }
        }
        stage('Stage 2: Client Build') {
            steps {
                dir('client'){
                sh "npm install"
                sh 'docker build -t frontend-image .'
            }
            }
        }
        stage("Stage 3: Server Build") {
            steps {
                dir('server'){
                sh "npm install"
                sh 'docker build -t backend-image .'
            }}
        }
        stage('Stage 4: Push image to DockerHub') {
            steps {
                script {
                        sh "docker login --username bean6792 --password Vivek@1383"
                        sh 'docker tag frontend-image bean6792/frontend-image:latest'
                        sh 'docker push bean6792/frontend-image:latest'
                        sh "docker tag backend-image bean6792/backend-image:latest"
                        sh "docker push bean6792/backend-image:latest"
                    
                }
            }
        }
        stage('Stage 5: Clean Docker Images') {
            steps {
                script {
                    sh 'docker container prune -f'
                    sh 'docker image prune -f'
                }
            }
        }
        stage('Stage 6: Ansible Deployment') {
            steps {
                script { 
                    sh 'ansible-playbook -i inventory playbook.yml'
                }
            }
        }
    }
}
//sh 'ansible-playbook -i inventory-k8 playbook-k8.yml'
//kubectl port-forward frontend-deployment-6f58d947b9-6f42d 3001:3000
//kubectl port-forward backend-deployment-5c747c4c77-dk9h2  5005:5000
// minikube startv
