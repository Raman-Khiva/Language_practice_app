'use client';
import CategoryCard from "@/components/CategoryCard/categoryCard";

import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

const page = () => {

  const {categories} = useContext(ProductContext);

  

  
  
  return (
    <div className="flex  items-center flex-col gap-4 w-full min-h-screen px-4 sm:px-6 lg:px-12 xl:px-24 2xl:px-40 pt-24 pb-10 overflow-x-hidden bg-fixed bg-gradient-to-r from-[#f4ccd8b5] via-[#fff1c288] to-[#eaddffa7]"> 
      

          <h3 className="ml-44 py-6 px-10  w-full text-4xl font-[600] text-[#494848] ">Categories<span className="text-[#8b8b8b]">{'>'}</span> </h3>
      
      
      <div className="grid grid-cols-1 px-32 gap-4 w-full">
        {Object.keys(categories).map((category,i)=>(
          <CategoryCard  category={category}  key={i}/>
        ))}
        {Object.keys(categories).map((category,i)=>(
          <CategoryCard  category={category}  key={i}/>
        ))}
        {Object.keys(categories).map((category,i)=>(
          <CategoryCard  category={category}  key={i}/>
        ))}
        {Object.keys(categories).map((category,i)=>(
          <CategoryCard  category={category}  key={i}/>
        ))}
        {Object.keys(categories).map((category,i)=>(
          <CategoryCard  category={category}  key={i}/>
        ))}
        {Object.keys(categories).map((category,i)=>(
          <CategoryCard  category={category}  key={i}/>
        ))}
        {Object.keys(categories).map((category,i)=>(
          <CategoryCard  category={category}  key={i}/>
        ))}
        {Object.keys(categories).map((category,i)=>(
          <CategoryCard  category={category}  key={i}/>
        ))}
        {Object.keys(categories).map((category,i)=>(
          <CategoryCard  category={category}  key={i}/>
        ))}
        {Object.keys(categories).map((category,i)=>(
          <CategoryCard  category={category}  key={i}/>
        ))}
        {Object.keys(categories).map((category,i)=>(
          <CategoryCard  category={category}  key={i}/>
        ))}
        {Object.keys(categories).map((category,i)=>(
          <CategoryCard  category={category}  key={i}/>
        ))}
        {Object.keys(categories).map((category,i)=>(
          <CategoryCard  category={category}  key={i}/>
        ))}
        {Object.keys(categories).map((category,i)=>(
          <CategoryCard  category={category}  key={i}/>
        ))}
        {Object.keys(categories).map((category,i)=>(
          <CategoryCard  category={category}  key={i}/>
        ))}
        {Object.keys(categories).map((category,i)=>(
          <CategoryCard  category={category}  key={i}/>
        ))}
        {Object.keys(categories).map((category,i)=>(
          <CategoryCard  category={category}  key={i}/>
        ))}
        {Object.keys(categories).map((category,i)=>(
          <CategoryCard  category={category}  key={i}/>
        ))}
        {Object.keys(categories).map((category,i)=>(
          <CategoryCard  category={category}  key={i}/>
        ))}
        {Object.keys(categories).map((category,i)=>(
          <CategoryCard  category={category}  key={i}/>
        ))}
        {Object.keys(categories).map((category,i)=>(
          <CategoryCard  category={category}  key={i}/>
        ))}
        {Object.keys(categories).map((category,i)=>(
          <CategoryCard  category={category}  key={i}/>
        ))}
        {Object.keys(categories).map((category,i)=>(
          <CategoryCard  category={category}  key={i}/>
        ))}
        {Object.keys(categories).map((category,i)=>(
          <CategoryCard  category={category}  key={i}/>
        ))}
      </div>
    </div>
  )
}


export default page;
