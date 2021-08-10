FROM node:14

RUN mkdir /home/node/code

WORKDIR /home/node/code

COPY . ./

RUN yarn install --frozen-lockfile

COPY . .

ENV PORT="3000"

RUN yarn build

CMD ["node", "src/server.js"]
