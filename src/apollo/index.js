import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import { AUTH_TOKEN } from "@/constants";

const cache = new InMemoryCache();

const httpLink = new HttpLink({
  uri: process.env.VUE_APP_APOLLO_SERVER_URL
  //uri: "http://localhost:8010/admin"
});


const httpLinkAuth = setContext((_, { headers }) => {
  // get the authentication token from localstorage if it exists
  const token = localStorage.getItem(AUTH_TOKEN);

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      token
    }
  };
});

export const apolloClient = new ApolloClient({
  link: httpLinkAuth.concat(httpLink),
  cache,
  connectToDevTools: true
});

export { cache };
