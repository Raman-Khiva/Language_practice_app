'use client'

import { useState } from 'react'
import { HiOutlineSparkles } from 'react-icons/hi2'
import { FiBookOpen, FiSmile, FiMessageCircle, FiTrendingUp, FiMic, FiHeart } from 'react-icons/fi'
import { Languages } from 'lucide-react'


const ICON_MAP = {
  sparkles: HiOutlineSparkles,
  globe: Languages ,
  book: FiBookOpen,
  smile: FiSmile,
  heart: FiHeart,
  message: FiMessageCircle,
  trend: FiTrendingUp,
  mic: FiMic,
}

export default function FlashCard({
  fact,
  iconKey = 'sparkles',
  tag = 'Did you know?',
  accentColor = 'rgb(240, 240, 240)',
  iconToneClass = 'text-[#006aff]',
  iconBackgroundClass = 'bg-transparent',
  iconGlowClass = '',
  headerTextClass = 'text-[16px] font-[600] text-[#006aff]',
  className,
  backContent,
}) {
  const Icon = ICON_MAP[iconKey] ?? ICON_MAP.sparkles
  const [isFlipped, setIsFlipped] = useState(false)
  const hasBack = Boolean(backContent)

  const wrapperClassName = ['w-full', className].filter(Boolean).join(' ')
  const containerClasses = 'flex flex-col w-full backdrop-blur-xl rounded-xl border-2 shadow-2xl'
  const containerStyle = {
    backgroundColor: accentColor,
    borderColor: accentColor,
  }

  const headerClasses = ['flex items-center gap-2 font-[600] py-2 px-4', headerTextClass]
    .filter(Boolean)
    .join(' ')

  const renderIcon = () => {
    const iconElement = <Icon className={['text-2xl', iconToneClass].filter(Boolean).join(' ')} />

    if (iconBackgroundClass && iconBackgroundClass !== 'bg-transparent') {
      return (
        <span
          className={
            ['flex h-10 w-10 items-center justify-center rounded-full', iconBackgroundClass, iconGlowClass]
              .filter(Boolean)
              .join(' ')
          }
        >
          {iconElement}
        </span>
      )
    }

    return iconElement
  }

  const buildContentClasses = (content) => {
    const classes = [
      'h-full w-full rounded-lg bg-white text-lg font-[500] text-black/90 flex items-center justify-center py-3 px-6 text-center',
    ]

    if (typeof content === 'string') {
      classes.push('leading-relaxed')
    }

    return classes.join(' ')
  }

  const renderContent = (content) => (
    <div className={buildContentClasses(content)}>
      <div className='w-full break-words'>{content}</div>
    </div>
  )

  const handleFlipToggle = () => {
    if (!hasBack) return
    setIsFlipped((prev) => !prev)
  }

  const handleKeyToggle = (event) => {
    if (!hasBack) return
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleFlipToggle()
    }
  }

  const flipButtonClasses = [
    'relative block w-full focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-black/10',
  ].join(' ')

  const actionButtonClasses = [
    'w-full rounded-full border bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-white/90',
    iconToneClass,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={wrapperClassName}>
      <div className={containerClasses} style={containerStyle}>
        <div className={headerClasses}>
          {renderIcon()}
          <span>{tag}</span>
        </div>

        <div className='px-4 pb-4'>
          {hasBack ? (
            <button
              type='button'
              onClick={handleFlipToggle}
              onKeyDown={handleKeyToggle}
              className={flipButtonClasses}
              style={{ perspective: '1200px' }}
              aria-label={
                isFlipped ? `Show ${tag} main fact card` : `Show ${tag} additional context`
              }
            >
              <div
                className='relative h-full min-h-[200px] w-full transition-transform duration-700 ease-out'
                style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
              >
                <div className='absolute inset-0' style={{ backfaceVisibility: 'hidden' }}>
                  {renderContent(fact)}
                </div>
                <div
                  className='absolute inset-0'
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  {renderContent(backContent)}
                </div>
              </div>
            </button>
          ) : (
            renderContent(fact)          )}
        </div>

        {hasBack && (
          <div className='px-4 pb-4 pt-0'>
            <button
              type='button'
              onClick={(event) => {
                event.stopPropagation()
                handleFlipToggle()
              }}
              className={actionButtonClasses}
              style={{ borderColor: accentColor }}
            >
              {isFlipped ? 'Show main fact' : 'More context'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
