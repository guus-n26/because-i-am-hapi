FROM node:14

USER node

RUN mkdir /home/node/code

WORKDIR /home/node/code

COPY --chown=node:node . ./

RUN yarn install --frozen-lockfile

COPY --chown=node:node . .

ENV PORT="8080"

RUN yarn build

CMD ["node", "src/server.js"]
