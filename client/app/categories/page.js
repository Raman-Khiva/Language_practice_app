'use client';
import CategoryCard from "@/components/CategoryCard/categoryCard";

import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

const page = () => {

  const {categories} = useContext(ProductContext);

  
  
  return (
    <div className="flex flex-col gap-2 w-screen min-h-screen px-40 py-20 overflow-x-hidden
                    bg-fixed bg-gradient-to-r from-[#f4ccd8b5] via-[#fff1c288] to-[#eaddffa7] 
    
    "> 
      {Object.keys(categories).map((category,i)=>(
        <CategoryCard  category={category}  key={i}/>
      ))}
      
      
    </div>
  )
}


export default page;
