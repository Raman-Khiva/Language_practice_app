'use client';
import LessonCard from '@/components/LessonCard/lessonCard'
import { ProductContext, } from '@/app/context/index.js';
import { notFound } from 'next/navigation';
import {  use, useContext, useEffect } from 'react';

const page = ({params}) => {
    

    const {category} = use(params);


    
    
    const {categories, setCurrentCategory, currentCategory} = useContext(ProductContext)
    
    if (!categories || Object.keys(categories).length === 0) {
      return <div className='h-full w-screen flex items-center justify-center'>Loading...</div>; // Or skeleton UI
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

    console.log(`lesson page rendered! with category [${category}]  & currentCategory [${currentCategory}]`);
    let render = 0;

    // Ensure context knows current category so questions are fetched for lesson progress
    useEffect(() => {
      render +=1;
      console.log(`useEffect has been called ${render} times`);
      console.log('category : ' ,category);
      console.log('current category :', currentCategory);
      if (currentCategory !== category) {
        setCurrentCategory(category)
      }
    }, [category]);

    const totalLesson = Math.ceil(categories[category]/10);


  return (
    <div className='w-full flex flex-col px-4 sm:px-6 lg:px-12 xl:px-24 2xl:px-40 pt-24 pb-10   min-h-screen bg-gradient-to-r from-[#f1e9ff]  via-[#fff5d8cf] to-[#ffe3ec]'>
      <h1 className='text-2xl ml-20 py-10 sm:text-3xl md:text-4xl font-[600] text-[#5e5e5e]'>{category} </h1>
      <div className='flex flex-wrap justify-center gap-4 sm:gap-6 mt-4 '>

        

        {Array.from({length : totalLesson}).map((_ , i)=>(
          <LessonCard category={category} lessonId={i+1} key={i} />
        ))}
        

       
        
      </div>
    </div>
  )
}

export default page
