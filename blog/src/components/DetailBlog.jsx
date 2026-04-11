import { Link, useNavigate, useParams } from 'react-router-dom'

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function DetailBlog({ blogs, currentUser, onDeleteBlog }) {
  const { id } = useParams()
  const navigate = useNavigate()

  if (!blogs || blogs.length === 0) {
    return (
      <main className="page-shell">
        <section className="panel empty-state">
          <h2>No blogs available</h2>
          <Link className="secondary-link" to="/view">
            Back to dashboard
          </Link>
        </section>
      </main>
    )
  }

  const selectedBlog = blogs.find((item) => item.id === Number(id))

  function handleDelete() {
    onDeleteBlog(selectedBlog.id)
    navigate('/view')
  }

  if (!selectedBlog) {
    return (
      <main className="page-shell">
        <section className="panel empty-state">
          <h2>Blog not found</h2>
          <p>The article you requested does not exist in the current saved list.</p>
          <Link className="secondary-link" to="/view">
            Back to dashboard
          </Link>
        </section>
      </main>
    )
  }

  return (
    <main className="page-shell">
      <article className="panel article-panel">
        <p className="eyebrow">Article</p>
        <h1>{selectedBlog.title}</h1>
        <p className="meta-line article-meta">
          <span>{selectedBlog.author}</span>
          <span>{formatDate(selectedBlog.createdAt)}</span>
          <span>Reader: {currentUser}</span>
        </p>
        <p className="article-excerpt">{selectedBlog.excerpt}</p>
        <div className="article-body">
          {selectedBlog.content.split('\n').map((paragraph, index) => (
            <p key={`${selectedBlog.id}-${index}`}>{paragraph}</p>
          ))}
        </div>
        <div className="action-row">
          <Link className="secondary-link" to="/view">
            Back to dashboard
          </Link>
          {selectedBlog.author === currentUser ? (
            <button type="button" className="danger-button" onClick={handleDelete}>
              Delete post
            </button>
          ) : null}
        </div>
      </article>
    </main>
  )
}
