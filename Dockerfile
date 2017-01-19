FROM mhart/alpine-node:7
RUN mkdir -p /src/app
WORKDIR /src
COPY package.json index.html actions.js server.js main.js .babelrc webpack.config.js /src/
RUN npm install
COPY app /src/app
EXPOSE 5000
ENTRYPOINT npm start