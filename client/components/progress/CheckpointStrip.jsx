import React from 'react'



// const xPosition = [
//     "left-0 -translate-x-[50%]",
//     "left-1/3 -translate-x-[50%]",
//     "right-1/3 translate-x-[50%]",
//     "right-0 translate-x-[50%]",
// ]
const CheckpointStrip = () => {
  return (
    
      <div className='h-1 w-full  rounded-full
                      relative
                      flex items-center justify-between 
      ' >
        <div className='h-1 w-full  rounded-full absolute top-0 left-0 z-0 
                        bg-gradient-to-r from-[#2dc653] via-[#2dc653] via-40% to-transparent to-95%
        ' />
        {Array.from({ length: 4 }, (_, index) => (
          <div
            key={index}
            className={`h-5.5 w-5.5 rounded-full z-10 
                        ${index <=2 ? 'bg-[#2dc653]' : 'bg-gray-100'} border-3 border-white
                        flex items-center justify-center
                        shadow-sm
                        
           `}
          >
            <div className='h-1.5 w-1.5  z-10 rounded-full bg-gray-200' />
          </div>
        ))}
         
      </div>
    
  )
}

export default CheckpointStrip
