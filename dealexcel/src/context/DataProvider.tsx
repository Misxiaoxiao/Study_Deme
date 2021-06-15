import React, { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

import type { RcFile } from 'antd/lib/upload'

import { useDealFileToJson } from 'hooks/files'

// TODO
interface ColumnsItemType {
  title: string;
  dataIndex: string;
}

type DataType = { [k: string]: string }[]

interface DataContextType {
  json: unknown[];
  dealFiletoJosn: (file: RcFile) => void;
  headerData: string[];
  bodyData: DataType;
  columns: ColumnsItemType[];
  tableData: DataType;
  outputJson: any;
}

interface AuthProviderPropsType {
  children: ReactNode
}

const DataContext = createContext<DataContextType | undefined>(undefined)
DataContext.displayName = 'DataContext'

export const DataProvider: React.FC<AuthProviderPropsType> = ({ children }) => {
  const [headerData, setHeaderData] = useState([])
  const [bodyData, setBodyData] = useState([])
  const [columns, setColumns] = useState([])
  const [tableData, setTableData] = useState([])
  const [outputJson, setOutputJson] = useState()
  // json headerData bodyData columns tableData outputJson
  // 0. 导入 file => json
  const { json, dealFiletoJosn } = useDealFileToJson()
  // 1. json => [headerData, bodyData]
  // 2. 处理列 [headerData, bodyData] => [columns, tableData]
  // 3. 导出 [columns, tableData] => outputJson

  return <DataContext.Provider
    value={{
      json,
      dealFiletoJosn,
      headerData,
      bodyData,
      columns,
      tableData,
      outputJson
    }}
    children={children}
  />
}

export const useDataContext = () => {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useDataContext 必须在 DataProvider 中使用')
  }

  return context
}
