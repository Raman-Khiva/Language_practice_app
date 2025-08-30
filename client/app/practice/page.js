'use client'

import SideBar from '@/components/SideBar'
import LessonCardNew from '@/components/ui/LessonCardNew';
import PerformanceCard from '@/components/ui/performaceCards';
import LineGraph from '@/components/ui/lineGraph';
import { MdKeyboardDoubleArrowLeft } from "react-icons/md"
import { BsArrowsAngleExpand } from "react-icons/bs";
import { FaExpandAlt } from "react-icons/fa";
//import CircularProgress from '@/components/ProgessBar/circularProgressBar';
import CircularProgressNew from '@/components/ui/CircularProgressNew';
import { useState } from 'react';


const page = () => {

  const [barOpen, setBarOpen] = useState(true);
  const [mainExpanded, setMainExpanded] = useState(true);


  let gridCols = barOpen ? 'grid-cols-[224px_1fr]': 'grid-cols-[70px_1fr]';
  let displayPropertyGraphs = mainExpanded ? ' hidden' : '';
  let displayPropertyMain = mainExpanded ? ' col-start-1 col-end-9 row-start-1 row-end-11' : ' col-start-1 col-end-8 row-start-3 row-end-11';
  let EdisplayPropertyMain = mainExpanded ? ' col-start-1 col-end-8 row-1' : ' col-start-1 col-end-8 row-span-1';
  let displayPropertyStatsBar = mainExpanded ? ' col-start-9 col-end-11 row-start-1 row-end-11 flex-col' : 'col-start-1 col-end-8 row-start-1 row-end-3';
  let EdisplayPropertyStatsBar = mainExpanded ? ' row-span-1 absolute duration-800' : ' col-start-1 col-end-8 row-span-1';
  let mainContentRows = mainExpanded ? ' grid-rows-[1fr_100fr]' : ' grid-rows-[1fr_4fr]';
  

  return (
    <div className={`w-screen h-screen bg-linear-to-r from-[#eae1faf4] via-[#f4d2dcea] to-[#ede2c1f0] bg-blur-4xl 
                    grid grid-rows-[60px_1fr] overflow-hidden gap-2
                    pr-2 pt-1 transition-all duration-800 ease-in-out
    `+gridCols}>

        <div className='row-span-full relative 
                          
        '>
          <SideBar barOpen={barOpen} setBarOpen={setBarOpen} className='bg-[#f1f3f7] h-full' />
          {/* <div className='w-[3px] h-full bg-[#636262] absolute -right-[5px] opacity-0 hover:opacity-100 cursor-pointer'
          /> */}
          

        </div>

        <div className='col-span-1 row-span-1 h-[60px] w-full flex items-center justify-center'>
          <div className='w-full h-[60px] z-50 bg-white border-b-2 border-gray-400 px-4 flex items-center justify-center
                          rounded-xl
                '>
            Navbar here
          </div>
        </div>

        {/*main content div */}
        <div className={`bg-[#e0e3f42f] w-full h-full text-3xl font-[500] 
                          grid  grid-cols-10 grid-rows-10 gap-2  overflow-hidden
                          transition-all duration-800 ease-in-out`
                          
                }>
            
            <div className={` flex place-items-center justify-center  rounded-xl border
                            bg-[#f0faff8e] border-gray-400 gap-12 min-h-0 
                              transition-all duration-800 ease-in-out
                             ` + displayPropertyStatsBar}
            >
              <PerformanceCard className="bg-amber-200 ">
                <CircularProgressNew fillColor="#fff7c9" />
              </PerformanceCard>
              <PerformanceCard className="bg-blue-300">
                <CircularProgressNew fillColor="#dbeafe" />
              </PerformanceCard>
              <PerformanceCard className="bg-fuchsia-300">
                <CircularProgressNew fillColor="#f5d0fe" />
              </PerformanceCard>
              <PerformanceCard className="bg-orange-200">
                <CircularProgressNew fillColor="#ffedd5" />
              </PerformanceCard>
            </div>
            
            <div className={`col-span-3 row-span-3 grid place-items-center rounded-xl 
                            border border-gray-400 min-h-0 bg-[#f0faff8e] 
                            transition-all duration-800 ease-in-out
                            ` + displayPropertyGraphs}
            >
              <LineGraph />
            </div>
            

            {/*main content area*/}
            <div className={` flex flex-col gap-2  rounded-xl 
                            border border-gray-400 h-full bg-[#f8fdffaa] w-full
                            relative row-span-10 col-span-8 
                            transition-all duration-800 ease-in-out
                            
                          ` + displayPropertyMain}
            >
              <BsArrowsAngleExpand className='absolute -right-2 -top-2  p-3 w-12 h-12 text-gray-700 font-[400] z-50 opacity-0 hover:opacity-100 cursor-pointer duration-300'
                onClick={() => { setMainExpanded(!mainExpanded) }}  
              />
              <div className='border-b-2 border-gray-300 p-2 text-lg flex-shrink-0'>
                reserved section
              </div>
              <div className='flex-1 h-full overflow-auto p-3 w-full '>
                <div className='w-full  h-full flex gap-3 flex-wrap my-1.5 justify-center '>
                  {Array.from({length:20}).map((_,i)=>(
                    <LessonCardNew key={i} lessonId={i+1} />
                  ))}
                </div>
              </div>
            </div>
            
            <div className={`col-span-3  row-span-7 grid place-items-center  rounded-xl border 
                           border-gray-400 bg-[#f0faff8e] 
                           transition-all duration-800 ease-in-out
                           ` + displayPropertyGraphs}
            >
              stats graph
            </div>
        </div>
    </div>
  )
}

export default page