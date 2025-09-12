import React from 'react'

const CategoryCard = ({name,count,i}) => {
  return (
    <div className=' bg-[#fff] border-5 border-gray-300/60 
                      rounded-2xl 
                      flex flex-col justify-between
                      w-92 h-44 p-1

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
            <h2 className='text-xl font-[700]'>
                {name}
            </h2>

            <div className='flex justify-between'>
                <h2>
                    {67}
                </h2>
                <h2>
                    {count}
                </h2>
            </div>
        </div>
      </div>
      <div className='flex items-center justify-between
                      px-3 py-2
      '>
        <h2 className='text-lg font-[600] 
                       rounded-lg
                       px-3 py-1
                       bg-neutral-200/80
        '>
            <span className='font-[700]'>{count}</span> Lessons
        </h2>
        <button className='px-10 py-1
                           text-white font-[600]
                           rounded-lg
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
