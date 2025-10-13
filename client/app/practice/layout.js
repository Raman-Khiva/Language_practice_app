'use client'
import SideBar from '@/components/layout/SideBar';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

const Layout = ({children}) => {
  
     const [sideBarOpen, setSideBarOpen] = useState(true);
     const disatch = useDispatch();
     
     useEffect(()=>{
        disatch(getAllLessons())
     },[])
    

    const gridCols = sideBarOpen? " grid-cols-[200px_calc(100%-200px)]": " grid-cols-[80px_calc(100%-80px)]";

  return (
    <div className={`w-full h-screen overflow-hidden
                    grid ${gridCols} grid-rows-[60px_1fr]
                    transition-all duration-500 ease-in-out
                      bg-[#fffefa] backdrop-blur-3xl 
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
                          shadow-[0_0_10px_rgba(0,0,0,0.1)] border-b-2 border-[#c3c3c3d2]
                          cursor-pointer  font-[500]
          '>
            <Link href='/'>Home</Link>
            <Link href='/practice/library'>Practice lab</Link>
            <Link href='/stories'>Reading lab</Link>
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

export default Layout
