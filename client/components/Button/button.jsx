import React from 'react'

const Button = ({data}) => {
  return (
    <button
        className='bg-[#5353f8]  text-lg text-white text-center rounded-2xl px-6 py-2 font-bold cursor-pointer hover:scale-105 duration-100'

    >   
        {data}
    </button>
  )
}

export default Button;
