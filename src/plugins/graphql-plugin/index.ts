import { Server, Request, ResponseToolkit } from '@hapi/hapi';
import { ApolloServer } from 'apollo-server-hapi';
import schema from './graphql/schema';

export interface ApolloContextProviderArgs {
  request: Request;
  h: ResponseToolkit;
}

const apolloGraphqlPlugin = async (server: Server, options: any) => {
  const apolloServer = new ApolloServer({
    schema,
    subscriptions: {
      path: '/subscriptions',
      onConnect: () => {
        console.log('Client connected');
      },
      onDisconnect: () => {
        console.log('Client disconnected');
      },
    },
    context: (context: ApolloContextProviderArgs) => ({
      ...context,
      options,
    }),
  });

  // Decorate the request with the schema
  server.decorate('request', 'getSchema', () => schema);

  apolloServer.installSubscriptionHandlers(server.listener);
  await apolloServer.start();

  await apolloServer.applyMiddleware({
    app: server,
  });
};

export default apolloGraphqlPlugin;
