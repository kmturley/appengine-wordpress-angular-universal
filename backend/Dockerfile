FROM wordpress:5

# Install zip libraries
RUN apt-get update && apt-get install zip unzip

# Install composer to handle php packages
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Create app directory
RUN mkdir -p /var/www/html
WORKDIR /var/www/html

# Install app dependencies
COPY composer.json /var/www/html
RUN export COMPOSER_ALLOW_SUPERUSER=1 && composer install

# Bundle app source
COPY . /var/www/html

EXPOSE 80
CMD ["apache2-foreground"]
