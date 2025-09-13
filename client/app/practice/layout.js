'use client'
import SideBar from '@/components/SideBar';
import Link from 'next/link';
import React, { useState } from 'react'

const page = ({children}) => {
    const [sideBarOpen, setSideBarOpen] = useState(true);

    const gridCols = sideBarOpen? " grid-cols-[200px_calc(100%-200px)]": " grid-cols-[80px_calc(100%-80px)]";

  return (
    <div className={`w-full h-screen p-1 pb-0 pr-2
                    grid ${gridCols} grid-rows-[60px_1fr] gap-1
                    transition-all duration-500 ease-in-out
                    bg-sky-100/40 backdrop-blur-3xl
    `}>
      <div className='flex items-center justify-center
                      col-span-1 row-span-2
      ' 
      >
        <SideBar isSideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen}/>
      </div>

      <div className='flex items-center justify-center
                     
                       col-span-1 row-span-1
      '>
        
          <div className='w-full h-[60px] z-50 bg-white/20  px-4 
                          flex items-center justify-center gap-8
                          shadow-[0_0_10px_rgba(0,0,0,0.1)] border-2 border-[#c3c3c3d2]
                          rounded-xl cursor-pointer  font-[500]
                '
          >
            <Link href='/'>Home</Link>
            <Link href='/'>Learning lab</Link>
            <Link href='/practice/library'>Practice lab</Link>
            <Link href='/'>Reading lab</Link>
            <Link href='/'>Speaking lab</Link>
          </div>
        
       </div>

      <div className='flex items-center justify-center
                      col-span-1 row-span-1 overflow-hidden
      '>
        {children}
      </div>
    </div>
  )
}

export default page
