import React from 'react'

const Badge = ({tag,icon:Icon}) => {
  return (

    <div className='flex items-center gap-2 
                     w-fit px-5 py-1.5 rounded-4xl
                    border-2 border-black/10  bg-black
                    
    '>
      <Icon className="text-2xl font-bold text-indigo-500" />
      <p className=''>{tag}</p>
    </div>
  )
}

export default Badge
