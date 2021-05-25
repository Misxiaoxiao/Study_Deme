import { createContext, useContext, useState } from 'react'
import * as auth from 'auth-provider'
import type { User } from 'screens/project-list/search-panel'
import type { ReactNode } from 'react'
import { http } from 'utils/http'
import { useMount } from 'utils'

interface AuthForm {
  username: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  login: (form: AuthForm) => Promise<void>;
  register: (form: AuthForm) => Promise<void>;
  logout: () => Promise<void>;
}

interface AuthProviderPropsType {
  children: ReactNode
}

const bootstrapUser = async () => {
  let user = null
  const token = auth.getToken()
  if (token) {
    const data = await http('me', { token })
    user = data.user
  }
  return user
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)
AuthContext.displayName = 'AuthContext'

export const AuthProvider: React.FC<AuthProviderPropsType> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  const login = (form: AuthForm) => auth.login(form).then(setUser)
  const register = (form: AuthForm) => auth.register(form).then(setUser)
  const logout = () => auth.logout().then(() => setUser(null))

  useMount(() => {
    bootstrapUser().then(setUser)
  })

  return <AuthContext.Provider value={{ user, login, register, logout }} children={children} />
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth 必须在 AuthProvider 中使用')
  }

  return context
}
