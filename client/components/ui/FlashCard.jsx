'use client'

import { useState } from 'react'
import { HiOutlineSparkles } from 'react-icons/hi2'
import { FiGlobe, FiBookOpen, FiSmile, FiMessageCircle, FiTrendingUp, FiMic, FiHeart } from 'react-icons/fi'

const ICON_MAP = {
  sparkles: HiOutlineSparkles,
  globe: FiGlobe,
  book: FiBookOpen,
  smile: FiSmile,
  heart: FiHeart,
  message: FiMessageCircle,
  trend: FiTrendingUp,
  mic: FiMic,
}

/**
 * FlashCard component
 *
 * Props:
 * - fact: string | JSX.Element (primary fact text)
 * - icon: React component (icon rendered in the header)
 * - tag: string (header label, defaults to "Did you know?")
 * - accentColor: string CSS color used for header background & border
 * - className: string additional Tailwind classes for the outer wrapper
 */
export default function FlashCard({
  fact,
  iconKey = 'sparkles',
  tag = 'Did you know?',
  accentColor = 'rgb(240, 240, 240)',
  iconToneClass = 'text-indigo-600',
  iconBackgroundClass = 'bg-white/90',
  iconGlowClass = 'shadow-[0_0_18px_rgba(79,70,229,0.25)]',
  headerTextClass = 'text-sm font-semibold uppercase tracking-wide text-slate-700',
  className,
  backContent,
}) {
  const Icon = ICON_MAP[iconKey] ?? ICON_MAP.sparkles
  const wrapperClassName = ['w-full', className].filter(Boolean).join(' ')
  const [isFlipped, setIsFlipped] = useState(false)
  const hasBack = Boolean(backContent)

  const frontContentClass = ['w-full']
  if (typeof fact === 'string') {
    frontContentClass.push('text-base sm:text-lg font-medium leading-relaxed text-slate-700')
  }

  const backContentClass = ['w-full']
  if (typeof backContent === 'string') {
    backContentClass.push('text-base sm:text-lg font-medium leading-relaxed text-slate-700')
  }

  const handleCardClick = () => {
    if (!hasBack) return
    setIsFlipped((prev) => !prev)
  }

  const handleKeyDown = (event) => {
    if (!hasBack) return
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleCardClick()
    }
  }

  const renderHeader = () => (
    <header
      className="flex items-center gap-3 px-5 py-3"
      style={{ backgroundColor: accentColor }}
    >
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-full ${iconBackgroundClass} ${iconGlowClass}`.trim()}
      >
        <Icon className={`text-2xl ${iconToneClass}`} />
      </span>
      <span className={headerTextClass}>
        {tag}
      </span>
    </header>
  )

  return (
    <div className={wrapperClassName}>
      <div className="relative aspect-[2/1] max-w-xl mx-auto perspective-[1400px]">
        <div
          className={`absolute inset-0 flex overflow-hidden rounded-3xl bg-white shadow-md transition-transform duration-300 hover:-translate-y-1 ${hasBack ? 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-300 focus:ring-offset-2' : ''}`}
          style={{ border: `1px solid ${accentColor}` }}
          onClick={hasBack ? handleCardClick : undefined}
          onKeyDown={hasBack ? handleKeyDown : undefined}
          role={hasBack ? 'button' : undefined}
          tabIndex={hasBack ? 0 : undefined}
        >
          <div className="relative h-full w-full">
            <div
              className={`absolute inset-0 h-full w-full ${hasBack ? 'transition-transform duration-500' : ''}`}
              style={hasBack ? { transformStyle: 'preserve-3d', transform: `rotateY(${isFlipped ? 180 : 0}deg)` } : undefined}
            >
              <div
                className="absolute inset-0 flex flex-col"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(0deg)' }}
              >
                {renderHeader()}

                <div className="flex flex-1 items-center bg-white px-6 py-5">
                  <div className={frontContentClass.join(' ')}>
                    {fact}
                  </div>
                </div>
              </div>

              {hasBack && (
                <div
                  className="absolute inset-0 flex flex-col"
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  {renderHeader()}

                  <div className="flex flex-1 items-center bg-white px-6 py-5">
                    <div className={backContentClass.join(' ')}>
                      {backContent}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {hasBack && (
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              handleCardClick()
            }}
            className="px-4 py-2 rounded-full border border-rose-200 bg-white text-sm font-medium text-rose-600 shadow-sm transition-colors hover:bg-rose-50"
          >
            {isFlipped ? 'See fun fact' : 'More context'}
          </button>
        </div>
      )}
    </div>
  )
}
