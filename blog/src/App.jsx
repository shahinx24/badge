import './App.css'
import useBlogAppState from './hooks/useBlogAppState'
import AppRoutes from './routes/AppRoutes'

function App() {
  const {
    blogs,
    currentUser,
    setBlogs,
    setCurrentUser,
    handleDeleteBlog,
    handleLogout,
  } = useBlogAppState()

  return (
    <AppRoutes
      blogs={blogs}
      currentUser={currentUser}
      onDeleteBlog={handleDeleteBlog}
      onLogin={setCurrentUser}
      onLogout={handleLogout}
      setBlogs={setBlogs}
    />
  )
}

export default App
