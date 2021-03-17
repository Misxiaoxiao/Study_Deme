<template>
  <svg :style="{...style}">
    <use :href="iconName"></use>
  </svg>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    name: String,
    style: Object,
    prefix: {
      type: String,
      default: ''
    }
  },
  setup (ctx) {
    const iconName = `#${ctx.prefix}${ctx.name}`
    return {
      iconName
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
