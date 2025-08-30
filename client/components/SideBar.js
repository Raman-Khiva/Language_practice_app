import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GoSidebarCollapse } from "react-icons/go";
import { MdKeyboardDoubleArrowLeft } from 'react-icons/md';

const SideBar = ({ barOpen, setBarOpen }) => {
  return (
    <>
      {barOpen ? 
        (
          <div className='bg-[#ffffff] py-4 px-6 rounded-xl border-r-2 border-[#d1d1d1d2]
                          h-screen flex flex-col justify-between
                          w-28 sm:w-36 md:w-44 lg:w-52 xl:w-56
                          text-lg font-bold left-0 top-0 relative
                          transition-all duration-800 ease-in-out
                          overflow-hidden'>

            <MdKeyboardDoubleArrowLeft 
              className='text-gray-600 cursor-pointer absolute text-2xl z-50 right-0 top-[50%] translate-y-[-50%]'
              onClick={() => { setBarOpen(!barOpen) }}
            />

            <div className={`transition-opacity duration-300 ${barOpen ? 'opacity-100 delay-300' : 'opacity-0'}`}>
              Logo Here
            </div>
            
            <div className='flex-grow py-12
                            transition-opacity duration-800
            '>
              <motion.div className={`font-[500] flex flex-col gap-4 opacity-0 transition-opacity duration-300 ${barOpen ? 'opacity-100 delay-300' : 'opacity-0'}
                          initial={{ opacity: 0, scale-0.6 }}
                          animate={{ opacity: 1, scale: 1 }
                          transition={{ duration: 0.6, ease: "easeInOut" }
              `}>
                <p>library</p>
                <p>categories</p>
                <p>stories</p>
                <p>custom</p>
              </motion.div>
            </div>
            
            <div className={`flex items-center gap-2 transition-opacity duration-300 ${barOpen ? 'opacity-100 delay-300' : 'opacity-0'}`}>
              <div className='bg-black w-10 h-10 rounded-full' />
              <div className='overflow-hidden whitespace-nowrap'>
                <h4 className='text-lg font-normal leading-none'>Person</h4>
                <p className='text-sm font-[400]'>person@gmail.com</p>
              </div>
            </div>
          </div>
        ) : (
          <div className='w-[70px] bg-white h-full rounded-xl p-2
                          flex flex-col justify-between items-center
                          transition-all duration-800 ease-in-out'>
            
            <div className={`transition-opacity duration-800 ${!barOpen ? 'opacity-100 delay-300' : 'opacity-0'}`}>
              Logo
            </div>

            <div className='h-full py-10'>
              <GoSidebarCollapse 
                className='text-xl cursor-pointer'
                onClick={() => { setBarOpen(!barOpen) }}  
              />
            </div>

            <div className={`w-10 h-10 bg-gray-700 rounded-full transition-opacity duration-300 ${!barOpen ? 'opacity-100 delay-300' : 'opacity-0'}`} />
          </div>
        )
      }
    </>
  );
};

// Demo component to test the sidebar


export default SideBar;