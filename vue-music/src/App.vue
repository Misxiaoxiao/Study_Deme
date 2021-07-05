<template>
  <m-header />
  <tab />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from '@/components/Header/index.vue'
import Tab from '@/components/Tab/index.vue'

export default defineComponent({
  components: {
    MHeader: Header,
    Tab
  },
  setup () {
    return {}
  }
})
</script>

<style scoped>

</style>
