import './App.css'
import useBlogAppState from './hooks/useBlogAppState'
import AppRoutes from './routes/AppRoutes'

function App() {
  const {
    blogs,
    currentUser,
    handleCreateBlog,
    setCurrentUser,
    handleDeleteBlog,
    handleLogout,
  } = useBlogAppState()

  return (
    <AppRoutes
      blogs={blogs}
      onCreateBlog={handleCreateBlog}
      currentUser={currentUser}
      onDeleteBlog={handleDeleteBlog}
      onLogin={setCurrentUser}
      onLogout={handleLogout}
    />
  )
}

export default App
