import { Server, Request, ResponseToolkit } from "@hapi/hapi";
import { ApolloServer } from "apollo-server-hapi";
import schema from "./graphql/schema";

export interface ApolloContextProviderArgs {
  request: Request;
  h: ResponseToolkit;
}

const apolloGraphqlPlugin = async (server: Server, options: any) => {
  const apolloServer = new ApolloServer({
    schema,
    context: (context: ApolloContextProviderArgs) => ({
      ...context,
      options,
    }),
  });

  await apolloServer.start();

  // Decorate the request with the schema
  server.decorate("request", "getSchema", () => schema);

  await apolloServer.applyMiddleware({
    app: server,
  });
};

export default apolloGraphqlPlugin;
