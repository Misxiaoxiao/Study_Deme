import React from 'react'
import { Form, Input } from 'antd'
import { LongButton } from './index'

import { useAuth } from 'context/authContext'
import type { AuthForm } from 'context/authContext' 

export const LoginScreen: React.FC = () => {
  const { login } = useAuth()

  const handleSubmit = (values: AuthForm) => {
    login(values)
  }

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item name={'username'} rules={[{ required: true, message: '请输入用户名' }]}>
        <Input type="text" id={'username'} placeholder={'用户名'} />
      </Form.Item>
      <Form.Item name={'password'} rules={[{ required: true, message: '请输入密码' }]}>
        <Input type="password" id={'password'} placeholder={'密码'} />
      </Form.Item>
      <Form.Item>
        <LongButton type={'primary'} htmlType={'submit'} >登录</LongButton>
      </Form.Item>
    </Form>
  )
}
