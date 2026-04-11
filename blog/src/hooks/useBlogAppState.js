import { useEffect, useState } from 'react'
import {
  loadBlogs,
  loadCurrentUser,
  saveBlogs,
  syncCurrentUser,
} from '../lib/storage'

export default function useBlogAppState() {
  const [allBlogs, setAllBlogs] = useState(loadBlogs)
  const [currentUser, setCurrentUser] = useState(loadCurrentUser)

  const blogs = currentUser
    ? allBlogs.filter((blog) => blog.author === currentUser)
    : []

  function handleCreateBlog(blogInput) {
    const newBlog = {
      id: Date.now(),
      title: blogInput.title.trim(),
      excerpt: blogInput.excerpt.trim(),
      content: blogInput.content.trim(),
      author: currentUser,
      createdAt: new Date().toISOString(),
    }

    setAllBlogs((prev) => [newBlog, ...prev])
  }

  function handleDeleteBlog(blogId) {
    setAllBlogs((prev) =>
      prev.filter((blog) => !(blog.id === blogId && blog.author === currentUser))
    )
  }

  function handleLogout() {
    setCurrentUser('')
  }

  useEffect(() => {
    saveBlogs(allBlogs)
  }, [allBlogs])

  useEffect(() => {
    syncCurrentUser(currentUser)
  }, [currentUser])

  return {
    blogs,
    currentUser,
    handleCreateBlog,
    setCurrentUser,
    handleDeleteBlog,
    handleLogout,
  }
}
