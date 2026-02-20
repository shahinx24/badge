import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import CreateBlog from "./components/CreateBlog";
import ViewBlog from "./components/ViewBlog";
import Details from "./components/Details";

function App() {
  const [blogs, setBlogs] = useState([]);

  return (
    <Routes>
      <Route path="/" element={<CreateBlog setBlogs={setBlogs} />} />
      <Route path="/view" element={<ViewBlog blogs={blogs} />} />
      <Route path="/details/:id" element={<Details blogs={blogs} />} />
    </Routes>
  );
}

export default App;