import { useState } from "react";
import "./todo.css"

export default function Todo() {
    const [task, setTask] = useState("")
    const [update, setUpdate] = useState([])
    const [nextId, setId] = useState(1)

    function Add() {
        if (task.trim() === "") return;
        const newTask = { id: nextId, text: task }
        setUpdate((prev) => [...prev, newTask])
        setId((prev) => prev + 1)
        setTask("")
    }

    function dlt(id) {
        setUpdate((prev) => prev.filter((item) => item.id !== id))
    }

    return (
        <div className="container">
            <h2 className="title">My Todo List</h2>

            <div className="input-group">
                <input
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="Enter what you want to do..."
                    className="input"
                />
                <button className="btn" onClick={Add} disabled={!task.trim()}>
                    Add
                </button>
            </div>

            <div className="list">
                {update.length === 0 ? (
                    <p className="empty">No tasks added yet 🚀</p>
                ) : (
                    update.map((item) => (
                        <div className="list-item" key={item.id}>
                            <p className="text">{item.text}</p>
                            <button
                                className="btn-danger"
                                onClick={() => dlt(item.id)}
                                aria-label={`Delete ${item.text}`}
                            >
                                Delete
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}