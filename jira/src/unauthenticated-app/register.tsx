import React from 'react'
import { Form, Input } from 'antd'
import { LongButton } from './index'

import { useAuth } from 'context/authContext'
import type { AuthForm } from 'context/authContext' 
import { useAsync } from 'utils/useAsync'

interface RegisterFormType extends AuthForm {
  cpassword?: string;
}

interface RegisterScreenProps {
  onError: (error: Error) => void
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ onError }) => {
  const { register } = useAuth()
  const { run, isLoading } = useAsync(undefined, { throwOnError: true })

  const handleSubmit = (values: RegisterFormType) => {
    const { cpassword, ...formValue } = values
    if (cpassword !== formValue.password) {
      onError(new Error('请确认两次输入的密码相同'))
      return
    }
    run(register(formValue)).catch(onError)
  }

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item name={'username'} rules={[{ required: true, message: '请输入用户名' }]}>
        <Input type="text" id={'username'} placeholder={'用户名'} />
      </Form.Item>
      <Form.Item name={'password'} rules={[{ required: true, message: '请输入密码' }]}>
        <Input type="password" id={'password'} placeholder={'密码'} />
      </Form.Item>
      <Form.Item name={'cpassword'} rules={[{ required: true, message: '请确认密码' }]}>
        <Input type="password" id={'cpassword'} placeholder={'确认密码'} />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} type={'primary'} htmlType={'submit'} >注册</LongButton>
      </Form.Item>
    </Form>
  )
}
