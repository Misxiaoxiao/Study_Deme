import React from 'react'
import { storiesOf } from '@storybook/react'
import Upload, { UploadFile } from './upload'
import { action } from '@storybook/addon-actions'

const defaultFileList: UploadFile[] = [
  { uid: '1', size: 1234, name: 'hello.md', status: 'uploading', pertent: 30 },
  { uid: '2', size: 1234, name: 'xyz.md', status: 'success', pertent: 30 },
  { uid: '3', size: 1234, name: 'dd.md', status: 'error', pertent: 30 }
]

const checkFileSize = (file: File) => {
  action('beforeUpload')
  if (Math.round(file.size) / 1024 > 50) {
    alert('file is too big')
    return false
  }
  return true
}

const fileNamePromise = (file: File) =>{
  const newFile = new File([file], 'file_name', {type: file.type})
  return Promise.resolve(newFile)
}

const SimpleUpload = () => {
  return (
    <Upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      onProgress={action('progress')}
      onSuccess={action('success')}
      onError={action('error')}
      onChange={action('changed')}
      defaultFileList={defaultFileList}
      accept=".jpg"
      multiple
      drag
    />
  )
}

storiesOf('Upload component', module)
  .add('Upload', SimpleUpload)
