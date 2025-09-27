'use client'
import React, { useState } from 'react'
import { storiesMock } from '@/mock/stories'
import Highlighter from '@/components/visuals/Highlighter'

const paragraphClass = 'text-2xl font-medium  '

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



const page = () => {
  
  const [idx, setIdx] = useState(0);

  const handleNext = () => {
    if(idx === storiesMock[0].paragraphs.length - 1) return;
    setIdx((prev) => prev + 1);
  }



  return (
    <section className='w-full h-screen overflow-y-hidden
                        px-36 pt-6  bg-[#f4f4ed] border-b 

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



        <section className='w-full h-full flex flex-col  
                            border-[2px_2px_0_2px] px-12 pt-4 
                            border-blue-500 rounded-t-2xl 
                            ring-5 ring-blue-200/60
                            
                            bg-[#fff]'>

            <div className='w-full  min-h-fit
                            flex flex-col gap-8 
                            pt-5 overflow-auto 
                            scrollbar-hidden
            '>

            
          

           {storiesMock[0].paragraphs.map((block,index)=>{

            if(index <= idx){
              return(
             <div key={`${index}-duplicate`} 
                className='flex h-max gap-8'
             >
              <div className={`flex-1 h-full leading-relaxed
                            ` + paragraphClass
              }>
                {renderHighlightedText(block.text, highlightConfigs[index]?.text)}
              </div>
              <div
               className={`flex-1 h-full leading-relaxed
                            flex flex-col gap-2
                           ` + paragraphClass
              }>
                <p>
                  {block.translation}
                </p>
                {(index != storiesMock[0].paragraphs.length - 1) && (index==idx) && (
                 <div className='flex justify-end items-center py-2 px-8'>
                   <button onClick={handleNext}
                        className='text-lg bg-blue-600 text-white px-8 py-1 rounded-lg'
                   >
                     Next
                   </button>
                 </div>

              )}
              </div>
            </div>
            )}
            })}
           {storiesMock[0].paragraphs.map((block,index)=>{

            if(index <= idx){
              return(
             <div key={`${index}-duplicate`} 
                className='flex h-max gap-8'
             >
              <div className={`flex-1 h-full leading-relaxed
                            ` + paragraphClass
              }>
                {renderHighlightedText(block.text, highlightConfigs[index]?.text)}
              </div>
              <div
               className={`flex-1 h-full leading-relaxed
                            flex flex-col gap-2
                           ` + paragraphClass
              }>
                <p>
                  {block.translation}
                </p>
                {(index != storiesMock[0].paragraphs.length - 1) && (index==idx) && (
                 <div className='flex justify-end items-center py-2 px-8'>
                   <button onClick={handleNext}
                        className='text-lg bg-blue-600 text-white px-8 py-1 rounded-lg'
                   >
                     Next
                   </button>
                 </div>

              )}
              </div>
            </div>
            )}
            })}
          </div>

        </section>
        
      </section>
    </section>
  )
}

export default page
