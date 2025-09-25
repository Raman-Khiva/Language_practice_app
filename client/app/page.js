import Home from "@/components/Home/home.jsx";
import Navbar from "@/components/Navbar/Navbar";
import Capabilites from "@/components/sections/Capabilites";
import Features from "@/components/sections/Features";
import Testimonials from "@/components/sections/Testimonials";
import Pricing from "@/components/sections/Pricing";
import Footer from "@/components/sections/Footer";

export default function page() {
  return ( //bg-[#fbfaf8]
    <div className="min-h-screen w-screen
                    scroll-auto ubuntu
                    bg-[#f6efea]
                    z-20 
                    
    ">
      


      <Navbar/>
      <Home/>
      <div className="w-screen 
                      rounded-t-[10rem]
                      
      ">
        <Capabilites/>
        <Features/>
        <Testimonials/>
        
        <Pricing/>
        <div className="h-screen">
          nothing
        </div>
      </div>
      <Footer/>
       </div>
  );
}
