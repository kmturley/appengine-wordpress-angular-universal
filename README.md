# appengine-wordpress-angular-universal

Example Wordpress project using:

* AppEngine Standard
* Angular 8.x
* Docker 18.x
* Wordpress 5.x
* MySQL 5.7


## Installation

If you need to use an existing database, place it at:

    backend/backup.sql

Start by running the docker container locally:

    docker-compose up

Then go to the admin to continue installation at:

    http://localhost:8080/

Enable permalinks by going to:

    http://localhost:8080/wp-admin/options-permalink.php

Setting Custom Structure to be:

    /%category%/%postname%/

Setting Category Base to be:

    .


## Usage

View the Angular frontend at:

    http://localhost:4200/

And use the Wordpress API at:

    http://localhost:8080/wp-json/wp/v2/posts


## Database creation

Enable the SQL API at:

    https://console.cloud.google.com/flows/enableapi?apiid=sqladmin

Then create the database using the commands:

    gcloud sql instances create wordpress --activation-policy=ALWAYS --tier=db-n1-standard-1
    gcloud sql databases create wordpress --instance wordpress
    gcloud sql users set-password root --host=% --instance wordpress --password=X


## Automatic Deployment

Go to Google Cloud Build:

    https://console.cloud.google.com/cloud-build/triggers

Click 'Add Trigger' and name it 'Backend'. Then set Cloud Build configuration file location:

    /backend/cloudbuild.yaml

Click 'Add Trigger' and name it 'Frontend'. Then set Cloud Build configuration file location:

    /frontend/cloudbuild.yaml


## Manual Deployment

Ensure you have just backend and mysql running:

    docker-compose stop
    docker-compose up backend db

In a second terminal window, generate a static build:

    cd frontend
    gcloud init
    npm install
    npm run build:prerender
    npm run deploy


## Exporting the database

Export database to local:

    docker-compose exec db /usr/bin/mysqldump -u root --password=examplepass --databases exampledb > backend/backup.sql


## Directory structure

    /backend                               --> Backend source files
    /frontend                              --> Frontend sources files


## Contact

For more information please contact kmturley
