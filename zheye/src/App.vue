<template>
  <div class="container">
    <global-header :user="currentUser" />
    <form action="">
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <validate-input :rules="emailRules" v-model="emailVal" />
        {{emailVal}}
      </div>
      <div class="mb-3">
        <label for="exambleInputEmail1" class="form-label">邮箱地址</label>
        <input
          type="email" class="form-control" id="exampleInputEmail1"
          v-model="emailRef.val"
          @blur="validateEmail"
        />
        <div class="form-text" v-if="emailRef.error">{{emailRef.message}}</div>
      </div>
      <div class="mb-3">
        <label for="exambleInputPassword1" class="form-label">密码</label>
        <input type="password" class="form-control" id="exampleInputPassword1" />
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

    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' },
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
    }
  },
})
</script>

<style scoped>
</style>
