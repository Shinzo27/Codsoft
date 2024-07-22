import React from 'react'

const Stats = () => {
  return (
    <div className='p-10 flex flex-wrap justify-around items-center gap-6 '>
        <div className='w-[390px] h-48 p-5 bg-white rounded-xl border-opacity-10 border border-black flex justify-around flex-col shadow-sm'>
            <div>
                <h1 className='text-3xl font-semibold'>Project</h1>
                <p className='text-sm text-gray-400'>All active projects</p>
            </div>
            <div className='font-bold text-4xl'>
                24
            </div>
        </div>
        <div className='w-[390px] h-48 p-5 bg-white rounded-xl border-opacity-10 border border-black flex justify-around flex-col shadow-sm'>
            <div>
                <h1 className='text-3xl font-semibold'>Tasks</h1>
                <p className='text-sm text-gray-400'>Pending and completed task</p>
            </div>
            <div className='font-bold text-4xl'>
                30
            </div>
        </div>
        <div className='w-[390px] h-48 p-5 bg-white rounded-xl border-opacity-10 border border-black flex justify-around flex-col shadow-sm'>
            <div>
                <h1 className='text-3xl font-semibold'>Team Members</h1>
                <p className='text-sm text-gray-400'>Active team members</p>
            </div>
            <div className='font-bold text-4xl'>
                8
            </div>
        </div>
        <div className='w-[390px] h-48 p-5 bg-white rounded-xl border-opacity-10 border border-black flex justify-around flex-col shadow-sm'>
            <div>
                <h1 className='text-3xl font-semibold'>Deadline</h1>
                <p className='text-sm text-gray-400'>Upcoming project deadlines</p>
            </div>
            <div className='font-bold text-4xl'>
                2
            </div>
        </div>
    </div>
  )
}

export default Stats