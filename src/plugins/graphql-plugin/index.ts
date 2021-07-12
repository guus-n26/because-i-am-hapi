import { Server } from "@hapi/hapi";
import { ApolloServer, gql } from "apollo-server-hapi";
import { makeExecutableSchema } from "graphql-tools";

const graphqlFn = async (server: Server, options: any) => {
  const schema = makeExecutableSchema({
    typeDefs: gql`
      type Query {
        name: String
      }
    `,
    resolvers: {
      Query: {
        name: () => "Guus",
      },
    },
  });
  const apolloServer = new ApolloServer({
    schema,
  });

  await apolloServer.start();
  server.decorate("request", "getSchema", () => schema);

  await apolloServer.applyMiddleware({
    app: server,
  });

  await apolloServer.installSubscriptionHandlers(server.listener);
};

export default graphqlFn;
