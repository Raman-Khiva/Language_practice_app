import Image from 'next/image'
import React from 'react'

const page = () => {
  return (

    <div className='flex w-full h-screen items-center justify-center  bg-transparent'>
        
        <div className='border-2 border-violet-400 ring-5 ring-violet-100
                        rounded-xl px-10 py-5
                        relative
        '>
            <p className='text-3xl underline decoration-dashed font-[600] text-violet-400 ' >Gracias</p>
            <Image width={100} height={80} src='/spiral_pointer.webp' alt='card'
                    className='absolute -right-[65%] top-0
                               rotate-130 rotate-y-180
                    '
             />
        </div >

    </div>
  )
}

export default page
