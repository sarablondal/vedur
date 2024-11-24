import React from 'react';
import { ApolloClient, InMemoryCache, HttpLink, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:5231/graphql', // Replace with your actual GraphQL endpoint
  }),
  cache: new InMemoryCache(),
});

interface ApolloClientProviderProps {
  children: React.ReactNode;
}

export const ApolloClientProvider: React.FC<ApolloClientProviderProps> = ({ children }) => {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
};