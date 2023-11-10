import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/react-hooks"

export const link = createHttpLink({
  uri: process.env.REACT_APP_APOLLO_SERVER_URL,
})

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
})
