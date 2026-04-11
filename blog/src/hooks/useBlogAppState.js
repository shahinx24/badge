import { useEffect, useState } from 'react'
import {
  loadBlogs,
  loadCurrentUser,
  saveBlogs,
  syncCurrentUser,
} from '../lib/storage'

export default function useBlogAppState() {
  const [blogs, setBlogs] = useState(loadBlogs)
  const [currentUser, setCurrentUser] = useState(loadCurrentUser)

  function handleDeleteBlog(blogId) {
    setBlogs((prev) => prev.filter((blog) => blog.id !== blogId))
  }

  function handleLogout() {
    setCurrentUser('')
  }

  useEffect(() => {
    saveBlogs(blogs)
  }, [blogs])

  useEffect(() => {
    syncCurrentUser(currentUser)
  }, [currentUser])

  return {
    blogs,
    currentUser,
    setBlogs,
    setCurrentUser,
    handleDeleteBlog,
    handleLogout,
  }
}
