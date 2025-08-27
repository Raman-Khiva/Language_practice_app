'use client';
import CategoryCard from "@/components/CategoryCard/categoryCard";

import {getCategories, selectCategoriesDataFetched, selectCategoriesError, selectCategoriesList} from '@/app/store/slices/categoriesSlices';
import {selectQuestionsCompleted,selectProgressIsFetched, getUserProgress} from '@/app/store/slices/userProgressSlice';
import {selectIsAuthenticated} from '@/app/store/slices/authSlice';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";




const page = () => {
    
    const dispatch = useDispatch();
    const error = useSelector(selectCategoriesError);
    const dataFetced = useSelector(selectCategoriesDataFetched);
    const categoriesList = useSelector(selectCategoriesList);
    const isProgressFetched = useSelector(selectProgressIsFetched);
    const questionsCompleted = useSelector(selectQuestionsCompleted);
    const isAuthenticated = useSelector(selectIsAuthenticated);


    useEffect(()=>{
        dispatch(getCategories());
        if(isAuthenticated){
            dispatch(getUserProgress());
        }
        
    },[dispatch])
  
  

  console.log(`CATEGORIES PAGE : this is dataFetched Status : `,dataFetced);
  
  if(!dataFetced){
    return <div className="h-screen w-screen flex items-center justify-center">Fetching categories data</div>
  }

  
  return (
    <div className="flex items-center flex-col gap-4 w-full min-h-screen px-4 sm:px-6 lg:px-12 xl:px-24 2xl:px-40 pt-24 pb-10 overflow-x-hidden bg-fixed bg-gradient-to-r from-[#f4ccd8b5] via-[#fff1c288] to-[#eaddffa7]"> 
      <h3 className="ml-44 py-6 px-10 w-full text-4xl font-[600] text-[#494848] ">Categories<span className="text-[#8b8b8b]">{'>'}</span></h3>
      
      <div className="grid grid-cols-1 px-32 gap-4 w-full">
         {categoriesList.map((item)=>(
            <CategoryCard category={item.name}  totalQuestions={item.count} isAuthenticated={isAuthenticated} />
         ))}
      </div>
    </div>
  );
};

export default page;