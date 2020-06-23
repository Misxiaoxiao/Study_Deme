import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button'

import Alert, { AlertType } from './components/Alert/alert'

import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Menu defaultIndex='0' onSelect={(i) => {alert(i)}} mode='vertical' defaultOpenSubMenus={['1']}>
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
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>primary large</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Small}>primary small</Button>
        <Button btnType={ButtonType.Link} href="http://www.baidu.com" target="_blank">link</Button>
        <Button disabled btnType={ButtonType.Link} href="http://www.baidu.com">link disabled</Button>
        <Button btnType={ButtonType.Danger}>danger</Button>

        <Alert description={'123131'}/>
        <Alert message={'alert-title'} description={'alert-description'} alertType={AlertType.Success} />
        <Alert message={'alert-title'} description={'alert-description'} alertType={AlertType.Danger} />
        <Alert message={'alert-title'} description={'alert-description'} alertType={AlertType.warning} />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
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
