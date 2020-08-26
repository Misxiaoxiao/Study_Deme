import React, { FC, CSSProperties } from 'react';
export declare type MenuMode = 'horizontal' | 'vertical';
export declare type SelectCallback = (selectedIndex: string) => void;
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
export declare const MenuContext: React.Context<IMenuContext>;
/**
 * ## Menu 组件
 *
 * 这是一个 Menu 组件
 *
 * ~~~js
 * import { Menu } from 'Menu'
 * ~~~
 */
export declare const Menu: FC<MenuProps>;
export default Menu;
