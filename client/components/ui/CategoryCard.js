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

const colors = [
  "from-[#ffdad2]  via-[#ffe3dd]",
  "from-[#b4ffe8] via-[#cdfff0]",
  "from-[#c8e3fe] via-[#dbeeff]",
  "from-[#ffd9dd] via-[#ffe5e7]",
  "from-[#ffe083] via-[#feedb9]",
]

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
    <div className=' bg-gray-50 border-5 border-[#fff] 
                      relative rounded-2xl 
                      flex flex-col justify-between
                      shadow-[0_0_20px_rgba(0,0,0,0.12)]
                      w-92 h-52 p-1 
                      overflow-hidden

    '>
                  {/*bg-gradient-to-tr   to-gray-50 */}
                  {/* bg-gradient-to-tr from-${colors[0].from} via-${colors[0].via} to-${colors[0].to}*/}
      <div
        className={`h-full w-full z-10
                   absolute bottom-0 left-0
                   bg-gradient-to-tr ${colors[i%5]} to-gray-50
                   blur-2xl 
      `}/>
    
      <div className='z-20'>

        <div className='flex justify-between
                        py-1 px-2
        '>
            <h2 className='
                            text-xl font-[600]
                            px-3 rounded-lg
                            border-1 border-l-red-300 border-t-violet-400 border-r-green-400 border-b-blue-400
            '>
                {i+1}
            </h2>

            <h4></h4>
        </div>

        <div className='flex flex-col
                        px-3 py-2 z-20
        ' > 
            <div className='flex  items-start justify-between gap-2
                            py-2 
            '>
                <h2 className={`text-xl font-[700]
                                text-blue-500
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
                      px-3 py-2 z-20
      '>
        <h2 className='text-lg font-[600] 
                       rounded-2xl
                       px-3 py-1
                       
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
