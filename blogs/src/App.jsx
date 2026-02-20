import './App.css'
import { Routes,Route} from 'react-router-dom'
import { useState } from 'react'
import CreateBlog from './components/CreateBlog'
import Details from './components/Details'
import ViewBlog from './components/ViewBlog'

function App() {
  const [blogs,setBlogs] = useState([])

  return (
    <>
      <Routes>
        <Route path="/" element={<CreateBlog  blogs={blogs} setBlogs={setBlogs}/> }/>
        <Route path="/details/:id" element={<Details blogs={blogs}/> }/>
        <Route path="/view" element={<ViewBlog blogs={blogs}/> }/>
      </Routes>
    </>
  )
}

export default App
