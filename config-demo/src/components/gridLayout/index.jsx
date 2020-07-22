import React, { useState, useEffect } from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'

const ResponsiveGridLayout = WidthProvider(Responsive)

const OnePage = ({ layout, children, minHeight = 70, ...restProps }) => {
  const [ rowHeight, setRowHeight ] = useState(document.body.clientHeight / 12)

  const layoutConfig = {
    layouts: { lg: layout },
    rowHeight,
    breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
    margin: { lg: [0, 0], md: [0, 0], sm: [0, 0], xs: [0, 0] }
  }

  const setNewRowHeight = () => {
    const docEle = document.documentElement
    // 设置行高
    const h = docEle.clientHeight / 12
    setRowHeight(h > minHeight ? h : minHeight)
    // 设置根元素字体大小
    const width = docEle.clientWidth;
    width && (docEle.style.fontSize = 10 * width / 750 + "px")
  }

  useEffect(() => {
    const evt = "onorientationchange" in window ? "orientationchange" : "resize"
    setNewRowHeight()
    window.addEventListener(evt, setNewRowHeight, true) 
    return () => {
      document.removeEventListener(evt, setNewRowHeight)
    }
  }, [rowHeight])

  return (
    <ResponsiveGridLayout
      className='layout'
      {...layoutConfig}
      {...restProps}
    >
      {children}
    </ResponsiveGridLayout>
  )
}

export default OnePage
