#FROM mhart/alpine-node:base
FROM mhart/alpine-node:base-4
# FROM mhart/alpine-node
WORKDIR /src
ADD . .
EXPOSE 5000
CMD ["node", "main.js"]