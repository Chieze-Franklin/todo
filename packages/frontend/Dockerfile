FROM node:18
ARG VITE_SERVER_URL=http://127.0.0.1:3000
ENV VITE_SERVER_URL=$VITE_SERVER_URL
WORKDIR /app
RUN npm i -g typescript
COPY index.html package.json postcss.config.js tailwind.config.js tsconfig.app.json tsconfig.json tsconfig.node.json vite.config.ts ./
COPY public/ /app/public
COPY src/ /app/src
RUN yarn install
# RUN yarn build