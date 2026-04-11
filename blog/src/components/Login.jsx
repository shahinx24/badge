import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './style/Login.css'

export default function Login({ currentUser, onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (currentUser) {
      navigate('/view')
    }
  }, [currentUser, navigate])

  async function handleSubmit(event) {
    event.preventDefault()

    if (username.trim() === '' || password.trim() === '') {
      setError('All fields are required.')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      await onLogin({ username, password })
      navigate('/view')
    } catch (loginError) {
      setError(loginError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="login-shell">
      <section className="login-card">
        <div className="login-copy">
          <p className="eyebrow">Editorial</p>
          <h1>Sign in to manage your blog</h1>
          <p>
            Use one of the seeded accounts from the JSON user list. After login, you can only view and manage your own posts.
          </p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Username</span>
            <input
              className="input"
              placeholder="user"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>

          <label className="field">
            <span>Password</span>
            <input
              className="input"
              type="password"
              placeholder="user123"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>

          <button className="btn" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Login'}
          </button>

          {error ? <p className="login-error">{error}</p> : null}
          <p className="login-hint">Demo credentials: user / user123</p>
        </form>
      </section>
    </main>
  )
}
