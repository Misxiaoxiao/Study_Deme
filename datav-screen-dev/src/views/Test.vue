<template>
  <div>
    <button @click="increament">{{state.count}}</button>
    <div>{{doubleCount}}</div>
  </div>
</template>

<script>
import useTest from './useTest'

export default {
  setup () {
    const { state, doubleCount, increament } = useTest()
    return {
      state,
      doubleCount,
      increament
    }
  }
}
</script>
