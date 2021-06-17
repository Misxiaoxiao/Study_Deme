import React from 'react'
import type { ReactNode } from 'react'

import { AuthProvider } from './authContext'
import { QueryClientProvider, QueryClient } from 'react-query'

import { Provider } from 'react-redux'
import { store } from 'store'

interface AppProvidersPropsType {
  children: ReactNode
}

export const AppProviders: React.FC<AppProvidersPropsType> = ({ children }) => {
  return <Provider store={store}>
    <QueryClientProvider client={new QueryClient()}>
      <AuthProvider>
        { children }
      </AuthProvider>
    </QueryClientProvider>
  </Provider>
}