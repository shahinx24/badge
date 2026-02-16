import "./todos.css"
import { useState } from "react"

export default function Todo(){
    const [task, setTask] = useState("")
    const [ update , setUpdate] = useState([])
    const [ nextId, setId] = useState(1)
    const [editId, setEditId] = useState(null)

    function add() {
        if (task.trim() === "") return;

        if (editId !== null) {
            // EDIT MODE
            setUpdate((prev) =>
                prev.map((todo) =>
                    todo.id === editId
                        ? { ...todo, text: task }
                        : todo
                )
            )
            setEditId(null)
        } else {
            const newTask = { id: nextId, text: task }
            setUpdate((prev) => [...prev, newTask])
            setId(nextId + 1)
        }

        setTask("")
    }

    function dlt(id){
        setUpdate((prev)=> prev.filter((todo)=> todo.id !== id))
    }

    function edit(id) {
        const todoToEdit = update.find((todo) => todo.id === id)
        setTask(todoToEdit.text)
        setEditId(id)
    }

    const filterItem = update.filter((todo)=>
    todo.toLowerCase().includes(search.toLowerCase()))

    return(
        <div className="container">
        <input value={task} placeholder="Enter your Task" className="input"
        onChange={(e)=> setTask(e.target.value)}/>
        <button className="add-btn" onClick={add}>
            {editId !== null ? "Update" : "Add"}
        </button>
        <input value={serach} placeholder="search your Task" className="input"
        onChange={(e)=> setTask(e.target.value)}/>

        <div className="ul">
            {/* {filterItem.map((item)=>( */}
            {update.map((item)=>(
                <p className="text" key={item.id}>
                    {item.text}
                    <button onClick={()=> edit(item.id)}>Edit</button>
                    <button onClick={()=> dlt(item.id)} className="dlt-btn">Delete</button>
                </p>
            ))}
        {/* ))} */}
        </div>
        </div>
    )
}
