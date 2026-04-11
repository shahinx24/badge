import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUsers } from '../context/UserContext'
import './style/Login.css'

export default function Login({ currentUser, onLogin }) {
  const { users } = useUsers()
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

    const user = users.find(
      (item) => item.name === username.trim() && item.password === password
    )

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
            Use one of the seeded accounts from context, then create and browse posts that stay saved in the browser.
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
          <p className="login-hint">Demo credentials: admin / admin123</p>
        </form>
      </section>
    </main>
  )
}
