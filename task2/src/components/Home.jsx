import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';

export default function Home() {
    const [post, setPost] = useState([]);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts?_limit=15`)
            .then((res) => res.json())
            .then((data) => setPost(data))
    }, [])

    return (
        <>
        <h2>Titles</h2>
            <div>
                {post.map((item) => (
                    <p key={item.id}>
                        <Link to={`/Details/${item.id}`} state={item}>{item.title}</Link>
                    </p>
                ))}
            </div>
        </>
    )
}