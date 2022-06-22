<template>
    <div>
        <pf-page managed-sidebar>
  <template #skeleton>
    <pf-page-header show-nav-toggle>
      <template #logo>
        <pf-brand src="https://www.patternfly.org/assets/images/pf_logo.svg" style="height:40px;filter:invert(1)" />
      </template>
      <pf-page-header-tools>
        <pf-page-header-tools-group>
          <pf-page-header-tools-item visibility-xs="hidden">
            header-tools
          </pf-page-header-tools-item>
        </pf-page-header-tools-group>
      </pf-page-header-tools>
    </pf-page-header>
    <pf-page-sidebar nav-open>
      <pf-nav-group title="Overview">
        <pf-nav-item>Home</pf-nav-item>
      </pf-nav-group>
      <pf-nav-group title="Components">
        <pf-nav-item>Accordion</pf-nav-item>
        <pf-nav-item>Alert</pf-nav-item>
      </pf-nav-group>
    </pf-page-sidebar>
  </template>
  <pf-page-section variant="darker">Section with darker background</pf-page-section>
  <pf-page-section variant="dark">Section with dark background</pf-page-section>
  <pf-page-section variant="light">Section with light background</pf-page-section>
</pf-page>
    </div>
</template>