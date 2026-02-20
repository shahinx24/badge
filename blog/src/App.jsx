import './App.css'
import { useState } from 'react'
import CreateBlog from './components/CreateBlog'
import ViewBlog from './components/ViewBlog'
import { Routes, Route } from 'react-router-dom'
import DetailBlog from './components/DetailBlog'
import Login from './components/Login'

function App() {
  const [blogs, setBlogs] = useState([])

  return (
    <>
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/create" element={<CreateBlog blogs={blogs} setBlogs={setBlogs} />} />
      <Route path="/view" element={<ViewBlog blog={blogs} />} />
      <Route path="/detail/:id" element={<DetailBlog blogs={blogs} />} />
    </Routes>
    </>
  )
}

export default App
