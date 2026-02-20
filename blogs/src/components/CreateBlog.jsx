import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateBlog({ setBlogs }){
    const [input,setInput] = useState("")
    const [des,setDes] = useState("")
    const navigate = useNavigate()

    function HandleClick(){
        if(input.trim() === "" || des.trim() === "")return;
        const newTask = { id: Date.now(), text: input , detail:des}
        setBlogs((prev)=> [...prev,newTask])
        setInput("")
        setDes("")
        navigate("/view")
    }

    return(
        <>
        <h2>Title</h2>
        <input placeholder="Title" value={input}
        onChange={(e)=> setInput(e.target.value)}/>
        <h2>Discription</h2>
        <input placeholder="Title" value={des}
        onChange={(e)=> setDes(e.target.value)}/>
        <button onClick={HandleClick}>Add Blog</button>
        </>
    )
}