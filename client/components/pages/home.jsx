'use client'

import Link from "next/link";

import OrbitalFlashcards from "../visuals/OrbitalFlashcards";
import Badge from "../common/Badge";
import { MdOutlineAutoAwesome } from "react-icons/md";
import { LuLanguages } from "react-icons/lu";


//bg-linear-to-r from-[#eae1faf4] via-[#f4d2dcea] to-[#ede2c1f0]     textbg : bg-gradient-to-r from-[#305CED] to-[#DD8BE1] bg-clip-text text-transparent
const Home = () => {
  return (
    <section className="min-h-[calc(100vh-64px)] ubuntu px-6 sm:px-8 lg:px-12 w-full
                          flex flex-col-reverse items-center justify-center 
                          lg:flex-row 
                          z-20 relative
    ">
        
        
        
        <div className="flex flex-col items-start w-full pl-20  text-center lg:text-left gap-4 max-w-3xl z-20">
            <Badge tag="For Everyone" 
              icon={MdOutlineAutoAwesome}
            />
            <span className="text-4xl text-black  font-[500] sm:text-5xl md:text-5xl 
                            leading-tight 
            ">
              Choose 
                <div className="inline-flex rotate-6 bg-white rounded-xl p-1.5 h-fit shadow-md shadow-violet-500 w-fit mx-2">
                  <div className="bg-violet-600 rounded-lg p-2 w-fit">
                    <LuLanguages className="text-white text-3xl"/>
                  </div>
                </div>
              Learn,Practice <br/>
              and speak like 
              <span className="text-violet-600 font-[500]  pl-2
                              relative  
              ">
                  <span className="z-30">Native</span>
                  <div className=" absolute top-[50%] left-[50%] z-10
                                   w-32 h-10 -translate-x-[50%] -translate-y-[50%]
                                   bg-radial from-violet-900 via-violet-500 to-violet-100 
                                   blur-[4rem]
                                    
                  "/>
              </span>
            </span>

            <h5 className="text-base sm:text-lg text-gray-600/80 
                           text-wrap font-[500] mb-7 px-1 sm:px-2
                           w-full sm:max-w-xl lg:max-w-2xl
            ">
                Native labs makes language learning easy and efficient process. <br/> This AI equiped platform provides interative learning experience.
            </h5>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center sm:items-stretch w-full sm:w-auto">
              <Link href="/practice"
                    className="border-3 border-violet-400/80
                               bg-violet-600 text-white shadow-lg shadow-violet-300
                               rounded-xl px-4 py-1.5 w-full sm:w-auto text-center hover:shadow-none
                               font-[500] cursor-pointer duration-300

                    ">
                      Take first lesson
              </Link>
              <Link href="/practice"
                    className="border-3 border-violet-400/80
                               rounded-xl px-4 py-1.5 w-full sm:w-auto text-center
                               font-[500] cursor-pointer
                               text-violet-700 shadow-lg shadow-violet-300 
                               hover:bg-violet-600 hover:text-white duration-300 hover:shadow-none

              ">
                    Start practicing
              </Link>
            </div>
            
            
        </div>
        <div className="w-full flex justify-center items-center lg:justify-end">
          <OrbitalFlashcards/>
        </div>
    </section>
  )
}

export default Home;
