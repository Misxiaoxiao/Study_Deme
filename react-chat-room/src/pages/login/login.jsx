import React from 'react';
import Logo from 'components/logo/logo';
import { List, InputItem, WingBlank, Button, WhiteSpace } from 'antd-mobile';
import './login.css';

export default (props) => {
  return (
    <div className="login">
      {}
      <div className="logo-wrapper">
        <Logo />
      </div>
      <WingBlank>
        <List>
          <InputItem placeholder="">用户</InputItem>
          <InputItem placeholder="">密码</InputItem>
        </List>
      </WingBlank>
    </div>
  )
}