import './App.css'
import { Routes,Route} from 'react-router-dom'
import { useState } from 'react'
import CreateBlog from './components/CreateBlog'
import Details from './components/Details'
import ViewBlog from './components/ViewBlog'

function App() {
  const [blog,setBlog] = useState([])

  return (
    <>
      <Routes>
        <Route path="/" element={<CreateBlog  blog={blog} setBlog={setBlog}/> }/>
        <Route path="/details" element={<Details/> }/>
        <Route path="/view" element={<ViewBlog/> }/>
      </Routes>
    </>
  )
}

export default App
