'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault()
    setMessage('Sending magic link...')
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) setMessage(`Error: ${error.message}`)
    else setMessage('Check your email for the sign-in link.')
  }

  return (
    <div className="px-6 md:px-12 py-12">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-semibold">Sign in to Ayuda</h1>
        <p className="text-sm text-slate-600 mt-2">Enter your email and we will send a secure sign-in link.</p>

        <form onSubmit={handleMagicLink} className="mt-6 space-y-4">
          <input className="w-full p-3 border rounded" placeholder="you@domain.com" value={email} onChange={e => setEmail(e.target.value)} />
          <div className="flex justify-end">
            <button className="bg-orange-500 text-white px-6 py-2 rounded">Send Link</button>
          </div>
        </form>

        {message && <p className="mt-4 text-sm text-slate-600">{message}</p>}
      </div>
    </div>
  )
}
