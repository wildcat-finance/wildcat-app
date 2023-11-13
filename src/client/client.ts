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
  // TODO: setup env for deployment
  // uri: process.env.REACT_APP_APOLLO_SERVER_URL,
  uri: "https://api.studio.thegraph.com/query/56451/wildcat-finance/v0.0.16",
})

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
  defaultOptions,
})
