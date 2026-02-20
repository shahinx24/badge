import { Link } from "react-router-dom"

export default function ViewBlog({ blogs }){
    return(
        <>
            {blogs.map((item)=>(
                <Link to={`/details/${item.id}`} key={item.id}>
                    <h2>{item.text}</h2>
                </Link>
            ))}
        </>
    )
}