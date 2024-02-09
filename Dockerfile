FROM node:alpine

RUN apk update
RUN apk add
RUN apk add git

RUN mkdir /app

WORKDIR /app

COPY . .

RUN npm install -g pm2
# RUN npm install -g serve
RUN npm install
RUN npm run build
# RUN serve -s dist

CMD ["pm2-runtime", "process.config.js"]