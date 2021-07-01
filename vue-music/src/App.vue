<template>
  <m-header />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from '@/components/Header/index.vue'

export default defineComponent({
  components: {
    MHeader: Header
  },
  setup () {
    return {}
  }
})
</script>

<style scoped>

</style>
