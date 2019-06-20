FROM wordpress:5

# Install zip libraries
RUN apt-get update && apt-get install zip unzip

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer \
    && ln -s $(composer config --global home) /root/composer
ENV PATH=$PATH:/root/composer/vendor/bin COMPOSER_ALLOW_SUPERUSER=1

# Create app directory
RUN mkdir -p /var/www/html
WORKDIR /var/www/html

# Install app dependencies
COPY composer.json /var/www/html
RUN composer install

# Bundle app source
COPY . /var/www/html

EXPOSE 80
CMD ["apache2-foreground"]
