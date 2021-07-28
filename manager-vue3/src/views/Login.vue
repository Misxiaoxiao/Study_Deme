<template>
  <div class="login-wrapper">
    <div class="modal">
      <el-form>
        <div class="title">火星</div>
        <el-form-item>
          <el-input type="text" prefix-icon="el-icon-user" />
        </el-form-item>
        <el-form-item>
          <el-input type="password" prefix-icon="el-icon-view" />
        </el-form-item>
        <el-form-item>
          <el-button class="btn-login" type="primary">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup () {
    const router = useRouter()

    const goHome = () => {
      router.push('/welcome')
    }

    onMounted(() => {
      // request({
      //   method: 'get',
      //   url: '/login',
      //   data: {
      //     name: 'jack'
      //   }
      // }).then(res => {
      //   console.log(res)
      // })
      // request.get('/login').then(res => {
      //   console.log(res)
      // })
    })

    return {
      goHome
    }
  }
})
</script>

<style lang="scss">
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9fcff;
  width: 100vw;
  height: 100vh;
  .modal {
    width: 500px;
    padding: 50px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0px 0px 10px 3px #c7c9cb4d;
    .title {
      font-size: 50px;
      line-height: 1.5;
      text-align: center;
      margin-bottom: 30px;
    }
    .btn-login {
      width: 100%;
    }
  }
}
</style>
