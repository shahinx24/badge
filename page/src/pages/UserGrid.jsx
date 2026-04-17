import React, { useEffect, useState } from "react";
import axios from "axios";
import "./user.css"

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
    <div className="user-grid-page">
      <h2>User List</h2>

      <div className="user-grid">
        {currentUsers.map((user) => (
          <div key={user.id} className="user-card">
            <img src={user.image} alt={user.firstName} className="user-card-image" />
            <h4>{user.firstName} {user.lastName}</h4>
            <p>{user.email}</p>
          </div>
        ))}
      </div>

      <div className="user-pagination">
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

export default UsersGrid;
