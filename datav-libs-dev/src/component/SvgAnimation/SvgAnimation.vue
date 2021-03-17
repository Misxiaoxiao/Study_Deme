<template>
  <div>
    <div class="container">
      <svg width="400" height="400">
        <circle cx="200" cy="200" r="180" stroke-width="20" stroke="#d1d3d7" fill="none"></circle>
        <circle class="circle" cx="200" cy="200" r="180" stroke-width="20" stroke="#00a5e0" fill="none"></circle>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SvgAnimation'
}
</script>

<style lang="scss" scoped>
.circle {
  animation: circle 5s linear infinite;
}
</style>

<style>

@keyframes circle {
  from {
    stroke-dasharray: 0 1131;
  }
  to {
    stroke-dasharray: 1131 0;
  }
}
</style>
