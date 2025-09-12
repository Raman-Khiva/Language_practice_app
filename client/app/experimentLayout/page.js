'use client'
import React, { useState } from 'react'

const page = () => {
    const [sideBarOpen, setSideBarOpen] = useState(true);

    const gridCols = sideBarOpen? " grid-cols-[200px_1fr]": " grid-cols-[80px_1fr]";

  return (
    <div className={`w-full h-screen p-1 pb-0
                    grid ${gridCols} grid-rows-[60px_1fr] gap-1
                    transition-all duration-500 ease-in-out
    `}>
      <div className='flex items-center justify-center bg-violet-300
                      col-span-1 row-span-2
      ' 
        onClick={()=> setSideBarOpen(prv=>!prv)}
      >
        sidebar
      </div>

      <div className='flex items-center justify-center
                      bg-amber-200
                       col-span-1 row-span-1
      '>
        navbar
       </div>

      <div className='flex items-center justify-center
                      bg-indigo-400
                      col-span-1 row-span-1
      '>
        main section
      </div>
    </div>
  )
}

export default page
