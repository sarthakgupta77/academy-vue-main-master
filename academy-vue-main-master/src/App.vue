<template>
  <router-view />
</template>

<script setup>
import { LocalStorage } from 'quasar'
import { onBeforeMount } from 'vue';

onBeforeMount(() => {
  LocalStorage.set('lms_base', 'https://learning.datatrained.com')
})
</script>

<style lang="scss">
.project-color1 {
  background-color: #00ccf2 !important;
}
.project-color2 {
  background-color: #f2c600 !important;
}
.project-color3 {
  background-color: #f24d00 !important;
}
.project-color4 {
  background-color: #002cf2 !important;
}
.project-color5 {
  background-color: #00aa69 !important;
}

</style>