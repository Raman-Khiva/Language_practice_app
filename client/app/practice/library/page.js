'use client'

// import LessonCardNew from '@/components/cards/LessonCardNew';
import LineGraph from '@/components/visuals/lineGraph';


import { useEffect, useState } from 'react';
import ProgressCardsBar from '@/components/progress/ProgressCardsBar';


import LessonsSection from '@/components/sections/LessonsSection';
import { useDispatch, useSelector } from 'react-redux';
import { selectLessonsData, selectLessonsFetched, selectLessonsLoading, toggleDifficulties } from '@/app/store/slices/lessonsSlices';
import MainLoader from '@/components/common/MainLoader';



const LibraryPage = () => {
  
  const [mainExpanded, setMainExpanded] = useState(true);
  const [selectedValueIdx, setSelectedValueIdx] = useState(0);
  const allLessonsLoading = useSelector(selectLessonsLoading);
  const allLessons        = useSelector(selectLessonsData);
  const lessonsFetched    = useSelector(selectLessonsFetched);
  const disatch           = useDispatch();
  
  let displayPropertyGraphs = mainExpanded ? ' hidden' : '';
  let displayPropertyMain = mainExpanded ? ' col-start-1 col-end-9 row-start-1 row-end-11' : ' col-start-1 col-end-8 row-start-3 row-end-11';
  let displayPropertyStatsBar = mainExpanded ? ' col-start-9 col-end-11 row-start-1 row-end-11 flex-col py-16 justify-evenly' : 'col-start-1 col-end-8 row-start-1 row-end-3';

  useEffect(()=>{
    if(lessonsFetched){
      disatch(toggleDifficulties([0]));
    }
  },[lessonsFetched])
  

  if(allLessonsLoading){
    return (
      <MainLoader></MainLoader>
    )
  }

  console.log('\n | \n |');
  console.log("allLessons",allLessons);
  console.log('\n | \n |');
  
  
  return (
        
        <div className={`  text-3xl font-[500] 
                          h-full w-full
                          grid  grid-cols-10 grid-rows-10 gap-2  overflow-hidden
                          transition-all duration-800 ease-in-out`     
        }>
            
            <ProgressCardsBar className={` flex place-items-center justify-evenly
                              px-5  rounded-xl 
                                gap-2 min-h-0 
                              transition-all duration-800 ease-in-out
                             ` + displayPropertyStatsBar} />
            
          <div className={`col-span-3 row-span-3 grid place-items-center rounded-xl 
                            min-h-0 bg-white/20
                            shadow-[0_0_10px_rgba(0,0,0,0.1)] border-2 border-[#c3c3c3d2]
                            transition-all duration-800 ease-in-out
                            ` + displayPropertyGraphs}
            >
              <LineGraph />
            </div>
            



            {/*main content area*/}
            <div className={` flex flex-col gap-2  rounded-xl 
                            relative row-span-10 col-span-8 
                            transition-all duration-800 ease-in-out
                            
                          ` + displayPropertyMain}
            >
              <LessonsSection selectedValueIdx={selectedValueIdx} setSelectedValueIdx={setSelectedValueIdx}
                              setMainExpanded={setMainExpanded} mainExpanded={mainExpanded}
               />
              
            </div>
            




            <div className={`col-span-3  row-span-7 grid place-items-center  rounded-xl
                            bg-white/20 
                            shadow-[0_0_10px_rgba(0,0,0,0.1)] border-2 border-[#c3c3c3d2]
                           transition-all duration-800 ease-in-out
                           ` + displayPropertyGraphs}
            >
              stats graph
            </div>


        </div>
  )
}

export default LibraryPage