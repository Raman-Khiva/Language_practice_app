'use client'
import Link from 'next/link'
// import { useContext } from 'react'
import { usePathname, useRouter } from 'next/navigation'
// import { ProductContext } from '@/app/context/ProductContext'
import Image from 'next/image'
import {logoutUser, selectIsAuthenticated, selectUser} from '../../app/store/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';


let render = 0;
console.log('NAVBAR : navbar file loaded!');


export default function Navbar() {
  
  render += 1;
  console.log(`NAVBAR : this is ${render} render of navbar!`);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  
  const dispatch = useDispatch();

  const pathname = usePathname();
  const router = useRouter();


  const handleLogout = () => {
    console.log("NAVBAR : logout request is made!")
    dispatch(logoutUser());
    if (pathname.startsWith('/categories')) {
      router.push('/')
    }
  }

  return (
    <nav className="fixed top-0 z-50 w-full mt-0">
      <div className="mx-auto max-w-7xl px-8 py-3">
        <div className="flex items-center justify-between rounded-2xl border border-white/20 bg-white/60 backdrop-blur-xl shadow-sm ring-1 ring-black/5 px-4 ">
          <Link href="/" className='flex gap-1 items-center px-3' >   
              <Image src="/brain-logo.svg"  width={92}  height={40} className='h-16 w-auto' alt='Native Lab' />  
              <p className='text-[28px] font-[700] text-[#323131] '>Native <span className = 'bg-clip-text text-transparent bg-linear-to-r from-[#DD8BE1] via-[#305CED] to-[#45afe0]'>labs</span></p>
              {/*  */}
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/categories" className="text-sm text-gray-700/90 hover:text-gray-900 transition-colors">
              Categories
            </Link>
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
              </div>) : (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-700/90">Hi, {user?.name || 'User'}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-full text-sm text-gray-800 bg-white/70 border border-gray-200 hover:bg-white transition-colors"
                >
                  Logout
                </button>
              </div>
            )} 
          </div>
        </div>
      </div>
    </nav>
  )
}


