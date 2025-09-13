import { Briefcase, Calendar, Globe, Hash, Smile, Sun, Users, Utensils } from 'lucide-react'
import React from 'react'


const categoryIcons = {
  "Nationality": Globe ,
  "Family & Relationships": Users,
  "Food & Drinks": Utensils,
  "Professions": Briefcase ,
  "Emotions": Smile ,
  "Weather & Nature": Sun,
  "Numbers & Counting": Hash,
  "Days & Weeks": Calendar
}
const categoryColors = {
  "Nationality": "text-green-600",
  "Family & Relationships": "text-pink-500",
  "Food & Drinks": "text-orange-500",
  "Professions": "text-indigo-600",
  "Emotions": "text-yellow-500",
  "Weather & Nature": "text-sky-500",
  "Numbers & Counting": "text-purple-600",
  "Days & Weeks": "text-red-500",
}

const CategoryCard = ({name,count,i}) => {

    const Icon = categoryIcons[name];

  return (
    <div className=' bg-gray-100/80 border-5 border-[#fff] 
                      rounded-2xl 
                      flex flex-col justify-between
                      shadow-[0_0_20px_rgba(0,0,0,0.12)]
                      w-92 h-52 p-1

    '>
    
      <div>

        <div className='flex justify-between
                        py-1 px-2
        '>
            <h2 className='bg-neutral-200/80
                            text-xl font-[600]
                            px-3 rounded-lg
            '>
                {i+1}
            </h2>

            <h4></h4>
        </div>

        <div className='flex flex-col
                        px-3 py-2
        ' > 
            <div className='flex  items-start justify-between gap-2
                            py-2 
            '>
                <h2 className={`text-xl font-[700]
                              
                `}>
                    {name}
                </h2>
                

            </div>

            <div className='flex justify-between
                            pt-2
            '>
                <h2 className='font-[600]'>
                    Freq : <span className=''>{67}</span>
                </h2>
                <h2 className='font-[600]'>
                    Attempts : {count}
                </h2>
            </div>
        </div>
      </div>
      <div className='flex items-center justify-between
                      px-3 py-2
      '>
        <h2 className='text-lg font-[600] 
                       rounded-2xl
                       px-3 py-1
                       bg-neutral-200/80
        '>
            <span className='font-[700]'>{count}</span> Lessons
        </h2>
        <button className='px-10 py-1
                           text-white font-[600]
                           rounded-[2rem]
                           bg-indigo-700 border-2 border-indigo-700
                           cursor-pointer
                           hover:text-indigo-700 hover:bg-white duration-400
        ' >
            Start
        </button>
      </div>
    </div>
  )
}

export default CategoryCard
