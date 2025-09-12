import React from 'react'

const Badge = ({tag,icon:Icon}) => {
  return (
    <div className='flex items-center gap-2 px-6 py-1 rounded-4xl
                    border-2 border-black/10 
                    shadow-[0_0_10px_rgba(0,0,0,0.1)]
    '>
      <Icon className="text-xl font-bold  bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 bg-clip-text [fill:transparent]" />
      <p className=' '>{tag}</p>
    </div>
  )
}

export default Badge
