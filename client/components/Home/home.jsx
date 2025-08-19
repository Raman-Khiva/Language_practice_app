import Button from "../Button/button";
import Link from "next/link";


const Home = () => {
  return (
    <section className="bg-[linear-gradient(to_right,#EADDFF_0%,#F4CCD8_50%,#FFE8A3_100%)] min-h-[calc(100vh-64px)] grid place-items-center px-4 h-screen w-screen sm:px-6">
        <div className="flex flex-col justify-center items-center text-center gap-3 w-full max-w-3xl">

            <h1 className="text-4xl sm:text-5xl md:text-6xl leading-tight md:leading-normal font-[500] bg-gradient-to-r from-[#305CED] to-[#DD8BE1] bg-clip-text text-transparent">Welcome to LinguaWrite</h1>

            <h2 className="text-2xl sm:text-3xl">Your Personal Language Writing Lab!</h2>

            <h5 className="text-base sm:text-lg text-wrap my-6 px-1 sm:px-2">
                Sharpen your writing skills, boost your vocabulary, 
                and master sentence structure by translating real-world sentences. 
                Whether you’re learning for travel, exams, or personal growth, 
                LinguaWrite makes practice fun and effective.
            </h5>

            <Link href="/categories"><Button data="Start now"/></Link>

        </div>
    </section>
  )
}

export default Home;
