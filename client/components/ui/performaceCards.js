import React from 'react'

const performaceCards = ({children, className}) => {
  return (
    <div className={` w-36 h-24 flex flex-col justify-end items-center
                    text-lg rounded-xl ` + className}
    >
      {children}
    </div>
  )
}

export default performaceCards
