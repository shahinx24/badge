import { starterBlogs } from '../data/starterBlogs'

export const BLOG_STORAGE_KEY = 'blog-app-posts'
export const SESSION_STORAGE_KEY = 'blog-app-user'

export function loadBlogs() {
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

export function saveBlogs(blogs) {
  localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(blogs))
}

export function loadCurrentUser() {
  return sessionStorage.getItem(SESSION_STORAGE_KEY) ?? ''
}

export function syncCurrentUser(currentUser) {
  if (currentUser) {
    sessionStorage.setItem(SESSION_STORAGE_KEY, currentUser)
    return
  }

  sessionStorage.removeItem(SESSION_STORAGE_KEY)
}
