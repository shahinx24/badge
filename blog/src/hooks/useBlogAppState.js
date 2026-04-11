import { useEffect, useState } from 'react'
import { createBlog, deleteBlog, fetchBlogs, loginUser } from '../lib/api'

export default function useBlogAppState() {
  const [blogs, setBlogs] = useState([])
  const [currentUser, setCurrentUser] = useState('')
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(false)

  async function handleLogin(credentials) {
    const user = await loginUser(credentials)
    setCurrentUser(user.name)
  }

  async function handleCreateBlog(blogInput) {
    const newBlog = await createBlog({
      ...blogInput,
      author: currentUser,
    })

    setBlogs((prev) => [newBlog, ...prev])
  }

  async function handleDeleteBlog(blogId) {
    await deleteBlog(blogId, currentUser)
    setBlogs((prev) => prev.filter((blog) => blog.id !== blogId))
  }

  function handleLogout() {
    setCurrentUser('')
    setBlogs([])
  }

  useEffect(() => {
    if (!currentUser) {
      return
    }

    let ignore = false

    async function loadUserBlogs() {
      setIsLoadingBlogs(true)

      try {
        const userBlogs = await fetchBlogs(currentUser)
        if (!ignore) {
          setBlogs(userBlogs)
        }
      } catch {
        if (!ignore) {
          setBlogs([])
        }
      } finally {
        if (!ignore) {
          setIsLoadingBlogs(false)
        }
      }
    }

    loadUserBlogs()

    return () => {
      ignore = true
    }
  }, [currentUser])

  return {
    blogs,
    currentUser,
    handleLogin,
    handleCreateBlog,
    handleDeleteBlog,
    handleLogout,
    isLoadingBlogs,
  }
}
