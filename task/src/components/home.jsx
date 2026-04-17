import { useLocation } from "react-router-dom"

export default function Home(){
    const loction = useLocation()
    const item = loction.state;

    return(
        <>
        <h2>Title : {item.title}</h2>
        <p>Post : {item.body}</p>
        </>
    )
}