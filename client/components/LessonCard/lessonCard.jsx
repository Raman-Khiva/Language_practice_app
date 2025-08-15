import Link from 'next/link'
import React from 'react'
import CircularProgressBar from '../ProgessBar/circularProgressBar';

const lessonCard = ({lessonId,category}) => {
  return (
    <Link 
      href={`/categories/${category}/${lessonId}`}
      className=' bg-[#d6dfe674] border-3 rounded-2xl  shadow-lg border-none
                    p-[10px]
    '>

      <div className=' flex  flex-col justify-between
                    w-48 h-56 bg-[#fafcffc4] rounded-[12px] px-4 py-4 border-3 border-[#d9d9d995]
      '>
        <div className='flex items-center justify-center py-1'>

          <CircularProgressBar/>
        </div>
        
        <h3 className='text-lg font-[600] text-gray-400'>Lesson {lessonId}</h3>
      </div>

    </Link>
  )
}

export default lessonCard
