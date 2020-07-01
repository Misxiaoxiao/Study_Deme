import React, { useState } from 'react';
import Button from './components/Button/button'
import Alert, { AlertType } from './components/Alert/alert'
import { library } from '@fortawesome/fontawesome-svg-core'

import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'

import { fas } from '@fortawesome/free-solid-svg-icons'

import Icon from './components/Icon/icon'
import Transition from './components/Transition/transition'
// 添加图标
library.add(fas)

function App() {
  const [ show, setShow ] = useState(true)

  return (
    <div className="App">
      <header className="App-header">
        <Icon icon='search' theme='danger' size='lg' />

        {/* <FontAwesomeIcon icon={faCoffee} size='lg' /> */}

        <Menu defaultIndex='0' onSelect={(i) => {alert(i)}} mode='horizontal'>
          <MenuItem>cool link</MenuItem>
          <MenuItem>cool link1</MenuItem>
          <SubMenu title="dropdown">
            <MenuItem>dropdown 1</MenuItem>
            <MenuItem>dropdown 2</MenuItem>
          </SubMenu>
          <MenuItem>cool link2</MenuItem>
        </Menu>

        <Button autoFocus onClick={(e) => {e.preventDefault(); alert(123)}}>default</Button>
        <Button disabled>default disabled</Button>
        <Button btnType='primary' size='lg'>primary large</Button>
        <Button btnType='primary' size='sm'>primary small</Button>
        <Button btnType='link' href="http://www.baidu.com" target="_blank">link</Button>
        <Button disabled btnType='link' href="http://www.baidu.com">link disabled</Button>
        <Button btnType='danger'>danger</Button>

        <Alert description={'123131'}/>
        <Alert message={'alert-title'} description={'alert-description'} alertType={AlertType.Success} />
        <Alert message={'alert-title'} description={'alert-description'} alertType={AlertType.Danger} />
        <Alert message={'alert-title'} description={'alert-description'} alertType={AlertType.warning} />

        <Button onClick={() => {setShow(!show)} }>toggle</Button>

        <Transition
          in={show}
          timeout={300}
          animation='zoom-in-left'
        >
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
        </Transition>

        <Transition
          in={show}
          timeout={300}
          animation='zoom-in-left'
        >
          <Button>123</Button>
        </Transition>

        <br/>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
