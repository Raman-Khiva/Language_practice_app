


import StoryCard from '@/components/ui/StoryCard'
import { storyCardData } from '@/mock/storyCards'
import React from 'react'

const storyRecommendations = [
  {
    name: 'Cultural Conversations',
    message: 'Build real-world fluency with role-play dialogues tailored to your previous lessons.',
  },
  {
    name: 'Listening Lab: City Voices',
    message: 'Strengthen comprehension with fast-paced native clips that match your current streak.',
  },
  {
    name: 'Grammar Glide Challenge',
    message: 'Consolidate tricky tense patterns spotted in your latest checkpoints.',
  },
]

const recentStoryActivity = [
  {
    name: 'Journey to the Market',
    lessonNumber: 17,
    difficulty: 'B1',
    progress: '3 / 4 checkpoints',
  },
  {
    name: 'Mystery in Midtown',
    lessonNumber: 11,
    difficulty: 'B2',
    progress: '2 / 5 checkpoints',
  },
  {
    name: 'Echoes of the Coast',
    lessonNumber: 5,
    difficulty: 'A2',
    progress: 'Completed',
  },
]

const page = () => {
  return (
    <div className='mt-16 w-full overflow-x-hidden bg-[#fffffb] pl-10 pr-5 grid grid-rows-[9rem_30rem_1fr] grid-cols-[auto_22rem] gap-2'>
      <section className='row-start-1 row-end-2 col-start-1 col-end-2
      '>
        stats
      </section>
      <section className='row-start-1 row-end-4 col-start-2 col-end-3
                          h-full w-full flex flex-col gap-4
      '>
        <div className='flex-1 rounded-3xl bg-white p-6 shadow-[0_20px_45px_RGBA(79,114,205,0.15)] border border-slate-200/60 flex flex-col'>
          <div>
            <p className='text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500'>Recommended Stories</p>
          </div>
          <div className='mt-5 flex-1 space-y-3 overflow-auto pr-1'>
            {storyRecommendations.map((story) => (
              <div
                key={story.name}
                className='rounded-2xl border border-slate-200/70 bg-slate-50 px-4 py-3 shadow-[0_6px_18px_rgba(79,114,205,0.12)]'
              >
                <p className='text-sm font-semibold text-slate-900'>{story.name}</p>
                <p className='mt-1 text-xs leading-5 text-slate-600'>{story.message}</p>
              </div>
            ))}
          </div>
        </div>

        <div className='flex-1 rounded-3xl bg-white p-6 shadow-[0_20px_45px_rgba(79,114,205,0.15)] border border-slate-200/60 flex flex-col'>
          <div>
            <p className='text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500'>Recent Activity</p>
            <h3 className='mt-2 text-lg font-semibold text-slate-900'>What you tackled recently</h3>
          </div>
          <div className='mt-5 flex-1 space-y-3 overflow-auto pr-1'>
            {recentStoryActivity.map((item) => (
              <div
                key={`${item.name}-${item.lessonNumber}`}
                className='rounded-2xl border border-slate-200/70 bg-white px-4 py-3 shadow-[0_6px_18px_rgba(79,114,205,0.1)]'
              >
                <p className='text-sm font-semibold text-slate-900'>{item.name}</p>
                <div className='mt-1 flex flex-wrap gap-3 text-xs font-medium text-slate-600'>
                  <span className='rounded-full bg-slate-100 px-2 py-0.5 text-[11px] uppercase tracking-[0.18em] text-slate-700'>Lesson {item.lessonNumber}</span>
                  <span className='rounded-full bg-slate-100 px-2 py-0.5 text-[11px] uppercase tracking-[0.18em] text-slate-700'>Diff. {item.difficulty}</span>
                  <span className='text-[11px] uppercase tracking-[0.18em] text-slate-500'>{item.progress}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className='row-start-2 row-end-4 col-start-1 col-end-2
                          h-full w-full
                          flex flex-wrap justify-center py-10 pr-10 pl-0 gap-4
      '>
        {storyCardData.map((card, index) => (
            <StoryCard key={index} {...card} />
        ))}
      </section>
    </div>
  )
}

export default page
