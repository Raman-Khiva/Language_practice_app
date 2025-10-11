import React from 'react'

const Button = ({text,onClick}) => {
  return (
    <button
        onClick={onClick}
        className='bg-[#5353f8] w-full text-sm text-white text-center rounded-xl px-6 py-1  cursor-pointer hover:scale-105 duration-100'
    >   
      {text}
    </button>
  )
}

export default Button;
