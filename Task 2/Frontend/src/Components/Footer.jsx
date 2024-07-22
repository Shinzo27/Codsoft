import React from 'react'

const Footer = () => {
  return (
    <div className='w-full h-16 bg-gray-300 flex justify-around items-center text-gray-600 p-5 fixed bottom-0'>
        <div>
            © 2024 Inc. All rights reserved.
        </div>
        <div className='flex justify-center items-center gap-6'>
            <a className='py-5 cursor-pointer hover:text-gray-400'>
                Terms service
            </a>
            <a className='cursor-pointer hover:text-gray-400'>
                Privacy
            </a>
        </div>
    </div>
  )
}

export default Footer