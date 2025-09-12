'use client'
import Button from "../Button/button";
import Link from "next/link";
import ModernBackground from "../ui/Background";
import CircularComponent from "../ui/circularComponent";

//bg-linear-to-r from-[#eae1faf4] via-[#f4d2dcea] to-[#ede2c1f0]     textbg : bg-gradient-to-r from-[#305CED] to-[#DD8BE1] bg-clip-text text-transparent
const Home = () => {
  return (<ModernBackground>
    <section className="  min-h-[calc(100vh-64px)] ubuntu   px-10 h-screen w-screen sm:px-8
                          flex items-center justify-between
    ">
        
        <div className="flex flex-col justify-center items-center text-center gap-3 w-full max-w-3xl">

            <h1 className="text-4xl text-black  font-[500] sm:text-5xl md:text-6xl leading-tight md:leading-normal ">
              Welcome to <span className="text-violet-700">Native Labs</span></h1>
      
            <h2 className="text-2xl sm:text-3xl ">Your Personal Language Writing Lab!</h2>

            <h5 className="text-base sm:text-lg text-gray-800 text-wrap font-[500] my-6 px-1 sm:px-2">
                Sharpen your writing skills, boost your vocabulary, 
                and master sentence structure by translating real-world sentences. 
                Whether you’re learning for travel, exams, or personal growth, 
                LinguaWrite makes practice fun and effective.
            </h5>

            <Link href="/practice"><Button data="Start now"/></Link>
            
            
        </div>
        <CircularComponent/>
    </section></ModernBackground>
  )
}

export default Home;
