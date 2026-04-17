import { useLocation } from "react-router-dom"

export default function Details(){
    const location = useLocation();
    const post = location.state;
    return(
        <>
        <h2>{post.title}</h2>
        <h4>{post.body}</h4>
        </>
    )
}