# Build env
FROM node:20-alpine3.21 AS builder

WORKDIR /app

COPY package.json .
COPY pnpm-lock.yaml .
RUN npm install -g pnpm && pnpm install --frozen-lockfile
COPY . .
RUN npx prisma generate

RUN pnpm run build

EXPOSE 3000

ENV NODE_ENV=production
CMD ["node", "dist/app.js"]