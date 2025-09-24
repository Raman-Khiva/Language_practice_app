import React from 'react'



const FeatureCard = ({title,description,icon:Icon}) => {
  return (
    // border-2 border-[rgb(229,229,232)]
    <div className='bg-[rgb(249,249,249)] 
                      border-2 border-gray-300 ring-3 ring-gray-100/90
                      px-6 py-6 rounded-2xl 
                      flex gap-7 items-start
    '>
       <div className='flex justify-center '>
         <Icon className="text-4xl text-indigo-700"/>
       </div>
       <div className='flex flex-col gap-4'>
         <h3 className='text-xl font-[600]'>
            {title}
         </h3>
         <p className='font-[600] text-gray-600'>
            {description}
         </p>
       </div>
    </div>
  )
}

export default FeatureCard
