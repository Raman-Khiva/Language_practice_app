'use client'

import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Badge from '../ui/Badge'
import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2'
import { FaStar } from 'react-icons/fa'

const testimonialsTop = [
  {
    name: "Anika Sharma",
    role: "Intermediate Learner",
    rating: 5,
    quote: "The daily speaking drills boosted my confidence faster than any class I've taken."
  },
  {
    name: "Lucas Meyer",
    role: "Travel Enthusiast",
    rating: 4,
    quote: "I love how personalized the lessons feel—it adapts every time I practice."
  },
  {
    name: "Sofia Alvarez",
    role: "University Student",
    rating: 5,
    quote: "Instant corrections helped me catch mistakes I never noticed before."
  },
  {
    name: "Noah Patel",
    role: "Tech Professional",
    rating: 5,
    quote: "Having AI feedback on demand keeps me learning even on the busiest days."
  }
]

const testimonialsBottom = [
  {
    name: "Amelia Chen",
    role: "Native Speaker Coach",
    rating: 5,
    quote: "The platform mirrors real conversation flow—students come prepared and confident."
  },
  {
    name: "Mateo Rossi",
    role: "Beginner Learner",
    rating: 4,
    quote: "Short practice bursts and smart reminders keep me on track effortlessly."
  },
  {
    name: "Jasmine Okafor",
    role: "Language Tutor",
    rating: 5,
    quote: "I recommend it to my students—the analytics make monitoring progress simple."
  },
  {
    name: "Ethan Walker",
    role: "Polyglot",
    rating: 5,
    quote: "Switching between languages is seamless, and each course feels tailor-made."
  }
]

const TestimonialCard = ({ name, role, rating, quote }) => (
  <div className='min-w-[18rem] max-w-xs bg-[rgb(246,246,246)] border border-black/5 rounded-2xl px-6 py-6 flex flex-col gap-4 shadow-[0_12px_30px_-10px_rgba(25,25,25,0.15)]'>
    <div className='flex items-center justify-between gap-4'>
      <div className='flex flex-col'>
        <h4 className='text-lg font-[600] text-black/85'>{name}</h4>
        <span className='text-sm font-[500] text-black/60'>{role}</span>
      </div>
      <div className='flex items-center gap-1 text-amber-500'>
        {Array.from({ length: rating }).map((_, idx) => (
          <FaStar key={idx} className='text-sm' />
        ))}
      </div>
    </div>
    <p className='text-[15px] font-[500] text-black/70 leading-relaxed'>
      {quote}
    </p>
  </div>
)

const TestimonialRow = ({ testimonials, direction }) => {
  const [isHovered, setIsHovered] = useState(false)
  const duplicated = [...testimonials, ...testimonials]
  const initialX = direction === 'right' ? '-50%' : '0%'
  const animateX = direction === 'right' ? '0%' : '-50%'

  const animationVariants = useMemo(() => ({
    normal: {
      x: animateX,
      transition: {
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'linear',
        duration: 28
      }
    },
    slow: {
      x: animateX,
      transition: {
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'linear',
        duration: 120
      }
    }
  }), [animateX])

  return (
    <div className='overflow-hidden w-full'>
      <motion.div
        className='flex gap-6'
        initial={{ x: initialX }}
        animate={isHovered ? 'slow' : 'normal'}
        variants={animationVariants}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {duplicated.map((testimonial, index) => (
          <TestimonialCard key={`${testimonial.name}-${index}`} {...testimonial} />
        ))}
      </motion.div>
    </div>
  )
}

const Testimonials = () => {
  return (
    <section className='w-full flex flex-col items-center gap-14 py-28 px-8 md:px-32'>
      <div className='flex flex-col items-center gap-4 text-center max-w-3xl'>
        <Badge tag='Loved by learners worldwide' icon={HiOutlineChatBubbleLeftRight} />
        <h2 className='text-[50px] leading-tight font-[400]'>Testimonials that Tell the Story</h2>
        <p className='text-lg font-[500] text-[#3c3c3c]'>
          Hear from learners and educators who rely on our platform for immersive, flexible, and engaging language practice every single day.
        </p>
      </div>

      <div className='flex flex-col gap-8 w-full'>
        <TestimonialRow testimonials={testimonialsTop} direction='right' />
        <TestimonialRow testimonials={testimonialsBottom} direction='left' />
      </div>
    </section>
  )
}

export default Testimonials
