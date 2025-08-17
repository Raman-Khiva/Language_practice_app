



const question = () => {
  return (
    <div className='w-screen min-h-screen px-32 py-12
                    bg-fixed bg-gradient-to-r from-[#eaddffa7] via-[#fff1c288] to-[#eed6ddb5] 
                    flex flex-col items-center justify-end 
                    
    '>

      <div className="  bg-[#e0e4eeb5] p-[14px] border-2 border-[#969696]
                     rounded-4xl 
      ">
        <div className="w-190 h-160 bg-white rounded-3xl overflow-hidden relative
        "> 
          
          <div className="flex w-full h-8 items-center bg-[#aeaeae] relative">
            <h3 className="text-lg font-[600] text-[#d3d3d3] absolute left-[50%] translate-x-[-50%]">Question 7 out of 10</h3>
            <div className="h-full w-[70%] bg-[#3763db]  rounded-r-xl"/>
            {/* <div className="w-[92%] h-2 rounded-full bg-[#8e8e8e] absolute top-0">
              <div className="h-full w-[70%] bg-[#0c9315] rounded-full" />
            </div> */} 
          </div>

          <div className="flex flex-col justify-between h-[calc(100%-2rem)] ">
            <div className="w-full flex flex-col justify-end p-6 flex-1">

              <div className="flex flex-col gap-6 mb-8">
                <h3 className="text-lg font-[500] text-[#474646]">Translate given sentence to spanish </h3>
                <h2 className="text-[21px] font-[500] text-[#242424] leading-relaxed"> Question will appear here and  input field will appear below it. Under developement! see you soon with updates.  </h2>
              </div>

              <textarea className="text-2xl font-[500] text-[#474747]  border-4 outline-none rounded-xl border-[#4c4b4b] bg-[#fff]
                                   w-full  py-4 px-4 resize-none flex-grow max-h-100" placeholder="Type your answer here.."></textarea>
            </div>

            <div className=" px-6 pb-5 
                      w-full flex items-center justify-between text-xl font-[500]
            " >
              <button className="text-[#4c4c4c] font-[600] hover:text-[#343434] hover:font-[700] cursor-pointer">Skip</button>
                <button className="px-5 py-[6px] text-[#fff] bg-[#1d5acd] rounded-xl cursor-pointer
                                  hover:bg-[#1a4bbd] hover:scale-[102%] transition-all 

                
                ">Submit</button>
            </div>

          </div>


          {/* <div className="bg-blue-700">
            <button className="text-lg text-[#fff] bg-[#0f187e]">Submit</button>
          </div> */}

        </div>



      </div>







      {/* bg-[linear-gradient(to-right, #F9DEDC_0%, #EADDFF_33%, #FFF1C2_66%, #FFD8E4_100%  )]
      <div className="w-full flex  items-center flex-row-reverse justify-between relative mt-16 px-48">

        <h3 className="text-lg font-[500] text-[#747474b6] "> Question 11 of 15</h3>

          <div className="w-72 h-[8px] rounded-2xl bg-gray-300 absolute left-[50%] translate-x-[-50%]">
            <div className="h-full w-[70%] bg-[#3cba38] rounded-2xl" />
          </div>
        <h3 className="text-lg font-[500] text-[#747474b6] "> Lesson X</h3>


      </div>
      <div className="w-full mt-12 grid place-items-center">
        <div className="w-max  flex flex-col items-start gap-10 relative py-14">
          <QuestionFeild question={"The question will be placed here.."}/>
          <TextArea/>
          <div className="absolute right-0 bottom-[-1rem]">
           <Button data={"Check it"} />

          </div>
        </div>

      </div> */}

    </div>
  )
}

export default question
