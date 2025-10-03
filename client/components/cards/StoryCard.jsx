import React from 'react'
import { LuCompass } from 'react-icons/lu'
import CheckpointStrip from '../progress/CheckpointStrip'
import Link from 'next/link'

const statusStyles = {
  completed: {
    circle: 'bg-[#fbbf24] border-[#fbbf24] text-white shadow-[0_4px_10px_rgba(251,191,36,0.35)]',
    connector: 'bg-[#fbbf24]'
  },
  
  current: {
    circle: 'bg-white border-[#fbbf24] text-[#fbbf24] shadow-[0_4px_10px_rgba(251,191,36,0.25)]',
    connector: 'bg-[#fbbf24]'
  },
  upcoming: {
    circle: 'bg-white border-[#e2e8f0] text-[#cbd5f5]',
    connector: 'bg-[#e2e8f0]'
  }
}

const StoryCard = ({
  lessonLabel = 'Lesson',
  lessonNumber = 18,
  lessonSubtitle = 'Learning Journey',
  level = 'Intermediate',
  journeyHeading = 'Journey Map',
  checkpointLabel = 'Checkpoint',
  checkpointsCompleted = 2,
  totalCheckpoints = 4,
  journeyStages = [
    { label: 'Start', status: 'completed' },
    { label: 'Stage 1', status: 'completed' },
    { label: 'Stage 2', status: 'current' },
    { label: 'Finish', status: 'upcoming' }
  ],
  ctaLabel = 'Continue Path',
  icon: Icon = LuCompass,
  iconBackground = '#fff7db',
  iconColor = '#f59e0b',
  badgeBackground = '#e7ecff',
  badgeTextColor = '#5562ff',
  cardBackground = '#ffffff',
  className = '',
}) => {
  const normalizedStages = Array.isArray(journeyStages) && journeyStages.length
    ? journeyStages
    : [
        { label: 'Start', status: 'completed' },
        { label: 'Stage 1', status: 'completed' },
        { label: 'Stage 2', status: 'current' },
        { label: 'Finish', status: 'upcoming' }
      ]

  return (
    <article
      className={`w-full max-w-[320px] rounded-2xl border-2 border-gray-200/80
                  shadow-sm bg-white
                  flex flex-col gap-3
                  px-3 pt-3 pb-4
    `}
  >
      <div className="rounded-xl bg-white 
      ">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-4">
            <span
              className="flex h-10 w-10 items-center justify-center rounded-xl
              bg-[#1e52f1] text-white"
            >
              <Icon className="text-xl" />
            </span>
            <div className="flex flex-col">
              <span className="text-[10px] leading-tight font-semibold uppercase tracking-[0.15em] text-[#475569]">
                {lessonLabel}
              </span>
              <span className="text-xl font-[600] leading-tight text-[#1f2a5a]">{lessonNumber}</span>
            </div>
          </div>
          <span
            className="rounded-full px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.15em]"
            style={{ backgroundColor: badgeBackground, color: badgeTextColor }}
          >
            {level}
          </span>
        </div>
      </div>

      <span className="text-lg font-[500]">{lessonSubtitle}</span>
      <div className="w-full flex flex-col justify-between">
        <div className="mt-3 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.10em] text-[#94a3b8]">
          <span className="text-[#1f2a5a] tracking-[0.10em]">{journeyHeading}</span>
          <span>{checkpointLabel} {checkpointsCompleted}/{totalCheckpoints}</span>
        </div>

       <div className='w-full py-4'>
        <CheckpointStrip />
       </div>
        {/* <div className="mt-5 flex w-full items-center justify-between">
          {normalizedStages.map((stage, index) => {
            const styleSet = statusStyles[stage.status] || statusStyles.upcoming
            const isLast = index === normalizedStages.length - 1

            return (
              <React.Fragment key={`${stage.label}-${index}`}>
                <div className="flex flex-col items-center gap-2">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold ${styleSet.circle}`}
                  >
                    {index + 1}
                  </span>
                  <span className="text-xs font-medium text-[#64748b]">{stage.label}</span>
                </div>
                {!isLast && (
                  <div className={`mx-3 h-[2px] flex-1 rounded-full ${styleSet.connector}`} style={{ minWidth: '24px' }} />
                )}
              </React.Fragment>
            )
          })}
        </div> */}

        <Link
          href="/stories/story"
          className="mt-3 w-full text-center rounded-xl bg-[#1e52f1] py-2 text-sm font-semibold text-white transition hover:brightness-105"
        >
          {ctaLabel}
        </Link>
      </div>
    </article>
  )
}

export default StoryCard

