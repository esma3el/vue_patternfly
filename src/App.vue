<script>
import Nav from "./components/Nav";
export default {
  name: "App",
  components: { Nav },
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
              header-tools
            </pf-page-header-tools-item>
          </pf-page-header-tools-group>
        </pf-page-header-tools>
      </pf-page-header>
      <pf-page-sidebar nav-open class="side">
        <Nav />
      </pf-page-sidebar>
    </template>
    <main>
      <pf-page-section>
        <pf-card>
          <pf-card-body>
            <router-view />
          </pf-card-body>
        </pf-card>
      </pf-page-section>
    </main>
  </pf-page>
</template>

<style>
@import "@patternfly/patternfly/patternfly.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.side {
  height: calc(100vh);
}
main {
  overflow: hidden;
}
</style>
