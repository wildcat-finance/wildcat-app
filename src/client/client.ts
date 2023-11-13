import {
  ApolloClient,
  createHttpLink,
  DefaultOptions,
  InMemoryCache,
} from "@apollo/react-hooks"

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
}

export const link = createHttpLink({
  uri: process.env.REACT_APP_APOLLO_SERVER_URL,
})

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
  defaultOptions,
})
