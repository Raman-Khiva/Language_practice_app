import { useRouter } from 'next/navigation';
import React from 'react'

const ScoreCard = ({score=6}) => {

    const router = useRouter();

    const handleClick = () =>{
        router.replace('/practice/library');
    }
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <div className='flex flex-col gap-4'>
        
        {/* <div className='w-[26rem] flex justify-start border-2 rounded-3xl border-green-600 ring-5 ring-[#cff6cd]'> */}
          <div className='h-[30rem] w-96 bg-[#f4fff1e0] border-2 border-green-600  ring-5 ring-[#a3f89f9c] rounded-xl
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
             <h2 className='flex-1 flex items-center justify-center
                            text-xl font-[500] text-gray-600
             '>Your Score : {score}</h2>
          </div>
        {/* </div> */}


        <div className=' flex items-center justify-center gap-3'>
          <button className='text-lg text-blue-600 font-[500] border-2 border-blue-600 px-4 py-1 rounded-lg cursor-pointer hover:bg-blue-600   hover:text-white duration-500'
                    onClick={()=>handleClick()}
          >Library</button>
          <button className='text-lg text-white bg-blue-600 font-[500] border-2 border-blue-600 px-4 py-1 rounded-lg cursor-pointer  hover:bg-blue-900 duration-500'
                    onClick={()=>handleClick()}
          >Next Lesson</button>
            
        </div>
      </div>
    </div>
  )
}



// Good Performance Score Card
const GoodScoreCard = ({score=5}) => {
    const router = useRouter();

    const handleClick = () => {
        router.replace('/practice/library');
    }

    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <div className='flex flex-col gap-4'>
                <div className='h-[30rem] w-96 bg-[#f0f8ffe0] border-2 border-blue-500 ring-5 ring-[#a3d5ff9c] rounded-xl
                                p-4 flex flex-col gap-2'>
                    <div className='w-full flex flex-col items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill='#2563eb' x="0px" y="0px" width="76" height="76" viewBox="0 0 24 24">
                            <path d="M 12 2 C 6.486 2 2 6.486 2 12 C 2 17.514 6.486 22 12 22 C 17.514 22 22 17.514 22 12 C 22 6.486 17.514 2 12 2 z M 12 4 C 16.411 4 20 7.589 20 12 C 20 16.411 16.411 20 12 20 C 7.589 20 4 16.411 4 12 C 4 7.589 7.589 4 12 4 z M 15.292969 8.2929688 L 10 13.585938 L 8.7070312 12.292969 L 7.2929688 13.707031 L 10 16.414062 L 16.707031 9.7070312 L 15.292969 8.2929688 z"></path>
                        </svg>
                        <h3 className='text-4xl font-[500] text-[#2563eb]'>Good Job!</h3>
                    </div>
                    <p className='text-center font-[500] text-[#646363] p-5'>Well done! You've got a solid understanding of this lesson. Keep up the great work and you'll master it soon!</p>
                    <h2 className='flex-1 flex items-center justify-center
                            text-xl font-[500] text-gray-600
                    '>Your Score : {score}</h2>
                </div>

                <div className='flex items-center justify-center gap-3'>
                    <button className='text-lg text-blue-600 font-[500] border-2 border-blue-600 px-4 py-1 rounded-lg cursor-pointer hover:bg-blue-600 hover:text-white duration-500'
                            onClick={() => handleClick()}>
                        Library
                    </button>
                    <button className='text-lg text-white bg-blue-600 font-[500] border-2 border-blue-600 px-4 py-1 rounded-lg cursor-pointer hover:bg-blue-900 duration-500'
                            onClick={() => handleClick()}>
                        Next Lesson
                    </button>
                </div>
            </div>
        </div>
    )
}

// Average Performance Score Card
const AverageScoreCard = ({score=5}) => {
    const router = useRouter();

    const handleClick = () => {
        router.replace('/practice/library');
    }

    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <div className='flex flex-col gap-4'>
                <div className='h-[30rem] w-96 bg-[#fffbf0e0] border-2 border-yellow-500 ring-5 ring-[#fde68a9c] rounded-xl
                                p-4 flex flex-col gap-2'>
                    <div className='w-full flex flex-col items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill='#eab308' x="0px" y="0px" width="76" height="76" viewBox="0 0 24 24">
                            <path d="M 12 2 C 6.486 2 2 6.486 2 12 C 2 17.514 6.486 22 12 22 C 17.514 22 22 17.514 22 12 C 22 6.486 17.514 2 12 2 z M 12 4 C 16.411 4 20 7.589 20 12 C 20 16.411 16.411 20 12 20 C 7.589 20 4 16.411 4 12 C 4 7.589 7.589 4 12 4 z M 11 7 L 11 13 L 13 13 L 13 7 L 11 7 z M 11 15 L 11 17 L 13 17 L 13 15 L 11 15 z"></path>
                        </svg>
                        <h3 className='text-4xl font-[500] text-[#eab308]'>Keep Going!</h3>
                    </div>
                    <p className='text-center font-[500] text-[#646363] p-5'>You're making progress! Some concepts need more practice. Review the lesson and try again to improve your understanding.</p>
                    <h2 className='flex-1 flex items-center justify-center
                            text-xl font-[500] text-gray-600
                    '>Your Score : {score}</h2>
                </div>

                <div className='flex items-center justify-center gap-3'>
                    <button className='text-lg text-yellow-600 font-[500] border-2 border-yellow-600 px-4 py-1 rounded-lg cursor-pointer hover:bg-yellow-600 hover:text-white duration-500'
                            onClick={() => handleClick()}>
                        Library
                    </button>
                    <button className='text-lg text-white bg-yellow-600 font-[500] border-2 border-yellow-600 px-4 py-1 rounded-lg cursor-pointer hover:bg-yellow-700 duration-500'
                            onClick={() => handleClick()}>
                        Retry Lesson
                    </button>
                </div>
            </div>
        </div>
    )
}

// Needs Improvement Score Card
const NeedsImprovementScoreCard = ({score=5}) => {
    const router = useRouter();

    const handleClick = () => {
        router.replace('/practice/library');
    }

    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <div className='flex flex-col gap-4'>
                <div className='h-[30rem] w-96 bg-[#fef2f2e0] border-2 border-red-500 ring-5 ring-[#fca5a59c] rounded-xl
                                p-4 flex flex-col gap-2'>
                    <div className='w-full flex flex-col items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill='#ef4444' x="0px" y="0px" width="76" height="76" viewBox="0 0 24 24">
                            <path d="M 12 2 C 6.486 2 2 6.486 2 12 C 2 17.514 6.486 22 12 22 C 17.514 22 22 17.514 22 12 C 22 6.486 17.514 2 12 2 z M 12 4 C 16.411 4 20 7.589 20 12 C 20 16.411 16.411 20 12 20 C 7.589 20 4 16.411 4 12 C 4 7.589 7.589 4 12 4 z M 15.292969 8.2929688 L 12 11.585938 L 8.7070312 8.2929688 L 7.2929688 9.7070312 L 10.585938 13 L 7.2929688 16.292969 L 8.7070312 17.707031 L 12 14.414062 L 15.292969 17.707031 L 16.707031 16.292969 L 13.414062 13 L 16.707031 9.7070312 L 15.292969 8.2929688 z"></path>
                        </svg>
                        <h3 className='text-4xl font-[500] text-[#ef4444]'>Try Again</h3>
                    </div>
                    <p className='text-center font-[500] text-[#646363] p-5'>Don't give up! Learning takes time and practice. Review the fundamentals and take your time to understand each concept.</p>
                    <h2 className='flex-1 flex items-center justify-center
                            text-xl font-[500] text-gray-600
                    '>Your Score : {score}</h2>
                </div>

                <div className='flex items-center justify-center gap-3'>
                    <button className='text-lg text-red-600 font-[500] border-2 border-red-600 px-4 py-1 rounded-lg cursor-pointer hover:bg-red-600 hover:text-white duration-500'
                            onClick={() => handleClick()}>
                        Library
                    </button>
                    <button className='text-lg text-white bg-red-600 font-[500] border-2 border-red-600 px-4 py-1 rounded-lg cursor-pointer hover:bg-red-700 duration-500'
                            onClick={() => handleClick()}>
                        Study Again
                    </button>
                </div>
            </div>
        </div>
    )
}

export { GoodScoreCard, AverageScoreCard, NeedsImprovementScoreCard ,ScoreCard};

