import Home from "@/components/pages/home.jsx";
import Navbar from "@/components/layout/Navbar/Navbar";
import Capabilites from "@/components/sections/Capabilites";
import Features from "@/components/sections/Features";
import WorkflowSection from "@/components/sections/WorkflowSection";
import Testimonials from "@/components/sections/Testimonials";
import Pricing from "@/components/sections/Pricing";
import Footer from "@/components/sections/Footer";
import StoryCard from "@/components/cards/StoryCard";

export default function page() {
  return ( //bg-[#fbfaf8] best fit :#f2f4f3
    <div className="min-h-screen w-screen
                    scroll-auto ubuntu
                    bg-[#fffffb]

                    z-20 
                    
    ">
      


      <Navbar/>
      <Home/>
      <div className="w-screen 
                      rounded-t-[10rem]
                      
      ">
        <Capabilites/>
        <Features/>
        <WorkflowSection/>
        <Testimonials/>
        
        <Pricing/>
      </div>
      <Footer/>
       </div>
  );
}
