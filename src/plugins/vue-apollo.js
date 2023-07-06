import { InMemoryCache } from "apollo-cache-inmemory";
import { split } from "apollo-link";
import { onError } from "apollo-link-error";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import Vue from "vue";
import VueApollo from "vue-apollo";
import { restartWebsockets } from "vue-cli-plugin-apollo/graphql-client";

// New Imports
import { createApolloClientInstance } from "./apollo-client";

// Install the vue plugin
Vue.use(VueApollo);

// Init store
let STORE = null;

const httpLink = new HttpLink({
  // You should use an absolute URL here
  uri: process.env.VUE_APP_GRAPHQL_REST
});

// Create the subscription websocket link
const wsLink = new WebSocketLink({
  uri: process.env.VUE_APP_GRAPHQL_WSIO,
  options: {
    reconnect: true
  }
});

const HANDLED_MESSAGE = "handled_message";
const errorHandler = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(error => {
      const { extensions, message } = error;
      if (extensions.code === HANDLED_MESSAGE) {
        const snack = {
          show: true,
          message,
          color: "error",
          args: extensions
        };
        STORE.dispatch("showMessage", snack);
      }
    });
  }
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  errorHandler,
  httpLink
);

// Name of the localStorage item
const AUTH_TOKEN = "apollo-token";

// Http endpoint
const httpEndpoint = process.env.VUE_APP_GRAPHQL_HTTP;

// Config
const defaultOptions = {
  // You can use `https` for secure connection (recommended in production)
  httpEndpoint,
  // You can use `wss` for secure connection (recommended in production)
  // Use `null` to disable subscriptions
  wsEndpoint: false,
  // LocalStorage token
  tokenName: AUTH_TOKEN,
  // Enable Automatic Query persisting with Apollo Engine
  persisting: false,
  // Use websockets for everything (no HTTP)
  // You need to pass a `wsEndpoint` for this to work
  websocketsOnly: false,
  // Is being rendered on the server?
  ssr: false,

  link,

  cache: new InMemoryCache(),

  connectToDevTools: true

  // Override default apollo link
  // note: don't override httpLink here, specify httpLink options in the
  // httpLinkOptions property of defaultOptions.
  // link: myLink

  // Override default cache
  // cache: myCache

  // Override the way the Authorization header is set
  // getAuth: (tokenName) => ...

  // Additional ApolloClient options
  // apollo: { ... }

  // Client local data (see apollo-link-state)
  // clientState: { resolvers: { ... }, defaults: { ... } }
};

// Call this in the Vue app file
export function createProvider(options = {}, store = null) {
  // Set store
  STORE = store;

  // Create apollo client
  const apolloClient = createApolloClientInstance(options, defaultOptions);

  // Create vue apollo provider
  const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
    defaultOptions: {
      $query: {
        // fetchPolicy: 'cache-and-network',
      }
    }
  });

  return apolloProvider;
}

// Manually call this when user log in
export async function onLogin(apolloClient, token) {
  if (typeof localStorage !== "undefined" && token) {
    localStorage.setItem(AUTH_TOKEN, token);
  }
  if (apolloClient.wsClient) restartWebsockets(apolloClient.wsClient);
  try {
    await apolloClient.resetStore();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log("%cError on cache reset (login)", "color: orange;", e.message);
  }
}

// Manually call this when user log out
export async function onLogout(apolloClient) {
  if (typeof localStorage !== "undefined") {
    localStorage.removeItem(AUTH_TOKEN);
  }
  if (apolloClient.wsClient) restartWebsockets(apolloClient.wsClient);
  try {
    await apolloClient.resetStore();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log("%cError on cache reset (logout)", "color: orange;", e.message);
  }
}
