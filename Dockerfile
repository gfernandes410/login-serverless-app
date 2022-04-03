FROM node:14-slim
RUN DEBIAN_FRONTEND=noninteractive && apt-get update && apt-get install -y inetutils* && apt-get install -y netcat
RUN npm install -g serverless npm-watch
WORKDIR /app
RUN ln -s /app/dist/src/layers /opt/nodejs
VOLUME /app
