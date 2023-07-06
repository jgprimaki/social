import { createApolloClient } from "vue-cli-plugin-apollo/graphql-client";

let instance = null;

export function createApolloClientInstance(options, defaultOptions) {
  const { apolloClient, wsClient } = createApolloClient({
    ...defaultOptions,
    ...options
  });
  apolloClient.wsClient = wsClient;

  instance = apolloClient;
  return apolloClient;
}

export function apolloClientInstance() {
  return instance;
}
