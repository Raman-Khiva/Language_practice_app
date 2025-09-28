import React from 'react'
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const PriceCard = ({title,price,features,i}) => {
  return (
    <div className={`w-88 h-[30rem] px-7 py-3
                    border-2   rounded-2xl
                    ring-3
                    flex flex-col justify-center gap-4
                    bg-[rgb(251,251,251)]
                    shadow-[0_0_10px_rgba(0,0,0,0.07)] ${i==1?"border-blue-600 ring-blue-100":"border-gray-400/60 ring-gray-200"}
    
    `}>
      <div className='flex flex-col gap-3 pt-3' >
        <h3 className='text-3xl font-[500] text-black/85'>{title}</h3>
        <h2 className='text-4xl font-[700]'>{price}<span className='text-2xl font-[500] text-black/80'>/mon</span></h2>
      </div>
      <div className='w-full h-[1px] bg-black/15'/>
      <div className='flex flex-col gap-3 items-start flex-1'>
        {features.map((feature,index)=>(
            <div key={index}
                className='flex items-center gap-2'
            >
                <IoMdCheckmarkCircleOutline
                    className='text-2xl text-blue-700 font-bold'
                />
                <p
                    className='text-lg font-[500] text-black/75 '
                >
                    {feature}
                </p>
            </div>

        ))}
      </div>
      <button className='w-full px-2 py-3   bg-black/95 text-white
                         rounded-2xl font-[500]   cursor-pointer hover:shadow-none
      '>
        Get Started
      </button>
    </div>
  )
}

export default PriceCard
