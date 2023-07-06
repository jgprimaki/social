# ######################################################################
# MULTI-STAGE BUILD
# ######################################################################
FROM docker.dynamix.com.br/ubuntu-server-build:2.0 as build

# User data directory, contains flows, config and nodes.
RUN mkdir /tmp/src

COPY package.json /tmp/src/package.json
COPY package-lock.json /tmp/src/package-lock.json

WORKDIR /tmp/src

RUN npm install

# ######################################################################
# MULTI-STAGE APP
# ######################################################################
FROM docker.dynamix.com.br/ubuntu-server:2.0

# User data directory, contains flows, config and nodes.
RUN mkdir /app

WORKDIR /app

COPY --from=build /tmp/src/node_modules /app/node_modules

ADD . /app/

RUN npm run build

EXPOSE 5000

CMD ["./node_modules/.bin/serve", "-s", "dist"]
