import React, { useState } from 'react'
import { Button, Table, Upload } from 'antd'
import type { RcFile } from 'antd/lib/upload'
import XLSX from 'xlsx'

const Test: React.FC = () => {
  // const [fileList, setFileList] = useState([])
  const [tableHeader, setTableHeader] = useState([])
  const [tableData, setTableData] = useState<any>([])

  const fileToJSON = (f: RcFile) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const datas = e.target?.result
      const workbook = XLSX.read(datas, {
        type: 'binary'
      })
      const first_worksheet = workbook.Sheets[workbook.SheetNames[0]]
      const jsonArr = XLSX.utils.sheet_to_json(first_worksheet, { header: 1 })
      handleImpotedJson(jsonArr)
    }
    reader.readAsBinaryString(f)
  }

  const handleImpotedJson = (array: any[], file?: RcFile) => {
    const header = array[0]
    setTableHeader(header)
    const newArray = [...array]
    newArray.splice(0, 1)
    setTableData(newArray)
  }

  const uploadProps = {
    accept: '.xls,.xlsx,application/vnd.ms-excel',
    beforeUpload: (file: RcFile) => {
      const f = file
      fileToJSON(f)
      return false
    },
    // fileList
  }

  const columns = tableHeader.map((item, index) => {
    return {
      title: item,
      dataIndex: index,
      key: index,
    }
  })

  const dataSource = tableData.map((item: string[]) => {
    let itemData: { [k: string]: string } = {}
    item.forEach((n: string, i: number) => {
      const idx = String(i)
      itemData[idx] = n
    })
    console.log(itemData)
    return itemData
  })

  console.log(dataSource)

  return <div>
    <Upload {...uploadProps}>
      <Button type="primary">Excel导入</Button>
    </Upload>
    <Table columns={columns} dataSource={dataSource} />
  </div>
}

export default Test
