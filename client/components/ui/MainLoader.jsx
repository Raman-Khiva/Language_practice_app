'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

const LOADER_DURATION = 3000 // 3 seconds

const MainLoader = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let animationFrame
    const start = performance.now()

    const animate = (timestamp) => {
      const elapsed = timestamp - start
      const nextProgress = Math.min((elapsed / LOADER_DURATION) * 100, 100)
      setProgress(nextProgress)

      if (elapsed < LOADER_DURATION) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-white'>
      <div className='flex w-full max-w-xs flex-col items-center gap-10 px-8'>
        <Image src='/brain-logo.svg' alt='Nativelabs' width={140} height={140} priority />

        <div className='flex w-full flex-col items-center gap-2'>
          <div className='relative h-2 w-full overflow-hidden rounded-full bg-gray-200'>
            <div
              className='absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-[width] duration-150 ease-out'
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className='text-sm font-medium text-gray-600'>{Math.round(progress)}%</span>
        </div>
      </div>
    </div>
  )
}

export default MainLoader
