import ProgressHeader from '@/components/ui/ProgressHeader'
import React from 'react'
import  {motion} from 'framer-motion'
import ActionButtons from '@/components/ui/ActionButtons'
import AnswerInput from '@/components/ui/AnswerInput'


const page = () => {
    const curIdx = Math.ceil(Math.random()*10);
  return (
    //screen div
    <div className='w-full h-screen flex items-center justify-center  p-20
                    bg-linear-to-r from-[#dfd2f6f4] via-[#f7eccdf0] to-[#f9d4deea] 
    '>

       {/*main question and answer div*/}
      <div className=' bg-[#fff]
                        h-[36rem] min-w-96 max-w-[64rem] rounded-2xl 
                        border-2 border-violet-600/90 ring-5 ring-violet-300/50
                        flex 
      '
      >
        {/*question div */}
        <div 
            className='flex-1'
        > 
            <ProgressHeader totalQuestions={10} questionNo={curIdx} />
            <div className='p-6 flex flex-col gap-4 flex-wrap'>
                <h4 className="text-md md:text-lg font-medium text-[#606060]">
                  Translate the given sentence to Spanish:
                </h4>
                <h2 className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed bg-gray-50 p-3 md:p-2 rounded-lg
                    text-wrap
                ">
                   The sentence will appear here, input box on the right. Under development! Stay tuned.
                  
                </h2>

            </div>
        </div>

        <div className='w-[2px] h-full bg-linear-to-b from-[#fff] via-gray-300 to-[#fff] ' />

        <div className='flex-1 p-6
            flex flex-col justify-between
        '>
            <AnswerInput
                placeholder="Type your answer here..."
                className="text-lg md:text-2xl font-medium text-gray-800 border-2 outline-none rounded-xl border-gray-300 bg-white w-full py-3 md:py-4 px-3 md:px-4 resize-none min-h-28 md:min-h-32 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition flex-1"

             />
            <ActionButtons/>
        </div>
        
      </div>


    </div>

  )
}

export default page
