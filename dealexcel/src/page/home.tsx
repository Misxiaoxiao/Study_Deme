import React from 'react'
import { useDataContext } from 'context/DataProvider'
import DealCols from './components/dealCols'

const HomePage: React.FC = () => {
  const obj = useDataContext()

  return <div>
    <DealCols />
  </div>
}

export default HomePage
