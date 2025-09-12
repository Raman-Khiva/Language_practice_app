'use client'
import React from 'react'
import CircularProgressBar from '../ProgessBar/circularProgressBar';
import { easeOut, motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { setLesson } from '@/app/store/slices/currentLessonSlice'; // adjust path

const Tick = () => {
  return (
    <div className="inline-flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="85"
        height="85"
        viewBox="0 0 256 256"
        className="fill-green-600"
      >
        <g transform="scale(10.66667,10.66667)">
          <path d="M12,2c-5.514,0 -10,4.486 -10,10c0,5.514 4.486,10 10,10c5.514,0 10,-4.486 10,-10c0,-1.126 -0.19602,-2.2058 -0.54102,-3.2168l-1.61914,1.61914c0.105,0.516 0.16016,1.05066 0.16016,1.59766c0,4.411 -3.589,8 -8,8c-4.411,0 -8,-3.589 -8,-8c0,-4.411 3.589,-8 8,-8c1.633,0 3.15192,0.49389 4.41992,1.33789l1.43164,-1.43164c-1.648,-1.194 -3.66656,-1.90625 -5.85156,-1.90625zM21.29297,3.29297l-10.29297,10.29297l-3.29297,-3.29297l-1.41406,1.41406l4.70703,4.70703l11.70703,-11.70703z"></path>
        </g>
      </svg>
    </div>
  );
};

const LessonCardNew = ({ lessonId, index,currentLesson }) => {
  const progress = Math.floor(Math.random() * 100);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleClick = () => {
    // Dispatch thunk with index
    console.log('LESSON CARD : Thunk dispatched')
    dispatch(setLesson({ index: index }));
    // Navigate to practice/field
    router.push('/field');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: easeOut }}
      className="  rounded-xl   h-fit sm:w-auto cursor-pointer 
                   
      "
      onClick={handleClick}
    >
      <div className="flex flex-col justify-between w-full sm:w-48 h-52 sm:h-60
                       bg-[#fff] rounded-2xl px-2 sm:px-2 py-2
                        border-5 border-gray-300/60  
                        shadow-[0_0_20px_rgba(0,0,0,0.1)]


      ">
        <div className="flex items-center justify-center  p-4 rounded-t-lg">
          {/* Animated circular progress */}
          {progress < 90 ? (
            <CircularProgressBar progress={progress} color="#5af47b" />
          ) : (
            <Tick />
          )}
        </div>
        <div className="p-2  rounded-b-lg h-full flex flex-col justify-end">
          <h3 className="text-base sm:text-md font-[600] text-gray-800">
            Lesson {lessonId}
          </h3>
          <div className='flex items-center justify-between text-sm font-[300]'>
              <p>{currentLesson.category}</p>
              <p>{currentLesson.difficulty}</p>
          </div>
        </div>
      <button className='text-sm text-white 
                         mx-1 py-1 px-3 rounded-xl
                        border-2 border-indigo-700 bg-indigo-700
                        cursor-pointer hover:bg-white hover:text-indigo-700
                        transition-all duration-300
      '>
        Start now
      </button>
      </div>
    </motion.div>
  );
};

export default LessonCardNew;
