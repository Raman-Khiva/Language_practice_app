


import StoryCard from '@/components/cards/StoryCard'
import Navbar from '@/components/layout/Navbar/Navbar'
import { storyCardData } from '@/mock/storyCards'
import React from 'react'
import { FiBookOpen, FiClock, FiTrendingUp, FiAward } from 'react-icons/fi'

const storyStats = [
  {
    id: 'stories-completed',
    label: 'Stories Completed',
    value: '24',
    delta: '+3 this week',
    description: 'Last finished yesterday',
    icon: FiBookOpen,
    accent: 'bg-indigo-300 text-indigo-600',
  },
  {
    id: 'active-days',
    label: 'Active Reading Days',
    value: '5-day streak',
    delta: '+2 vs last week',
    description: 'Kept reading streak alive',
    icon: FiClock,
    accent: 'bg-gradient-to-br from-blue-100 to-cyan-100 text-cyan-600',
  },
  {
    id: 'words-learned',
    label: 'New Words Reviewed',
    value: '58',
    delta: '+12 today',
    description: 'Highlighted terms practiced',
    icon: FiTrendingUp,
    accent: 'bg-gradient-to-br from-emerald-100 to-teal-100 text-emerald-600',
  },
  {
    id: 'milestones',
    label: 'Milestones Unlocked',
    value: '7',
    delta: 'Latest: “Narrative Pro”',
    description: 'Progressed through story goals',
    icon: FiAward,
    accent: 'bg-gradient-to-br from-violet-100 to-fuchsia-100 text-violet-600',
  },
]

const storyRecommendations = [
  {
    moduleNumber: 'Module 04',
    type: 'Story collection',
    title: 'Cultural Conversations',
    difficulty: 'B1 • Intermediate',
    cta: 'Open story',
  },
  {
    moduleNumber: 'Module 05',
    type: 'Listening module',
    title: 'City Voices',
    difficulty: 'B2 • Upper Intermediate',
    cta: 'Start module',
  },
  {
    moduleNumber: 'Module 06',
    type: 'Grammar sprint',
    title: 'Grammar Glide Challenge',
    difficulty: 'B1 • Intermediate',
    cta: 'Review now',
  },
]

const recentStoryActivity = [
  {
    moduleNumber: 'Module 02',
    type: 'Story arc',
    title: 'Journey to the Market',
    difficulty: 'B1 • Intermediate',
    cta: 'Resume story',
  },
  {
    moduleNumber: 'Module 03',
    type: 'Mystery tale',
    title: 'Mystery in Midtown',
    difficulty: 'B2 • Upper Intermediate',
    cta: 'Continue story',
  },
  {
    moduleNumber: 'Module 01',
    type: 'Narrative set',
    title: 'Echoes of the Coast',
    difficulty: 'A2 • Pre-Intermediate',
    cta: 'Revisit story',
  },
]

const paddingX = 'px-3 sm:px-6 lg:px-10';

const page = () => {
  return (
    <div className='min-h-screen w-full bg-[#f4f2ff]'>
      <Navbar />
      <div className='pt-28 overflow-x-hidden pl-10 pr-5 grid grid-rows-[9rem_30rem_1fr] grid-cols-[auto_22rem] gap-2'>
      <section className={`row-start-1 row-end-2 col-start-1 col-end-2 
                        grid grid-cols-1 gap-3  
                         sm:grid-cols-2 xl:grid-cols-4
                         ${paddingX}`
      }>
        {storyStats.map((stat) => {
          const Icon = stat.icon
          return (
            <article
              key={stat.id}
              className='flex flex-col items-start gap-3  
                          rounded-xl bg-white border-2 border-slate-300/40 
                          h-32 max-w-60 pt-3 pb-1 pl-4 pr-2 
                          shadow-[0_0_6px_rgba(0,0,0,0.06)] backdrop-blur-sm'
            >
             <div className='flex items-center gap-4'>
              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${stat.accent}`}>
                <Icon className='h-5 w-5' />
              </div>
               <div className='flex flex-col items-start'>
                 <p className='text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-700'>{stat.label}</p>
                 <p className='text-xl font-semibold text-slate-900'>{stat.value}</p>
                </div>
              </div>
              <div className='space-y-1 '>
                <p className='text-sm text-slate-500 font-[400]'>{stat.description}</p>
                {stat.delta && <p className='text-sm font-medium text-emerald-600'>{stat.delta}</p>}
              </div>
            </article>
          )
        })}
      </section>
      <section className='row-start-1 row-end-4 col-start-2 col-end-3 flex h-full w-full flex-col gap-10 overflow-hidden pr-2'>
        <div className='space-y-4'>
          <div className='flex flex-col gap-1'>
            <p className='text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500'>Recommended Stories</p>
            <h3 className='text-lg font-semibold text-slate-900'>Jump back into tailored narratives</h3>
          </div>
          <div className='grid gap-4 overflow-y-auto pr-1 md:grid-cols-1'>
            {storyRecommendations.map((story) => (
              <article
                key={`${story.moduleNumber}-${story.title}`}
                className='group flex flex-col gap-4 rounded-xl border border-slate-200/70 bg-white/95 p-5 transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_26px_55px_rgba(79,114,205,0.18)]'
              >
                <div className='flex items-center justify-between text-xs uppercase tracking-[0.18em] text-slate-500'>
                  <span>{story.moduleNumber}</span>
                 <span className='inline-flex w-fit rounded-full bg-indigo-50 px-3 py-1 text-[11px] font-medium text-indigo-600'>{story.difficulty}</span>
                </div>
                <p className='text-sm font-semibold text-slate-900'>{story.title}</p>
                <button className='mt-1 inline-flex items-center justify-center rounded-lg border border-slate-900 px-3 py-2 text-xs font-semibold text-slate-900 transition-colors duration-150 hover:bg-slate-900 hover:text-white'>
                  {story.cta ?? 'Continue reading'}
                </button>
              </article>
            ))}
          </div>
        </div>

        <div className='space-y-4'>
          <div className='flex flex-col gap-1'>
            <p className='text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500'>Recent Activity</p>
            <h3 className='text-lg font-semibold text-slate-900'>What you tackled recently</h3>
          </div>
          <div className='grid gap-4 overflow-y-auto pr-1'>
            {recentStoryActivity.map((item) => (
              <article
                key={`${item.moduleNumber}-${item.title}`}
                className='flex flex-col gap-4 rounded-xl border border-slate-200/70 bg-white p-5 transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_26px_55px_rgba(79,114,205,0.16)]'
              >
                <div className='flex items-center justify-between text-xs uppercase tracking-[0.18em] text-slate-500'>
                  <span>{item.moduleNumber}</span>
                  <span className='text-slate-600'>{item.type}</span>
                </div>
                <p className='text-sm font-semibold text-slate-900'>{item.title}</p>
                <span className='inline-flex w-fit rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-700'>{item.difficulty}</span>
                <button className='inline-flex items-center justify-center rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 transition-colors duration-150 hover:border-slate-400 hover:bg-slate-50'>
                  {item.cta ?? 'Open story'}
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className={`row-start-2 row-end-4 col-start-1 col-end-2
                          h-full w-full
                          flex flex-wrap justify-between py-10  gap-4
                          ${paddingX}
      `}>
        {storyCardData.map((card, index) => (
            <StoryCard key={index} {...card} />
        ))}
      </section>
      </div>
    </div>
  )
}

export default page
