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
  lessonId,
  index,
  
}){

    const dispatch = useDispatch();
    const router = useRouter();
    

    const handleClick = () => { 
      console.log('LESSON CARD : Thunk dispatched')
      dispatch(setLesson({ index: index }));
      router.push('/field');
    };
    



  return (
    <div className={` bg-white rounded-3xl shadow-xl p-4 w-full max-w-[16rem] `}>
      {/* Header Section */}
      <div className=" p-3">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-md font-bold leading-tight text-gray-900">Lesson {index+1}</h2>
          <div clllassName="flex gap-1 text-sm text-yellow-500">
            {/* <Zap className="w-5 h-5 fill-yellow-500" /> */}
            <span className="font-bold text-gray-900">{xp} XP</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-gray-700" />
            <span className=" text-gray-900">{difficulty}</span>
          </div>
          <span className="text-gray-600">{lessonId}</span>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-md pb-4 pt-2 font-bold text-gray-900 mb-4">{title}</h3>
       
      <CheckpointStrip/>


      

      {/* Completion Section */}
      <div className="bg-white rounded-2xl  py-6 px-3 flex items-center justify-between">
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

      <Button 
        onClick={handleClick}
        label="Start Lesson"
        className="w-full"
        text="Start Lesson"
      />
    </div>
  );
}