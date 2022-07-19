import { createStore } from 'vuex'
import Keycloak from 'keycloak-js';

const initOptions = {
    url: 'http://172.29.2.97:8480/auth/',
    realm: 'kogito',
    clientId: 'vue-demo'
};

const store = createStore({
    state () {
      return {
        _keycloak : new Keycloak(initOptions),
        userinfo:Object,
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