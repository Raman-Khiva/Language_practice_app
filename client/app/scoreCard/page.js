import React from 'react'

const page = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <div className='flex flex-col gap-4'>
        
        {/* <div className='w-[26rem] flex justify-start border-2 rounded-3xl border-green-600 ring-5 ring-[#cff6cd]'> */}
          <div className='h-[30rem] w-96 bg-[#f4fff1e0] border-2 border-green-600  ring-5 ring-[#cff6cd] rounded-xl
                          p-4
                          flex flex-col gap-2
          '>
              <div className='w-full flex flex-col items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" fill='#3fbe28' x="0px" y="0px" width="76" height="76" viewBox="0 0 24 24">
                    <path d="M 12 2 C 6.486 2 2 6.486 2 12 C 2 17.514 6.486 22 12 22 C 17.514 22 22 17.514 22 12 C 22 10.874 21.803984 9.7942031 21.458984 8.7832031 L 19.839844 10.402344 C 19.944844 10.918344 20 11.453 20 12 C 20 16.411 16.411 20 12 20 C 7.589 20 4 16.411 4 12 C 4 7.589 7.589 4 12 4 C 13.633 4 15.151922 4.4938906 16.419922 5.3378906 L 17.851562 3.90625 C 16.203562 2.71225 14.185 2 12 2 z M 21.292969 3.2929688 L 11 13.585938 L 7.7070312 10.292969 L 6.2929688 11.707031 L 11 16.414062 L 22.707031 4.7070312 L 21.292969 3.2929688 z"></path>
                </svg>
                <h3 className='text-4xl font-[500] text-[#36a323]' >Perfect</h3>
              </div>
              <p className='text-center font-[500] text-[#646363] p-5'>Outstanding! You've mastered this lesson perfectly. Your dedication to learning is truly impressive!</p>
          </div>
        {/* </div> */}

        <div className=' flex items-center justify-center gap-3'>
          <button className='text-lg text-blue-600 font-[500] border-2 border-blue-600 px-4 py-1 rounded-lg cursor-pointer hover:bg-blue-600   hover:text-white duration-500'>Library</button>
          <button className='text-lg text-white bg-blue-600 font-[500] border-2 border-blue-600 px-4 py-1 rounded-lg cursor-pointer  hover:bg-blue-900 duration-500'>Next Lesson</button>
            
        </div>
      </div>
    </div>
  )
}

export default page
