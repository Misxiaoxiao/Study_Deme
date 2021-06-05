import React, { createContext, useContext } from 'react'
import type { ReactNode } from 'react'

interface DataContextType {
  data: number;
}

interface AuthProviderPropsType {
  children: ReactNode
}

const DataContext = createContext<DataContextType | undefined>(undefined)
DataContext.displayName = 'DataContext'

export const DataProvider: React.FC<AuthProviderPropsType> = ({ children }) => {
  const data = 1

  return <DataContext.Provider value={{ data }} children={children} />
}

export const useDataContext = () => {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useAuth 必须在 AuthProvider 中使用')
  }

  return context
}
