import { Link, useParams } from "react-router-dom";

export default function Details({ blogs }) {
  const { id } = useParams();

  const blog = blogs.find(item => item.id === Number(id));

  if (!blog) {
    return <h2>Blog not found</h2>;
  }

  return (
    <>
      <h2>{blog.text}</h2>
      <h3>{blog.detail}</h3>
      <Link to="/view">Go Back</Link>
    </>
  );
}