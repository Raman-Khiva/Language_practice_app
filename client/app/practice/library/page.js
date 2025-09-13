'use client'

import SideBar from '@/components/SideBar'
// import LessonCardNew from '@/components/ui/LessonCardNew';
import LineGraph from '@/components/ui/lineGraph';
// import { MdKeyboardDoubleArrowLeft } from "react-icons/md"
// import { BsArrowsAngleExpand } from "react-icons/bs";
// import { FaExpandAlt } from "react-icons/fa";
//import CircularProgress from '@/components/ProgessBar/circularProgressBar';
// import CircularProgressNew from '@/components/ui/CircularProgressNew';
import { useEffect, useState } from 'react';
import ProgressCardsBar from '@/components/ui/ProgressCardsBar';
import { selectSideBarOpen } from '@/app/store/slices/sideBarSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLessons, selectLoading, selectCurrentLessons } from '@/app/store/slices/lessonsSlices';

import LessonsSection from '@/components/LessonsSection';
// import { MdArrowDropDown } from 'react-icons/md';
// import MultiSelectDropdown from '@/components/ui/MultiSelectDropDown';
import Link from 'next/link';


const page = () => {

  const barOpen = useSelector(selectSideBarOpen);
  const currentLessons = useSelector(selectCurrentLessons);
  const [mainExpanded, setMainExpanded] = useState(true);
  const dispatch = useDispatch();
  // const loading = useSelector(selectLoading);
  const [difficulty , setDifficulty ] = useState(1);

  
  
  let gridCols = barOpen ? 'grid-cols-[224px_1fr]': 'grid-cols-[70px_1fr]';
  let displayPropertyGraphs = mainExpanded ? ' hidden' : '';
  let displayPropertyMain = mainExpanded ? ' col-start-1 col-end-9 row-start-1 row-end-11' : ' col-start-1 col-end-8 row-start-3 row-end-11';
  let displayPropertyStatsBar = mainExpanded ? ' col-start-9 col-end-11 row-start-1 row-end-11 flex-col py-16 justify-evenly' : 'col-start-1 col-end-8 row-start-1 row-end-3';
  
  // useEffect(()=>{
  //   console.log('ENTERED USE-EFFECT TO DISAPATCH fetchLessons');
  //   dispatch(fetchLessons({difficulty : difficulty}));
  // },[dispatch,difficulty]);

  // const handleChange = () =>{
  //    const idx = 1 + Math.ceil(Math.random()*10);
  //    setDifficulty(idx);
  //    return ;
  // }
  

  // if(loading){
  //   return (<div className='h-screen w-full grid place-items-center'>
  //       loading lessons
  //   </div>)
  // }
  

  return (
        
        <div className={`  text-3xl font-[500] 
                          h-full w-full
                          grid  grid-cols-10 grid-rows-10 gap-2  overflow-hidden
                          transition-all duration-800 ease-in-out`     
        }>
            
            <ProgressCardsBar className={` flex place-items-center justify-evenly
                              px-5  rounded-xl 
                              shadow-[0_0_10px_rgba(0,0,0,0.1)] 
                              border-2 border-[#c3c3c3d2] bg-white/20  gap-2 min-h-0 
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
                            shadow-[0_0_10px_rgba(0,0,0,0.1)] 
                            transition-all duration-800 ease-in-out
                            bg-violet-50/40 border-2 border-[#c3c3c3d2]
                            backdrop-blur-3xl backdrop-saturate-50
                            
                          ` + displayPropertyMain}
            >
              <LessonsSection setMainExpanded={setMainExpanded} mainExpanded={mainExpanded}/>
              
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

export default page