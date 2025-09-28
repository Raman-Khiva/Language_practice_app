'use client'


import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

const LOADER_DURATION = 1000 // 3 seconds

const MainLoader = ({ children }) => {
  const pathname = usePathname()
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    setShowLoader(true)
    const timer = setTimeout(() => {
      setShowLoader(false)
    }, LOADER_DURATION)
    return () => clearTimeout(timer)
  }, [pathname])

  if (!showLoader) {
    return children
  }
  
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-white'>
      <div className='flex w-full max-w-xs flex-col items-center gap-4 px-8'>
        <div className='flex flex-col items-center'>  
        <Image src='/brain-logo.svg' alt='Nativelabs' width={60} height={40} priority />
        <p className='text-[23px] font-[600] ubuntu'>Native<span className='font-[300]'>labs</span></p>
       </div>
       {/* <div className='flex items-center justify-center p-3 h-fit w-fit rounded-full shadow-2xl'>

       </div> */}

        <div className='flex w-32
         shadow-2xl flex-col items-center gap-2'>
          <div className='relative h-[6px] w-full overflow-hidden rounded-full bg-gray-200'>
            <motion.div
              className='absolute inset-y-0 left-0 rounded-full bg-blue-600'
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: LOADER_DURATION / 1000 }}
            ></motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainLoader
