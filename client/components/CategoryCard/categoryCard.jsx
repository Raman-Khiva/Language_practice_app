"use client"

import { easeOut, motion } from "framer-motion";
import Link from "next/link";
import ProgressBar from "../ProgessBar/progressBar";
import { useContext, useEffect, useState } from "react";
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

// --------------------
// Real card component
// --------------------
const CategoryCard = ({ category }) => {
  const { isAuthenticated, authLoading, completedQuestionIds, allData, authFetch, categories } = useContext(ProductContext);
  const [counts, setCounts] = useState({ completed: 0, total: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const compute = async () => {
      setLoading(true);

      if (Array.isArray(allData?.[category])) {
        const total = allData[category].length;
        const completed = total > 0 ? allData[category].filter(q => completedQuestionIds.includes(q._id)).length : 0;
        if (!cancelled) {
          setCounts({ completed, total });
        }
        return;
      }

      if (!authLoading && isAuthenticated) {
        try {
          const res = await authFetch(`/progress/count-by-category/${encodeURIComponent(category)}`);
          if (res.ok) {
            const data = await res.json();
            if (!cancelled) {
              setCounts({
                completed: data?.data?.completedCount || 0,
                total: data?.data?.totalCount || 0,
              });
              setLoading(false);
            }
          } else {
            if (!cancelled) setLoading(false);
          }
        } catch {
          if (!cancelled) setLoading(false);
        }
      } else {
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

  if (loading ) return <CategoryCardSkeleton />; // <-- use skeleton

  const percent = counts.total > 0 ? Math.round((counts.completed / counts.total) * 100) : 0;

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
