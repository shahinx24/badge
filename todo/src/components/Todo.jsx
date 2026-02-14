import { useState } from "react";
import "./todo.css";
import { useTodos } from "../context/TodoContext";

export default function Todo() {
  const [task, setTask] = useState("");
  const { todos, loading, addTodo, toggleTodo, deleteTodo } = useTodos();

  function handleAdd() {
    if (!task.trim()) return;
    addTodo(task);
    setTask("");
  }

  if (loading) return <p>Loading...</p>;

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
        <button
          className="btn"
          onClick={handleAdd}
          disabled={!task.trim()}
        >
          Add
        </button>
      </div>

      <div className="list">
        {todos.length === 0 ? (
          <p className="empty">No tasks added yet 🚀</p>
        ) : (
          todos.map((item) => (
            <div className="list-item" key={item.id}>
              <p className={`text ${item.completed ? "completed" : ""}`}>
                {item.text}
              </p>

              <button
                className="btn-dn"
                onClick={() => toggleTodo(item.id)}
                aria-label={`Mark ${item.text} as done`}
              >
                Done
              </button>

              <button
                className="btn-danger"
                onClick={() => deleteTodo(item.id)}
                aria-label={`Delete ${item.text}`}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}