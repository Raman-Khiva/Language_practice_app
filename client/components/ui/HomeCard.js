import Image from 'next/image'
import React from 'react'

const HomeCard = ({className}) => {
  return (
        <div className={className}>

            <div className='border-2 border-violet-400  bg-violet-50 opacity-80
                                rounded-xl px-10 py-5
                                relative
                '>
                    <p className='text-3xl underline decoration-dashed font-[600] text-violet-400 ' >Gracias</p>
                    <Image width={100} height={80} src='/spiral_pointer.webp' alt='card'
                            className='absolute -right-[40%] top-10
                                      rotate-185  rotate-y-180
                            '
                    />
            </div >
        
        </div>
  )
}

export const HomeCard2 = ({className}) => {
  return (
        <div className={className}>

            <div className='border-2 border-violet-400  bg-violet-50 opacity-80
                                rounded-xl px-10 py-5
                                relative
                '>
                    <p className='text-3xl font-[600] text-violet-400 flex gap-3' >
                        <span className='underline decoration-dashed '>Buenos  </span> 
                        <span className='underline decoration-dashed'> Dias</span>
                    </p>

                    <Image width={100} height={80} src='/spiral_pointer2.webp' alt='card'
                            className='absolute top-0 -translate-y-[100%]
                                   
                            '
                    />
            </div >
        
        </div>
  )
}

export const HomeCard3 = ({className}) => {
  return (
        <div className={className}>

            <div className='border-2 border-violet-400  bg-violet-50 opacity-80
                                rounded-xl px-10 py-5
                                relative
                '>
                    <p className='text-3xl font-[600] text-violet-400 flex gap-3' >
                        <span className='underline decoration-dashed '>Buenos  </span> 
                        <span className='underline decoration-dashed'> Dias</span>
                    </p>

                    <Image width={100} height={80} src='/spiral_pointer.webp' alt='card'
                            className='absolute top-0 -translate-y-[100%] right-10
                                      rotate-y-180 rotate-45
                            '
                    />
            </div >
        
        </div>
  )
}



export default HomeCard;

