<template>
  <div class="container">
    <global-header :user="currentUser" />
    <form action="">
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <validate-input
          :rules="emailRules"
          v-model="emailVal"
          type="text"
          placeholder="请输入邮箱地址"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <validate-input
          :rules="passwordRules"
          v-model="passwordVal"
          type="password"
          placeholder="请输入密码"
        />
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader, { UserProps } from './components/GlobelHeader.vue'
import ValidateInput, { RulesProp } from './components/ValidateInput.vue'

const currentUser: UserProps = {
  isLogin: true,
  name: 'xiao',
}

const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

export default defineComponent({
  components: {
    GlobalHeader,
    ValidateInput,
  },
  setup() {
    const emailVal = ref('')
    const passwordVal = ref('')

    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' },
    ]

    const passwordRules: RulesProp = [
      { type: 'required', message: '密码不能为空' },
    ]

    const emailRef = reactive({
      val: '',
      error: false,
      message: '',
    })

    const validateEmail = () => {
      if (emailRef.val.trim() === '') {
        emailRef.error = true
        emailRef.message = 'can not be empty'
      } else if (!emailReg.test(emailRef.val)) {
        emailRef.error = true
        emailRef.message = 'should be valid email'
      }
    }

    return {
      // list: testData,
      currentUser,
      emailRef,
      validateEmail,
      emailRules,
      emailVal,
      passwordVal,
      passwordRules,
    }
  },
})
</script>

<style scoped>
</style>
