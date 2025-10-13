import React from 'react'
import { useSelector } from 'react-redux'
import { BsArrowsAngleExpand } from 'react-icons/bs';
import SingleSelectDropdown from '../forms/SingleSelectDropDown';
import { selectCurrentLessons} from '@/app/store/slices/lessonsSlices';
import LessonCard from '../cards/LessonCard';






const LessonsSection = ({setMainExpanded, mainExpanded, selectedValueIdx, setSelectedValueIdx}) => {

    const currentLessons = useSelector(selectCurrentLessons);

  return (
    <div className=' h-full'>
      <BsArrowsAngleExpand className='absolute -right-2 -top-2  p-3 w-12 h-12 text-gray-700 font-[400] z-50 opacity-0 hover:opacity-100 cursor-pointer duration-300'
                onClick={() => { setMainExpanded(!mainExpanded) }}  
              />
              <div className='border-t-1 mx-6 border-gray-300 py-2 px-10 text-lg flex-shrink-0 flex flex-row-reverse items-center justify-between'>
                  {/* <p>Cureent difficulty is {currentLessonsRecord.difficulty}</p> */}
                  <SingleSelectDropdown selectedValueIdx={selectedValueIdx} setSelectedValueIdx={setSelectedValueIdx}/>
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
