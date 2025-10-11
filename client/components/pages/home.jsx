'use client'

import Link from "next/link";

import OrbitalFlashcards from "../visuals/OrbitalFlashcards";
import Badge from "../common/Badge";
import { MdOutlineAutoAwesome } from "react-icons/md";


//bg-linear-to-r from-[#eae1faf4] via-[#f4d2dcea] to-[#ede2c1f0]     textbg : bg-gradient-to-r from-[#305CED] to-[#DD8BE1] bg-clip-text text-transparent
const Home = () => {
  return (
    <section className=" min-h-[calc(100vh-64px)] ubuntu   px-10 h-screen w-screen sm:px-8
                          flex items-center justify-between
                          z-20 relative
    ">
        
        
        
        <div className="flex flex-col justify-center items-center text-center gap-3 w-full max-w-3xl z-20">
            <Badge tag="For Everyone" 
              icon={MdOutlineAutoAwesome}
            />
            <h1 className="text-4xl text-black  font-[400] sm:text-5xl md:text-5xl 
                            leading-tight
            ">
              Choose.Learn.Practice <br/>
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
            </h1>

            <h5 className="text-base sm:text-lg text-gray-800 
                           text-wrap font-[500] my-6 px-1 sm:px-2
                           w-[36rem]
            ">
                Native labs makes language learning easy and efficient process. <br/> This AI equiped platform provides interative learning experience.
            </h5>

            <div className="flex gap-4 items-center">
              <Link href="/practice"
                    className="border-3 border-black
                               rounded-lg px-4 py-1.5
                               font-[500] cursor-pointer
                               hover:bg-black/90 hover:text-white duration-300

                    ">
                      Take first lesson
              </Link>
              <Link href="/practice"
                    className="border-3 border-black
                               rounded-lg px-4 py-1.5
                               font-[500] cursor-pointer
                               text-white bg-black
                               hover:bg-white hover:text-black/90 duration-300

              ">
                    Start practicing
              </Link>
            </div>
            
            
        </div>
        <OrbitalFlashcards/>
    </section>
  )
}

export default Home;
