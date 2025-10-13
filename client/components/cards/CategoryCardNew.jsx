import React from 'react';
import { ArrowRight,CircleQuestionMark,PenTool } from 'lucide-react';

const CategoryCardNew = ({ 
  title = 'Basics', 
  description = 'Learn essential words and phrases to get started',
  progress = 0.4, // 0 to 1
  totalLessons = 5,
  completedLessons = 2,
  color = 'blue',
  index = 0,
  setSelectedCategory
}) => {
  const colorVariants = {
    blue: {
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      progress: 'bg-blue-500',
      button: 'bg-blue-600 hover:bg-blue-700 text-white'
    },
    green: {
      bg: 'bg-green-50',
      text: 'text-green-600',
      progress: 'bg-green-500',
      button: 'bg-green-600 hover:bg-green-700 text-white'
    },
    // Add more color variants as needed
  };

  const colors = colorVariants[color] || colorVariants.blue;

  

  return (
    <div className={` bg-white rounded-2xl p-4 shadow-lg  transition-shadow duration-200`}
         onClick={()=>setSelectedCategory(title)}
    >
      <div className="flex flex-col gap-2 h-full">
        <div className="flex-1">
          <div className='flex items-center gap-2'>
            <div className={` h-fit w-fit bg-[#1e52f1] rounded-xl p-2`}>
             <PenTool className={` text-white`} size={20} />
            </div>
            <div className='flex flex-col'>
                <p className='text-[10px] leading-tight text-gray-600 font-[600]'>MODULE</p>
                <h2 className='text-xl font-[600] leading-tight'>
                    {index+1}
                </h2>
            </div>

          </div>
            <h3 className={`text-xl font-semibold mt-2 `}>
              {title}
            </h3>
          <p className="text-gray-600 text-sm mb-4 ">{description}</p>
          
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm text-gray-800 mb-1">
              <p className="text-sm font-[600] text-gray-700 mt-1">
                <span className='font-[600] text-lg text-black'>{completedLessons}</span>/{totalLessons} lessons completed
              </p>
              <p className={` text-[#1e52f1] ${colors.bg} px-2 py-1.5 rounded-lg font-[600]`}>{Math.round(progress * 100)}%</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-full rounded-full bg-[#1e52f1]`}
                style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }}
              ></div>
            </div>
           
          </div>
        </div>
        
        <div className='flex items-center justify-between'>
            <button className='flex items-center gap-1 font-[500] text-gray-600 hover:text-black duration-200 cursor-pointer'>
                <CircleQuestionMark size={18}/>
                <span>Learn more</span>
            </button>
            <button 
                className={`bg-[#1e52f1] text-sm text-white w-fit py-2 cursor-pointer px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors`}
            >
                Continue
                <ArrowRight size={16} />
            </button>
        </div>
        
      </div>
    </div>
  );
};

export default CategoryCardNew;