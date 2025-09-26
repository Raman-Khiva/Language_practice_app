import React from 'react'
import Navbar from '@/components/Navbar/Navbar'

const page = ({children}) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}

export default page
