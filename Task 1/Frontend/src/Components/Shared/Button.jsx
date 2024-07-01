import React from 'react'

const Button = ({text, handler = () =>{}}) => {
  return (
    <button className='bg-blue-500 text-white font-semibold cursor-pointer hover:scale-105 py-2 px-8 rounded-full relative z-10'>{text}</button>
  )
}

export default Button