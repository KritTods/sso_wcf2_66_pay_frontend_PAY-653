FROM df-redux.1.0.0 AS builder
WORKDIR /usr/src/app

COPY package.json  ./
RUN npm install --ignore-scripts
COPY . .
COPY ./tsconfig.server.json ./tsconfig.json

COPY --from=df-redux.1.0.0 /app/redux /usr/src/app/src/redux

RUN npm link wcf-component-lib
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/package-lock.json ./
COPY --from=builder /usr/src/app/.next ./
COPY --from=builder /usr/src/app/next.config.mjs ./
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/.next/standalone ./
COPY --from=builder /usr/src/app/.next/static ./.next/static

RUN npm install --only=production

EXPOSE 3000
CMD ["npm", "run", "start"]
