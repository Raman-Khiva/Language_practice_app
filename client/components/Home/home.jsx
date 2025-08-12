import Button from "../Button/button";


const Home = () => {
  return (
    <section className="bg-[linear-gradient(to_right,#EADDFF_0%,#F4CCD8_50%,#FFE8A3_100%)] h-full grid place-items-center ">
        <div className="flex flex-col justify-center items-center text-center gap-2 w-[60%] h-auto">

            <h1 className="text-6xl leading-normal font-[500] bg-gradient-to-r from-[#305CED] to-[#DD8BE1] bg-clip-text text-transparent">Welcome to LinguaWrite</h1>

            <h2 className="text-3xl">Your Personal Language Writing Lab!</h2>

            <h5 className="text-lg text-wrap my-6">
                Sharpen your writing skills, boost your vocabulary, 
                and master sentence structure by translating real-world sentences. 
                Whether you’re learning for travel, exams, or personal growth, 
                LinguaWrite makes practice fun and effective.
            </h5>

            <Button data="Start now"/>

        </div>
    </section>
  )
}

export default Home;
