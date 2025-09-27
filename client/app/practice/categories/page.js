'use client'
import SideBar from '@/components/layout/SideBar'
import React, { useEffect } from 'react'
import { getCategories,selectCategories } from '@/app/store/slices/categoriesSlices'
import { useDispatch, useSelector } from 'react-redux'
import CategoryCard from '@/components/cards/CategoryCard'





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
    <div className='w-full h-full relative
                    grid grid-cols-10 grid-rows-1 gap-1
    '>
       
       <div className=' col-span-8 row-span-1
                        rounded-2xl 
                        bg-violet-50/40 border-2 border-[#c3c3c3d2]
                        overflow-hidden
                        pb-20
                        
       '>
          <h1 className=' py-4 px-10
                          text-xl font-[500]
          '>
              Choose category and start pracicing
          </h1>

          <div className='h-full overflow-hidden '>
            <div className=' flex justify-center  flex-wrap
                            py-8 gap-5 h-full
                            overflow-auto
            '>
              
                {categories.categoriesList.map((item,i)=>(
                  <CategoryCard
                    key={i}
                    i={i}
                    name={item.name}
                    count={item.count}
                  />
                ))}
              
            </div>
          </div>

       </div>

       <div className='col-span-2 row-span-1
                       rounded-2xl
                       grid place-items-center
                       bg-white/20 border-2 border-[#c3c3c3d2]
       '>
         section
       </div>

    </div>
  )
}

export default page
