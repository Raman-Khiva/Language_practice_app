import Home from "@/components/Home/home.jsx";
import Navbar from "@/components/Navbar/Navbar";
import Capabilites from "@/components/sections/Capabilites";
import Features from "@/components/sections/Features";
import Pricing from "@/components/sections/Pricing";

export default function page() {
  return ( //bg-[#fbfaf8]
    <div className="min-h-screen w-screen
                    scroll-auto ubuntu
                    bg-[#f8f9fa]
                    z-20 
                    
    ">
      


      <Navbar/>
      <Home/>
      <div className="w-screen 
                      rounded-t-[10rem]
                      
      ">
        <Capabilites/>
        <Features/>
        
        <Pricing/>
        <div className="h-screen">
          nothing
        </div>
      </div>
       </div>
  );
}
