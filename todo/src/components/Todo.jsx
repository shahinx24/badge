import { useEffect, useState } from "react";
import "./todo.css";
import {
  getTodos,
  addTodo,
  toggleTodo,
  deleteTodo,
} from "../api/todoApi";

export default function Todo() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load todos from backend
  useEffect(() => {
    getTodos().then((data) => {
      setTodos(data);
      setLoading(false);
    });
  }, []);

  async function handleAdd() {
    if (task.trim() === "") return;

    const newTodo = {
      text: task,
      completed: false,
    };

    const savedTodo = await addTodo(newTodo);
    setTodos((prev) => [...prev, savedTodo]);
    setTask("");
  }

  async function handleDone(todo) {
    const updated = await toggleTodo(todo.id, !todo.completed);

    setTodos((prev) =>
      prev.map((item) =>
        item.id === todo.id ? updated : item
      )
    );
  }

  async function handleDelete(id) {
    await deleteTodo(id);
    setTodos((prev) => prev.filter((item) => item.id !== id));
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
                onClick={() => handleDone(item)}
                aria-label={`Mark ${item.text} as done`}
              >
                Done
              </button>

              <button
                className="btn-danger"
                onClick={() => handleDelete(item.id)}
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