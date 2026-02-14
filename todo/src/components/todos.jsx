import { useState } from "react";

export default function Todos(){
    const [task, setTask] = useState("")
    const [nextId,setId] = useState(1)
    const [update, setUpdate] = useState([])

    function add(){
        if(task.trim() === "")return;
        const newTask = { id : nextId, text : task}
        setUpdate((prev)=> [...prev,newTask])
        setId((prev)=> prev + 1)
        setTask("")
    }
    

    return(
        <>
        <input type="text" value={task}
        placeholder="Input the text" onChange={(e)=> setTask(e.target.value)}/>
        <button onClick={add}>Add</button>
        </>
    )
}