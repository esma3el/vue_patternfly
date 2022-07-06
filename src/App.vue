<script>
import { handleError } from "vue";
import Nav from "./components/Nav";
export default {
  name: "App",
  components: { Nav },
  data() {
    return {
      counter:0,
    };
  },
  mounted() {
  },methods:{
      async Notification(){
        this.$store.commit('setNotifications',{'variant':'','title':''})   
        setTimeout(()=>{
          this.$store.commit('delNotifications')
        },5000)
        setTimeout(()=>{
        this.$router.push({name:'Home'})
        },1000)
    } ,    
    clear_alarm(){
      this.$store.commit('delNotifications')
    }    
  }
    }      
</script>

<template>
  <pf-page managed-sidebar>
    <template #skeleton>
      <pf-page-header show-nav-toggle>
        <template #logo>
          <pf-brand
            src="https://www.patternfly.org/assets/images/pf_logo.svg"
            style="height: 40px; filter: invert(1)"
          />
        </template>
        <pf-page-header-tools>
          <pf-page-header-tools-group>
            <pf-page-header-tools-item visibility-xs="hidden">           
              <div style="display:flex;">
              {{$store.state.userinfo.username }}
              <pf-button class="btn">
              <img src="./logout.svg" />
              </pf-button>
              </div>
            </pf-page-header-tools-item>
          </pf-page-header-tools-group>
        </pf-page-header-tools>
      </pf-page-header>
      <pf-page-sidebar nav-open class="side">
        <Nav />
      </pf-page-sidebar>
    </template>   
    <section class="pf-c-page__main-section pf-m-limit-width">   

      <div class="alert" v-for="item in $store.state.Notifications">
      <pf-alert
        inline
        :variant="item.variant"
        :title="item.title"
        close
        @close="clear_alarm"        
      >
        <p>
          {{item.msg}}
        </p>
      </pf-alert>
      </div>
      <div class="pf-c-page__main-body">
        <router-view />
      </div>
    </section>
  </pf-page>
</template>

<style lang="scss">
@import "@patternfly/patternfly/patternfly.css";
// @import "@carbon/styles/css/styles.css";
// @import "@carbon/charts/styles.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;  
}
.pf-c-page__main-section {
  min-height: calc(100vh - 4.75rem);
  height: 100%;
}
.hide_unauthorized {
  pointer-events: none;
  opacity: 0.5;
}
.alert{
  width: 30%;
  position: fixed;
  top:10%;
  right: 0%;
}
img{
  width: 25px;
  height: 25px;
  background-color: white;  
}
.btn{
  width: 25px;
}
</style>
