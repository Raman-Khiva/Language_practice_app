'use client';
import LessonCard from '@/components/LessonCard/lessonCard'
import { ProductContext, } from '@/app/context/ProductContext';
import { notFound } from 'next/navigation';
import {  useContext } from 'react';

const page = ({params}) => {
    const category = params.category;

    const {categories} = useContext(ProductContext)
    console.log("Current category:", category);
    console.log("Available categories:", Object.keys(categories));
    if (!categories || Object.keys(categories).length === 0) {
      return <div>Loading...</div>; // Or skeleton UI
    }
    console.log("Categories available now :", categories);
    
    
    if((!category.charAt(0).isUpper() && !category.charAt(0).isLower()) ||
       (!Object.keys(categories).includes(category) && !Object.keys(categories).includes(category.toLowerCase()))){
      return notFound();
    }

    const totalLesson = Math.ceil(categories[category]/10);



  return (
    <div className='w-screen flex flex-col px-40 py-20 min-h-screen
                    bg-gradient-to-r from-[#f1e9ff]  via-[#fff5d8cf] to-[#ffe3ec]
    '>
      <h1 className='text-4xl font-[600] text-[#5e5e5e]'>{category.charAt(0).toUpperCase() + category.slice(1)} </h1>
      <div className='flex flex-wrap gap-6 my-20'>

        

        {Array.from({length : totalLesson}).map((_ , i)=>(
          <LessonCard category={category} lessonId={i+1} key={i} />
        ))}
        

       
        
      </div>
      


    </div>
  )
}

export default page
