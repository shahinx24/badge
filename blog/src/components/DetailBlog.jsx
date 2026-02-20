import { Link, useParams } from "react-router-dom"

export default function DetailBlog({ blogs }) {
    const { id } = useParams()

    if (!blogs || blogs.length === 0) {
        return <h2>No blogs available</h2>
    }

    const selectedBlog = blogs.find(
        (item) => item.id === Number(id)
    )

    if (!selectedBlog) {
        return <h2>Blog not found</h2>
    }

    return (
        <>
            <h1>{selectedBlog.text}</h1>
            <h3>{selectedBlog.detail}</h3>
            <Link to="/view">Go Back</Link>
        </>
    )
}