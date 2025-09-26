
import React from 'react'
import { storiesMock } from '@/mock/stories'
import Navbar from '@/components/Navbar/Navbar'

const paragraphClass = 'text-2xl font-medium  '
const translationClass = 'text-xl font-medium bg-white px-4 py-3 rounded-2xl text-slate-700 shadow-[0_16px_40px_rgba(79,114,205,0.15)]'

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
    const { className = '', info = {} } = highlight || {}
    const { type, meaning, pronunciation } = info
    const hasInfo = Boolean(type || meaning || pronunciation)

    return (
      <span key={`highlight-${index}`} className='relative inline-block group'>
        <span className={className}>
          {value}
        </span>
        {hasInfo && (
          <span className='pointer-events-none absolute left-1/2 top-full z-30 mt-3 w-64 -translate-x-1/2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 opacity-0 shadow-[0_16px_48px_rgba(15,23,42,0.15)] transition-opacity duration-200 group-hover:opacity-100'>
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
          </span>
        )}
      </span>
    )
  })
}

const highlightConfigs = [
  {
    text: [
      {
        word: 'aprendiendo',
        className: 'text-violet-700 font-semibold cursor-pointer',
        info: {
          type: 'Verb',
          meaning: 'Learning',
          pronunciation: 'ah-pren-DYEN-doh',
        },
      },
      {
        word: 'culturas',
        className: 'text-yellow-500 font-semibold underline decoration-dashed cursor-pointer',
        info: {
          type: 'Noun',
          meaning: 'Cultures',
          pronunciation: 'kool-TOO-rahs',
        },
      },
      {
        word: 'fluidez',
        className: 'text-violet-700 font-semibold cursor-pointer',
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
        className: 'text-violet-700 font-semibold cursor-pointer',
        info: {
          type: 'Noun',
          meaning: 'Conversation',
          pronunciation: 'kon-ver-sa-SYON',
        },
      },
      {
        word: 'palabras nuevas',
        className:
          'text-indigo-600 bg-indigo-100/40 border-2 border-indigo-200 px-2 pb-1 rounded-lg cursor-pointer',
        info: {
          type: 'Phrase',
          meaning: 'New words',
          pronunciation: 'pa-LAH-bras NWE-vas',
        },
      },
      {
        word: 'reforzar',
        className: 'text-violet-700 font-semibold cursor-pointer',
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
        className: 'text-violet-700 font-semibold cursor-pointer',
        info: {
          type: 'Noun',
          meaning: 'Mistakes',
          pronunciation: 'eh-RO-res',
        },
      },
      {
        word: 'exactamente',
        className: 'text-yellow-500 font-semibold underline decoration-dashed cursor-pointer',
        info: {
          type: 'Adverb',
          meaning: 'Exactly',
          pronunciation: 'ek-sak-ta-MEN-te',
        },
      },
      {
        word: 'concentrarnos',
        className: 'text-violet-700 font-semibold cursor-pointer',
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
        className: 'text-violet-700 blur-[0.2px] font-semibold underline decoration-dashed cursor-pointer',
        info: {
          type: 'Noun',
          meaning: 'Stories',
          pronunciation: 'ees-TO-ree-ahs',
        },
      },
      {
        word: 'motivación',
        className: 'text-violet-700 font-semibold cursor-pointer',
        info: {
          type: 'Noun',
          meaning: 'Motivation',
          pronunciation: 'mo-tee-va-SYON',
        },
      },
      {
        word: 'acompañados',
        className: 'text-violet-700 font-semibold cursor-pointer',
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
        className: 'text-violet-700 font-semibold cursor-pointer',
        info: {
          type: 'Phrase',
          meaning: 'We keep moving forward',
          pronunciation: 'seh-GEE-mos ah-de-LAN-te',
        },
      },
      {
        word: 'paciencia',
        className: 'text-violet-700 font-semibold cursor-pointer',
        info: {
          type: 'Noun',
          meaning: 'Patience',
          pronunciation: 'pa-syen-SYA',
        },
      },
      {
        word: 'constancia',
        className: 'text-violet-700 font-semibold cursor-pointer',
        info: {
          type: 'Noun',
          meaning: 'Consistency',
          pronunciation: 'kon-STAN-sya',
        },
      },
    ],
  },
]



const page = ({ params }) => {
  

  return (
    <section className='w-full min-h-screen
                        px-36 pt-6  bg-[#f6f6f6]
    '>
     
      
      <section className='w-full h-full 
                          flex flex-col 
      '>


        <header className='flex  gap-3
                           w-full pb-8
        '>
          
          <p className='text-3xl text-blue-700 uppercase font-bold'>1. </p>
          <p className='text-3xl font-semibold text-blue-700'>{storiesMock[0].title}</p>
        </header>



        <section className='w-full flex flex-col  
                            border-[2px_2px_0_2px] px-12 pt-4 
                            border-blue-500 rounded-t-2xl 
                            ring-5 ring-blue-200/60
                            
                            bg-[#fff]'>

            <div className='w-full h-full 
                            flex flex-col gap-8 
                            pt-5 pb-12
                            
            '>

            
           {storiesMock[0].paragraphs.map((block,index)=>(
             <div key={index} 
                className='flex h-max gap-8 leading-relaxed'
             >
              <p className={`flex-1 h-full leading-relaxed
                            ` + paragraphClass
              }>
                {renderHighlightedText(block.text, highlightConfigs[index]?.text)}
              </p>
              <p className={`flex-1 h-full leading-relaxed
                          ` + paragraphClass
              }>
                {block.translation}
              </p>
             </div>
           ))}
           {storiesMock[0].paragraphs.map((block,index)=>(
             <div key={`${index}-duplicate`} 
                className='flex h-max gap-8'
             >
              <p className={`flex-1 h-full leading-relaxed
                            ` + paragraphClass
              }>
                {renderHighlightedText(block.text, highlightConfigs[index]?.text)}
              </p>
              <p className={`flex-1 h-full leading-relaxed
                          ` + paragraphClass
              }>
                {block.translation}
              </p>
             </div>
           ))}
          </div>

        </section>
        
      </section>
    </section>
  )
}

export default page
