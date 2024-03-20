# Use an official Node.js runtime as the base image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /src/app

COPY package*.json ./

RUN npm install --production

COPY . .

ENV PORT=8080

EXPOSE 8080

CMD ["node", "index.js"]
