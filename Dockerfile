FROM node:14.15.5 as base
ENV NODE_ENV=production
EXPOSE 80

# https://stackoverflow.com/questions/59625058/how-to-tell-webstorm-to-look-in-docker-container-for-project
# https://stackoverflow.com/questions/51097652/install-node-modules-inside-docker-container-and-synchronize-them-with-host
RUN mkdir /opt/cache
WORKDIR /opt/cache

COPY package*.json ./
RUN npm ci --only=production \
  && npm cache clean --force
#WORKDIR /usr/src/cache

WORKDIR /opt/project
#COPY package*.json ./
#RUN npm ci --only=production \
#  && npm cache clean --force
ENV PATH /opt/project/node_modules/.bin:$PATH
COPY . .
CMD ["node", "server.js"]

#####
FROM base as development
ENV NODE_ENV=development
WORKDIR /opt/cache
RUN npm install --only=development && npm cache clean --force
WORKDIR /opt/project
CMD ["nodemon", "--debug=56745", "server.js"]

#####
FROM development as testing
COPY . .
#RUN npm audit

#####
FROM testing as pre-prod
RUN rm -rf ./tests && rm -rf ./node_modules



#####
FROM base as production
ENV NODE_ENV=production
COPY --from=pre-prod /opt/project /opt/project
