import React from 'react'
import { LuCompass } from 'react-icons/lu'

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
  cardBackground = 'linear-gradient(180deg, #f6f8ff 0%, #ffffff 45%)',
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
      className={`w-full max-w-[320px] rounded-3xl bg-white shadow-[0_20px_50px_rgba(71,101,176,0.16)] ${className}`}
      style={{ border: '1px solid rgba(226, 232, 240, 0.6)' }}
    >
      <div className="rounded-3xl p-6 pb-4" style={{ background: cardBackground }}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <span
              className="flex h-12 w-12 items-center justify-center rounded-2xl"
              style={{ backgroundColor: iconBackground, color: iconColor }}
            >
              <Icon className="text-2xl" />
            </span>
            <div className="flex flex-col">
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[#475569]">
                {lessonLabel}
              </span>
              <span className="text-3xl font-semibold text-[#1f2a5a]">{lessonNumber}</span>
              <span className="text-xs text-[#94a3b8]">{lessonSubtitle}</span>
            </div>
          </div>
          <span
            className="rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em]"
            style={{ backgroundColor: badgeBackground, color: badgeTextColor }}
          >
            {level}
          </span>
        </div>
      </div>

      <div className="px-6 pb-6">
        <div className="mt-4 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.18em] text-[#94a3b8]">
          <span className="text-[#1f2a5a] tracking-[0.18em]">{journeyHeading}</span>
          <span>{checkpointLabel} {checkpointsCompleted}/{totalCheckpoints}</span>
        </div>

        <div className="mt-5 flex w-full items-center justify-between">
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
        </div>

        <button
          type="button"
          className="mt-8 w-full rounded-2xl bg-[#fbbf24] py-3 text-sm font-semibold text-[#1f2937] shadow-[0_16px_30px_rgba(251,191,36,0.32)] transition hover:brightness-105"
        >
          {ctaLabel}
        </button>
      </div>
    </article>
  )
}

export default StoryCard

