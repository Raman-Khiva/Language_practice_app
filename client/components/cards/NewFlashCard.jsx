import React from 'react'
import { BiBulb } from 'react-icons/bi'

const FlashCardNew = ({
  tag = 'Did you know?',
  fact = 'Some fact will be flashed here.',
  icon: Icon = BiBulb,
  accentColor = '#d7e8ff',
  borderColor = '#7cb2ff',
  iconClassName = 'text-[#006aff]',
  iconWrapperClassName = 'bg-white',
  containerClassName = '',
  headerClassName = '',
  bodyClassName = '',
}) => {
  const containerClasses = [
    'flex flex-col w-72 md:w-80 backdrop-blur-xl rounded-xl border-2  overflow-hidden transition-transform duration-500',
    containerClassName,
  ]
    .filter(Boolean)
    .join(' ')

  const headerClasses = [
    'flex items-center gap-2 font-[500] py-2 px-4 text-[#006aff]',
    headerClassName,
  ]
    .filter(Boolean)
    .join(' ')

  const iconWrapperClasses = [
    'flex h-9 w-9 items-center justify-center rounded-full',
    iconWrapperClassName,
  ]
    .filter(Boolean)
    .join(' ')

  const iconClasses = ['text-xl', iconClassName].filter(Boolean).join(' ')

  const bodyClasses = [
    'h-full w-full rounded-lg bg-white text-base md:text-lg font-[500] text-black/85 flex items-center justify-center py-3 px-6 text-center',
    bodyClassName,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={containerClasses} style={{ backgroundColor: accentColor, borderColor }}>
      <div className={headerClasses}>
        {Icon && (
          <span className={iconWrapperClasses}>
            <Icon className={iconClasses} />
          </span>
        )}
        <span className='text-[16px] font-[600]'>{tag}</span>
      </div>
      <div className={bodyClasses}>
        <p className='leading-relaxed'>{fact}</p>
      </div>
    </div>
  )
}

export default FlashCardNew