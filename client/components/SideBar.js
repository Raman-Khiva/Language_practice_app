import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GoSidebarCollapse } from "react-icons/go";
import { MdKeyboardDoubleArrowLeft } from 'react-icons/md';


import Link from 'next/link';


const sideBarOptions = [
  { name: 'library', link: '/practice/library' },
  { name: 'categories', link: '/practice/categories' },
  { name: 'stories', link: '/practice/library' },
  { name: 'custom', link: '/practice/library' }
];


const SideBar = ({isSideBarOpen,setSideBarOpen}) => {

  return ( 
    <>
      {isSideBarOpen ? 
        (
          <div className='bg-[#ffffff] py-4 px-6 rounded-xl 
                          shadow-[0_0_10px_rgba(0,0,0,0.1)] border-2 border-[#c3c3c3d2]
                          w-full h-full
                          flex flex-col justify-between
                          text-lg font-bold relative
                          transition-all duration-800 ease-in-out
                          overflow-hidden'>

            <MdKeyboardDoubleArrowLeft
              className='text-gray-600 cursor-pointer absolute text-2xl z-50 right-0 top-[50%] translate-y-[-50%]'
              onClick={() => setSideBarOpen(prv=>!prv)}
            />

            <div className={`transition-opacity duration-300 ${isSideBarOpen ? 'opacity-100 delay-300' : 'opacity-0'}`}>
              Logo Here
            </div>
            
            <div className='flex-grow py-12
                            transition-opacity duration-800
            '>
              <motion.div className={`font-[500] flex flex-col gap-4 opacity-0 transition-opacity duration-300 ${isSideBarOpen ? 'opacity-100 delay-300' : 'opacity-0'}
                          initial={{ opacity: 0, scale-0.6 }}
                          animate={{ opacity: 1, scale: 1 }
                          transition={{ duration: 0.6, ease: "easeInOut" }
              `}>
                {sideBarOptions.map((option,index)=>(
                  <Link href={option.link}
                    key={index} //+((currentFocus===index)?' bg-gray-300':'hover:bg-gray-200')
                    className={` px-3 py-1 rounded-lg duration-300 `  }
                    onClick={()=>dispatch(changeFocus(index))}
                  >
                    {option.name}
                  </Link>
                ))}
                
              </motion.div>
            </div>
            
            <div className={`flex items-center gap-2 transition-opacity duration-300 ${isSideBarOpen ? 'opacity-100 delay-300' : 'opacity-0'}`}>
              <div className='bg-black w-10 h-10 rounded-full' />
              <div className='overflow-hidden whitespace-nowrap'>
                <h4 className='text-lg font-normal leading-none'>Person</h4>
                <p className='text-sm font-[400]'>person@gmail.com</p>
              </div>
            </div>
          </div>
        ) : (
          <div className=' bg-white  rounded-xl p-2 
                          h-full w-full
                          flex flex-col justify-between items-center
                          transition-all duration-800 ease-in-out

                           shadow-[0_0_10px_rgba(0,0,0,0.1)] border-2 border-[#c3c3c3d2]
                          
            '>
            
            <div className={`transition-opacity duration-800 ${!isSideBarOpen ? 'opacity-100 delay-300' : 'opacity-0'}`}>
              Logo
            </div>

            <div className='h-full py-10'>
              <GoSidebarCollapse 
                className='text-xl cursor-pointer'
                onClick={() => setSideBarOpen(prv=>!prv)}  
              />
            </div>

            <div className={`w-10 h-10 bg-gray-700 rounded-full transition-opacity duration-300 ${!isSideBarOpen ? 'opacity-100 delay-300' : 'opacity-0'}`} />
          </div>
        )
      }
    </>
  );
};

// Demo component to test the sidebar


export default SideBar;