<script>
export default {
  name: "About",
  data() {
    return {
      openSvgModal: false
    }
  }
}
</script>
<template>
  <h1>About Page</h1>
  <pf-button @click="openSvgModal = !openSvgModal">Toggle Modal</pf-button>
  <pf-modal v-model:open="openSvgModal" title="Process SVG">
    <img src="http://localhost:8780/svg/processes/incidents/instances/3f29ac88-205c-4739-b759-ca26b2fcb52c"/>
  </pf-modal>
  <h1></h1>
</template>