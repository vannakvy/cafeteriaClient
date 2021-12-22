import React from 'react'
import App from './App'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  split,
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context'
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import DataProvider from './context/dataProvider';

const address = process.env.React_App_SERVER

const httpLink = new HttpLink({
  uri: `https://${address}`
})

const wsLink = new WebSocketLink({
  uri: `wss://${address}`,
  options: {
    reconnect: true
  }
});

const authLink = setContext((request, previousContext) => {
  const token = localStorage.getItem("jwtToken")
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  }
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink),
  // httpLink,
  // authLink,
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
})

export default (
  <ApolloProvider client={client}>
    <DataProvider>
      <App />
    </DataProvider>
  </ApolloProvider>
)