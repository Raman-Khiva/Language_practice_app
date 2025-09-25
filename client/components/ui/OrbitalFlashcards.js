'use client'

import React from 'react'
import FlashCardNew from './NewFlashCard'
import {
  HiOutlineSparkles,
  HiOutlineChatBubbleBottomCenterText,
} from 'react-icons/hi2'
import { FiMic, FiBookOpen, FiTrendingUp } from 'react-icons/fi'
import { BiWorld } from 'react-icons/bi'

const orbitCards = [
  {
    id: 'speaking-daily',
    tag: 'Daily Speaking',
    fact: 'Practice real-world conversations with instant AI feedback.',
    icon: FiMic,
    accentColor: 'rgba(241, 237, 255, 0.92)',
    borderColor: '#c7b7ff',
    iconClassName: 'text-indigo-600',
    iconWrapperClassName: 'bg-white/90 shadow-sm',
    top: '7%',
    left: '76%',
    rotation: 18,
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
    top: '32%',
    left: '8%',
    rotation: -28,
  },
  {
    id: 'listening-lab',
    tag: 'Listening Lab',
    fact: 'Tune your ears with immersive clips and comprehension checks.',
    icon: HiOutlineChatBubbleBottomCenterText,
    accentColor: 'rgba(235, 249, 255, 0.95)',
    borderColor: '#9fd5ff',
    iconClassName: 'text-sky-600',
    iconWrapperClassName: 'bg-white/90 shadow-sm',
    top: '86%',
    left: '28%',
    rotation: 212,
  },
  {
    id: 'confidence-tracker',
    tag: 'Confidence Tracker',
    fact: 'Track streaks, milestones, and celebrate every win.',
    icon: FiTrendingUp,
    accentColor: 'rgba(255, 240, 246, 0.95)',
    borderColor: '#f7aede',
    iconClassName: 'text-pink-500',
    iconWrapperClassName: 'bg-white/90 shadow-sm',
    top: '70%',
    left: '90%',
    rotation: 48,
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
    top: '25%',
    left: '55%',
    rotation: -6,
  },
]

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
        <div className='absolute inset-0 rounded-full opacity-80' style={ringStyle(6, 0.8)} />
        <div className='absolute inset-[12%] rounded-full opacity-70' style={ringStyle(6, 0.6)} />
        <div className='absolute inset-[25%] rounded-full opacity-60' style={ringStyle(6, 0.45)} />

        <div className='absolute inset-[38%] flex flex-col items-center justify-center gap-2 rounded-full bg-white shadow-[0_25px_60px_-35px_rgba(36,33,66,0.35)]'>
          <div className='flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg'>
            <span className='text-xl font-semibold'>Lingua</span>
          </div>
          <p className='px-8 text-center text-sm font-[600] text-black/70'>
            Everything you need, orbiting your goals.
          </p>
        </div>

        {orbitCards.map((card) => (
          <div
            key={card.id}
            className='absolute w-[11.5rem] max-w-[12rem] transition-transform duration-500 hover:scale-[1.03]'
            style={{
              top: card.top,
              left: card.left,
              transform: `translate(-50%, -50%) rotate(${card.rotation}deg)`,
            }}
          >
            <div
              className='drop-shadow-xl'
              style={{
                transform: `rotate(${-card.rotation}deg)`,
              }}
            >
              <FlashCardNew
                fact={card.fact}
                tag={card.tag}
                icon={card.icon}
                accentColor={card.accentColor}
                borderColor={card.borderColor}
                iconClassName={card.iconClassName}
                iconWrapperClassName={card.iconWrapperClassName}
                containerClassName='w-full'
                headerClassName='text-[13px] font-[600] tracking-tight'
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OrbitalFlashcards
