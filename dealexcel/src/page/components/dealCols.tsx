import React, { useReducer, useState } from 'react'
import { Row, Button, Form, Input, Select } from 'antd'

type initialItemType = {
  colName: string;
  indexName: string;
  searchVal: string;
  isHas: boolean
}

type EditArgType = React.ChangeEvent<HTMLInputElement> | string | number | undefined;


const initialRenderData: initialItemType[] = [
  {
    colName: '',
    indexName: '',
    searchVal: '',
    isHas: false // 未添加
  }
]

type ActionType = {
  type: 'add' | 'delete' | 'edit';
  data: EditArgType;
  index?: number;
  key?: keyof initialItemType;
}



const renderDataReducer = (state: initialItemType[], action: ActionType) => {
  const { type, data, index, key } = action

  switch (type) {
    case 'add': {
      const curState = [...state]
      const index = data as number
      curState[index].isHas = true
      curState.push({
        colName: '',
        indexName: '',
        searchVal: '',
        isHas: false // 未添加
      })
      return curState
    }
    case 'delete': {
      const curState = [...state]
      const index = data as number
      curState.splice(index, 1)
      return curState
    }
    case 'edit': {
      const curState = [...state]
      if (index === undefined || key === undefined) return state
      if (typeof data === 'object') {
        curState[index] = {
          ...curState[index],
          [key]: data.target.value
        }
      } else {
        curState[index] = {
          ...curState[index],
          [key]: data
        }
      }
      
      return curState
    }
    default:
      return state
  }
}


const DealCols: React.FC = () => {
  const [renderData, dispatch] = useReducer(renderDataReducer, initialRenderData)

  // TODO 对应改变 context 中的 columns
  const addCol = (index: number) => dispatch({type: 'add', data: index})

  const delCol = (index: number) => dispatch({type: 'delete', data: index})

  const editCol = (index: number, key: keyof initialItemType) =>
    (e: EditArgType) => dispatch({index, key, data: e, type: 'edit'})

  return <Row>
    { renderData.map((renderItem, index) => <Row style={{ marginBottom: '10px' }} key={index}>
      <Form.Item label="列名" style={{ marginLeft: '10px' }}>
        <Input
          value={renderItem.colName}
          onChange={editCol(index, 'colName')}
        />
      </Form.Item>
      <Form.Item label="对应导入列" style={{ marginLeft: '10px' }}>
        <Select
          options={[ { label: '1', value: 1 } ]}
          style={{ width: '300px' }}
          value={renderItem.indexName}
          onChange={editCol(index, 'indexName')}
        />
      </Form.Item>
      <Form.Item label="搜索值" style={{ marginLeft: '10px' }}>
        <Input
          value={renderItem.searchVal}
          onChange={editCol(index, 'searchVal')}
        />
      </Form.Item>
      { renderItem.isHas
          ? <Button style={{ marginLeft: '10px' }} type="primary" onClick={ e => delCol(index) }>删除</Button>
          : <Button style={{ marginLeft: '10px' }} type="primary" onClick={e => addCol(index)}>添加 table 列</Button>
      }
    </Row>
  ) }
  </Row>
}

export default DealCols
