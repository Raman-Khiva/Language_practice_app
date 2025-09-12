import Home from "@/components/Home/home.jsx";
import Navbar from "@/components/Navbar/Navbar";
import Capabilites from "@/components/sections/Capabilites";
import Features from "@/components/sections/Features";
import Pricing from "@/components/sections/Pricing";
import LanguageLearningCard from "@/components/ui/ProvidesCard";

export default function page() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100
    ">
      <Navbar/>
      <Home/>
      <Capabilites/>
      <Features/>
      <Pricing/>
      <div className="h-screen">
        nothing
      </div>
    </div>
  );
}
