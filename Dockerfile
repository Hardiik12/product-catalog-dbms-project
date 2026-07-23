FROM node:18-alpine

WORKDIR /app

COPY backend-node-gateway/package*.json ./

RUN npm install --production

COPY backend-node-gateway/ ./

EXPOSE 8000

CMD ["npm", "start"]
