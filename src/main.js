import App from "./App.vue";
import router from "./router";
import { createApp, h } from "vue";
import { createStore } from 'vuex'

import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
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


import Keycloak from 'keycloak-js';

const initOptions = {
    url: 'http://localhost:8480/auth/',
    realm: 'kogito',
    clientId: 'sdm-frontend'
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

const store = createStore({
  state () {
    return {
      Notifications:[]
    }
  },
  mutations: {
    setNotifications(state,item){
      state.Notifications = [...state.Notifications,item]
    },
    delNotifications (state) {
      state.Notifications = []
    },
    redirect(){
        this.$route.push()
    }
  }
})

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
        }).component('file-upload', VueUploadComponent).component('multiselect', Multiselect).use(VuePatternfly4).use(apolloProvider).use(router)
        .use(VueFusionCharts, FusionCharts, Charts, FusionTheme,TimeSeries)
        .use(store)
        .mount("#app");
    });

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
// app.use(router);
// app.use(store)
// app.mount("#app");