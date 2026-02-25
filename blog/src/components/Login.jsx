import { useUsers } from "../context/UserContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Login.css"

export default function Login() {
  const { users } = useUsers();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleClick() {
    if (username.trim() === "" || password.trim() === "") {
      setError("All fields are required");
      return;
    }

    const user = users.find(
      u => u.name === username && u.password === password
    );

    if (!user) {
      setError("Invalid username or password");
      return;
    }

    // ✅ success
    setError("");
    navigate("/create")
  }

  return (
    <div className="container">
      <h2>Login</h2>

      <input
        className="input"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        className="input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="btn" onClick={handleClick}>Login</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}