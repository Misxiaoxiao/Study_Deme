import React from 'react'
import type { ReactNode } from 'react'
import { DataProvider } from './DataProvider'

interface AppProvidersPropType {
  children: ReactNode
}

export const AppProviders: React.FC<AppProvidersPropType> =
  ({ children }) => <DataProvider>
    { children }
  </DataProvider>
