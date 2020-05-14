import React, { useState, useEffect } from 'react'

const MouseTracker: React.FC = () => {
  const [ position, setPosition ] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const mouseClick = (e: MouseEvent) => {
      console.log('inner')
      setPosition({ x: e.clientX, y: e.clientY })
    }
    document.addEventListener('mousemove', mouseClick)
    return () => {
      document.removeEventListener('mousemove', mouseClick)
    }
  })

  return (
  <p>x: { position.x }, y: { position.y }</p>
  )
}

export default MouseTracker