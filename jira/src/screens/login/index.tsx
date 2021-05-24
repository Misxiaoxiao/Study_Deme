import React from 'react'
import type { FormEvent } from 'react'

import { apiUrl } from 'utils/config'

interface LoginFormParamType {
  username: string;
  password: string;
}

export const LoginScreen: React.FC = () => {
  const login = (param: LoginFormParamType) => {
    fetch(`${apiUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(param)
    }).then(async response => {
      if (response.ok) {
        
      }
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const username = (e.currentTarget.elements[0] as HTMLInputElement).value
    const password = (e.currentTarget.elements[1] as HTMLInputElement).value

    login({username, password})
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id={'username'} />
      </div>
      <div>
        <label htmlFor="username">密码</label>
        <input type="password" id={'password'} />
      </div>
      <button type={'submit'} >登录</button>
    </form>
  )
}
