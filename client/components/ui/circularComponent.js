import React from 'react'
import HomeCard, { HomeCard2, HomeCard3 } from './HomeCard';

const CircularComponent = () => {
  return (

    <div className='flex w-full  items-center justify-center 
                    z-30
     '>
        
        
        <div className='grid place-items-center relative'>
            <HomeCard className="absolute -top-10  translate-x-10" />
            <HomeCard2 className="absolute bottom-24 -right-24 -rotate-3"/>
            <HomeCard3 className="absolute bottom-40 -left-24"  />
            <div className='w-[30rem] h-[30rem] rounded-full border-2 border-violet-300 
                            bg-violet-100 shadow-[0_0_70px_#c4b4ff]  
                                grid place-items-center
                            ' >
                <div className='w-[19rem] h-[19rem] rounded-full  
                                 bg-pink-50 border-2 border-pink-300    
                                    grid place-items-center
                                ' >

                    <div className='w-[9rem] h-[9rem] rounded-full border-2
                                bg-blue-50 border-blue-200 '   />

                </div>
            </div>
        </div>

    </div>
  )
}

export default CircularComponent;
