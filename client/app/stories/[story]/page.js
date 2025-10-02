'use client'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { storiesMock } from '@/mock/stories'
import Highlighter from '@/components/visuals/Highlighter'
import Image from 'next/image'

const paragraphClass = 'text-2xl font-[700] ubuntu '
const TYPING_INTERVAL = 32

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const renderHighlightedText = (text, highlights = []) => {
  if (!highlights.length) return text

  let segments = [text]

  highlights.forEach((highlight) => {
    const { word } = highlight
    if (!word) return

    const regex = new RegExp(`(${escapeRegExp(word)})`, 'gi')

    segments = segments.flatMap((segment) => {
      if (typeof segment !== 'string') return [segment]

      const parts = segment.split(regex).filter(Boolean)

      return parts.map((part) => {
        if (part.toLowerCase() === word.toLowerCase()) {
          return { type: 'highlight', text: part, highlight }
        }
        return part
      })
    })
  })

  return segments.map((segment, index) => {
    if (typeof segment === 'string') {
      return (
        <React.Fragment key={`segment-${index}`}>
          {segment}
        </React.Fragment>
      )
    }

    const { highlight, text: value } = segment
    const { className = '', info = {}, style = {} } = highlight || {}
    const { type, meaning, pronunciation } = info
    const hasInfo = Boolean(type || meaning || pronunciation)

    let styledValue = <span className={className}>{value}</span>

    if (style?.mode === 'highlighter') {
      styledValue = (
        <Highlighter {...(style.options || {})}>
          <span className={className}>{value}</span>
        </Highlighter>
      )
    }

    return (
      <div key={`highlight-${index}`} className='relative inline-block group'>
        {styledValue}
        {hasInfo && (
          <div className='pointer-events-none absolute left-1/2 top-full z-30 mt-3 w-64 -translate-x-1/2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 opacity-0 shadow-[0_16px_48px_rgba(15,23,42,0.15)] transition-opacity duration-200 group-hover:opacity-100'>
            {type && (
              <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-400'>
                {type}
              </p>
            )}
            {meaning && (
              <p className='mt-1 text-sm font-semibold text-slate-900'>
                {meaning}
              </p>
            )}
            {pronunciation && (
              <p className='mt-2 text-xs text-slate-500'>
                <span className='font-semibold text-slate-600'>Pronunciation:</span> {pronunciation}
              </p>
            )}
          </div>
        )}
      </div>
    )
  })
}

const highlightConfigs = [
  {
    text: [
      {
        word: 'aprendiendo',
        className: 'font-semibold cursor-pointer',
        style: {
          mode: 'highlighter',
          options: {
            action: 'highlight',
            color: '#fff44f',
            animationDuration: 500,
            iterations: 1,
            padding: 4,
          },
        },
        info: {
          type: 'Verb',
          meaning: 'Learning',
          pronunciation: 'ah-pren-DYEN-doh',
        },
      },
      {
        word: 'culturas',
        className:
          'font-semibold text-amber-500 underline decoration-amber-400 decoration-2 leading-tight cursor-pointer',
        info: {
          type: 'Noun',
          meaning: 'Cultures',
          pronunciation: 'kool-TOO-rahs',
        },
      },
      {
        word: 'fluidez',
        className: 'font-semibold text-violet-600 cursor-pointer',
        info: {
          type: 'Noun',
          meaning: 'Fluency',
          pronunciation: 'floo-ee-DEZ',
        },
      },
    ],
  },
  {
    text: [
      {
        word: 'conversación',
        className: 'font-semibold text-purple-600 cursor-pointer',
        info: {
          type: 'Noun',
          meaning: 'Conversation',
          pronunciation: 'kon-ver-sa-SYON',
        },
      },
      {
        word: 'palabras nuevas',
        className:
          'font-semibold text-indigo-700 bg-indigo-100/70 border border-indigo-200 px-2 py-1 rounded-lg cursor-pointer',
        info: {
          type: 'Phrase',
          meaning: 'New words',
          pronunciation: 'pa-LAH-bras NWE-vas',
        },
      },
      {
        word: 'reforzar',
        className:
          'font-semibold text-purple-600 underline decoration-purple-400 decoration-2 leading-tight cursor-pointer',
        info: {
          type: 'Verb',
          meaning: 'To reinforce',
          pronunciation: 'reh-for-ZAR',
        },
      },
    ],
  },
  {
    text: [
      {
        word: 'errores',
        className: 'font-semibold leading-tight cursor-pointer',
        style: {
          mode: 'highlighter',
          options: {
            action: 'underline',
            color: '#fff44f',
            strokeWidth: 3,
            padding: 0,
            animationDuration: 500,
            iterations: 1,
          },
        },
        info: {
          type: 'Noun',
          meaning: 'Mistakes',
          pronunciation: 'eh-RO-res',
        },
      },
      {
        word: 'exactamente',
        className:
          'font-semibold text-amber-500 underline decoration-dotted decoration-2 leading-tight cursor-pointer',
        info: {
          type: 'Adverb',
          meaning: 'Exactly',
          pronunciation: 'ek-sak-ta-MEN-te',
        },
      },
      {
        word: 'concentrarnos',
        className: 'font-semibold cursor-pointer',
        style: {
          mode: 'highlighter',
          options: {
            action: 'highlight',
            color: '#fff44f',
            animationDuration: 500,
            iterations: 1,
            padding: 4,
          },
        },
        info: {
          type: 'Verb',
          meaning: 'To focus ourselves',
          pronunciation: 'kon-sen-TRAR-nos',
        },
      },
    ],
  },
  {
    text: [
      {
        word: 'historias',
        className: 'font-semibold cursor-pointer',
        style: {
          mode: 'highlighter',
          options: {
            action: 'highlight',
            color: '#fff44f',
            animationDuration: 500,
            iterations: 1,
            padding: 4,
          },
        },
        info: {
          type: 'Noun',
          meaning: 'Stories',
          pronunciation: 'ees-TO-ree-ahs',
        },
      },
      {
        word: 'motivación',
        className: 'font-semibold text-orange-500 cursor-pointer',
        info: {
          type: 'Noun',
          meaning: 'Motivation',
          pronunciation: 'mo-tee-va-SYON',
        },
      },
      {
        word: 'acompañados',
        className:
          'font-semibold text-fuchsia-600 underline decoration-wavy decoration-fuchsia-400 decoration-2 leading-tight cursor-pointer',
        info: {
          type: 'Adjective',
          meaning: 'Accompanied',
          pronunciation: 'ah-kom-pa-NYA-dos',
        },
      },
    ],
  },
  {
    text: [
      {
        word: 'Seguimos adelante',
        className: 'font-semibold cursor-pointer',
        style: {
          mode: 'highlighter',
          options: {
            action: 'highlight',
            color: '#fff44f',
            animationDuration: 500,
            iterations: 1,
            padding: 6,
          },
        },
        info: {
          type: 'Phrase',
          meaning: 'We keep moving forward',
          pronunciation: 'seh-GEE-mos ah-de-LAN-te',
        },
      },
      {
        word: 'paciencia',
        className: 'font-semibold text-emerald-600 cursor-pointer',
        info: {
          type: 'Noun',
          meaning: 'Patience',
          pronunciation: 'pa-syen-SYA',
        },
      },
      {
        word: 'constancia',
        className: 'font-semibold text-violet-600 bg-violet-100/60 border border-violet-200 px-2 py-1 rounded-lg cursor-pointer',
        info: {
          type: 'Noun',
          meaning: 'Consistency',
          pronunciation: 'kon-STAN-sya',
        },
      },
    ],
  },
]


const ParagraphRow = ({
  block,
  highlightConfig,
  isActive,
  onTypingStart,
  onTypingComplete,
  showNext,
  onNext,
  sourceLang,
  targetLang,
}) => {
  const { text = '', translation = '' } = block || {}
  const [displayedText, setDisplayedText] = useState(isActive ? '' : text)
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    let intervalId

    if (!isActive) {
      setDisplayedText(text)
      setIsTyping(false)
      return () => {
        if (intervalId) window.clearInterval(intervalId)
      }
    }

    setIsTyping(true)
    onTypingStart?.()
    setDisplayedText('')

    if (!text?.length) {
      setIsTyping(false)
      onTypingComplete?.()
      return () => {}
    }

    let charIndex = 0
    intervalId = window.setInterval(() => {
      charIndex += 1
      const nextSlice = text.slice(0, charIndex)
      setDisplayedText(nextSlice)

      if (charIndex >= text.length) {
        window.clearInterval(intervalId)
        setIsTyping(false)
        onTypingComplete?.()
      }
    }, TYPING_INTERVAL)

    return () => {
      if (intervalId) window.clearInterval(intervalId)
    }
  }, [isActive, text, onTypingStart, onTypingComplete])

  return (
    <div className='flex h-max gap-6'>
      

      <div className='flex flex-1 gap-8'>
        <div className='flex flex-1 items-start gap-2'>
          <div className='mt-2 flex shrink-0 items-center justify-center rounded-full border-2 border-slate-600 p-[1.2px]'>
            <Image
              src='/spain.png'
              alt='Spain flag'
              width={32}
              height={32}
              className='h-7 w-7 shrink-0 rounded-full object-cover'
            />
          </div>
          <div className={`h-full leading-relaxed text-[#2c2c2d] ${paragraphClass}`}>
            {renderHighlightedText(displayedText, highlightConfig)}
          </div>
        </div>

        <div className={`flex flex-1 items-start gap-2 ${paragraphClass}`}>
          <div className='mt-2 flex shrink-0 items-center justify-center rounded-full border-2 border-slate-600 p-[1.2px]'>
            <Image
              src='/uk.png'
              alt='United Kingdom flag'
              width={32}
              height={32}
              className='h-7 w-7 shrink-0 rounded-full object-cover'
            />
          </div>
          <div className='flex h-full flex-1 flex-col gap-2 leading-relaxed'>
            <p>{translation}</p>
            {showNext && (
              <div className='flex justify-end items-center py-2 px-8'>
                <button
                  type='button'
                  onClick={isTyping ? undefined : onNext}
                  disabled={isTyping}
                  className={`text-lg px-8 py-1 rounded-lg transition-colors duration-150 ${
                    isTyping
                      ? 'bg-blue-200 text-blue-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isTyping ? 'Typing…' : 'Next'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}


const page = () => {
  const story = useMemo(() => storiesMock?.[0] ?? null, [])
  const paragraphs = useMemo(() => story?.paragraphs ?? [], [story])

  const [activeIndex, setActiveIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)

  const handleTypingStart = useCallback(() => {
    setIsTyping(true)
  }, [])

  const handleTypingComplete = useCallback(() => {
    setIsTyping(false)
  }, [])

  useEffect(() => {
    if (!paragraphs.length) {
      setIsTyping(false)
    }
  }, [paragraphs.length])

  const handleNext = useCallback(() => {
    if (isTyping) return

    setActiveIndex((prev) => {
      if (prev >= paragraphs.length - 1) return prev
      return prev + 1
    })
  }, [isTyping, paragraphs.length])

  return (
    <section className='w-full h-screen overflow-y-hidden px-36 pt-6 bg-[#f4f4ed] border-b'>
      <section className='flex h-full w-full flex-col'>
        <header className='flex w-full gap-3 pb-8'>
          <p className='text-3xl font-bold uppercase text-blue-700'>1.</p>
          <p className='text-3xl font-semibold text-blue-700'>{story?.title ?? 'Story'}</p>
        </header>

        <section className='flex h-full w-full flex-col rounded-t-2xl border-[2px_2px_0_2px] border-blue-500 bg-white px-12 pt-4 ring-5 ring-blue-200/60'>
          <div className='scrollbar-hidden mb-20 flex h-full w-full flex-col gap-8 overflow-auto scroll-smooth'>
            {paragraphs.map((block, index) => {
              if (index > activeIndex) return null

              return (
                <ParagraphRow
                  key={`story-paragraph-${index}`}
                  block={block}
                  highlightConfig={highlightConfigs[index]?.text}
                  isActive={index === activeIndex}
                  onTypingStart={handleTypingStart}
                  onTypingComplete={handleTypingComplete}
                  showNext={index === activeIndex && index < paragraphs.length - 1}
                  onNext={handleNext}
                  sourceLang={story?.sourceLanguage}
                  targetLang={story?.targetLanguage}
                />
              )
            })}
          </div>
        </section>
      </section>
    </section>
  )
}

export default page
