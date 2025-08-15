import React from 'react'

const questionFeild = ({question}) => {
  return (
    <div className='bg-[#f7cafba8] p-[10px] rounded-2xl '>
        <div className='border-[3px] border-[#f693ffa8] px-8 py-6 rounded-lg bg-[#fce0ffd5]'>
            <h2 className='text-2xl font-[500] text-[#867e86]'>{question}</h2>
        </div>
    </div>
  )
}

export default questionFeild
