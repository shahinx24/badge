import "./todos.css"
import { useState } from "react"

export default function Todo(){
    const [task, setTask] = useState("")
    const [ update , setUpdate] = useState([])
    const [ nextId, setId] = useState(1)
    const [editId, setEditId] = useState(null)
    const [ dltTask, setDltTask] = useState([])

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
        const deletedTodo = update.find((todo) => todo.id === id)
        setDltTask((prev)=> [...prev,deletedTodo])
        setUpdate((prev)=> prev.filter((todo)=> todo.id !== id))
    }

    function edit(id) {
        const todoToEdit = update.find((todo) => todo.id === id)
        setTask(todoToEdit.text)
        setEditId(id)
    }

    const filterItem = update.filter((todo)=>
        todo.text.toLowerCase().includes(task.toLowerCase())
    )

    return(
        <div className="container">
        <input value={task} placeholder="Enter / Search your Task" className="input"
        onChange={(e)=> setTask(e.target.value)}/>
        <button className="add-btn" onClick={add}>
            {editId !== null ? "Update" : "Add"}
        </button>

        <div className="ul">
            {filterItem.map((item)=>(
                <p className="text" key={item.id}>
                    {item.text}
                    <button onClick={()=> edit(item.id)}>Edit</button>
                    <button onClick={()=> dlt(item.id)} className="dlt-btn">Delete</button>
                </p>
            ))}
            <div className="ul">
                <h3>Deleted Task</h3>
                {dltTask.map((item)=>(
                    <p className="text" key={item.id}>
                        {item.text}
                    </p>
                ))}
            </div>
        </div>
        </div>
    )
}
