<template>
  <h1>welcome page title</h1>
  this is welcome page
  <router-link to="login">go to login</router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    msg: {
      type: String,
      default: 'hello',
      required: true
    }
  },
  setup () {
    return {}
  }
})
</script>

<style scoped>
</style>
