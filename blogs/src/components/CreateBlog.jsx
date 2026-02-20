import { useState } from "react";

export default function CreateBlog({ setBlog }){
    const [input,setInput] = useState("")
    const [des,setDes] = useState("")

    function HandleClick(){
        if(input.trim() === "" || des.trim() === "")return;
        const newTask = { id: Date.now(), text: input , detail:des}
        setBlog((prev)=> [...prev,newTask])
        setInput("")
        setDes("")
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