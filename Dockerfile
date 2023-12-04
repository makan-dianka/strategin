FROM node:18.16

RUN apt-get update && apt-get install vim -y

WORKDIR /var/www/web
ADD . .