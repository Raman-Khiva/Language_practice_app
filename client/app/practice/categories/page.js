'use client'
import SideBar from '@/components/SideBar'
import React, { useEffect } from 'react'
import { getCategories,selectCategories } from '@/app/store/slices/categoriesSlices'
import { useDispatch, useSelector } from 'react-redux'

// const initialState = {
//   categoriesList: [], // Array format: [{ name: "categoryName", count: number }]
//   loading: false,
//   dataFetced : false,
//   error: null,
// };



const page = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);

  useEffect(()=>{
    if(!categories.dataFetched){
      dispatch(getCategories());
    }
  },[dispatch]);


  if(!categories.dataFetched && categories.loading){
      return (
        <div className='h-full w-full grid place-items-center'>
          loading
        </div>
      )
  }
  if(!categories.dataFetched && !categories.loading){
    return (
      <div className='h-full w-full grid place-items-center'>
          fetch not working
        </div>
    )
  }
  if(categories.dataFetched && categories.err){
    return (
      <div className='h-full w-full grid place-items-center'>
          Error while fetcheing : {categories.err}
        </div>
    )
  }

  console.log("PRACTICE-CATEGORIES -- categories List : ",categories.categoriesList);


  return (
    <div className='w-full h-screen relative flex' >
  
       <h1>
          categories
       </h1>
       <div>
        {categories.categoriesList.map((item,i)=>(
          <p key={i}>{item.name} : {item.count}</p>
        ))}
      </div>
    </div>
  )
}

export default page
