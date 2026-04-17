import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'

function App() {
  const [post,postes] = useState([])
  useEffect(()=>{
    fetch(`https://jsonplaceholder.typicode.com/posts?_limit=15`)
    .then((res)=>res.json())
    .then((data)=>postes(data))
  },[])

  return (
    <>
      {post.map((item)=>(
        <p  key={item.id}>
          Title :
          <Link to={`/home/${item.id}`} state={item}>
            {item.title}
          </Link>
        </p>
      ))}
    </>
  )
}

export default App
