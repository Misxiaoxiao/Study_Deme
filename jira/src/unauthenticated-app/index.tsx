import React, { useState } from 'react'
import { Card } from 'antd'
import { LoginScreen } from './login'
import { RegisterScreen } from './register'

export const UnauthenticatedApp: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false)

  return <div style={{ display: 'flex', justifyContent: 'center' }}>
    <Card>
      { isRegister ? <RegisterScreen /> : <LoginScreen /> }
      <button onClick={() => setIsRegister(bool => !bool)}>切换到{isRegister ? ' 登录' : '注册'}</button>
    </Card>
  </div>
}
