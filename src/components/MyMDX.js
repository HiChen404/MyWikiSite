import React from 'react'

const COLOR = {
  yellow: '#feca57',
  mint: '#25c2a0',
  blue: '#1877F2',
}

export function Highlight({ children, color, colorName }) {
  if (colorName) {
    color = COLOR[colorName]
  }
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
