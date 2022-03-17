# pull basic node image from docker hub
FROM node:lts-alpine
# Working directory for rest of commands
RUN mkdir /app
WORKDIR /app

COPY package*.json ./
# Install dependencies on container
RUN npm install

# # copy local files to app folder of container
# COPY . .

# # expose the port for access outside container
# EXPOSE 3000
# ENV PORT 3000

# start up react server on container using npm scripts
CMD [ "npm", "run", "dev" ]