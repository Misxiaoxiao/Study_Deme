import React from 'react'
import type { ReactNode } from 'react'

import { AuthProvider } from './authContext'

interface AppProvidersPropsType {
  children: ReactNode
}

export const AppProviders: React.FC<AppProvidersPropsType> = ({ children }) => {
  return <AuthProvider>
    { children }
  </AuthProvider>
}