FROM composer:1

# Install mysql server library
RUN docker-php-ext-install mysqli

# Create app directory
RUN mkdir -p /var/www/html
WORKDIR /var/www/html

# Bundle app source
COPY . /var/www/html

# Install app dependencies
COPY composer.json /var/www/html
RUN composer install --verbose

EXPOSE 80
CMD ["php -S 0.0.0.0:80 -t dist"]
