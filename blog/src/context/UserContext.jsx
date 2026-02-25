import { createContext, useContext, useState } from "react";

// 1️⃣ Create context
const UserContext = createContext(null);

// 2️⃣ Provider component
export function UserProvider({ children }) {
  const [users] = useState([
    { id: 1, name: "admin", password: "admin123" },
    { id: 2, name: "shahin", password: "shahin@123" },
    { id: 3, name: "john", password: "john123" },
    { id: 4, name: "alice", password: "alice@2024" },
    { id: 5, name: "rahul", password: "rahul@123" },
    { id: 6, name: "sneha", password: "sneha@456" },
    { id: 7, name: "mike", password: "mike@pass" },
    { id: 8, name: "priya", password: "priya@789" },
    { id: 9, name: "arjun", password: "arjun@321" },
    { id: 10, name: "guest", password: "guest" }
  ]);

  return (
    <UserContext.Provider value={{ users }}>
      {children}
    </UserContext.Provider>
  );
}

// 3️⃣ Custom hook (best practice)
export function useUsers() {
  return useContext(UserContext);
}