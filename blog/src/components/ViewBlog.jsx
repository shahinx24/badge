import { Link } from 'react-router-dom'

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export default function ViewBlog({
  blogs,
  currentUser,
  isLoadingBlogs,
  onDeleteBlog,
  onLogout,
}) {
  return (
    <main className="page-shell">
      <section className="hero panel">
        <div>
          <p className="eyebrow">Journal</p>
          <h1>Simple blog dashboard</h1>
          <p className="section-copy">
            Browse every saved post, open details, or publish another article.
          </p>
        </div>

        <div className="hero-actions">
          <span className="user-chip">{currentUser}</span>
          <Link className="primary-button" to="/create">
            New post
          </Link>
          <button type="button" className="ghost-button" onClick={onLogout}>
            Logout
          </button>
        </div>
      </section>

      <section className="blog-grid">
        {isLoadingBlogs ? (
          <article className="panel empty-state">
            <h2>Loading posts</h2>
            <p>Fetching the posts created by {currentUser}.</p>
          </article>
        ) : blogs.length === 0 ? (
          <article className="panel empty-state">
            <h2>No posts yet</h2>
            <p>Your feed only shows posts created by {currentUser}. Start with your first article.</p>
          </article>
        ) : (
          blogs.map((item) => (
            <article key={item.id} className="panel blog-card">
              <p className="meta-line">
                <span>{item.author}</span>
                <span>{formatDate(item.createdAt)}</span>
              </p>
              <h2>{item.title}</h2>
              <p>{item.excerpt}</p>
              <div className="card-actions">
                <Link className="secondary-link" to={`/detail/${item.id}`}>
                  Read article
                </Link>
                <button
                  type="button"
                  className="danger-button"
                  onClick={() => onDeleteBlog(item.id)}
                >
                  Delete
                </button>
              </div>
            </article>
          ))
        )}
      </section>
    </main>
  )
}
