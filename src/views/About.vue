<script>
export default {
  name: "About",
  data() {
    return {
      open1: false
    }
  }
}
</script>
<template>
  <h1>About Page</h1>
  <pf-button @click="open1 = !open1">Toggle Modal</pf-button>
  <pf-modal v-model:open="open1" title="Simple modal header">
    <img src="http://172.29.2.97:8780/svg/processes/incidents/instances/3f29ac88-205c-4739-b759-ca26b2fcb52c"/>
  </pf-modal>
</template>