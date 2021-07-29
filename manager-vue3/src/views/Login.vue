<template>
  <div class="login-wrapper">
    <div class="modal">
      <el-form ref="userForm" :model="user" :rules="rules" status-icon>
        <div class="title">火星</div>
        <el-form-item prop="userName">
          <el-input type="text" prefix-icon="el-icon-user" v-model="user.userName" />
        </el-form-item>
        <el-form-item prop="userPwd">
          <el-input type="password" prefix-icon="el-icon-view" v-model="user.userPwd" />
        </el-form-item>
        <el-form-item>
          <el-button class="btn-login" type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import api from '../api'

export default defineComponent({
  setup () {
    const user = ref({
      userName: '',
      userPwd: ''
    })
    const userForm = ref()
    const rules = {
      userName: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
      ],
      userPwd: [
        { required: true, message: '请输入密码', trigger: 'blur' }
      ]
    }

    const router = useRouter()
    const store = useStore()

    const login = () => {
      userForm.value.validate((valid: boolean) => {
        if (valid) {
          api.login(user.value).then(res => {
            router.push('/welcome')
            store.commit('saveUserInfo', res)
          })
        } else {
          return false
        }
      })
    }

    onMounted(() => {
    })

    return {
      user,
      userForm,
      rules,
      login
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
