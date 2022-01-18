FROM node:lts-alpine

RUN mkdir /app
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY src src
COPY public public

ENV WDS_SOCKET_PORT=0 
CMD npm start
