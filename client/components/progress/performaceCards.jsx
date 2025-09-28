import React from 'react'
import CircularProgressNew from './CircularProgressNew'

const performaceCards = ({children, className,fillColor,text}) => {
  return (
    <div className={` flex justify-between items-center gap-2
                      min-w-44 px-3 pb-1 pt-1 h-28
                    text-lg rounded-xl ` + className}
    >
      <div className='flex flex-col justify-between py-2
                      h-full 
      '>
        {children}
        <p>{text}</p>
      </div>

      <CircularProgressNew fillColor={fillColor} />
    </div>
  )
}

export default performaceCards
