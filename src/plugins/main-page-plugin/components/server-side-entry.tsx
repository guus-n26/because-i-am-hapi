import React from 'react';
import { ApolloClient, ApolloProvider } from '@apollo/client';
import App from '../../../components/app';

function SsrEntry({ client }: { client: ApolloClient<any> }) {
  return (
    <ApolloProvider client={client}>
      <h1>Server side entry</h1>
      <App />
    </ApolloProvider>
  );
}

export default SsrEntry;
