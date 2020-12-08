import React, { useState } from 'react'
import { Row, message } from 'antd'
import { THIRD, SERVER, ENV } from '../utils/config'
import xyRTC from '@xylink/xy-rtc-sdk'
import Login, { IUser } from './Login'
import {
  IDisconnected,
} from '../type/index'

import '../style/index.scss'
import Client from '@xylink/xy-rtc-sdk/lib/main/client'

let client: Client | null = null;

const Home: React.FC = () => {
  const [isThird] = useState(THIRD)
  // 呼叫状态
  const [callMeeting, setCallMeeting] = useState(false)
  // 是否呼叫中
  const [callLoading, setCallLoading] = useState(false)
  // 配置环境，第三方集成不需要配置，默认是线上环境
  const [env, setEnv] = useState(ENV)
  // 摄像头状态
  const [video, setVideo] = useState<'muteVideo' | 'unmuteVideo'>(() => {
    return false ? 'muteVideo' : 'unmuteVideo';
  })
  // 麦克风状态
  const [audio, setAudio] = useState<'mute' | 'unmute'>(() => {
    return false ? 'mute' : 'unmute';
  });

  const [user, setUser] = useState<IUser>({
    phone: '',
    password: '',
    meeting: '',
    meetingPassword: '',
    meetingName: '',
    muteVideo: false,
    muteAudio: false
  })

  const handleSubmit = (values: IUser) => {
    const isSupport = xyRTC.checkSupportWebRTC()

    if (!isSupport) {
      message.info('Not support webrtc')
      return
    }
    setUser(values)
    join()
  }

  const join = () => {
    setCallMeeting(true)
    setCallLoading(true)

    try {
      const { meeting, meetingPassword, meetingName, muteAudio, muteVideo } = user
      const { wssServer, httpServer, logServer } = SERVER(env)

      client = xyRTC.createClient({
        // 注意，第三方集成时，默认是prd环境，不需要配置wss/http/log server地址；
        wssServer,
        httpServer,
        logServer,
        muteAudio,
        muteVideo,
        container: {
          offsetHeight: 92
        }
      })

      initEventListener(client)

    } catch (err) {
      console.log('入会失败: ', err)
      // disconnected(err.msg || '呼叫异常，请稍后重试', 'PEER_NET_DISCONNECT')
    }
  }

  const onChangeInput = (val: any, type: string) => {
    const inputVal = val

    const users = { ...user, [type]: inputVal }
    setUser(users)
    if (type === "muteVideo") {
      setVideo(val ? "muteVideo" : "unmuteVideo");
    }

    if (type === "muteAudio") {
      setAudio(val ? "mute" : "unmute");
    }
  }

  // 挂断会议
  const disconnected = (msg = '', reason?: string) => {
    message.info(msg)
    stop(reason)
  }

  const stop = (reason: string = 'OK') => {
  }

  const initEventListener = (client: Client) => {
    client.on('disconnected', (e: IDisconnected) => {
      const showMessage = (e.detail && e.detail.message) || '呼叫异常，请稍后重试'
      disconnected(showMessage, 'EXPIRED')
    })
  }

  const renderForm = () => {
    if (!callMeeting && !callLoading) {
      return (
        <div className="login">
          <h1 className="title">XY RTC DEMO</h1>
          <div className="sub-title">
            <span>设置环境：</span>
          </div>
          <Row justify="center">
            <Login
              isThird={isThird}
              onHandleSubmit={handleSubmit}
              user={user}
              onChangeInput={onChangeInput}
            />
          </Row>
        </div>
      )
    }

    return null
  }

  return (
    <div className="container">
      {renderForm()}
    </div>
  )
}

export default Home
