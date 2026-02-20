import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateBlog({blogs, setBlogs}){
    const [input, setInput] = useState("")
    const [des, setDes] = useState("")
    const navigate = useNavigate()

    function handleAdd(){
        const newTask = {id:Date.now() , text:input , detail:des}
        setInput("")
        setBlogs((prev)=> [...prev,newTask])
        navigate("/view")
    }

    return(
        <>
        <h2>Add Title</h2>
        <input onChange={(e)=> setInput(e.target.value)}
        value={input} placeholder="Title of Blog.." />
        <h3>Add Discribtion</h3>
        <input onChange={(e)=> setDes(e.target.value)}
        value={des} placeholder="discribtion.." /><br/><br/>
        <button onClick={handleAdd}>Add Blog</button>
        </>
    )
}