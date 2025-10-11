'use client'

import React from 'react';
import { Zap, TrendingUp, Award } from 'lucide-react';
import CheckpointStrip from '../progress/CheckpointStrip';
import Button from '../common/Button';
import { setLesson } from '@/app/store/slices/currentLessonSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

export default function LessonCard({
  xp = 150,
  difficulty = 'Intermediate',
  title = 'Podcast Discussions',
  completionPercentage = 100,
  index,
  lessonId,
  currentLesson,
}){

    const dispatch = useDispatch();
    const router = useRouter();
    

    const handleClick = () => { 
      console.log('LESSON CARD : Thunk dispatched')
      dispatch(setLesson({ index: index }));
      router.push('/field');
    };
    



  return (
    <div className={` bg-white rounded-3xl shadow-xl p-3 w-full max-w-[14rem]
                      flex flex-col justify-between gap-1.5
    `}>
      {/* Header Section */}
      <div className=""> 
        <div className="flex items-center justify-between mb-1 ">
          <h2 className="text-lg font-bold leading-tight text-gray-900">Lesson {index+1}</h2>
          <span className="text-sm leading-tight font-bold text-gray-900">{currentLesson.difficulty}</span>
        </div>
        
        <div className="flex items-center justify-betjween text-sm ">
          <div className="flex items-center gap-1">
            <TrendingUp className=" h-4 w-4 text-gray-700" />
            <span className=" text-gray-900">{currentLesson.category}</span>
          </div>
          <span className="text-gray-600">{lessonId}</span>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-lg pb-1 pt-2 font-bold text-gray-900 ">{title}</h3>

      {/* Completion Section */}
      <div className="bg-white rounded-2xl  py-2 px-3 flex items-center justify-between">
        <div>
          <div className="text-lg font-bold text-gray-900 ">{completionPercentage}%</div>
          <div className="text-sm text-gray-600">Complete</div>
        </div>
        
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-3 border-gray-900 flex items-center justify-center">
            <Award className="w-6 h-6 text-yellow-500 fill-yellow-500" />
          </div>
        </div>
      </div>
      <div className="pt-4 pb-6">
        <CheckpointStrip />
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