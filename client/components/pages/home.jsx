'use client'

import Link from "next/link";

import OrbitalFlashcards from "../visuals/OrbitalFlashcards";
import Badge from "../common/Badge";
import { MdOutlineAutoAwesome } from "react-icons/md";
import { BiBulb } from "react-icons/bi";


//bg-linear-to-r from-[#eae1faf4] via-[#f4d2dcea] to-[#ede2c1f0]     textbg : bg-gradient-to-r from-[#305CED] to-[#DD8BE1] bg-clip-text text-transparent
const Home = () => {
  return (
    <section className=" min-h-[calc(100vh-64px)] ubuntu   px-10 h-screen w-screen sm:px-8
                          flex items-center justify-center
                          z-20 relative
    ">
        
        {/* special card */}
        <div className="absolute  top-1/2 left-1/6 -translate-y-1/2 -translate-x-1/2 w-76 h-44 p-0.5  shadow-md rounded-2xl -rotate-8">
            
            <div className="absolute inset-0  rounded-2xl z-[1] opacity-60 group-hover:opacity-100 blur-xl  transition duration-500 will-change-transform
               bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]"
            />

            <div className="absolute inset-0 rounded-2xl z-[1] will-change-transform opacity-70
                            bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]"
              
            />
                       
            <div className="h-full w-full relative z-30   bg-white rounded-xl overflow-hidden">
             <div className="flex py-2 px-3 z-30 bg-gray-100 items-center h-fit w-full  justify-start gap-1.5"> 
                <BiBulb  className="text-xl z-30 text-indigo-500"/>
                <h2 className="text-md z-30 font-[500]">Did you know?</h2>
              </div>
              <div className="p-3 z-30 h-full w-full flex justify-center text-center">
                <p className="text-md z-30 font-[500] text-gray-800 ">Native labs makes language learning easy and efficient process. This AI equiped platform provides interative learning experience.</p>
              </div>
            </div>
        </div> 
        <div className="absolute  top-1/5 left-8/12 -translate-y-1/2 -translate-x-1/2 w-72 h-40 p-0.5  shadow-md rounded-2xl rotate-4">
            
            <div className="absolute inset-0  rounded-2xl z-[1] opacity-60 group-hover:opacity-100 blur-xl  transition duration-500 will-change-transform
               bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]"
            />

            <div className="absolute inset-0 rounded-2xl z-[1] will-change-transform opacity-70
                            bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]"
              
            />
                       
            <div className="h-full w-full relative z-30   bg-white rounded-xl overflow-hidden">
             <div className="flex py-2 px-3 z-30 bg-gray-100 items-center h-fit w-full  justify-start gap-1.5"> 
                <BiBulb  className="text-xl z-30 text-indigo-500"/>
                <h2 className="text-md z-30 font-[500]">Did you know?</h2>
              </div>
              <div className="p-3 z-30 h-full w-full flex justify-center text-center">
                <p className="text-md z-30 font-[500] text-gray-800 ">Native labs makes language learning easy and efficient process. This AI equiped platform provides interative learning experience.</p>
              </div>
            </div>
        </div> 
        <div className="absolute  top-3/5 left-5/6 -translate-y-1/2 -translate-x-1/2 w-76 h-44 p-0.5  shadow-md rounded-2xl -rotate-8">
            
            <div className="absolute inset-0  rounded-2xl z-[1] opacity-60 group-hover:opacity-100 blur-xl  transition duration-500 will-change-transform
               bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]"
            />

            <div className="absolute inset-0 rounded-2xl z-[1] will-change-transform opacity-70
                            bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]"
              
            />
                       
            <div className="h-full w-full relative z-30   bg-white rounded-xl overflow-hidden">
             <div className="flex py-2 px-3 z-30 bg-gray-100 items-center h-fit w-full  justify-start gap-1.5"> 
                <BiBulb  className="text-xl z-30 text-indigo-500"/>
                <h2 className="text-md z-30 font-[500]">Did you know?</h2>
              </div>
              <div className="p-3 z-30 h-full w-full flex justify-center text-center">
                <p className="text-md z-30 font-[500] text-gray-800 ">Native labs makes language learning easy and efficient process. This AI equiped platform provides interative learning experience.</p>
              </div>
            </div>
        </div> 
        
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
    </section>
  )
}

export default Home;
