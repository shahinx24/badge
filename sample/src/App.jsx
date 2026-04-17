import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);

  const limit = 10;

  useEffect(() => {
    fetch(`https://dummyjson.com/users?limit=${limit}&skip=${(page - 1) * limit}`)
      .then((res) => res.json())
      .then((data) => setUsers(data.users));
  }, [page]);

  return (
    <div>
      <h2>User List</h2>
      <div style={{ display: "grid",
         gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "15px" }}>
      {users.map((user) => (
        <div key={user.id}>
          <img src={user.image} alt={user.firstName} width={100} /><br />
          {user.firstName} {user.lastName}
        </div>
      ))}
      </div>

      <br />

      <button 
        onClick={() => setPage(page - 1)} 
        disabled={page === 1}
      >
        Prev
      </button>

      <span style={{ margin: "0 10px" }}>
        Page {page}
      </span>

      <button 
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default App;