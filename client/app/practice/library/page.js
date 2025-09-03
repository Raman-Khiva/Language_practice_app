'use client'

import SideBar from '@/components/SideBar'
import LessonCardNew from '@/components/ui/LessonCardNew';
import LineGraph from '@/components/ui/lineGraph';
// import { MdKeyboardDoubleArrowLeft } from "react-icons/md"
import { BsArrowsAngleExpand } from "react-icons/bs";
// import { FaExpandAlt } from "react-icons/fa";
//import CircularProgress from '@/components/ProgessBar/circularProgressBar';
// import CircularProgressNew from '@/components/ui/CircularProgressNew';
import { useEffect, useState } from 'react';
import ProgressCardsBar from '@/components/ui/ProgressCardsBar';
import { selectSideBarOpen } from '@/app/store/slices/sideBarSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLessons, selectLoading, selectCurrentLessons } from '@/app/store/slices/lessonsSlices';

import LessonsSection from '@/components/LessonsSection';


const page = () => {

  const barOpen = useSelector(selectSideBarOpen);
  const [mainExpanded, setMainExpanded] = useState(false);
  const dispatch = useDispatch();
  // const loading = useSelector(selectLoading);
  const [difficulty , setDifficulty ] = useState(1);

  
  
  let gridCols = barOpen ? 'grid-cols-[224px_1fr]': 'grid-cols-[70px_1fr]';
  let displayPropertyGraphs = mainExpanded ? ' hidden' : '';
  let displayPropertyMain = mainExpanded ? ' col-start-1 col-end-9 row-start-1 row-end-11' : ' col-start-1 col-end-8 row-start-3 row-end-11';
  let displayPropertyStatsBar = mainExpanded ? ' col-start-9 col-end-11 row-start-1 row-end-11 flex-col' : 'col-start-1 col-end-8 row-start-1 row-end-3';
  
  useEffect(()=>{
    console.log('ENTERED USE-EFFECT TO DISAPATCH fetchLessons');
    dispatch(fetchLessons({difficulty : difficulty}));
  },[dispatch,difficulty]);

  const handleChange = () =>{
     const idx = 1 + Math.ceil(Math.random()*10);
     setDifficulty(idx);
     return ;
  }
  

  // if(loading){
  //   return (<div className='h-screen w-full grid place-items-center'>
  //       loading lessons
  //   </div>)
  // }
  

  return (
    <div className={`w-screen h-screen bg-linear-to-r from-[#eae1faf4] via-[#f4d2dcea] to-[#ede2c1f0] bg-blur-4xl 
                    grid grid-rows-[60px_1fr] overflow-hidden gap-2
                    pr-2 pt-1 transition-all duration-800 ease-in-out
    `+gridCols}>

        <div className='row-span-full relative 
                          
        '>
          <SideBar  className='bg-[#f1f3f7] h-full' />
          {/* <div className='w-[3px] h-full bg-[#636262] absolute -right-[5px] opacity-0 hover:opacity-100 cursor-pointer'
          /> */}
          

        </div>

        <div className='col-span-1 row-span-1 h-[60px] w-full flex items-center justify-center '>
          <div className='w-full h-[60px] z-50 bg-white border-b-2 border-gray-400 px-4 flex items-center justify-center
                          rounded-xl cursor-pointer
                '
                onClick={()=> handleChange()}
          >
            Navbar here
          </div>
        </div>

        {/*main content div */}
        <div className={`bg-[#e0e3f42f] w-full h-full text-3xl font-[500] 
                          grid  grid-cols-10 grid-rows-10 gap-2  overflow-hidden
                          transition-all duration-800 ease-in-out`
                          
                }>
            
            <ProgressCardsBar className={` flex place-items-center justify-center  rounded-xl border
                            bg-[#f0faff8e] border-gray-400 gap-12 min-h-0 
                              transition-all duration-800 ease-in-out
                             ` + displayPropertyStatsBar} />
            
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
              <LessonsSection setMainExpanded={setMainExpanded} mainExpanded={mainExpanded}/>
              {/* <BsArrowsAngleExpand className='absolute -right-2 -top-2  p-3 w-12 h-12 text-gray-700 font-[400] z-50 opacity-0 hover:opacity-100 cursor-pointer duration-300'
                onClick={() => { setMainExpanded(!mainExpanded) }}  
              />
              <div className='border-b-2 border-gray-300 p-2 text-lg flex-shrink-0 flex items-center justify-center'>
                  <p>Cureent difficulty is {difficulty}</p>
                  <MdArrowDropDown/>
              </div>
              <div className='flex-1 h-full overflow-auto p-3 w-full '>
                <div className='w-full  h-full flex gap-3 flex-wrap my-1.5 justify-center '>
                  {currentLessons.map((_,i)=>(
                    <LessonCardNew key={i} lessonId={i+1} />
                  ))}
                </div>
              </div> */}
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