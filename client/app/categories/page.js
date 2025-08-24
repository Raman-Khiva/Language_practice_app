'use client';
import CategoryCard from "@/components/CategoryCard/categoryCard";
import { useContext, useRef, useEffect } from "react";
import { ProductContext } from "../context/index.js";

let pageRenderCount = 0;

const page = () => {
  // Increment render counter
  pageRenderCount++;
  console.log(`🏠 CATEGORIES PAGE RENDER #${pageRenderCount}`);

  const contextValue = useContext(ProductContext);
  const { categories } = contextValue;

  // Track what's causing page re-renders
  const prevCategories = useRef();
  
  useEffect(() => {
    if (prevCategories.current !== undefined) {
      const prevCount = Object.keys(prevCategories.current || {}).length;
      const currentCount = Object.keys(categories || {}).length;
      
      if (prevCount !== currentCount) {
        console.log(`🏠 PAGE re-render caused by categories change: ${prevCount} → ${currentCount} categories`);
        console.log(`🏠 Categories:`, Object.keys(categories));
      }
    }
    
    prevCategories.current = categories;
  });

  console.log(`🏠 PAGE rendering with ${Object.keys(categories || {}).length} categories:`, Object.keys(categories || {}));
  
  return (
    <div className="flex items-center flex-col gap-4 w-full min-h-screen px-4 sm:px-6 lg:px-12 xl:px-24 2xl:px-40 pt-24 pb-10 overflow-x-hidden bg-fixed bg-gradient-to-r from-[#f4ccd8b5] via-[#fff1c288] to-[#eaddffa7]"> 
      <h3 className="ml-44 py-6 px-10 w-full text-4xl font-[600] text-[#494848] ">Categories<span className="text-[#8b8b8b]">{'>'}</span></h3>
      
      <div className="grid grid-cols-1 px-32 gap-4 w-full">
        {Object.keys(categories).map((category, i) => {
          console.log(`🏠 PAGE rendering CategoryCard for: ${category}`);
          return (
            <CategoryCard category={category} key={i} />
          );
        })}
      </div>
    </div>
  );
};

export default page;