import './App.css'
import useBlogAppState from './hooks/useBlogAppState'
import AppRoutes from './routes/AppRoutes'

function App() {
  const {
    blogs,
    currentUser,
    handleLogin,
    handleCreateBlog,
    handleDeleteBlog,
    handleLogout,
    isLoadingBlogs,
  } = useBlogAppState()

  return (
    <AppRoutes
      blogs={blogs}
      isLoadingBlogs={isLoadingBlogs}
      onCreateBlog={handleCreateBlog}
      currentUser={currentUser}
      onDeleteBlog={handleDeleteBlog}
      onLogin={handleLogin}
      onLogout={handleLogout}
    />
  )
}

export default App
