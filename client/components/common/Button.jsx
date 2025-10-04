import React from 'react'

const Button = ({text}) => {
  return (
    <button
        className='bg-[#5353f8] w-full text-md text-white text-center rounded-2xl px-6 py-1  cursor-pointer hover:scale-105 duration-100'

    >   
      {text}
    </button>
  )
}

export default Button;
