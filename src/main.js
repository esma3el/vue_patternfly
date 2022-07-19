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
    url: 'http://172.29.2.97:8480/auth/',
    realm: 'kogito',
    clientId: 'vue-demo'
};

const httpLink = createHttpLink({
  uri: "http://172.29.2.97:8580/v1/graphql",
  headers: {
    "content-type": "application/json",
    "x-hasura-admin-secret": "hasura",
  },
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:8580/v1/graphql',
  options: {
    reconnect: true,
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
        // window.localStorage.setItem('token', _keycloak.token)
        store.commit('set_userinfo',await store.state._keycloak.loadUserProfile())

        // store.state._keycloak.loadUserProfile()
        // .then(function(profile) {
        //     const myprofile = JSON.stringify(profile, null, "  ")
        //     window.localStorage.setItem('userInfo', myprofile)
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
