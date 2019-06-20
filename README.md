# appengine-wordpress-angular-universal

Example Wordpress project using:

* AppEngine Standard
* Angular 8.x
* Docker 18.x
* Wordpress 5.x
* MySQL 5.7


## Installation

Install dependencies and build images using:

    docker-compose build


## Usage

Run the backend and frontend together using:

    docker-compose up

View the Wordpress backend at:

    http://localhost:8080/

View the Angular frontend at:

    http://localhost:4200/


## Automatic Deployment

Go to Google Cloud Build:

    https://console.cloud.google.com/cloud-build/triggers

Click 'Add Trigger' and name it 'Backend'. Then set Cloud Build configuration file location:

    /backend/cloudbuild.yaml

Click 'Add Trigger' and name it 'Frontend'. Then set Cloud Build configuration file location:

    /frontend/cloudbuild.yaml


## Manual Deployment

Deploy frontend service:

    cd frontend
    gcloud init
    npm install
    npm run build:prerender
    npm run deploy


## Directory structure

    /backend                               --> Backend source files
    /frontend                              --> Frontend sources files


## Contact

For more information please contact kmturley
