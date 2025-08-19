'use client'
import { useContext, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ProductContext } from '@/app/context/ProductContext'

export default function SignupPage() {
  const router = useRouter()
  const search = useSearchParams()
  const next = search.get('next') || '/'
  const { register, isAuthenticated } = useContext(ProductContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const signinHref = `/login?next=${encodeURIComponent(next)}`

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const res = await register(name, email, password)
    setLoading(false)
    if (res.ok) {
      router.push(next)
    } else {
      setError(res.error || 'Sign up failed')
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
            <h2 className="text-3xl font-bold">Join us</h2>
            <p className="mt-2 text-indigo-100">Create your account to start learning new languages today.</p>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>
            <p className="text-sm text-gray-500 mt-1">It only takes a minute</p>
          </div>

          {error && (
            <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 p-3 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full border rounded-xl px-3 py-2.5 outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <input
                  type="email"
                  className="w-full border rounded-xl px-3 py-2.5 outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type="password"
                  className="w-full border rounded-xl px-3 py-2.5 outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition"
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
              {loading ? 'Creating...' : 'Create account'}
            </button>
          </form>

          <p className="mt-5 text-sm text-gray-600">
            Already have an account?{' '}
            <Link href={signinHref} className="text-indigo-600 hover:text-indigo-700 font-medium">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}


