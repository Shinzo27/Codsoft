import React from 'react'

const Button = ({ title }) => {
  return (
    <button type='button' className='p-2 rounded-lg bg-white text-black'>{title}</button>
  )
}

export default Button