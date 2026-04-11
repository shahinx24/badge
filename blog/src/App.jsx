import './App.css'
import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import CreateBlog from './components/CreateBlog'
import DetailBlog from './components/DetailBlog'
import Login from './components/Login'
import ViewBlog from './components/ViewBlog'

const BLOG_STORAGE_KEY = 'blog-app-posts'
const SESSION_STORAGE_KEY = 'blog-app-user'

const starterBlogs = [
  {
    id: 1,
    title: 'Shipping small apps without breaking the basics',
    excerpt: 'A practical checklist for state, routing, and persistence in simple React projects.',
    content:
      'The fastest way to lose confidence in a small app is to skip the boring parts. Data should survive a refresh, routes should render sensible empty states, and forms should reject incomplete submissions. Once those basics are solid, the rest of the interface can stay lightweight and still feel reliable.',
    author: 'admin',
    createdAt: '2026-04-04T09:00:00.000Z',
  },
  {
    id: 2,
    title: 'Why local storage is enough for a learning project',
    excerpt: 'Not every CRUD app needs a backend on day one.',
    content:
      'For prototypes and exercises, local storage is often the right level of complexity. It keeps the feedback loop short, exposes the shape of your state clearly, and lets you focus on behavior before infrastructure. The main requirement is to model the data cleanly so it can move to an API later without a rewrite.',
    author: 'guest',
    createdAt: '2026-04-03T14:30:00.000Z',
  },
]

function loadBlogs() {
  const savedBlogs = localStorage.getItem(BLOG_STORAGE_KEY)

  if (!savedBlogs) {
    return starterBlogs
  }

  try {
    const parsedBlogs = JSON.parse(savedBlogs)
    return Array.isArray(parsedBlogs) ? parsedBlogs : starterBlogs
  } catch {
    return starterBlogs
  }
}

function loadCurrentUser() {
  return sessionStorage.getItem(SESSION_STORAGE_KEY) ?? ''
}

function App() {
  const [blogs, setBlogs] = useState(loadBlogs)
  const [currentUser, setCurrentUser] = useState(loadCurrentUser)

  function handleDeleteBlog(blogId) {
    setBlogs((prev) => prev.filter((blog) => blog.id !== blogId))
  }

  useEffect(() => {
    localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(blogs))
  }, [blogs])

  useEffect(() => {
    if (currentUser) {
      sessionStorage.setItem(SESSION_STORAGE_KEY, currentUser)
      return
    }

    sessionStorage.removeItem(SESSION_STORAGE_KEY)
  }, [currentUser])

  return (
    <Routes>
      <Route
        path="/"
        element={<Login currentUser={currentUser} onLogin={setCurrentUser} />}
      />
      <Route
        path="/create"
        element={
          currentUser ? (
            <CreateBlog currentUser={currentUser} setBlogs={setBlogs} />
          ) : (
            <Navigate replace to="/" />
          )
        }
      />
      <Route
        path="/view"
        element={
          currentUser ? (
            <ViewBlog
              blogs={blogs}
              currentUser={currentUser}
              onDeleteBlog={handleDeleteBlog}
              onLogout={() => setCurrentUser('')}
            />
          ) : (
            <Navigate replace to="/" />
          )
        }
      />
      <Route
        path="/detail/:id"
        element={
          currentUser ? (
            <DetailBlog
              blogs={blogs}
              currentUser={currentUser}
              onDeleteBlog={handleDeleteBlog}
            />
          ) : (
            <Navigate replace to="/" />
          )
        }
      />
      <Route path="*" element={<Navigate replace to={currentUser ? '/view' : '/'} />} />
    </Routes>
  )
}

export default App
