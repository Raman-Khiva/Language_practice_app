import Home from "@/components/Home/home.jsx";
import Navbar from "@/components/Navbar/Navbar";

export default function page() {
  return (
    <div className="min-h-screen w-full">
      <Navbar/>
      <Home/>
    </div>
  );
}
