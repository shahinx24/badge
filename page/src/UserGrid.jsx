import React, { useEffect, useState } from "react";
import axios from "axios";

const UsersGrid = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const USERS_PER_PAGE = 10;

  useEffect(() => {
    axios
      .get("https://dummyjson.com/users")
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => console.log(err));
  }, []);

  const indexOfLastUser = currentPage * USERS_PER_PAGE;
  const indexOfFirstUser = indexOfLastUser - USERS_PER_PAGE;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / USERS_PER_PAGE);

  return (
    <div style={{ padding: "20px" }}>
      <h2>User List</h2>

      <div style={styles.grid}>
        {currentUsers.map((user) => (
          <div key={user.id} style={styles.card}>
            <img src={user.image} alt={user.firstName} style={styles.image} />
            <h4>{user.firstName} {user.lastName}</h4>
            <p>{user.email}</p>
          </div>
        ))}
      </div>

      <div style={styles.pagination}>
        <button
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        <span> Page {currentPage} of {totalPages} </span>

        <button
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

// Styles
const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "15px",
  },
  card: {
    border: "1px solid #ccc",
    padding: "10px",
    borderRadius: "10px",
    textAlign: "center",
  },
  image: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
  },
  pagination: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
};

export default UsersGrid;