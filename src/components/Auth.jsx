import { useState } from 'react'
import { supabase } from './supabaseClient'
import './Submenu.css';

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({ email })

    if (error) {
      alert(error.error_description || error.message)
    } else {
      alert('Check your email for the login link!')
    }
    setLoading(false)
  }

  return (
      <>
        <p>Sign in via magic link with your email below</p>
        <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Your email"
              value={email}
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button disabled={loading}>
              {loading ? <span>Loading</span> : <span>Send magic link</span>}
            </button>
        </form>
      </>
  )
}