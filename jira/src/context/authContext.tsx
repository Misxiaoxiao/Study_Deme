import { useCallback } from 'react'
import * as auth from 'auth-provider'
import type { UserType } from 'screens/project-list/search-panel'
import type { ReactNode } from 'react'
import { http } from 'utils/http'
import { useMount } from 'utils'
import { useAsync } from 'utils/useAsync'
import { FullPageLoading, FullPageErrorFallback } from 'components/lib'
import * as authStore from 'store/auth.slice'
import { useDispatch, useSelector } from 'react-redux'

export interface AuthForm {
  username: string;
  password: string;
}

interface AuthProviderPropsType {
  children: ReactNode
}

export const bootstrapUser = async () => {
  let user = null
  const token = auth.getToken()
  if (token) {
    const data = await http('me', { token })
    user = data.user
  }
  return user
}

export const AuthProvider: React.FC<AuthProviderPropsType> = ({ children }) => {
  const {
    error,
    isLoading,
    isIdle,
    isError,
    run
  } = useAsync<UserType | null>()

  const dispatch: (args: any) => Promise<UserType> = useDispatch()

  useMount(() => {
    run(dispatch(authStore.bootstrap()))
  })

  if (isIdle || isLoading) {
    return <FullPageLoading />
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />
  }

  return <div>{children}</div>
}

export const useAuth = () => {
  const dispatch: (...args: unknown[]) => Promise<UserType> = useDispatch()
  const user = useSelector(authStore.selectUser)
  const login = useCallback((form: AuthForm) => dispatch(authStore.login(form)), [dispatch])
  const register = useCallback((form: AuthForm) => dispatch(authStore.register(form)), [dispatch])
  const logout = useCallback(() => dispatch(authStore.logout()), [dispatch])

  return {
    user,
    login,
    register,
    logout
  }
}
