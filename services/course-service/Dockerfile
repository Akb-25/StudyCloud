FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install
COPY src ./src

EXPOSE 4001

CMD ["node", "src/index.js"]