'use client'

import React from 'react'
import { motion } from 'framer-motion'
import FlashCardNew from './NewFlashCard'
import { HiOutlineSparkles } from 'react-icons/hi2'
import { FiMic, FiBookOpen } from 'react-icons/fi'

const orbitCards = [
  {
    id: 'daily-speaking',
    tag: 'Daily Speaking',
    fact: 'Practice real-world conversations with instant AI feedback.',
    icon: FiMic,
    accentColor: 'rgba(241, 237, 255, 0.92)',
    borderColor: '#c7b7ff',
    iconClassName: 'text-indigo-600',
    iconWrapperClassName: 'bg-white/90 shadow-sm',
    angle: 100,
    radius: 22,
  },
  {
    id: 'vocab-power',
    tag: 'Vocabulary Power',
    fact: 'Unlock curated word decks that match your current lesson.',
    icon: FiBookOpen,
    accentColor: 'rgba(255, 243, 237, 0.95)',
    borderColor: '#ffcba4',
    iconClassName: 'text-orange-500',
    iconWrapperClassName: 'bg-white/90 shadow-sm',
    angle: 255,
    radius: 55,
  },
  {
    id: 'cultural-bites',
    tag: 'Cultural Bites',
    fact: 'Discover idioms & customs that bring each language to life.',
    icon: HiOutlineSparkles,
    accentColor: 'rgba(246, 252, 244, 0.95)',
    borderColor: '#b9efc5',
    iconClassName: 'text-emerald-600',
    iconWrapperClassName: 'bg-white/90 shadow-sm',
    angle: 180,
    radius: 80,
  },
]

const orbitTransition = { repeat: Infinity, duration: 20, ease: 'linear' }


const getOrbitPosition = (angle, radius) => {
  const angleInRadians = (angle * Math.PI) / 180
  const top =  45+ radius * Math.sin(angleInRadians)
  const left = 50+ radius * Math.cos(angleInRadians)

  return {
    top: `${top}%`,
    left: `${left}%`,
  }
}


const ringStyle = (thickness = 4, opacity = 0.9) => ({
  background: 'conic-gradient(from 140deg, #8b5cf6, #ec4899, #f97316, #8b5cf6)',
  WebkitMask: `radial-gradient(farthest-side, transparent calc(100% - ${thickness}px), rgba(0,0,0,${opacity}) calc(100% - ${Math.max(
    thickness - 1,
    1,
  )}px))`,
  mask: `radial-gradient(farthest-side, transparent calc(100% - ${thickness}px), rgba(0,0,0,${opacity}) calc(100% - ${Math.max(
    thickness - 1,
    1,
  )}px))`,
})

const OrbitalFlashcards = () => {
  return (
    <div className='relative flex w-full items-center justify-center px-4'>
      <div className='relative h-[26rem] w-[26rem] md:h-[32rem] md:w-[32rem]'>
        <div className='absolute inset-0 rounded-full opacity-80' style={ringStyle(6, 0.9)} />
        <div className='absolute inset-[12%] rounded-full opacity-70' style={ringStyle(6, 0.6)} />
        <div className='absolute inset-[25%] rounded-full opacity-60' style={ringStyle(6, 0.45)} />

        <div className='absolute inset-[38%] flex flex-col items-center justify-center gap-2 rounded-full bg-white shadow-[0_25px_60px_-35px_rgba(36,33,66,0.35)]'>
          <div className='flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg'>
            <span className='text-xl font-semibold'>Native</span>
          </div>
         
        </div>

        <motion.div className='absolute inset-0 
                      
        '
        initial={{ rotate: 0 }} animate={{ rotate: 360 }} transition={orbitTransition} 
        >
          {orbitCards.map((card) => {
            const { top, left } = getOrbitPosition(card.angle, card.radius)

            return (
              <motion.div
                key={card.id}
                className='absolute flex items-center justify-center hover:scale-[1.03] rounded-2xl
                            bg-[radial-gradient(ellipse_200px_100px_at_center,_#fffff9_70%,_#fffff9_88%,_#fffff9)] p-2
                '
                style={{
                  top,
                  left,
                  transform: 'translate(-50%, -50%)',
                }}
               initial={{ rotate: 0 }} animate={{ rotate: -360 }} transition={orbitTransition}
                
               
              >
                
                
                  <FlashCardNew
                    fact={card.fact}
                    tag={card.tag}
                    icon={card.icon}
                    accentColor={card.accentColor}
                    borderColor={card.borderColor}
                    iconClassName={card.iconClassName}
                    iconWrapperClassName={card.iconWrapperClassName}
                    containerClassName='w-64 md:w-72'
                    headerClassName='text-[13px] font-[600] tracking-tight'
                  />
                
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}

export default OrbitalFlashcards
