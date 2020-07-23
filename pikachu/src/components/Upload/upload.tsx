import React, { FC, useRef, ChangeEvent, useState, ReactNode } from 'react'
import Axios from 'axios'
import Button from '../Button/button'
import UploadList from './uploadList'
import Dragger from './dragger'

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'

export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status?: UploadFileStatus;
  pertent?: number;
  raw?: File;
  response?: any;
  error?: any;
}

export interface UploadProps {
  action: string;
  defaultFileList?: UploadFile[];
  beforeUpload?: (file: File) => boolean | Promise<File>;
  onProgress?: (percentage: number, file: File) => void;
  onSuccess?: (data: any, file: File) => void;
  onError?: (err: any, file: File) => void;
  onChange?: (file: File) => void;
  onRemove?: (file: UploadFile) => void;
  header?: {[key: string]: any};
  name?: string;
  data?: {[key: string]: any};
  withCredentials?: boolean;
  accept?: string;
  multiple?: boolean;
  children?: ReactNode;
  drag?: boolean;
}

export const Upload: FC<UploadProps> = (props) => {
  const { action, defaultFileList, onProgress, onSuccess, onError, beforeUpload, onChange, onRemove, header, name, data, withCredentials, accept, multiple, children, drag } = props
  const fileInput = useRef<HTMLInputElement>(null)
  const [ fileList, setFileList ] = useState<UploadFile[]>(defaultFileList || [])

  const handleRemove = (file: UploadFile) => {
    setFileList((prevList) => {
      return prevList.filter(item => item.uid !== file.uid)
    })
    onRemove && onRemove(file)
  }

  const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
    setFileList(prevList => {
      return prevList.map(file => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj }
        } else {{
          return { ...file }
        }}
      })
    })
  }

  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click()
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    uploadFiles(files)
    if (fileInput.current) {
      fileInput.current.value = ''
    }
  }

  const uploadFiles = (files: FileList) => {
    const postFiles = Array.from(files)
    postFiles.forEach(file => {
      if (!beforeUpload) {
        post(file)
      } else {
        const result = beforeUpload(file)
        if (result && result instanceof Promise) {
          result.then(processedFile => {
            post(processedFile)
          })
        } else if (result !== false) {
          post(file)
        }
      }
    })
  }

  const post = (file: File) => {
    let _file: UploadFile = {
      uid: Date.now() + 'upload-file',
      status: 'ready',
      name: file.name,
      size: file.size,
      pertent: 0,
      raw: file,
    }
    setFileList(prevList => ([_file, ...prevList]))
    const formData = new FormData()
    formData.append(name || file.name, file)
    if (data) {
      Object.keys(data).forEach(key => {
        formData.append(key, data[key])
      })
    }
    Axios.post(action, formData, {
      headers: {
        ...header,
        'Content-Type': 'multipart/form-data'
      },
      withCredentials,
      onUploadProgress: (e) => {
        let percentage = Math.round((e.loaded * 100) / e.total) || 0
        if (percentage < 100) {
          updateFileList(_file, { pertent: percentage, status: 'uploading' })
          if (onProgress) {
            onProgress(percentage, file)
          }
        }
      }
    })
      .then(resp => {
        updateFileList(_file, { status: 'success' })
        onSuccess && onSuccess(resp.data, file)
        onChange && onChange(file)
      })
      .catch(err => {
        updateFileList(_file, { status: 'error' })
        onError && onError(err, file)
        onChange && onChange(file)
      })
  }

  return (
    <div className="viking-upload-component">
      <div
        className="viking-upload-input"
        style={{ display: 'inline-block' }}
        onClick={handleClick}
      >
        {drag ? (<Dragger onFile={(files) => { uploadFiles(files) }}>{ children }</Dragger>) : children}
        <input
          className="viking-file-input"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          type="file"
          ref={fileInput}
          accept={accept}
          multiple={multiple}
        />
      </div>
      <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
  )
}

Upload.defaultProps = {
  name: 'file'
}

export default Upload
