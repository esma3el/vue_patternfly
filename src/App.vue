<script>
import Nav from "./components/Nav";
export default {
  name: "App",
  components: { Nav },
  data() {
    return {
      userinfo: JSON.parse(window.localStorage.getItem("userInfo")),
    };
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
            <pf-page-header-tools-item visibility-xs="hidden">
              {{ userinfo.username }}
            </pf-page-header-tools-item>
          </pf-page-header-tools-group>
        </pf-page-header-tools>
      </pf-page-header>
      <pf-page-sidebar nav-open class="side">
        <Nav />
      </pf-page-sidebar>
    </template>
      <section class="pf-c-page__main-section pf-m-limit-width">
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
  font-size: small;
}
.pf-c-page__main-section {
  min-height: calc(100vh - 4.75rem);
  height: 100%;
}

</style>
