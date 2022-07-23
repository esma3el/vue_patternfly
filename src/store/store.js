import { createStore } from 'vuex'
import Keycloak from 'keycloak-js';

const initOptions = {
    url: 'http://localhost:8480/auth/',
    realm: 'kogito',
    clientId: 'vue-demo'
};

const store = createStore({
    state () {
      return {        
        spinner:false,
        _keycloak : new Keycloak(initOptions),
        userinfo:Object,
        Notifications:[]
      }
    },
    mutations: {
      toggle_spinner(state,item){
        state.spinner = !state.spinner
      },
      setNotifications(state,item){
        state.Notifications = [...state.Notifications,item]
      },
      delNotifications (state) {
        state.Notifications = []
      },
      redirect(){
          this.$route.push()
      },
      set_userinfo(state,value){
        state.userinfo = value
      },
      set_keycloak(state){
        state._keycloak = new Keycloak(initOptions)
      }
    }
  })


  export default store;