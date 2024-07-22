import React from 'react'
import Button from './Shared/Button'

const Navbar = () => {
  return (
    <div className='w-full h-16 bg-black text-white font-bold flex justify-around items-center'>
        <div className='md:text-2xl text-xl'>
            Project Management Tool
        </div>
        <div className='hidden sm:block lg:flex justify-center items-center gap-8'>
            <div>
                <Button title={"Login"} bgColor={"White"} fontColor={"Black"}/>
            </div>
            <div>
                <h2>My name</h2>
            </div>
            <div>
                <Button title={"Login"} bgColor={"White"} fontColor={"Black"}/>
            </div>
        </div>
    </div>
  )
}

export default Navbar