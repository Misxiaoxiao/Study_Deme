<template>
  <div class="top-header">
    <img class="logo" src="https://www.youbaobao.xyz/resource/imooc.png" />
    <div class="logo-text">
      <div class="cn-text">业务数据大盘</div>
      <div class="en-text">Overview of Business Data</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopHeader'
}
</script>

<style lang="scss" scoped>
.top-header {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  background: rgba(36, 31, 32);
  padding: 0 64px;
  box-sizing: border-box;

  .logo {
    width: 120px;
    height: 120px;
  }
  .logo-text {
    flex: 1;
    margin-left: 40px;

    .cn-text {
      color: rgb(255, 255, 255);
      font-weight: bold;
      font-size: 60px;
      letter-spacing: 2px;
    }

    .en-text {
      color: rgb(255, 255, 255);
      font-size: 35px;
      letter-spacing: 1px;
    }
  }
}
</style>
