import React, { useState } from 'react'
import classNames from 'classnames'

export enum AlertType {
  Success = 'success',
  Default = 'default',
  Danger = 'danger',
  warning = 'warning'
}

interface BaseAlertProps {
  className?: string,
  message?: string,
  alertType?: AlertType,
  description?: string,
  closeable?: boolean,
  onClose?: () => void
}

const Alert:React.FC<BaseAlertProps> = (props) => {
  const {
    className,
    message,
    alertType,
    description,
    closeable,
    onClose
  } = props

  const [ show, setShow ] = useState(true)

  const classes = classNames('alert', className, {
    [`alert-${alertType}`]: alertType,
    [`alert-${closeable}`]: closeable
  })

  const handleClose = () =>{
    onClose && onClose()
    setShow(!show)
  }

  return (
    <div
      className={classes}
      style={{ display: show ? 'block' : 'none' }}
    >
      {closeable && (<div className="alert-close-btn" onClick={() => { handleClose() }}>×</div>)}
      {message && (<div className="alert-message">{message}</div>)}
      {description && (<div className="alert-description">{description}</div>)}
    </div>
  )
}

Alert.defaultProps = {
  closeable: true,
  alertType: AlertType.Default,
  message: '标题'
}

export default Alert
