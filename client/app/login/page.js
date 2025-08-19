'use client'
import { useContext, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ProductContext } from '@/app/context/ProductContext'

export default function LoginPage() {
  const router = useRouter()
  const { login, isAuthenticated } = useContext(ProductContext)
  const search = useSearchParams()
  const next = search.get('next') || '/'
  const signupHref = `/signup?next=${encodeURIComponent(next)}`
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const res = await login(email, password)
    setLoading(false)
    if (res.ok) {
      router.push(next)
    } else {
      setError(res.error || 'Login failed')
    }
  }

  if (isAuthenticated) {
    router.replace(next)
    return null
  }

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4 py-8">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="relative hidden md:flex items-center justify-center bg-gradient-to-br from-indigo-600 to-blue-600 p-8">
          <div className="absolute inset-0 opacity-20">
            <Image src="/globe.svg" alt="Background" fill className="object-contain" />
          </div>
          <div className="relative z-10 text-white">
            <h2 className="text-3xl font-bold">Welcome back</h2>
            <p className="mt-2 text-indigo-100">Sign in to continue practicing and tracking your progress.</p>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Sign in</h1>
            <p className="text-sm text-gray-500 mt-1">Enter your credentials to access your account</p>
          </div>

          {error && (
            <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 p-3 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M1.5 8.67v6.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.77 5.26a3 3 0 0 1-3.06 0L1.5 8.67Z"/><path d="M22.5 6.75v-.08a3 3 0 0 0-3-2.92h-15a3 3 0 0 0-3 2.92v.08l9.46 5.68a1.5 1.5 0 0 0 1.54 0L22.5 6.75Z"/></svg>
                </span>
                <input
                  type="email"
                  className="w-full border rounded-xl pl-10 pr-3 py-2.5 outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M16.5 10.5V7.875a4.875 4.875 0 1 0-9.75 0V10.5m-.375 11.625h10.5a2.25 2.25 0 0 0 2.25-2.25V12.75a2.25 2.25 0 0 0-2.25-2.25H6.375a2.25 2.25 0 0 0-2.25 2.25v7.125a2.25 2.25 0 0 0 2.25 2.25Z"/></svg>
                </span>
                <input
                  type="password"
                  className="w-full border rounded-xl pl-10 pr-3 py-2.5 outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-2.5 rounded-xl hover:bg-indigo-700 transition disabled:opacity-60"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div className="mt-5">
            <Link href={signupHref} className="w-full inline-flex justify-center items-center border border-gray-300 text-gray-700 py-2.5 rounded-xl hover:bg-gray-50 transition">
              Create a new account
            </Link>
          </div>

          <p className="mt-4 text-sm text-gray-500">
            By continuing, you agree to our
            <span className="mx-1 underline decoration-dotted">Terms</span>
            and
            <span className="ml-1 underline decoration-dotted">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  )
}


