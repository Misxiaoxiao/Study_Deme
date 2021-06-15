import React, { useState } from 'react'
import { Row, Button, Form, Input, Select } from 'antd'

const initialRenderData = [
  {
    colName: '',
    indexName: '',
    searchVal: '',
    isHas: false // 未添加
  }
]

const DealCols: React.FC = () => {
  const [renderData, setRenderData] = useState(initialRenderData)

  const addCol = (index: number) => {
    const data = [...renderData]
    data[index].isHas = true
    data.push({
      colName: '',
      indexName: '',
      searchVal: '',
      isHas: false // 未添加
    })
    setRenderData(data)
    // TODO 对应改变 context 中的 columns
  }

  const delCol = (index: number) => {}

  return <Row>
    { renderData.map((renderItem, index) => <Row style={{ marginBottom: '10px' }} key={index}>
      <Form.Item label="列名" style={{ marginLeft: '10px' }}>
        <Input
          value={renderItem.colName}
          onChange={e => {}}
        />
      </Form.Item>
      <Form.Item label="对应导入列" style={{ marginLeft: '10px' }}>
        <Select
          style={{ width: '300px' }}
          value={renderItem.indexName}
        />
      </Form.Item>
      <Form.Item label="搜索值" style={{ marginLeft: '10px' }}>
        <Input
          value={renderItem.searchVal}
          onChange={e => {}}
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
