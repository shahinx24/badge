import { Link } from "react-router-dom";

export default function ViewBlog({ blog }) {
    return (
        <>
            {blog.map((item) => (
                <Link to={`/detail/${item.id}`} key={item.id}>
                    <h1>{item.text}</h1>
                </Link>
            ))}
            <br /><br />
            <Link to="/create">Go Back</Link>
        </>
    )
}