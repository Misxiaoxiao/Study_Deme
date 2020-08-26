import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
export declare type ButtonSize = 'lg' | 'sm';
export declare type ButtonType = 'primary' | 'default' | 'danger' | 'link';
interface BaseButtonProps {
    className?: string;
    /** 设置 Button 是否禁用 */
    disabled?: boolean;
    /** 设置 Button 的大小 */
    size?: ButtonSize;
    /** 设置 Button 的类型 */
    btnType?: ButtonType;
    children?: React.ReactNode;
    /** 设置 Button 的链接地址 */
    href?: string;
}
declare type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
declare type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
export declare type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
/**
 * 这是一个 Button 组件
 * ## Button 组件
 * ~~~js
 * import { Button } from 'Button'
 * ~~~
 */
export declare const Button: FC<ButtonProps>;
export default Button;
