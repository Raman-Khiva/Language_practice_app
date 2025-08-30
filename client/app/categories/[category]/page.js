'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LessonCard from '@/components/LessonCard/lessonCard';
import { notFound } from 'next/navigation';

import { selectIsAuthenticated } from '../../store/slices/authSlice';
import { 
  selectCategoriesDataFetched, 
  getCategories, 
  selectCategoriesList 
} from '../../store/slices/categoriesSlices';
import { 
  selectIsDataFetched, 
  getQuestionsByCategory 
} from '../../store/slices/questionsSlice';

const Page = ({ params }) => {
  const { category } = params;
  const dispatch = useDispatch();

  // selectors
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isCategoriesDataFetched = useSelector(selectCategoriesDataFetched);
  const categoriesList = useSelector(selectCategoriesList);
  const isQuestionsDataFetched = useSelector(selectIsDataFetched);

  // fetch categories if not already fetched
  

  // find current category object
  const categoryObject = categoriesList.find(obj => obj.name === category);

  if (!categoryObject) {
    return (
      <div className="w-screen h-screen grid place-items-center">
        Opp! Category doesn't exist!
      </div>
    );
  }


  const totalLessons = Math.ceil(categoryObject.count / 10);


  return (
    <div className='w-full flex flex-col px-4 sm:px-6 lg:px-12 xl:px-24 2xl:px-40 pt-24 pb-10   min-h-screen bg-gradient-to-r from-[#f1e9ff]  via-[#fff5d8cf] to-[#ffe3ec]'>
      <h1 className='text-2xl ml-20 py-10 sm:text-3xl md:text-4xl font-[600] text-[#5e5e5e]'>{category} </h1>
      <div className='flex flex-wrap justify-center gap-4 sm:gap-6 mt-4 '>

        

        {Array.from({length : totalLessons}).map((_ , i)=>(
          <LessonCard category={category} lessonId={i+1} key={i} />
        ))}
        

       
        
      </div>
    </div>
  )
}

export default page
