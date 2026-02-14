const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function getTodos() {
  const res = await fetch(`${API_URL}/todos`);
  return res.json();
}

export async function addTodo(todo) {
  const res = await fetch(`${API_URL}/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  return res.json();
}

export async function toggleTodo(id, completed) {
  const res = await fetch(`${API_URL}/todos/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed }),
  });
  return res.json();
}

export async function deleteTodo(id) {
  await fetch(`${API_URL}/todos/${id}`, {
    method: "DELETE",
  });
}
