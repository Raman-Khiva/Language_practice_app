'use client';
import CategoryCard from "@/components/CategoryCard/categoryCard";

import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

const page = () => {

  const {categories} = useContext(ProductContext);

  
  
  return (
    <div className="flex  justify-center items-center flex-col gap-4 w-full min-h-screen px-4 sm:px-6 lg:px-12 xl:px-24 2xl:px-40 py-10 overflow-x-hidden bg-fixed bg-gradient-to-r from-[#f4ccd8b5] via-[#fff1c288] to-[#eaddffa7]"> 
      <div className="grid grid-cols-1 gap-4">
        {Object.keys(categories).map((category,i)=>(
          <CategoryCard  category={category}  key={i}/>
        ))}
      </div>
    </div>
  )
}


export default page;
