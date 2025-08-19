'use client'
import Link from 'next/link'
import { useContext } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { ProductContext } from '@/app/context/ProductContext'

export default function Navbar() {
  const { isAuthenticated, user, logout } = useContext(ProductContext)
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    if (pathname.startsWith('/categories')) {
      router.push('/')
    }
  }

  return (
    <nav className="w-full border-b bg-white/70 backdrop-blur sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold text-gray-800">LinguaWrite</Link>
        <div className="flex items-center gap-3">
          <Link href="/categories" className="text-sm text-gray-700 hover:text-gray-900">Categories</Link>
          {!isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link href={`/login?next=${encodeURIComponent(pathname || '/')}`} className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm">Sign in</Link>
              <Link href={`/signup?next=${encodeURIComponent(pathname || '/')}`} className="px-3 py-1.5 border border-blue-600 text-blue-600 rounded-md text-sm">Sign up</Link>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-700">Hi, {user?.name || 'User'}</span>
              <button onClick={handleLogout} className="px-3 py-1.5 bg-gray-800 text-white rounded-md text-sm">Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}


