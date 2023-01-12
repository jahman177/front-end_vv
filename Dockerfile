FROM node:alpine

RUN apk update
RUN apk add
RUN apk add git

RUN mkdir /app

WORKDIR /app

COPY . .

RUN npm install -g pm2
RUN npm install
RUN npm run build
RUN npm run serve

# CMD ["pm2-runtime", "process.yml"]