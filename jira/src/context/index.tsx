import React from 'react'
import type { ReactNode } from 'react'

import { AuthProvider } from './authContext'
import { QueryClientProvider, QueryClient } from 'react-query'

interface AppProvidersPropsType {
  children: ReactNode
}

export const AppProviders: React.FC<AppProvidersPropsType> = ({ children }) => {
  return <QueryClientProvider client={new QueryClient()}>
    <AuthProvider>
      { children }
    </AuthProvider>
  </QueryClientProvider>
}