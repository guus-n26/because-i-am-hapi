import React from "react";
import ReactDOM from "react-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  NormalizedCacheObject,
} from "@apollo/client";

import App from "../../../components/app";

function ClientSideEntry() {
  const state = (
    window as Window &
      typeof globalThis & { __APOLLO_STATE__: string | NormalizedCacheObject }
  ).__APOLLO_STATE__;

  // According to Apollo documentation the __APOLLO_STATE__ is a string,
  // but we receive it as a object. To be sure, this check is added.
  const restoredCache = typeof state === "object" ? state : JSON.parse(state);

  const client = new ApolloClient({
    link: new HttpLink({ uri: "/graphql" }),
    cache: new InMemoryCache().restore(restoredCache),
  });

  return (
    <ApolloProvider client={client}>
      <h1>Client side hydrate</h1>
      <App />
    </ApolloProvider>
  );
}

ReactDOM.hydrate(<ClientSideEntry />, document.getElementById("root"));
