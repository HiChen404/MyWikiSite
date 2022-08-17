import React from 'react'
import { useRef, forwardRef, useImperativeHandle } from 'react'

const COLOR = {
  yellow: '#feca57',
  mint: '#25c2a0',
  blue: '#1877F2',
  red: '#ff5252',
}

function Highlight({ children, color, colorName }, ref) {
  if (colorName) {
    color = COLOR[colorName]
  }
  useImperativeHandle(
    ref,
    () => {
      return {
        colorName,
        color,
      }
    },
    [color, colorName],
  )

  return (
    <span
      style={{
        backgroundColor: color,
        borderRadius: '2px',
        color: '#fff',
        padding: '0.2rem',
      }}>
      {children}
    </span>
  )
}

export default forwardRef(Highlight)
