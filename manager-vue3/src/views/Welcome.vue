<template>
  <div class="welcome">
    <h1>welcome page title</h1>
    this is welcome page
    <router-link to="login">go to login</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
  },
  setup () {
    return {}
  }
})
</script>

<style scoped>
</style>
