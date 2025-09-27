import React from 'react'

const Badge = ({tag,icon:Icon}) => {
  return ( //text-[#006aff]
    <div className='flex items-center gap-2 
                     w-fit px-5 py-1.5 rounded-4xl
                     bg-[rgb(251,251,251)] 
                    border-[1.5px] border-black/10
                    shadow-[0_0_10px_rgba(0,0,0,0.0.07)]
    '>
      <Icon className="text-2xl font-[600] ubuntu text-violet-600 " />
      <p className='text-[#303030]'>{tag}</p>
    </div>
  )
}

export default Badge
