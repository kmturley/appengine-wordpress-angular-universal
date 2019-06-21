FROM composer:1

# Create app directory
RUN mkdir -p /var/www/html
WORKDIR /var/www/html

# Install app dependencies
COPY composer.json /var/www/html
RUN composer install --verbose

# Bundle app source
COPY . /var/www/html

EXPOSE 80
CMD ["php -S 0.0.0.0:80 -t src"]
