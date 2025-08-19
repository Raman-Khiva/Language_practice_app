"use client"

// Lesson card
// - Links to a specific lesson within a category
// - Shows circular progress for that lesson (computed from completed question IDs)
// - Redirects unauthenticated users to login with return path
import Link from 'next/link'
import React, { useContext, useMemo } from 'react'
import CircularProgressBar from '../ProgessBar/circularProgressBar';
import { ProductContext } from '@/app/context/ProductContext';

const lessonCard = ({lessonId,category}) => {
  const { isAuthenticated, authLoading, completedQuestionIds, allData } = useContext(ProductContext);

  // Build target href: if not authenticated, send to login with next back to this lesson
  const targetHref = useMemo(() => {
    const lessonPath = `/categories/${category}/${lessonId}`;
    if (!authLoading && !isAuthenticated) {
      return `/login?next=${encodeURIComponent(lessonPath)}`;
    }
    return lessonPath;
  }, [authLoading, isAuthenticated, category, lessonId]);

  // Compute lesson-level progress percent for authenticated users
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
  return (
    <Link 
      href={targetHref}
      className=' bg-[#d6dfe674] border-3 rounded-2xl shadow-lg border-none p-2 sm:p-[10px] w-full sm:w-auto'
    >

      <div className=' flex flex-col justify-between w-full sm:w-48 h-52 sm:h-56 bg-[#fafcffc4] rounded-[12px] px-3 sm:px-4 py-4 border-3 border-[#d9d9d995]'>
        <div className='flex items-center justify-center py-1'>
          <CircularProgressBar progress={progressPercent} />
        </div>
        
        <h3 className='text-base sm:text-lg font-[600] text-gray-400'>Lesson {lessonId}</h3>
      </div>

    </Link>
  )
}

export default lessonCard
