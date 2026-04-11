import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { validateUser } from '../lib/auth'
import './style/Login.css'

export default function Login({ currentUser, onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (currentUser) {
      navigate('/view')
    }
  }, [currentUser, navigate])

  function handleSubmit(event) {
    event.preventDefault()

    if (username.trim() === '' || password.trim() === '') {
      setError('All fields are required.')
      return
    }

    const user = validateUser(username, password)

    if (!user) {
      setError('Invalid username or password.')
      return
    }

    setError('')
    onLogin(user.name)
    navigate('/view')
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
              placeholder="admin"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>

          <label className="field">
            <span>Password</span>
            <input
              className="input"
              type="password"
              placeholder="admin123"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>

          <button className="btn" type="submit">
            Login
          </button>

          {error ? <p className="login-error">{error}</p> : null}
          <p className="login-hint">Demo credentials: admin / admin123, shahin / shahin@123</p>
        </form>
      </section>
    </main>
  )
}
