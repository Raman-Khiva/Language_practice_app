import React from 'react'

const Badge = ({tag,icon:Icon}) => {
  return ( //text-[#006aff]
    <div className='flex items-center gap-2 
                     w-fit px-5 py-1.5 rounded-4xl
                     bg-[rgb(251,251,251)] 
                    border-[1.5px] border-black/10
                    shadow-md shadow-violet-300
    '>


      <Icon className="text-xl font-[600] ubuntu text-violet-600 " />
      {/* <svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
  focusable="false"
>
  <defs>
    <linearGradient id="geminiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#00E5FF" />   
      <stop offset="40%" stopColor="#2979FF" />  
      <stop offset="75%" stopColor="#9C27B0" />  
      <stop offset="100%" stopColor="#FF4081" />
    </linearGradient>
  </defs>

  <path
    d="M12 2.75l.34 1.58c.65 3.05 3.03 5.43 6.08 6.08l1.58.34c.64.14.64 1.03 0 1.17l-1.58.34c-3.05.65-5.43 3.03-6.08 6.08l-.34 1.58c-.14.64-1.03.64-1.17 0l-.34-1.58c-.65-3.05-3.03-5.43-6.08-6.08l-1.58-.34c-.64-.14-.64-1.03 0-1.17l1.58-.34c3.05-.65 5.43-3.03 6.08-6.08l.34-1.58c.14-.64 1.03-.64 1.17 0z"
    fill="url(#geminiGradient)"
  />
  <path
    d="M18.8 1.2l.2.72c.16.58.61 1.03 1.19 1.19l.72.2c.61.17.61 1.02 0 1.19l-.72.2c-.58.16-1.03.61-1.19 1.19l-.2.72c-.17.61-1.02.61-1.19 0l-.2-.72c-.16-.58-.61-1.03-1.19-1.19l-.72-.2c-.61-.17-.61-1.02 0-1.19l.72-.2c.58-.16 1.03-.61 1.19-1.19l.2-.72c.17-.61 1.02-.61 1.19 0z"
    fill="url(#geminiGradient)"
    opacity="0.8"
  />
</svg> */}


      <p className='text-[#303030] text-sm font-[500]'>{tag}</p>
    </div>
  )
}

export default Badge
