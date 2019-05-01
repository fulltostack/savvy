FROM mhart/alpine-node:10

WORKDIR /home/app

COPY . /home/app

RUN rm -rf dist

RUN apk add --no-cache git

RUN yarn

RUN yarn build

EXPOSE 4000 5432

CMD yarn start
