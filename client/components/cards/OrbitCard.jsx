import React from 'react'
import { BiBulb } from 'react-icons/bi'

const OrbitCard = () => {
  return (
         <div className=" relative w-76 h-44 p-0.5  shadow-md rounded-2xl  ">
            
            <div className="absolute inset-0  rounded-2xl z-[1] opacity-60 group-hover:opacity-100 blur-xl  transition duration-500 will-change-transform
               bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]"
            />

            <div className="absolute inset-0 rounded-2xl z-[1] will-change-transform opacity-70
                            bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]"
              
            />
                       
            <div className="h-full w-full relative z-30   bg-white rounded-xl overflow-hidden">
             <div className="flex py-2 px-3 z-30 bg-gray-100 items-center h-fit w-full  justify-start gap-1.5"> 
                <BiBulb  className="text-xl z-30 text-indigo-500"/>
                <h2 className="text-md z-30 font-[500]">Did you know?</h2>
              </div>
              <div className="p-3 z-30 h-full w-full flex justify-center text-center">
                <p className="text-md z-30 font-[500] text-gray-800 ">Native labs makes language learning easy and efficient process. This AI equiped platform provides interative learning experience.</p>
              </div>
            </div>
        </div> 
       
  )
}

export default OrbitCard
