'use client'
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GoSidebarCollapse } from "react-icons/go";
import { MdKeyboardDoubleArrowLeft } from 'react-icons/md';
import { FaUserCircle } from "react-icons/fa";
import { BookOpen, LayoutGrid, BookMarked, PenTool, ClipboardList } from "lucide-react";
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';




const sideBarOptions = [
  { name: 'Library',    link: '/practice/library',    icon: BookOpen },       // General reading/practice hub
  { name: 'Categories', link: '/practice/categories', icon: LayoutGrid }, // Browse topics
  { name: 'Stories',    link: '/practice/library',    icon: BookMarked },     // Story/lesson-based learning
  { name: 'Custom',     link: '/practice/library',    icon: PenTool },         // Create your own exercises
  { name: 'My Plans',   link:'/practice/library',     icon: ClipboardList },  // Learning plans/progress
];


const SideBar = ({
  isSideBarOpen,
  setSideBarOpen,
}) => {

  const pathname = usePathname();
  const router = useRouter();
  const [selectedItemIdx, setSelectedItemIdx] = useState(0);
  
  useEffect(()=>{
    const currentFocus = sideBarOptions.findIndex(option => pathname.startsWith(option.link));
    setSelectedItemIdx(currentFocus);
  },[pathname])
    
  
  const handleClick = (index) =>{
    router.push(sideBarOptions[index].link);
  }

  return ( 
    <>
      {isSideBarOpen ?
        (
          <div className='bg-[#ffffff] py-4 px-3
                           border-r-2 border-[#c3c3c3d2]
                          w-full h-full
                          flex flex-col justify-between
                          text-lg font-bold relative ubuntu
                          transition-all duration-800 ease-in-out
                          overflow-hidden'>

            <MdKeyboardDoubleArrowLeft
              className='text-gray-600 cursor-pointer absolute text-2xl z-50 right-0 top-[50%] translate-y-[-50%]'
              onClick={() => setSideBarOpen(prv=>!prv)}
            />

            <Link className={`transition-opacity duration-300 text-center
                             h-10
                             ${isSideBarOpen ? 'opacity-100 delay-300' : 'opacity-0'}`}
                             href="/"
            > 
              <p className='text-[23px] font-[600] text-gray-900'>Native<span className='font-[400]'>labs</span></p>
            
              
           

            </Link>
            
            <div className='flex-grow my-10
                            transition-opacity duration-800 
            '>
              <motion.div className={`font-[500] flex flex-col items-start gap-4  
              `}>
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
            
            <div className={`flex items-center gap-2 pb-4 transition-opacity duration-300 
                             text-gray-800
                              ${isSideBarOpen ? 'opacity-100 delay-300' : 'opacity-0'}`}>
              <FaUserCircle className='text-[2.1rem]' />
              <div className='overflow-hidden whitespace-nowrap'>
                <h4 className='text-[16px]  font-bold leading-none'>Person</h4>
                <p className='text-sm font-[500] text-gray-700'>person@gmail.com</p>
              </div>
            </div>
          </div>
        ) : (
          <div className='bg-white py-4 px-1
                          h-full w-full
                          flex flex-col justify-between items-center
                          border-r-2 border-[#c3c3c3d2]
                          
            '>
            
            <div className={`
                             text-center h-10 text-lg font-bold
                              
                              `}>
              <Image src="/brain-logo.svg" width={35} height={17} className='' alt="Nativelabs" />
            </div>

            <div className='h-full w-full'>
             <div className='flex flex-col items-center 
                             h-full w-full

             '>

              
              <div className='flex flex-col items-center gap-1.5 px-2  h-full w-full my-12'>
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
              <GoSidebarCollapse 
                className='text-xl cursor-pointer h-24'
                onClick={() => setSideBarOpen(prv=>!prv)}  
              />
             </div>
            </div>

            <div className='pb-4 text-[2.1rem] text-gray-800'>
              <FaUserCircle/>
            </div>
          </div>
        )
      }
    </>
  );
};

// Demo component to test the sidebar


export default SideBar;