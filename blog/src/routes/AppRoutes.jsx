import { Navigate, Route, Routes } from 'react-router-dom'
import CreateBlog from '../components/CreateBlog'
import DetailBlog from '../components/DetailBlog'
import Login from '../components/Login'
import ViewBlog from '../components/ViewBlog'

export default function AppRoutes({
  blogs,
  currentUser,
  onCreateBlog,
  onDeleteBlog,
  onLogin,
  onLogout,
}) {
  return (
    <Routes>
      <Route path="/" element={<Login currentUser={currentUser} onLogin={onLogin} />} />
      <Route
        path="/create"
        element={
          currentUser ? (
            <CreateBlog currentUser={currentUser} onCreateBlog={onCreateBlog} />
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
              onDeleteBlog={onDeleteBlog}
              onLogout={onLogout}
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
              onDeleteBlog={onDeleteBlog}
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
