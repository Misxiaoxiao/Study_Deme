import React, { useState, useEffect } from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'
import { layoutConfig as layout } from './onePage.config'
import ReactEcharts from 'echarts-for-react'
// import echarts from 'echarts'
// style
import './onePage.css'

const ResponsiveGridLayout = WidthProvider(Responsive)

const OnePage = ({ ...props }) => {
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
    setRowHeight(h > 70 ? h : 70)
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

  console.log(rowHeight)

  return (
    <ResponsiveGridLayout
      className='layout'
      {...layoutConfig}
      {...props}
    >
      <div key="header" style={{ fontSize: '1rem', padding: 0 }}>header</div>
      <div key="left-top" style={{ fontSize: '1rem', padding: 0 }}>left-top</div>
      <div key="left-bottom" style={{ fontSize: '1rem', padding: 0 }}>left-bottom</div>
      <div key="center-top" style={{ fontSize: '1rem', padding: 0 }}>center-top</div>
      <div key="center-bottom" style={{ fontSize: '1rem', padding: 0 }}>center-bottom</div>
      <div key="right-top" style={{ fontSize: '1rem', padding: 0 }}>right-top</div>
      <div key="right-bottom" style={{ fontSize: '1rem', padding: 0 }}>right-bottom</div>
    </ResponsiveGridLayout>
  )
}

export default OnePage
