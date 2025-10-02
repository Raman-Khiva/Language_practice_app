'use client'
import Link from 'next/link'
// import { useContext } from 'react'
import { usePathname } from 'next/navigation'
// import { ProductContext } from '@/app/context/ProductContext'
import Image from 'next/image'
import {selectIsAuthenticated, selectUser} from '@/app/store/slices/authSlice';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import ProfileDropdown from '../ProfileDropdown';



export default function Navbar() {
  
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  
  const [isShrunk, setIsShrunk] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsShrunk(true);
      } else {
        setIsShrunk(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pathname = usePathname();



  return (
    <nav className="fixed top-0 z-50 w-full mt-0 ubuntu">
      <div className={`mx-auto px-8 pt-1 ${isShrunk?"max-w-[60rem]" : "max-w-[84rem]"} 
                      transition-all duration-400 ease-out
      `}>
        <div className={`flex items-center justify-between  rounded-2xl  px-4 py-2 ${isShrunk ? "border border-white/20 bg-white/80 backdrop-blur-xl shadow-sm ring-1 ring-black/5":"bg-transparent"}`}>
          <Link href="/" className='flex gap-4 items-center px-3' >   
              <Image src="/brain-logo.svg"  width={40}  height={20} className='h-10 w-auto' alt='Native Lab' />  
              <p className='text-[23px] font-[500] text-gray-900'>Native<span className='font-[300]'>labs</span></p>
              {/*  */}
          </Link>

          <div className='flex-1 flex items-center justify-center gap-4 lg:gap-10
                            font-[500] 
          '>
            <Link href="/practice/library" className=" text-gray-800 hover:text-gray-900 transition-colors">
              Learning lab
            </Link>
            <Link href="/practice/library" className=" text-gray-800 hover:text-gray-900 transition-colors">
              Practice lab
            </Link>
            <Link href="/practice/library" className=" text-gray-800 hover:text-gray-900 transition-colors">
              Speaking lab
            </Link>
            <Link href="/stories" className=" text-gray-800 hover:text-gray-900 transition-colors">
              Reading lab
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {!isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link
                  href={`/login?next=${encodeURIComponent(pathname || '/')}`}
                  className="px-4 py-2 rounded-full text-sm text-gray-800 bg-white/70 border border-gray-200 hover:bg-white transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  href={`/signup?next=${encodeURIComponent(pathname || '/')}`}
                  className="px-4 py-2 rounded-full text-sm text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 shadow-sm"
                >
                  Sign up
                </Link>
              </div>
            ) : (
              
                
                <ProfileDropdown user={user} showAvatarOnly />
              
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}


