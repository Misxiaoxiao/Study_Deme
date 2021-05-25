import { createContext, useContext, useState } from 'react'
import * as Auth from 'auth-provider'
import type { User } from 'screens/project-list/search-panel'
import type { ReactNode } from 'react'

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

const AuthContext = createContext<AuthContextType | undefined>(undefined)
AuthContext.displayName = 'AuthContext'

interface AuthProviderPropsType {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderPropsType> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  const login = (form: AuthForm) => Auth.login(form).then(setUser)
  const register = (form: AuthForm) => Auth.register(form).then(setUser)
  const logout = () => Auth.logout().then(() => setUser(null))

  return <AuthContext.Provider value={{ user, login, register, logout }} children={children} />
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth 必须在 AuthProvider 中使用')
  }

  return context
}
