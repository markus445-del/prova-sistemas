FROM node:24-alpine AS deps
WORKDIR /app
COPY src/package*.json ./
RUN npm ci --ignore-scripts

FROM node:24-alpine AS runtime
WORKDIR /app/src
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY src/ ./
COPY command.js ./command.js
EXPOSE 3000
CMD ["sh", "-c", "node command.js migrate && node command.js seed:optional && node server.js"]
