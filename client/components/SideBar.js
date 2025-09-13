'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GoSidebarCollapse } from "react-icons/go";
import { MdKeyboardDoubleArrowLeft } from 'react-icons/md';
import { BookOpen, LayoutGrid, BookMarked, PenTool, ClipboardList } from "lucide-react";


import Link from 'next/link';
import { useRouter } from 'next/navigation';


const sideBarOptions = [
  { name: 'Library', link: '/practice/library', icon: BookOpen },       // General reading/practice hub
  { name: 'Categories', link: '/practice/categories', icon: LayoutGrid }, // Browse topics
  { name: 'Stories', link: '/practice/library', icon: BookMarked },     // Story/lesson-based learning
  { name: 'Custom', link: '/practice/library', icon: PenTool },         // Create your own exercises
  { name: 'My Plans', link:'/practice/library', icon: ClipboardList },  // Learning plans/progress
];


const SideBar = ({isSideBarOpen,setSideBarOpen}) => {
  const [selectedItemIdx, setSelectedItemIdx] = useState(0);
  const router = useRouter();
  const handleClick = (index) =>{
    setSelectedItemIdx(index);
    router.push(sideBarOptions[index].link);
  }

  return ( 
    <>
      {isSideBarOpen ?
        (
          <div className='bg-[#ffffff] py-4 px-3 rounded-xl 
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

            <div className={`transition-opacity duration-300 text-center
                             h-10
                             ${isSideBarOpen ? 'opacity-100 delay-300' : 'opacity-0'}`}>
              Logo Here
            </div>
            
            <div className='flex-grow my-16
                            transition-opacity duration-800 
            '>
              <motion.div
                          className={`font-[500] flex flex-col items-start gap-4  
                          
                          `}
              >
                {sideBarOptions.map((option,index)=>{
                  
                    const Icon = option.icon;
                    return(
                      <motion.div
                          initial={{ width : 0,opacity : 0}}
                          animate={{ width : "100%" ,opacity:1}}
                          transition={{ duration: 0.4,    ease: "easeInOut" }}
                          style={{ transformOrigin: "left center" }}
                        key={index} //+((currentFocus===index)?' bg-gray-300':'hover:bg-gray-200')
                        className={` pl-5 pr-1 py-1 rounded-lg 
                                     flex items-center justify-start 
                                     cursor-pointer overflow-hidden
  
                                     ${selectedItemIdx===index?"bg-violet-200 text-violet-600":"hover:bg-gray-200"}
                                     ` 
                         }
                        onClick={()=>handleClick(index)}
                      >
                        <span className='whitespace-nowrap 
                                         flex items-center gap-3
                        '>
                          <Icon className='text-sm' />
                          {option.name}

                        </span>
                      </motion.div>
                    )
                })}
                
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
          <div className=' bg-white  rounded-xl py-4 px-1
                          h-full w-full
                          flex flex-col justify-between items-center

                           shadow-[0_0_10px_rgba(0,0,0,0.1)] border-2 border-[#c3c3c3d2]
                          
            '>
            
            <div className={`
                             text-center h-10 text-lg font-bold
                              
                              `}>
              Logo
            </div>

            <div className='h-full w-full'>
             <div className='flex flex-col items-center 
                             h-full w-full

             '>

              <GoSidebarCollapse 
                className='text-xl cursor-pointer h-20'
                onClick={() => setSideBarOpen(prv=>!prv)}  
              />
              <div className='flex flex-col items-center gap-1.5 px-2  h-full w-full '>
                {sideBarOptions.map((option,index)=>{
                  const Icon = option.icon
                  return(
                    <motion.div className={` w-full py-2.5  rounded-lg cursor-pointer
                                      ${selectedItemIdx===index?"bg-violet-200 text-violet-600":"hover:bg-gray-200"}`}
                          
                          initial={{ width : "110%"}}
                          animate={{  width : "100%", }}
                          transition={{ duration: 0.4,    ease: "easeInOut" }}
                          style={{ transformOrigin: "right center" }}
                    
                          key={index}
                          onClick={()=>handleClick(index)}
                    >
                      <Icon className={`text-xl font-bold  
                                        w-full whitespace-nowrap
                                        `
                      }/>
                    </motion.div>
                  )
                })}
              </div>
             </div>
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