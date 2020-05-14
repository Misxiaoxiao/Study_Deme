import React, { useState, useEffect } from 'react'

const useMouseTracker = () => {
  const [ position, setPosition ] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const mouseClick = (e: MouseEvent) => {
      console.log('inner')
      setPosition({ x: e.clientX, y: e.clientY })
    }
    document.addEventListener('click', mouseClick)
    return () => {
      document.removeEventListener('click', mouseClick)
    }
  })

  return position
}

export default useMouseTracker