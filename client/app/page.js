import Home from "@/components/Home/home.jsx";
import Navbar from "@/components/Navbar/Navbar";
import Capabilites from "@/components/sections/Capabilites";
import Features from "@/components/sections/Features";
import Pricing from "@/components/sections/Pricing";
import LanguageLearningCard from "@/components/ui/ProvidesCard";

export default function page() {
  return (
    <div className="min-h-screen w-screen
                    scroll-auto
                    z-20 
    ">
      {/* <div className="w-full h-screen
                      fixed top-0 z-10
                      bg-violet-100/30
                      blur-3xl 
                      
      ">
      </div> */}
        {/* <div className="fixed top-1/4 left-1/6 z-0
                       rounded-full rotate-35
                      bg-gradient-to-r from-violet-500 to-indigo-300/80
                      w-[50rem] h-[30rem]
                      blur-[20rem]

        "/>
        <div className="fixed top-4 right-4 z-0
                      w-[30rem] h-[30rem]
                       rounded-full rotate-35
                      bg-radial from-yellow-800  via-yellow-400 to-yellow-100
                      blur-[25rem]
        "/> */}
        
      


      <Navbar/>
      <Home/>
      {/* <div className="w-screen 
                      rounded-t-[10rem]
                      bg-blue-100/60 backdrop-blur-3xl
      "> */}
        <Capabilites/>
        <Features/>
        <Pricing/>
        <div className="h-screen">
          nothing
        </div>
      </div>
    // </div>
  );
}
