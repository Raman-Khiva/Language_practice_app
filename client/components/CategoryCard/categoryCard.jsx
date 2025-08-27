"use client"

import { easeOut, motion } from "framer-motion";
import Link from "next/link";
import ProgressBar from "../ProgessBar/progressBar";
import {selectQuestionsCompleted,selectProgressIsFetched} from '../../app/store/slices/userProgressSlice'
import { useSelector } from "react-redux";


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


const CategoryCard = ({ category,totalQuestions,isAuthenticated }) => {
  // Individual render counter for this specific category

  const isProgressFetched = useSelector(selectProgressIsFetched);

  if(isAuthenticated && !isProgressFetched){
    return <CategoryCardSkeleton />
  }

  const questionsCompleted = isAuthenticated? useSelector(selectQuestionsCompleted) : 0;
  
  
  const percent = Math.floor((questionsCompleted*100)/totalQuestions);
//border-1 border-[#a1a1a1]
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.7, ease: easeOut }}
      className="w-full bg-[#eceff686] p-2 border-2 border-[#646262] rounded-2xl"
    >
      <div className="w-full bg-[#fffffff2] py-4 px-4 sm:pl-6 sm:pr-10 text-xl sm:text-2xl text-gray-600 font-[500] rounded-xl grid grid-cols-1 sm:grid-cols-[1.5fr_1fr_1fr_0.7fr] gap-3 sm:gap-2 items-center">
        <h3>{category}</h3>
        <h4 className="text-base sm:text-lg">{questionsCompleted}/{totalQuestions} questions</h4>
        <ProgressBar percent={percent} />
        <div className="flex sm:flex-row-reverse">
          <Link
            href={`/categories/${category}`}
            className="text-[15px] sm:text-[16px] text-blue-600 border-1 border-blue-600 px-3 py-[8px] sm:py-[6px] hover:bg-blue-600 hover:text-white rounded-xl hover:scale-[103%]  transition-transform"
          >
            Do it
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryCard;