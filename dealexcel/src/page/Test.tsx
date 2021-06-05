import React, { useState } from 'react'
import { Button, Table, Upload, Row, Input, Form, Select } from 'antd'
import type { RcFile, UploadChangeParam } from 'antd/lib/upload'
import type { ColumnsType } from 'antd/lib/table'
import XLSX from 'xlsx'

type TableHeaderArrType = string[]
type InputDataType = { [k: string]: string }[]

const Test: React.FC = () => {
  const [fileList, setFileList] = useState<any[]>([])
  const [header, setHeader] = useState<TableHeaderArrType>([])
  const [inputData, setInputData] = useState<InputDataType>([])
  const [tableHeader, setTableHeader] = useState<InputDataType>([])
  const [tableData, setTableData] = useState<any>([])
  const [colName, setColName] = useState('')
  const [selectVal, setSelectVal] = useState()

  // 文件转json
  const fileToJSON = (f: RcFile) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const datas = e.target?.result
      const workbook = XLSX.read(datas, {
        type: 'binary'
      })
      const first_worksheet = workbook.Sheets[workbook.SheetNames[0]]
      const jsonArr = XLSX.utils.sheet_to_json(first_worksheet, { header: 1 })
      console.log(jsonArr)
      handleImpotedJson(jsonArr)
    }
    reader.readAsBinaryString(f)
  }

  // 处理json数据
  const handleImpotedJson = (array: unknown[], file?: RcFile) => {
    const header = array[0] as TableHeaderArrType
    setHeader(h => {
      const nowHeader = [...h]
      nowHeader.forEach(n => {
        const i = header.indexOf(n)
        if (i >= 0) {
          header.splice(i, 1)
        }
      })
      return [...h, ...header]
    })
    // setTableHeader(header)
    const newArray = [...array]
    newArray.splice(0, 1)
    const data = newArray.map(item => {
      const itemVal = item as string[]
      const d: { [k: string]: string } = {}
      itemVal.forEach((item, i) => {
        if (!d[header[i]]) {
          d[header[i]] = item
        }
      })
      return d
    })
    setInputData(data)
    // setTableData(newArray)
  }

  // 上传props
  const uploadProps = {
    accept: '.xls,.xlsx,application/vnd.ms-excel',
    beforeUpload: (file: RcFile) => {
      const f = file
      fileToJSON(f)
      return false
    },
    onChange: (info: UploadChangeParam) => {
      let fileList = [...info.fileList]

      fileList = fileList.map(file => {
        if (file.response) {
          // Component will show file.url as link
          file.url = file.response.url;
        }
        return file;
      })

      setFileList(fileList || [])
    },
    fileList
  }

  // table列
  const columns = tableHeader.map((item, index) => {
    return {
      title: item.title,
      dataIndex: item.dataIndex,
      key: index,
    }
  })

  const addCol = () => {
    // 处理表头
    if (!colName) return
    const header = [...tableHeader]
    header.push({
      title: colName,
      dataIndex: selectVal || ''
    })
    console.log(header)
    // setColName('')
    setTableHeader(header)
    // 处理数据
    const data = [...inputData]
    setTableData(data)
    // // if ()
    // console.log(inputData)
  }

  // table数据
  const dataSource = tableData
  // const dataSource = tableData.map((item: string[]) => {
  //   let itemData: { [k: string]: string } = {}
  //   item.forEach((n: string, i: number) => {
  //     const idx = String(i)
  //     itemData[idx] = n
  //   })
  //   return itemData
  // })

  // 对应列下拉
  const selectOptions = header.map(item => ({
    value: item,
    disabled: false
  }))

  return <div>
    <Row style={{ marginBottom: '10px' }}>
      <Upload {...uploadProps}>
        <Button type="primary">Excel导入</Button>
      </Upload>
    </Row>
    <Row style={{ marginBottom: '10px' }}>
      <Button type="primary" onClick={e => addCol()}>添加 table 列</Button>
      <Form.Item label="列名" style={{ marginLeft: '10px' }}>
        <Input value={colName} onChange={e => setColName(e.target.value)} />
      </Form.Item>
      {selectOptions.length > 0 && <Form.Item label="对应导入列" style={{ marginLeft: '10px' }}>
        <Select
          style={{ width: '300px' }}
          options={selectOptions}
          value={selectVal}
          onChange={val => setSelectVal(val)}
        />
      </Form.Item>}
    </Row>
    <Row style={{ marginBottom: '10px' }}>
      <Button type="primary" onClick={e => addCol()}>添加 table 列</Button>
      <Form.Item label="列名" style={{ marginLeft: '10px' }}>
        <Input value={colName} onChange={e => setColName(e.target.value)} />
      </Form.Item>
      {selectOptions.length > 0 && <Form.Item label="对应导入列" style={{ marginLeft: '10px' }}>
        <Select
          style={{ width: '300px' }}
          options={selectOptions}
          value={selectVal}
          onChange={val => setSelectVal(val)}
        />
      </Form.Item>}
    </Row>
    <Row style={{ marginBottom: '10px' }}>
      <Button type="primary" onClick={e => addCol()}>搜索</Button>
      <Form.Item label="列名" style={{ marginLeft: '10px' }}>
        <Input value={colName} onChange={e => setColName(e.target.value)} />
      </Form.Item>
      <Form.Item label="值" style={{ marginLeft: '10px' }}>
        <Input value={colName} onChange={e => setColName(e.target.value)} />
      </Form.Item>
    </Row>
    <Row style={{ marginBottom: '10px' }}>
      <Button type="primary" onClick={e => addCol()}>处理 table 列</Button>
      <Form.Item label="列名" style={{ marginLeft: '10px' }}>
        <Input value={colName} onChange={e => setColName(e.target.value)} />
      </Form.Item>
      <Form.Item label="值" style={{ marginLeft: '10px' }}>
        <Input value={colName} onChange={e => setColName(e.target.value)} />
      </Form.Item>
    </Row>
    <Table columns={columns} dataSource={dataSource} />
  </div>
}

export default Test
