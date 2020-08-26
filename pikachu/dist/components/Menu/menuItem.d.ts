import { FC, CSSProperties } from 'react';
export interface MenuItemProps {
    /** 设置下标 */
    index?: string;
    /** 设置是否禁用 */
    disabled?: boolean;
    className?: string;
    style?: CSSProperties;
}
export declare const MenuItem: FC<MenuItemProps>;
export default MenuItem;
