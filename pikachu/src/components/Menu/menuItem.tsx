import React, { useContext, FC, CSSProperties } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'

export interface MenuItemProps {
	/** 设置下标 */
	index?: string;
	/** 设置是否禁用 */
	disabled?: boolean;
	className?: string;
	style?: CSSProperties;
}

export const MenuItem: FC<MenuItemProps> = (props) => {
	const { index, disabled, className, children, style } = props
	const context = useContext(MenuContext)

	const classes = classNames('menu-item', className, {
		'is-disabled': disabled,
		'is-active': context.index === index
	})

	const handleClick = () => {
		if (context.onSelect && !disabled && (typeof index === 'string')) {
			context.onSelect(index)
		}
	}

	return (
	<li className={classes} style={style} onClick={handleClick}>{children}</li>
	)
}

MenuItem.displayName = 'MenuItem'

export default MenuItem
