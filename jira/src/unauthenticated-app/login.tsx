import React from 'react'
import { Form, Input } from 'antd'
import { LongButton } from './index'

import { useAuth } from 'context/authContext'
import type { AuthForm } from 'context/authContext' 
import { useAsync } from 'utils/useAsync'

interface LoginScreenProps {
  onError: (error: Error) => void
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onError }) => {
  const { login } = useAuth()
  const { run, isLoading } = useAsync(undefined, { throwOnError: true })

  const handleSubmit = (values: AuthForm) => {
    run(login(values)).catch(onError)
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
        <LongButton loading={isLoading} type={'primary'} htmlType={'submit'} >登录</LongButton>
      </Form.Item>
    </Form>
  )
}
