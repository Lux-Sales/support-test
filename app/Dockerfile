FROM node:lts-alpine

LABEL mantainer="RankMyAPP"
LABEL version="1.0"

COPY ./ /var/www/app

WORKDIR /var/www/app

RUN yarn global add nodemon -D

RUN yarn

EXPOSE 3001

CMD ["yarn", "start"]
