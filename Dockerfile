FROM artifactory.cd-tech26.de/docker/n26/node-14:latest

USER node

RUN mkdir /home/node/code

WORKDIR /home/node/code

COPY --chown=node:node . ./

RUN yarn install --frozen-lockfile

COPY --chown=node:node . .

ENV PORT="3000"

RUN yarn build

CMD ["node", "src/server.js"]
