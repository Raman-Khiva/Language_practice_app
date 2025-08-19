import React from 'react'

// Linear progress bar
// - Accepts a percentage value (0-100)
// - Renders a filled bar and numeric label
const ProgressBar = ({ percent = 0 }) => {
  const safe = Math.max(0, Math.min(100, Number(percent) || 0));
  return (
    <div className='flex items-center gap-2 w-full max-w-xs sm:max-w-none'>
      <div className='w-full sm:w-52 h-2 bg-gray-300 rounded-3xl'>
        <div className='h-full bg-[#34cc3e] rounded-3xl' style={{ width: `${safe}%` }}/>
      </div>
      <h6 className='text-xs font-[700] text-gray-500'>{safe}%</h6>
    </div>
  )
}

export default ProgressBar
