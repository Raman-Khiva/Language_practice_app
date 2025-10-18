'use client'

import { useState } from 'react';
import LessonsSection from '@/components/sections/LessonsSection';
import DifficultyTripleBarChart from '@/components/visuals/DifficultyTripleBarChart';



const LibraryPage = () => {
  
  const [mainExpanded, setMainExpanded] = useState(true);



  
  return (
        <div className={`  text-3xl font-[500] 
                          h-full w-full pr-8 py-4
                          grid  grid-cols-[1fr_21rem] 
                          transition-all duration-800 ease-in-out`     
        }>
            
            
            {/*main content area*/}
            <div className={` col-start-1 col-end-2 flex flex-col gap-2  rounded-xl 
                            relative 
                            transition-all duration-800 ease-in-out
                            
                          ` }
            >
             <LessonsSection 
                setMainExpanded={setMainExpanded} 
                mainExpanded={mainExpanded}
              />
              
            </div>
            
            
            <div className={`col-start-2 col-end-3 flex flex-col  mt-[6.2rem]
                            h-fit p-5 bg-white border-2 border-gray-100 rounded-xl  
                            transition-all duration-800 ease-in-out shadow-[0_0_10px_rgba(0,0,0,0.1)]
                            `}
            >
              <header className="flex flex-col gap-1 mb-6">
                <h3 className="text-lg font-semibold text-slate-800">Level Progress Overview</h3>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Total vs Attempted vs Passed</p>
              </header>
              <div className="flex-1 flex flex-col ">
                <DifficultyTripleBarChart />
              </div>
            </div>
            

        </div>
  )
}

export default LibraryPage