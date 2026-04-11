import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function CreateBlog({ currentUser, setBlogs }) {
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function handleAdd(event) {
    event.preventDefault()

    if (!title.trim() || !excerpt.trim() || !content.trim()) {
      setError('Title, summary, and article content are required.')
      return
    }

    const newBlog = {
      id: Date.now(),
      title: title.trim(),
      excerpt: excerpt.trim(),
      content: content.trim(),
      author: currentUser,
      createdAt: new Date().toISOString(),
    }

    setBlogs((prev) => [newBlog, ...prev])
    navigate('/view')
  }

  return (
    <main className="page-shell">
      <section className="panel form-panel">
        <div className="section-heading">
          <p className="eyebrow">Write</p>
          <h1>Publish a new post</h1>
          <p className="section-copy">
            Logged in as <strong>{currentUser}</strong>. Create a title, a short summary, and the full article.
          </p>
        </div>

        <form className="blog-form" onSubmit={handleAdd}>
          <label className="field">
            <span>Title</span>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="A practical React lesson"
            />
          </label>

          <label className="field">
            <span>Summary</span>
            <input
              value={excerpt}
              onChange={(event) => setExcerpt(event.target.value)}
              placeholder="One sentence readers see first"
            />
          </label>

          <label className="field">
            <span>Article</span>
            <textarea
              value={content}
              onChange={(event) => setContent(event.target.value)}
              placeholder="Write the full post here..."
              rows={10}
            />
          </label>

          {error ? <p className="form-error">{error}</p> : null}

          <div className="action-row">
            <button type="submit" className="primary-button">
              Publish post
            </button>
            <Link className="secondary-link" to="/view">
              Back to all posts
            </Link>
          </div>
        </form>
      </section>
    </main>
  )
}
