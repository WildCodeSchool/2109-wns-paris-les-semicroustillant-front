FROM node:lts-alpine as builder

RUN mkdir app

WORKDIR /app

COPY tsconfig.json ./
COPY package*.json ./

RUN npm install

COPY src ./src
COPY public ./public

RUN npm run build

FROM node:lts-alpine

RUN mkdir app

WORKDIR /app

COPY --from=builder /app/build /app/build

COPY package*.json ./

RUN npm install --production

RUN npm install -g serve

CMD npx serve -s /app/build