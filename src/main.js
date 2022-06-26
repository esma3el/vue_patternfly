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

import Keycloak from 'keycloak-js';

const initOptions = {
    url: 'http://localhost:8480/auth/',
    realm: 'kogito',
    clientId: 'vue-demo'
};

const httpLink = createHttpLink({
  uri: "http://localhost:8580/v1/graphql",
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

// const app = createApp({
//   render: () => h(App),
// });

const _keycloak = new Keycloak(initOptions);
_keycloak
    .init({
        onLoad: 'login-required',
    }).then(async () => {
        window.localStorage.setItem('token', _keycloak.token)
        // const myprofile = await _keycloak.loadUserProfile()
        _keycloak.loadUserProfile()
        .then(function(profile) {
            const myprofile = JSON.stringify(profile, null, "  ")
            window.localStorage.setItem('userInfo', myprofile)
        }).catch(function() {
            alert('Failed to load user profile');
        });
        createApp({
          render: () => h(App),
        }).use(VuePatternfly4).use(apolloProvider).use(router).mount("#app");
    });



// app.use(VuePatternfly4);
// app.use(apolloProvider);
// app.use(router);
// app.mount("#app");