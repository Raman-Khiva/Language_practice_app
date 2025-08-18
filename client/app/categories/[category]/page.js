'use client';
import LessonCard from '@/components/LessonCard/lessonCard'
import { ProductContext, } from '@/app/context/ProductContext';
import { notFound } from 'next/navigation';
import {  useContext } from 'react';

const page = ({params}) => {
    const category = params.category;
    const {categories} = useContext(ProductContext)
    
    if (!categories || Object.keys(categories).length === 0) {
      return <div>Loading...</div>; // Or skeleton UI
    }
    const categoryArray  = Object.keys(categories); //change object to array
    
    //check if first letter is alphabet (because all categories start with alphabet)
    const isFirstLetter = /^[a-zA-Z]$/.test(category.charAt(0)); 

    //check if category exists in categories (required to check if category is valid either uppercase or lowercase)
    const exists = categoryArray.some(
      (key) => key.toLowerCase() === category.toLowerCase()
    );
    
    // if first letter is not alphabet or category does not exist, return 404 (because user asked for invalid category)
    if(!isFirstLetter || !exists){
      return notFound();
    }

    const totalLesson = Math.ceil(categories[category]/10);


  return (
    <div className='w-screen flex flex-col px-40 py-20 min-h-screen
                    bg-gradient-to-r from-[#f1e9ff]  via-[#fff5d8cf] to-[#ffe3ec]
    '>
      <h1 className='text-4xl font-[600] text-[#5e5e5e]'>{category} </h1>
      <div className='flex flex-wrap gap-6 my-20'>

        

        {Array.from({length : totalLesson}).map((_ , i)=>(
          <LessonCard category={category} lessonId={i+1} key={i} />
        ))}
        

       
        
      </div>
    </div>
  )
}

export default page
