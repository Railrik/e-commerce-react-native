import 'react-native-gesture-handler';

import { useEffect, useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { persistCache } from 'apollo3-cache-persist'

import AppNav from './routes/AppNav';

import AsyncStorage from '@react-native-async-storage/async-storage';
import EmptyItem from './components/EmptyItem';

const cache = new InMemoryCache({
  typePolicies: {
    Cart: {
      fields: {
        cartItems: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
    Query: {
      fields: {
        user: {
          merge(existing, incoming, { args }) {
            return incoming;
          },
        },
      },
    },
  },
});

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache,
  defaultOptions: { watchQuery: { fetchPolicy: 'cache-and-network' } },
})

const App = () => {
  const [loadingCache, setLoadingCache] = useState(true)

  useEffect(() => {
    persistCache({
      cache,
      storage: AsyncStorage,
    }).then(() => setLoadingCache(false))
  }, [])

  if (loadingCache) {
    return <EmptyItem text="Chargement..." />
  }

  return (
    <ApolloProvider client={client}>
      <AppNav />
    </ApolloProvider>
  )
}

export default App;
