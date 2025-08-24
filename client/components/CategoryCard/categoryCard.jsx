"use client"

import { easeOut, motion } from "framer-motion";
import Link from "next/link";
import ProgressBar from "../ProgessBar/progressBar";
import { useContext, useEffect, useState, useRef } from "react";
import { ProductContext } from "@/app/context/ProductContext";

// --------------------
// Skeleton component
// --------------------
const CategoryCardSkeleton = () => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.7, ease: easeOut }}
      className="w-full bg-[#eceff686] p-2 border-1 border-[#a1a1a1] rounded-2xl"
    >
      <div className="w-full bg-[#fffffff2] py-4 px-4 sm:pl-6 sm:pr-10 rounded-xl grid grid-cols-1 sm:grid-cols-[1.5fr_1fr_1fr_0.7fr] gap-3 sm:gap-2 items-center">
        <div className="h-6 w-full bg-gray-200 animate-pulse rounded"></div>
        <div className="h-5 w-full bg-gray-200 animate-pulse rounded"></div>
        <div className="h-5 w-full bg-gray-200 animate-pulse rounded"></div>
        <div className="h-8 w-full bg-gray-200 animate-pulse rounded"></div>
      </div>
    </motion.div>
  );
};

// Global render counter for all CategoryCard instances
let globalCardRenderCount = 0;

// --------------------
// Real card component
// --------------------
const CategoryCard = ({ category }) => {
  // Individual render counter for this specific category
  const renderCountRef = useRef(0);
  renderCountRef.current++;
  globalCardRenderCount++;
  
  console.log(`🎯 CATEGORYCARD  RENDER #${renderCountRef.current} (Global: #${globalCardRenderCount})`);

  const contextValue = useContext(ProductContext);
  const { isAuthenticated, authLoading, completedQuestionIds, allData, authFetch, categories } = contextValue;
  
  const [counts, setCounts] = useState({ completed: 0, total: 0 });
  const [loading, setLoading] = useState(true);

  // Track what's causing this component to re-render
  // const prevContext = useRef();
  
  // useEffect(() => {
  //   if (prevContext.current) {
  //     const changes = {};
      
  //     if (prevContext.current.isAuthenticated !== isAuthenticated) {
  //       changes.isAuthenticated = `${prevContext.current.isAuthenticated} → ${isAuthenticated}`;
  //     }
  //     if (prevContext.current.authLoading !== authLoading) {
  //       changes.authLoading = `${prevContext.current.authLoading} → ${authLoading}`;
  //     }
  //     if (prevContext.current.completedQuestionIds !== completedQuestionIds) {
  //       changes.completedQuestionIds = `${prevContext.current.completedQuestionIds?.length || 0} → ${completedQuestionIds?.length || 0} items`;
  //     }
  //     if (prevContext.current.allData !== allData) {
  //       const prevKeys = Object.keys(prevContext.current.allData || {});
  //       const currentKeys = Object.keys(allData || {});
  //       changes.allData = `[${prevKeys.join(',')}] → [${currentKeys.join(',')}]`;
  //     }
  //     if (prevContext.current.categories !== categories) {
  //       const prevCount = Object.keys(prevContext.current.categories || {}).length;
  //       const currentCount = Object.keys(categories || {}).length;
  //       changes.categories = `${prevCount} → ${currentCount} categories`;
  //     }
      
  //     if (Object.keys(changes).length > 0) {
  //       console.log(`🎯 CATEGORYCARD  re-render caused by:`, changes);
  //     }
  //   }
    
  //   prevContext.current = {
  //     isAuthenticated,
  //     authLoading,
  //     completedQuestionIds,
  //     allData,
  //     categories
  //   };
  // });

  useEffect(() => {
    console.log(`🔄 CATEGORYCARD  useEffect triggered`);
    let cancelled = false;
    
    const compute = async () => {
      console.log(`🔄 CATEGORYCARD  computing counts...`);
      setLoading(true);

      if (Array.isArray(allData?.[category])) {
        console.log(`📊 CATEGORYCARD all data present!`);
        const total = allData[category].length;
        console.log(`📊 CATEGORYCARD now setting completed questions!`);
        const completed = total > 0 ? allData[category].filter(q => completedQuestionIds.includes(q._id)).length : 0;
        if (!cancelled) {
          setCounts({ completed, total });
        }
        console.log(`📊 CATEGORYCARD final count is {completed : ${counts.completed}, total:${counts.total}}!`);
        
        return;
      }
      
      console.log(`📊 CATEGORYCARD  allData isn't present , trying to fetch!`);


      if (!authLoading && isAuthenticated) {
        console.log(`🔄 CATEGORYCARD  fetching progress from API...`);
        try {
          const res = await authFetch(`/progress/count-by-category/${encodeURIComponent(category)}`);
          if (res.ok) {
            const data = await res.json();
            console.log(`✅ CATEGORYCARD API progress:`, data?.data);
            if (!cancelled) {
              setCounts({
                completed: data?.data?.completedCount || 0,
                total: data?.data?.totalCount || 0,
              });
              setLoading(false);
            }
          } else {
            console.log(`❌ CATEGORYCARD  API error:`, res.status);
            if (!cancelled) setLoading(false);
          }
        } catch (error) {
          console.log(`❌ CATEGORYCARD  fetch error:`, error);
          if (!cancelled) setLoading(false);
        }
      } else {
        console.log(`📊 CATEGORYCARD  using categories fallback`);
        const totalFromCategories = Number.isFinite(categories?.[category]) ? categories[category] : 0;
        if (!cancelled) {
          setCounts({ completed: 0, total: totalFromCategories });
          setLoading(false);
        }
      }
    };
    
    compute();
    return () => {
      cancelled = true;
    };
  }, [allData, completedQuestionIds, category, authLoading, isAuthenticated, categories]);

  // console.log(`🎯 CATEGORYCARD  state:`, {
  //   loading,
  //   counts,
  //   isAuthenticated,
  //   authLoading,
  //   hasCachedData: Boolean(allData?.[category]),
  //   completedCount: completedQuestionIds?.length || 0
  // });

  if (loading) {
    console.log(`⏳ CATEGORYCARD  showing skeleton`);
    return <CategoryCardSkeleton />;
  }

  const percent = counts.total > 0 ? Math.round((counts.completed / counts.total) * 100) : 0;

  console.log(`✅ CATEGORYCARD  rendering final card: ${counts.completed}/${counts.total} (${percent}%)`);

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.7, ease: easeOut }}
      className="w-full bg-[#eceff686] p-2 border-1 border-[#a1a1a1] rounded-2xl"
    >
      <div className="w-full bg-[#fffffff2] py-4 px-4 sm:pl-6 sm:pr-10 text-xl sm:text-2xl text-gray-600 font-[500] rounded-xl grid grid-cols-1 sm:grid-cols-[1.5fr_1fr_1fr_0.7fr] gap-3 sm:gap-2 items-center">
        <h3>{category}</h3>
        <h4 className="text-base sm:text-lg">{counts.completed}/{counts.total} questions</h4>
        <ProgressBar percent={percent} />
        <div className="flex sm:flex-row-reverse">
          <Link
            href={`/categories/${category}`}
            className="text-[15px] sm:text-[16px] text-white px-3 py-[8px] sm:py-[6px] bg-blue-600 rounded-xl hover:scale-[103%] transition-transform"
          >
            Do it
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryCard;