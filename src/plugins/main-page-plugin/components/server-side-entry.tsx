import App from "../../../components/app";
import React from "react";
import { ApolloClient, ApolloProvider } from "@apollo/client";

function SsrEntry({ client }: { client: ApolloClient<any> }) {
  return (
    <ApolloProvider client={client}>
      <h1>Server side entry</h1>
      <App />
    </ApolloProvider>
  );
}

export default SsrEntry;
