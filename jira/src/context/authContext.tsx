import { createContext, useContext } from 'react'
import * as auth from 'auth-provider'
import type { UserType } from 'types/user'
import type { ReactNode } from 'react'
import { http } from 'utils/http'
import { useMount } from 'utils'
import { useAsync } from 'utils/useAsync'
import { FullPageLoading, FullPageErrorFallback } from 'components/lib'
import { useQueryClient } from 'react-query'

export interface AuthForm {
  username: string;
  password: string;
}

interface AuthContextType {
  user: UserType | null;
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
  const { data: user, error, isLoading, isIdle, isError, run, setData: setUser } = useAsync<UserType | null>()

  const queryClient = useQueryClient()

  const login = (form: AuthForm) => auth.login(form).then(setUser)
  const register = (form: AuthForm) => auth.register(form).then(setUser)
  const logout = () => auth.logout().then(() => {
    setUser(null)
    queryClient.clear()
  })

  useMount(() => {
    run(bootstrapUser())
  })

  if (isIdle || isLoading) {
    return <FullPageLoading />
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />
  }

  return <AuthContext.Provider value={{ user, login, register, logout }} children={children} />
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth 必须在 AuthProvider 中使用')
  }

  return context
}
