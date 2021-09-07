import { makeExecutableSchema, PubSub } from 'apollo-server-hapi';
import { Resolvers } from './resolvers';

import typeDefs from './schema.graphql';

const pubsub = new PubSub();

let currentNumber = 0;

function incrementNumber() {
  console.log('incrementNumber');
  currentNumber += 1;
  pubsub.publish('NUMBER_INCREMENTED', { numberIncremented: currentNumber });
  setTimeout(incrementNumber, 1000);
}

const resolvers: Resolvers = {
  Query: {
    name: () => 'Guus',
    address: () => ({
      street: 'Test street',
    }),
  },
  Subscription: {
    numberIncremented: {
      subscribe: () => pubsub.asyncIterator(['NUMBER_INCREMENTED']),
    },
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

incrementNumber();

export default schema;
