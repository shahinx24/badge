import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import CreateBlog from './components/CreateBlog'
import DetailBlog from './components/DetailBlog'
import Login from './components/Login'
import ViewBlog from './components/ViewBlog'
import useBlogAppState from './hooks/useBlogAppState'

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
    <Routes>
      <Route
        path="/"
        element={<Login currentUser={currentUser} onLogin={setCurrentUser} />}
      />
      <Route
        path="/create"
        element={
          currentUser ? (
            <CreateBlog currentUser={currentUser} setBlogs={setBlogs} />
          ) : (
            <Navigate replace to="/" />
          )
        }
      />
      <Route
        path="/view"
        element={
          currentUser ? (
            <ViewBlog
              blogs={blogs}
              currentUser={currentUser}
              onDeleteBlog={handleDeleteBlog}
              onLogout={handleLogout}
            />
          ) : (
            <Navigate replace to="/" />
          )
        }
      />
      <Route
        path="/detail/:id"
        element={
          currentUser ? (
            <DetailBlog
              blogs={blogs}
              currentUser={currentUser}
              onDeleteBlog={handleDeleteBlog}
            />
          ) : (
            <Navigate replace to="/" />
          )
        }
      />
      <Route path="*" element={<Navigate replace to={currentUser ? '/view' : '/'} />} />
    </Routes>
  )
}

export default App