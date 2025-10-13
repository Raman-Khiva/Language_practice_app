'use client'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BsArrowsAngleExpand } from 'react-icons/bs';
import SingleSelectDropdown from '../forms/SingleSelectDropDown';
import { selectCurrentLessons, selectLessonsFetched, selectLessonsLoading, toggleCategoryAndDifficulty} from '@/app/store/slices/lessonsSlices';
import LessonCard from '../cards/LessonCard';






const LessonsSection = ({setMainExpanded, mainExpanded,  category='allLessons'}) => {
    const [selectedValueIdx,setSelectedValueIdx] = useState(0);
    const currentLessons = useSelector(selectCurrentLessons);
    const lessonsFetched = useSelector(selectLessonsFetched);
    const dispatch = useDispatch();

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
              dispatch(toggleCategoryAndDifficulty({
                targetCategory: category,
                targetDifficulty: selectedValueIdx + 1
              }))
                
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [dispatch,lessonsFetched]);
    
    console.log("LessonsSection -- currentLessons : ",currentLessons);
    if(currentLessons.length === 0){
      return (
        <div className='h-full w-full grid place-items-center'>
          loading
        </div>
      )
    }

  return (
    <div className=' h-full'>
      <BsArrowsAngleExpand className='absolute -right-2 -top-2  p-3 w-12 h-12 text-gray-700 font-[400] z-50 opacity-0 hover:opacity-100 cursor-pointer duration-300'
                onClick={() => { setMainExpanded(!mainExpanded) }}  
              />
              <div className='border-t-1 mx-6 border-gray-300 py-2 px-10 text-lg flex-shrink-0 flex flex-row-reverse items-center justify-between'>
                  {/* <p>Cureent difficulty is {currentLessonsRecord.difficulty}</p> */}
                  <SingleSelectDropdown 
                    selectedValueIdx={selectedValueIdx} 
                    setSelectedValueIdx={setSelectedValueIdx}
                    category={category}
                  />
              </div>


              <div className='flex-1 h-full overflow-auto p-3 w-full '>
                <div className='w-full  flex gap-4 flex-wrap my-1.5 justify-center pt-6 pb-20'>
                  {currentLessons?.map((currentLesson,i)=>(
                    <LessonCard 
                      key={i} 
                      index={i} 
                      currentLesson={currentLesson}
                    />
                  ))}
                </div>
              </div>

    </div>
  )
}

export default LessonsSection
