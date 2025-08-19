"use client"

// Category progress card
// - Displays category name
// - Shows completed/total question counts
// - Renders a progress bar whose percent is derived from counts
// - Computes counts from:
//   • in-memory questions (when available)
//   • server counts for authed users
//   • categories map (for guests)
import Link from "next/link";
import ProgressBar from "../ProgessBar/progressBar";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "@/app/context/ProductContext";

const categoryCard = ({category}) => {
  const { isAuthenticated, authLoading, completedQuestionIds, allData, authFetch, categories } = useContext(ProductContext);
  const [counts, setCounts] = useState({ completed: 0, total: 0 });

  // Compute category-level counts whenever inputs change
  useEffect(() => {
    let cancelled = false;
    const compute = async () => {
      // Prefer local computation when category questions are in memory
      if (Array.isArray(allData?.[category])) {
        const total = allData[category].length;
        const completed = total > 0 ? allData[category].filter(q => completedQuestionIds.includes(q._id)).length : 0;
        if (!cancelled) setCounts({ completed, total });
        return;
      }
      // Otherwise, fallback to server counts for authed users
      if (!authLoading && isAuthenticated) {
        try {
          const res = await authFetch(`/progress/count-by-category/${encodeURIComponent(category)}`);
          if (res.ok) {
            const data = await res.json();
            if (!cancelled) setCounts({ completed: data?.data?.completedCount || 0, total: data?.data?.totalCount || 0 });
          }
        } catch { /* noop */ }
      } else {
        // Guests: use categories map for total; completed is 0
        const totalFromCategories = Number.isFinite(categories?.[category]) ? categories[category] : 0;
        setCounts({ completed: 0, total: totalFromCategories });
      }
    };
    compute();
    return () => { cancelled = true; };
  }, [allData, completedQuestionIds, category, authLoading, isAuthenticated, categories]);

  const percent = counts.total > 0 ? Math.round((counts.completed / counts.total) * 100) : 0;
  return (
    <div
        className='w-full bg-[#ffffffd8] py-4 pl-6 pr-10 text-2xl text-gray-600 font-[500] border-2 border-gray-200 shadow-sm shadow-gray-200 rounded-2xl
                    grid grid-cols-[1.5fr_1fr_1fr_0.7fr] items-center
                   '
    >


      <h3 className=" ">{category}</h3>


      <h4 className="text-lg   ">{counts.completed}/{counts.total} questions</h4>



      <ProgressBar percent={percent} />
      


      <div className="flex flex-row-reverse">
        <Link 
          href={`/categories/${category}`}
          className="text-[16px]  text-white px-3 py-[6px] bg-blue-600 rounded-xl hover:scale-[103%] "> Do it
        </Link>
      </div>


    </div>
  )
}

export default categoryCard
