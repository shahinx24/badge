const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3001/api'

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
    ...options,
  })

  if (!response.ok) {
    let message = 'Request failed.'

    try {
      const data = await response.json()
      message = data.message ?? message
    } catch {
      // Ignore parse failures and keep the fallback error.
    }

    throw new Error(message)
  }

  if (response.status === 204) {
    return null
  }

  return response.json()
}

export function loginUser(credentials) {
  return request('/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  })
}

export function fetchBlogs(author) {
  return request(`/blogs?author=${encodeURIComponent(author)}`)
}

export function createBlog(blog) {
  return request('/blogs', {
    method: 'POST',
    body: JSON.stringify(blog),
  })
}

export function deleteBlog(blogId, author) {
  return request(`/blogs/${blogId}?author=${encodeURIComponent(author)}`, {
    method: 'DELETE',
  })
}
