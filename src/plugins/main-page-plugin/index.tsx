import { Plugin, Request } from "@hapi/hapi";
import { renderToStaticMarkup } from "react-dom/server";
import { renderToStringWithData } from "@apollo/client/react/ssr";
import React from "react";
import { ApolloClient, InMemoryCache, ApolloLink } from "@apollo/client";
import { SchemaLink } from "@apollo/client/link/schema";
import { GraphQLSchema } from "graphql";

import ServerSideEntry from "./components/server-side-entry";
import Html from "./components/html";

type PluginRequest = Request & { getSchema?: () => GraphQLSchema };

const mainPagePlugin: Plugin<any> = {
  name: "main-page-plugin",
  version: "1.0.0",
  register: (server) => {
    server.route({
      method: "GET",
      path: "/{param*}",
      handler,
    });
  },
};

async function handler(req: PluginRequest) {
  const schema = req.getSchema?.();
  if (!schema) {
    throw new Error("No graphql schema define available on the request object");
  }
  const schemaLink = new SchemaLink({ schema });

  const client = new ApolloClient({
    ssrMode: true,
    link: ApolloLink.from([schemaLink]),
    cache: new InMemoryCache(),
  });

  const App = () => <ServerSideEntry client={client} />;

  const content = await renderToStringWithData(<App />);
  const initialState = client.extract();

  const html = <Html content={content} state={initialState} />;
  return `<!doctype html>\n${renderToStaticMarkup(html)}`;
}

export default mainPagePlugin;
