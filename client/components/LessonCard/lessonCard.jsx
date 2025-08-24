"use client"

import Link from 'next/link'
import { easeOut, motion, useAnimation } from 'framer-motion';
import React, { useContext, useMemo, useEffect } from 'react'
import CircularProgressBar from '../ProgessBar/circularProgressBar';
import { ProductContext } from '@/app/context/ProductContext';

// --------------------
// Skeleton
// --------------------
export const LessonCardSkeleton = () => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: easeOut }}
      className='bg-[#d6dfe674] border-1 border-[#afafaf] rounded-2xl p-[6px] sm:p-[10px] w-full sm:w-auto'
    >
      <div className='flex flex-col justify-between w-full sm:w-48 h-52 sm:h-56 bg-[#ffffff] rounded-[12px] px-3 sm:px-4 py-4 border-3 border-[#d9d9d995]'>
        <div className='flex items-center justify-center py-1'>
          <div className="h-16 w-16 sm:h-20 sm:w-20 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
        <div className='h-5 w-20 bg-gray-200 animate-pulse rounded'></div>
      </div>
    </motion.div>
  );
}

// --------------------
// LessonCard
// --------------------
const LessonCard = ({lessonId, category}) => {
  const { isAuthenticated, authLoading, completedQuestionIds, allData } = useContext(ProductContext);

  // Build target href
  const targetHref = useMemo(() => {
    const lessonPath = `/categories/${category}/${lessonId}`;
    if (!authLoading && !isAuthenticated) {
      return `/login?next=${encodeURIComponent(lessonPath)}`;
    }
    return lessonPath;
  }, [authLoading, isAuthenticated, category, lessonId]);

  // Compute progress percent
  const progressPercent = useMemo(() => {
    const QUESTIONS_PER_LESSON = 10;
    if (!isAuthenticated) return 0;
    const categoryQuestions = Array.isArray(allData?.[category]) ? allData[category] : [];
    if (categoryQuestions.length === 0) return 0;
    const startIndex = (lessonId - 1) * QUESTIONS_PER_LESSON;
    const endIndex = startIndex + QUESTIONS_PER_LESSON;
    const slice = categoryQuestions.slice(startIndex, endIndex);
    const total = slice.length || 0;
    if (total === 0) return 0;
    const completed = slice.filter(q => completedQuestionIds.includes(q._id)).length;
    return Math.round((completed / total) * 100);
  }, [isAuthenticated, allData, category, lessonId, completedQuestionIds]);

  // Animation for CircularProgressBar


  return (
    <motion.div
      initial={{opacity:0, scale:0.8}}
      animate={{opacity:1, scale:1}}
      transition={{duration:0.6,ease:easeOut}}
      className='bg-[#d6dfe674] border-[1px] border-[#707070] rounded-2xl p-1 sm:p-[7px] w-full sm:w-auto'
    >
      <Link href={targetHref} className='h-full w-full'>
        <div className='flex flex-col justify-between w-full sm:w-48 h-52 sm:h-56 bg-[#fffffff0] rounded-[12px] px-3 sm:px-4 py-4 border-3 border-[#d9d9d995]'>
          
          <div className='flex items-center justify-center py-1'>
            {/* Animated circular progress */}
            <CircularProgressBar progress={progressPercent} />
          </div>
          
          <h3 className='text-base sm:text-lg font-[600] text-gray-400'>Lesson {lessonId}</h3>
        </div>
      </Link>
    </motion.div>
  )
}

export default LessonCard;
