import App from "./App.vue";
import router from "./router"; // <---
import { createApp, h } from "vue";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import { createApolloProvider } from "@vue/apollo-option";
import VuePatternfly4 from '@vue-patternfly/core';


const httpLink = createHttpLink({
  uri: "http://172.29.2.97:8580/v1/graphql",
  headers: {
    "content-type": "application/json",
    "x-hasura-admin-secret": "hasura",
  },
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
});

const app = createApp({
  render: () => h(App),
});

app.use(VuePatternfly4);
app.use(apolloProvider);
app.use(router);
app.mount("#app");
