FROM node:18
WORKDIR /app
RUN npm i -g typescript
COPY package.json tsconfig.json ./
RUN yarn install
COPY . .
RUN yarn build