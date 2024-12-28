FROM node:18-alpine
WORKDIR project

COPY package*.json ./

RUN npm install typescript --save-dev \
    npm i \
    npm ci

COPY tsconfig.json ./
COPY seyfert.config.js ./
COPY /src ./src

RUN npm run build && \
    npm prune --production

ENV USER node
ENV NODE_ENV=production

USER $USER

CMD ["npm", "start"]
