import React from 'react'

const progressBar = () => {
  return (
    <div className='flex items-center gap-2'>
        <div className='w-52 h-2 bg-gray-300 rounded-3xl'>
        <div className='w-[70%] h-full bg-[#34cc3e] rounded-3xl'/>
        </div>

        <h6 className='text-xs font-[700] text-gray-500'>70%</h6>

    </div>
  )
}

export default progressBar
