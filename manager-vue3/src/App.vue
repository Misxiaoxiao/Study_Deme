<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import storage from './utils/storage'

export default defineComponent({
  name: 'App',
  setup () {
    onMounted(() => {
      storage.clearItem('name')
    })
  }
})
</script>

<style lang="scss">
@import './assets/style/reset.css';
@import './assets/style/index.scss';
</style>
