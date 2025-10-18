'use client'

import React from 'react';
import { Zap, TrendingUp, Award } from 'lucide-react';
import CheckpointStrip from '../progress/CheckpointStrip';
import Button from '../common/Button';
import { setLesson } from '@/app/store/slices/currentLessonSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { selectLessonsStats } from '@/app/store/slices/userProgressSlice';

export default function LessonCard({
  xp = 150,
  difficulty = 'Intermediate',
  title = 'Podcast Discussions',
  index,
  lessonId,
  currentLesson,
}){
    
    
    const dispatch = useDispatch();
    const router = useRouter();
    const lessonsStats = useSelector(selectLessonsStats);
    

    const handleClick = () => { 
      console.log('LESSON CARD : Thunk dispatched')
      dispatch(setLesson({ index: index }));
      router.push('/field');
    };

    const currentLessonStats = lessonsStats?.find(stat => stat.lessonId === currentLesson._id) || {};
    const attempts = currentLessonStats.totalSuccAttempts || 0;
    const bestScore = currentLessonStats.bestScore || 0;

    

  return (
    <div className={` bg-white rounded-2xl shadow-[0_0_10px_0_rgba(0,0,0,0.1)] p-3 w-full max-w-[14rem]
                      flex flex-col justify-between gap-1.5
    `}>
      {/* Header Section */}
      <div className=""> 
        <div className="flex items-center justify-between mb-1 ">
          <h2 className="text-lg font-bold leading-tight text-gray-700">Lesson {index+1}</h2>
          <span className="text-sm leading-tight font-bold text-gray-900">{currentLesson.difficulty}</span>
        </div>
        
        <div className="flex items-center justify-betjween text-sm ">
          <div className="flex items-center gap-1">
            <TrendingUp className=" h-4 w-4 text-gray-500" />
            <span className=" text-gray-500">{currentLesson.category}</span>
          </div>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-lg pb-1 pt-2 font-bold text-gray-700 ">{title}</h3>

      {/* Completion Section */}
      <div className="bg-white rounded-2xl  py-2 px-3 flex items-center justify-between">
        <div>
          <div className="text-lg font-bold text-gray-700 ">{bestScore}%</div>
          <div className="text-sm text-gray-500">Complete</div>
        </div>
        
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-3 border-gray-900 flex items-center justify-center">
            <Award className="w-6 h-6 text-yellow-500 fill-yellow-500" />
          </div>
        </div>
      </div>
      <div className="pt-4 pb-6">
        <CheckpointStrip percentage={attempts} />
      </div>

      <Button 
        onClick={handleClick}
        label="Start Lesson"
        className="w-full"
        text="Start Lesson"
      />
    </div>
  );
}