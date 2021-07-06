<template>
  <div class="container">
    <global-header :user="currentUser" />
    <form action="">
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
import { defineComponent, reactive } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader, { UserProps } from './components/GlobelHeader.vue'

const currentUser: UserProps = {
  isLogin: true,
  name: 'xiao',
}

// const testData: ColumnProps[] = [
//   {
//     id: 1,
//     title: 'test1的专栏',
//     description: '这是test1d的专栏，有一段非常有意思的简介，可以更新一下，可以更新一下可以更新一下可以更新一下可以更新一下可以更新一下可以更新一下可以更新一下',
//     avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb1-q.mafengwo.net%2Fs7%2FM00%2F2E%2F37%2FwKgB6lSuHraAYMNtAAXF8ovILuk683.png&refer=http%3A%2F%2Fb1-q.mafengwo.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1628132261&t=9ddee0c2aa9b47a632fb34a3d61715ae',
//   },
//   {
//     id: 1,
//     title: 'test1的专栏',
//     description: '这是test1d的专栏，有一段非常有意思的简介，可以更新一下',
//   },
// ]

const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

export default defineComponent({
  components: {
    GlobalHeader,
  },
  setup() {
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
    }
  },
})
</script>

<style scoped>
</style>
