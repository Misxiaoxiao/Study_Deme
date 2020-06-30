import React, { useState, createContext, FC, CSSProperties } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'

export type MenuMode = 'horizontal' | 'vertical'
export type SelectCallback = (selectedIndex: string) => void

export interface MenuProps {
  /** 设置默认的下标 */
  defaultIndex?: string;
  className?: string;
  /** 设置菜单的模式 */
  mode?: MenuMode;
  style?: CSSProperties;
  /** 设置默认展开的菜单项 */
  defaultOpenSubMenus?: string[];
  onSelect?: SelectCallback;
}

interface IMenuContext {
  index: string;
  onSelect?: SelectCallback;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
}

export const MenuContext = createContext<IMenuContext>({index: '0'})

/**
 * ## Menu 组件
 * 
 * 这是一个 Menu 组件
 * 
 * ~~~js
 * import { Menu } from 'Menu'
 * ~~~
 */
export const Menu: FC<MenuProps> = (props) => {
  const { defaultIndex, className, mode, style, onSelect, children, defaultOpenSubMenus } = props
  const [currentActive, setActive] = useState(defaultIndex)
  const classes = classNames('viking-menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical'
  })

  const handleClick = (index: string) => {
    setActive(index)
    if (onSelect) {
      onSelect(index)
    }
  }

  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : '0',
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus
  }

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, { index: index.toString() })
      } else {
        console.error('Warning: Menu has a child which is not a MenuItem component')
      }
    })
  }

  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>

  )
}

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubMenus: []
}

export default Menu
