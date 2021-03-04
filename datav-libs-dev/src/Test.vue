<template>
  <div class="test">
    {{message}}
    <div>count: {{count}}</div>
    <div>doubleCount: {{doubleCount}}</div>
  </div>  
</template>

<script>
import { computed, ref } from 'vue'

export default {
  name: 'TestCom',
  setup() {
    const message = 'test component'
    const count = ref(1)
    const doubleCount = computed(() => count.value * 2)
    return {
      message,
      count,
      doubleCount
    }
  }
}
</script>

<style lang="scss">
.test {
  color: red;
}
</style>
