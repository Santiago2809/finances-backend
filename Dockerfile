FROM node:20-alpine3.21 AS builder

WORKDIR /app

RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .

RUN pnpx prisma generate

RUN pnpm run tsc

ENV NODE_ENV=production
CMD ["node", "dist/app.js"]