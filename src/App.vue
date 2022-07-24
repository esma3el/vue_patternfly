<script>
import { handleError } from "vue";
import Nav from "./components/Nav";
import "@fortawesome/fontawesome-free/css/all.css";

export default {
  name: "App",
  components: { Nav },
  data() {
    return {
      counter: 0,
    };
  },
  mounted() {},
  methods: {
    async profile() {
      await this.$store.state._keycloak.accountManagement();
    },
    async logout() {
      await this.$store.state._keycloak.logout();
    },
    async Notification() {
      this.$store.commit("setNotifications", { variant: "", title: "" });
      setTimeout(() => {
        this.$store.commit("delNotifications");
      }, 15000);
      // setTimeout(()=>{

      // },1000)
    },
    clear_alarm() {
      this.$store.commit("delNotifications");
    },
  },
};
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
            <pf-page-header-tools-item>
              <pf-dropdown v-model:open="open7" plain>
                <template #toggle>
                  <pf-kebab-toggle />
                </template>
                <pf-dropdown-item @click="profile"
                  ><i class="fa-solid fa-user"></i> Edit Profile</pf-dropdown-item
                >
                <pf-dropdown-separator />
                <pf-dropdown-item @click="logout"><i class="fa-solid fa-right-from-bracket"></i> Logout</pf-dropdown-item>
              </pf-dropdown>
            </pf-page-header-tools-item>
          </pf-page-header-tools-group>
          <pf-page-header-tools-group>
            <pf-page-header-tools-item visibility-xs="hidden">
              {{ $store.state.userinfo.username }}
            </pf-page-header-tools-item>
          </pf-page-header-tools-group>
        </pf-page-header-tools>
      </pf-page-header>
      <pf-page-sidebar>
        <Nav />
      </pf-page-sidebar>
    </template>
    <section class="pf-c-page__main-section">
      <div class="spinner" v-if="$store.state.spinner">
        <pf-spinner />
      </div>
      <div class="pf-c-page__main-body" :class="{ op: $store.state.spinner }">
        <router-view />
            <div class="alert" v-for="item in $store.state.Notifications">                        
              <pf-alert
                inline
                :variant="item.variant"
                :title="item.title"
                close
                @close="clear_alarm"
              >
                <p>
                  {{ item.msg }}
                </p>
              </pf-alert>
            </div>
      </div>
    </section>
  </pf-page>
</template>

<style lang="scss">
@import "@patternfly/patternfly/patternfly.css";
// @import "@carbon/styles/css/styles.css";
// @import "@carbon/charts/styles.css";

// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }
.pf-c-page__main-section {
  min-height: calc(100vh - 4.75rem);
  height: 100%;
}
.hide_unauthorized {
  pointer-events: none;
  opacity: 0.5;
}
.alert {
  width: 30%;
  position: fixed;  
  z-index: 101;
  top: 10%;
  transform: translatex(calc(100% + 10%));
  right: 1.7%;
  overflow: hidden;
  box-shadow: 0 0 2px black;
}

@keyframes slideIn {
    0% { transform: translatex(100% + 5%); }
    50% { transform: translatex(100% + 10%); }
    100% { transform: translatex(0); }
}
// @keyframes slideOut {
//   0% { transform: translatex(0); }
//   50% { transform: translatex(50% - 5%); }
//   100% { transform: translatex(100% - 10px); }
// }
.alert {
    animation: slideIn 700ms ease forwards;
}
.spinner {
  position: fixed;
  top: 50%;
  left: 50%;
}
.op {
  pointer-events: none;
  opacity: 0.5;
  transition: opacity 200ms ease-in-out;
}
</style>
