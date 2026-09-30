FROM node:24-alpine
WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev --no-audit --no-fund
COPY server.js ./
COPY migrations ./migrations
COPY public ./public
ENV NODE_ENV=production
EXPOSE 3001
CMD ["node", "server.js"]
