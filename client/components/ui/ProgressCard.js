import React from 'react'
import CircularProgressNew from './CircularProgressNew'

const ProgressCard = ({children, className,color, fillColor,text}) => {
  return (
    <div className={` flex justify-between items-center gap-2
                      w-48 px-4 py-2 h-[7rem]
                      text-lg rounded-xl 
                      relative
                      bg-white shadow-[0_0_10px_rgba(0,0,0,0.14)]
                      
                      ` + className  }
    > 
      <div className={`w-20  h-20 absolute
                      z-10 rounded-full left-1/3 top-1/6
                      bg-radial to-white blur-2xl
                      ` + color
      }/>
      <div className='flex flex-col justify-center gap-2 py-2
                      h-full w-full z-20
      '>
        {children}
        <p className='text-[16px] text-gray-800'>{text}</p>
      </div>

      <CircularProgressNew className="w-full  " fillColor={fillColor} />
    </div>
  )
}

export default ProgressCard
