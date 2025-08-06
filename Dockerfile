FROM node:20-alpine3.21 AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run tsc

CMD ["node", "dist/app.js"]