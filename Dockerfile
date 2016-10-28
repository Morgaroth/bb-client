FROM mhart/alpine-node:7
RUN mkdir -p /src/app
WORKDIR /src
COPY package.json index.html index.js server.js main.js .babelrc webpack.config.js /src/
COPY app /src/app
RUN npm install
EXPOSE 5000
ENTRYPOINT npm start