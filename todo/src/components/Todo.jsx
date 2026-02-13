import { useState } from "react";

export default function Todo(){
    const [task, setTask] = useState("")
    const [update, setUpdate] = useState([])
    const [nextId, setId] = useState(0)

    function Add(){
        if(task.trim() === "")return;
        const newTask = { id: nextId, text: task}
        setUpdate((prev)=> [...prev, newTask])
        setId((prev)=> prev + 1)
        setTask("")
    }

    function dlt(id){
        setUpdate((prev)=> prev.filter((item)=> dlt(item.id !== id)))
    }

    return(
        <>
        <input value={task} onChange={(e)=> setTask(e.target.value)} 
        placeholder="Enter Todos " />
        <button onClick={Add}>Add</button>
        {update.map((item)=>(
            <p key={item.id}>
                {item.text}
                <button onClick={()=>dlt(item.id)}>Delete</button>
            </p>
        ))}
        </>
    )
}