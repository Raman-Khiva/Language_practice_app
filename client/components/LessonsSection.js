import React from 'react'
import { useSelector } from 'react-redux'
import LessonCardNew from './ui/LessonCardNew';
import { BsArrowsAngleExpand } from 'react-icons/bs';
// import { MdArrowDropDown } from 'react-icons/md';
import MultiSelectDropdown from './ui/MultiSelectDropDown';
import SingleSelectDropdown from './ui/SingleSelectDropDown';
import { selectCurrentLessons, selectLessonsError, selectLessonsLoading } from '@/app/store/slices/lessonsSlices';





const LessonsSection = ({setMainExpanded, mainExpanded}) => {

    const currentLessons = useSelector(selectCurrentLessons);
    // const error = useSelector(selectLessonsError);
    // const loading = useSelector(selectLessonsLoading);
    // const currentLessonsRecord = useSelector(selectCurrentLessonsRecord);  
    
    // if(loading){
    //   return (
    //     <div className='flex items-center justify-center'>loading please wait</div>
    //   )

    // }
    // if(error){
    //   return (
    //     <div className='flex items-center justify-center'>{error}</div>
    //   )
    // }
  return (
    <div className=' h-full'>
      <BsArrowsAngleExpand className='absolute -right-2 -top-2  p-3 w-12 h-12 text-gray-700 font-[400] z-50 opacity-0 hover:opacity-100 cursor-pointer duration-300'
                onClick={() => { setMainExpanded(!mainExpanded) }}  
              />
              <div className='border-b-2 border-gray-300 py-2 px-10 text-lg flex-shrink-0 flex flex-row-reverse items-center justify-between'>
                  {/* <p>Cureent difficulty is {currentLessonsRecord.difficulty}</p> */}
                  <SingleSelectDropdown/>
              </div>
              <div className='flex-1 h-full overflow-auto p-3 w-full '>
                <div className='w-full  flex gap-4 flex-wrap my-1.5 justify-center pt-6 pb-20'>
                  {currentLessons?.map((currentLesson,i)=>(
                    <LessonCardNew key={i} lessonId={i+1} index={i} currentLesson={currentLesson}/>
                  ))}
                </div>
              </div>
    </div>
  )
}

export default LessonsSection
