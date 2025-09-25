// import { Sparkle } from 'lucide-react'
// import React from 'react'
// import { BiBulb } from 'react-icons/bi'
// import { GiIdea } from 'react-icons/gi'

// const FlashCardNew = () => {
//   return (
//     <div className='flex flex-col items-center justify-center h-screen'>
        
    
//     <div
//     className='flex flex-col gap-2 
//                w-80 h-fit 
//                bg-neutral-800 p-1 rounded-xl
//     '>
//       <div
//          className='flex items-center gap-2
//                     font-[500] 
//                     py-0.5 px-4
                              
//       '>
//         <BiBulb  className='text-yellow-300 text-lg'/>
//         <h1 className='text-xs font-[600] text-white'>Did you know?</h1>
//       </div>
//       <div className=' h-full w-full rounded-lg
//                        bg-white text-sm font-[500] text-gray-800 
//                        flex items-center justify-center
//                        py-4 px-2
//       '>
//         <p>
//             some fact will be flased here.
//             some fact will be flased here.
//             some fact will be flased here.
//         </p>
//       </div>
    
//     </div>
//     </div>
//   )
// }
'use client'

import { Sparkle } from 'lucide-react'
import React from 'react'
import { BiBulb } from 'react-icons/bi'
import { GiIdea } from 'react-icons/gi'

const FlashCardNew = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen
                    bg-yellow-50/80 backdrop-blur-3xl p-1 rounded-xl            
    '>
        
    <div
    className='flex flex-col
               w-80 
               bg-[#d7e8ff] backdrop-blur-xl rounded-xl
               border-2 border-[#7cb2ff] shadow-2xl
    '>
      <div
         className='flex items-center gap-2
                    font-[500] 
                    py-2 px-4
                    text-[#006aff]
                              
      '>
        <BiBulb  className=' text-2xl font-bold'/>
       {/* <div className='flex p-1 rounded-full bg-white'>
       </div> */}
        <h1 className='text-[16px] font-[600]'>Did you know?</h1>
      </div>
      <div className=' h-full w-full rounded-lg
                       bg-white text-lg font-[500] text-black/90
                       flex items-center justify-center
                       py-3 px-6 text-center
      '>
        <p>
            some fact will be flased here.
            and some fact will be flased here.
            some fact will be flased here.
        </p>
      </div>
    
    </div>
    </div>
  )
}

export default FlashCardNew
