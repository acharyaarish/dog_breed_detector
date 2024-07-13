# Dog Breed Detector

This repository contains the Dog Breed Detector application, a fun game where users can guess the breed of a dog from random images. The application is built using Flask for the backend and JavaScript for the frontend.

## Access the Game
You can access the game here: http://flask-env.eba-ksnfztgw.ap-southeast-2.elasticbeanstalk.com/

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [Pipeline Setup](#pipeline-setup)
- [Access the Game](#access-the-game)
- [Technologies Used](#technologies-used)
- [License](#license)

## Features
- Displays random dog images from an API.
- Users can guess the breed of the dog.
- Provides feedback on whether the guess is correct or incorrect.
- Stores user data in local storage.
- State management and routing using React (for potential future integration).

## Installation

### Prerequisites
- Python 3.7+
- Node.js
- npm (Node Package Manager)
- AWS CLI configured with appropriate permissions

### Clone the Repository
git clone https://github.com/acharyaarish/dog_breed_detector.git
cd dog_breed_detector

### Set Up the Virtual Environment
python -m venv venv
source venv/bin/activate

### Install Dependencies

pip install -r requirements.txt
npm install

### Usage
Run the Application Locally
- Start the Flask server:

gunicorn -w 3 app:app

- Open index.html in your browser to start the game.

### Deployment

AWS S3 Bucket
-Create an S3 bucket in the Sydney region:

aws s3 mb s3://arish-dog-app --region ap-southeast-2
AWS Elastic Beanstalk

### Initialize Elastic Beanstalk:

eb init -p python-3.7 dog-breed-detector --region ap-southeast-2

### Create an Elastic Beanstalk environment and deploy:

eb create dog-breed-env
eb deploy

### AWS CodePipeline
- Create a new pipeline in AWS CodePipeline.
- Set up the source provider as GitHub.
- Set up the build provider using AWS CodeBuild.
- Set up the deploy provider using AWS Elastic Beanstalk.
- Ensure the pipeline triggers on changes to the GitHub repository.

### Pipeline Setup
- Source Stage
- Connect to the GitHub repository.
- Set up to trigger on any push to the main branch.
- Build Stage
- Use AWS CodeBuild with the following buildspec file:

version: 0.2
phases:
  install:
    runtime-versions:
      python: 3.7
  build:
    commands:
      - pip install -r requirements.txt
      - npm install
artifacts:
  files:
    - '**/*'

### Deploy Stage
- Use AWS Elastic Beanstalk.
- Configure the application to be deployed to the dog-breed-env environment.


### Technologies Used
- Python
- Flask
- JavaScript
- AWS S3
- AWS Elastic Beanstalk
- AWS CodePipeline
- Gunicorn

### License
This project is licensed under the MIT License. See the LICENSE file for details.


### Detailed Explanation:
1. **Features**: Lists the main features of the application.
2. **Installation**: Provides detailed steps to set up the project locally, including prerequisites, cloning the repository, setting up a virtual environment, and installing dependencies.
3. **Usage**: Explains how to run the application locally.
4. **Deployment**: Detailed steps for deploying the application using AWS services (S3 and Elastic Beanstalk).
5. **Pipeline Setup**: Details for setting up the CI/CD pipeline using AWS CodePipeline, including the buildspec file for CodeBuild.
6. **Access the Game**: Link to access the deployed application.
7. **Technologies Used**: List of technologies and tools used in the project.
8. **License**: Information about the project's license.

