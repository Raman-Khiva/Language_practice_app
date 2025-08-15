import React from 'react'

const textArea = () => {
  return (
    <div className='flex justify-center items-center 
                    p-3 bg-[#f4c8d5b4] w-[42rem] h-60 rounded-2xl 
    '>
        <textarea name="Answer" placeholder='Type your answer here...'
            className='w-full h-full text-2xl font-[700] text-[#504e4e] bg-[#f6ecefa9] outline-none border-3 border-[#e9a9bcd8] rounded-[11px] 
                       p-3 text-center'
        ></textarea>
    </div>
  )
}

export default textArea
