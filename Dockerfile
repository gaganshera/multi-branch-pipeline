FROM node:12.18.3-slim

ENV PORT=3010

# Create app directory
WORKDIR /app

RUN apt-get update 
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install -g pm2
RUN npm install

# Bundle app source
COPY . .
EXPOSE 3010
CMD [ "npm", "start" ]