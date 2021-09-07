import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  NormalizedCacheObject,
  split,
  HttpLink,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

import App from '../../../components/app';

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:3000/subscriptions',
  options: {
    reconnect: true,
  },
});

const httpLink = new HttpLink({ uri: '/graphql' });

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink,
);

function ClientSideEntry() {
  // eslint-disable-next-line no-underscore-dangle
  const state = (
    window as Window & typeof globalThis & { __APOLLO_STATE__: string | NormalizedCacheObject }
  ).__APOLLO_STATE__;

  // According to Apollo documentation the __APOLLO_STATE__ is a string,
  // but we receive it as a object. To be sure, this check is added.
  const restoredCache = typeof state === 'object' ? state : JSON.parse(state);

  const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache().restore(restoredCache),
  });

  return (
    <ApolloProvider client={client}>
      <h1>Client side hydrate</h1>
      <App />
    </ApolloProvider>
  );
}

ReactDOM.hydrate(<ClientSideEntry />, document.getElementById('root'));
