FROM node:18.0.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000
CMD [ "npx", "tsx", "watch", "src/index.ts" ]