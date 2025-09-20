import React from 'react'



const FeatureCard = ({title,description,icon:Icon}) => {
  return (
    <div className='bg-blue-50 border-2 border-white
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
