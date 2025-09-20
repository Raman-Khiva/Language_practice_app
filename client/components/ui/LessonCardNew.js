'use client'
import React from 'react'
import CircularProgressBar from '../ProgessBar/circularProgressBar';
import { easeOut, motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { setLesson } from '@/app/store/slices/currentLessonSlice'; // adjust path

import DottedBackground from './DotedBackground';

const Tick = () => {
  return (
    <div className="inline-flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="75"
        height="75"
        viewBox="0 0 256 256"
        className="fill-green-600/80"
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
      {/* blue gradient top
      bg-gradient-to-bl from-blue-200/50 via-gray-100/80 via-22%  to-gray-100/80 */}
      <div className="flex flex-col justify-between 
                      w-full sm:w-48 h-52 sm:h-60
                      rounded-2xl px-2 sm:px-2 
                      border-5 border-[#fff] 
                      shadow-[0_0_20px_rgba(0,0,0,0.13)]
                      bg-gray-100/60 backdrop-blur-3xl
                      relative overflow-hidden
      ">
        <div
          className=' w-12 h-16 -rotate-45
                      absolute right-5 top-3 z-0
                      rounded-full
                      bg-radial from-violet-500 via-violet-200 to-violet-100
                      blur-2xl

        '/>
        <DottedBackground 
          className='h-40 w-32 z-0 left-0
        '/>

        <div className='flex justify-between pt-1 px-1 z-20'>
          <h3 className='text-xl font-bold z-30  
                        bg-clip-text text-transparent 
                        bg-gradient-to-b from-violet-700 via-violet-400 to-violet-50
              '>{index+1}
          </h3>
        </div>
        <div className="flex items-center justify-center 
                        z-20 p-1 rounded-t-lg">
          {/* Animated circular progress */}
          {progress < 90 ? (
            <CircularProgressBar progress={progress} color="#5af47b" />
          ) : (
            <Tick />
          )}
        </div>
        <div className="p-2  rounded-b-lg h-full flex flex-col justify-end">
          <h3 className="text-base sm:text-md font-[600] text-gray-800
                         z-30
          ">
            Lesson {lessonId}
          </h3>
          <div className='flex items-center justify-between 
                          text-sm font-[300]
                          z-30
          '>
              <p>{currentLesson.category}</p>
              <p>{currentLesson.difficulty}</p>
          </div>
        </div>
        <div className='pb-2 flex items-center justify-center w-full'>
          <button className='text-sm text-white 
                            w-full
                            mx-1 py-1 px-3 rounded-4xl
                            border-2 border-violet-700/90 bg-violet-700/90 
                            cursor-pointer hover:bg-white hover:text-violet-700
                            transition-all duration-300
                            z-20
          '>
            Start now
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default LessonCardNew;
