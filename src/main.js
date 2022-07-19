import App from "./App.vue";
import router from "./router";
import { createApp, h  } from "vue";
// import { createStore } from 'vuex'

import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  split
} from "@apollo/client/core";
import { createApolloProvider } from "@vue/apollo-option";
import VuePatternfly4 from '@vue-patternfly/core';

import CarbonComponentsVue from '@carbon/vue';
import chartsVue from "@carbon/charts-vue";
import VueUploadComponent from 'vue-upload-component'

import Multiselect from "vue-multiselect";


import VueFusionCharts from 'vue-fusioncharts';
import FusionCharts from 'fusioncharts';
import Column2D from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import Charts from 'fusioncharts/fusioncharts.charts';
import TimeSeries from 'fusioncharts/fusioncharts.timeseries';

import store from "./store/store.js"

import Keycloak from 'keycloak-js';

import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from '@apollo/client/utilities'

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

let token = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJzeVo4VkRybzR2SHNPZ01kUXUxUC1vQnA1SlN1Q0JOZHU1eWt5TFh0OGY4In0.eyJleHAiOjE2NTgyMTYzNzksImlhdCI6MTY1ODIxNjA3OSwiYXV0aF90aW1lIjoxNjU4MjE0MDk0LCJqdGkiOiJiNzAxNDc1Yy0yNWQyLTQ2MWItOTYyMi1iMGI4NTE0ZWI1NTUiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0Ojg0ODAvYXV0aC9yZWFsbXMva29naXRvIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6ImI2ODQ2YWJlLTg5M2MtNGIxYy1iZjAxLTdlNGZkYzNlOWJhNCIsInR5cCI6IkJlYXJlciIsImF6cCI6InZ1ZS1kZW1vIiwibm9uY2UiOiI3NjgzMGJhZS1kYzFjLTRmOGItOGU0NS1hZWYwMWNhODI4NWUiLCJzZXNzaW9uX3N0YXRlIjoiMzI2MTVlNjAtNjVhZS00Zjc1LWI4M2EtODdmNzQ5MzU1NjFlIiwiYWNyIjoiMCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwOi8vbG9jYWxob3N0OjMwMDAiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJkZWZhdWx0LXJvbGVzLWtvZ2l0byJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiIzMjYxNWU2MC02NWFlLTRmNzUtYjgzYS04N2Y3NDkzNTU2MWUiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInByZWZlcnJlZF91c2VybmFtZSI6ImhzbSJ9.oWVkS0BD_mvPpjsaINmGEJrgJYdxWmEDXdY5xBkl2mBovUNBvFG7b0fCzHn8_7dxZsEtS554qJSkQVdD5UNHD-1bbUPxBQyj8unJxVpzBhtAHDrWrBZusyCW6R9nXp_Y-CWVBUyiM6m9_0wNEj-rwGLtkcbwJ58pAs4UUGiL3QkGsAvYYWkc0ez3fjdqW6gc8r2w-C73ysFcUEj5D08QH3nGxUyppYbPsgv7tR8QTfg7GcXVaMM5vAZ5NxxGuz7t4F1jbjBNdF6WzWKkEibdATk7-7vIBAgntBKfufqBeu6UEpuj19vpzZ_xvZ2aqmxZpCTx2uGpLhtV0SFX_ZwiUw'
const wsLink = new WebSocketLink({
  uri: 'ws://localhost:8580/v1/graphql',
  options: {   
    reconnect: true,
    timeout: 30000,
    connectionParams: {
      headers: {
        Authorization: "Bearer " + store.state._keycloak.Token
      }
    }
  },
})

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query)
    return definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
  },
  wsLink,
  httpLink
)

const apolloClient = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

const apolloProvider = createApolloProvider({
  defaultClient: apolloClient
});

// const store = createStore({
//   state () {
//     return {
//       _keycloak : Object,
//       userinfo:Object,
//       Notifications:[]
//     }
//   },
//   mutations: {
//     setNotifications(state,item){
//       state.Notifications = [...state.Notifications,item]
//     },
//     delNotifications (state) {
//       state.Notifications = []
//     },
//     redirect(){
//         this.$route.push()
//     },
//     set_userinfo(state,value){
//       state.userinfo = value
//     },
//     set_keycloak(state){
//       state._keycloak = new Keycloak(initOptions)
//     }
//   }
// })

// const _keycloak = new Keycloak(initOptions);
// store.commit('set_keycloak')
store.state._keycloak
    .init({
        onLoad: 'login-required',
    }).then(async () => {
        store.commit('set_userinfo',await store.state._keycloak.loadUserProfile())

        // store.state._keycloak.loadUserProfile()
        // .then(function(profile) {
        //     const myprofile = JSON.stringify(profile, null, "  ")
        //   }
        //   ).catch(function() {
        //     alert('Failed to load user profile');
        //   });
           createApp({
            render: () => h(App),
                  });
          createApp({
          render: () => h(App),
        }).component('file-upload', VueUploadComponent).component('multiselect', Multiselect).use(VuePatternfly4).use(apolloProvider).use(router)
        .use(VueFusionCharts, FusionCharts, Charts, FusionTheme,TimeSeries)
        .use(store)
        .mount("#app");
    });

    window.addEventListener('focus',() => {
      store.state._keycloak.updateToken(70).then((refreshed) => {
        if (refreshed) {
          console.log('Token refreshed ' + refreshed);
        } else {
          console.log('Token not refreshed, valid for '
            + Math.round(store.state._keycloak.tokenParsed.exp + store.state._keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
        }
      }).catch(() => {
        console.log('Failed to refresh token ');
      });
    })

    router.afterEach((to, from, next) => {
      store.state._keycloak.updateToken(70).then((refreshed) => {
        if (refreshed) {
          console.log('Token refreshed ' + refreshed);
        } else {
          console.log('Token not refreshed, valid for '
            + Math.round(store.state._keycloak.tokenParsed.exp + store.state._keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
        }
      }).catch(() => {
        console.log('Failed to refresh token ');
      });
    })
    
// const app = createApp({
//   render: () => h(App),
// });

// app.component('file-upload', VueUploadComponent);
// app.component('multiselect', Multiselect);

// app.use(VuePatternfly4);
// app.use(apolloProvider);
// app.use(chartsVue);
// app.use(VueFusionCharts, FusionCharts, Charts, FusionTheme,TimeSeries);
// app.use(CarbonComponentsVue);
// app.use(store)
// app.use(router);

// app.mount("#app");
export default store;
