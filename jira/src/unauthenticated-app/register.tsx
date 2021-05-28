import React from 'react'
import { Form, Input, Button } from 'antd'

import { useAuth } from 'context/authContext'
import type { AuthForm } from 'context/authContext' 

export const RegisterScreen: React.FC = () => {
  const { register } = useAuth()

  const handleSubmit = (values: AuthForm) => {
    register(values)
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
        <Button type={'primary'} htmlType={'submit'} >注册</Button>
      </Form.Item>
    </Form>
  )
}
