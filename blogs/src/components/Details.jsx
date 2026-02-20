import { Link , useParams } from "react-router-dom"

export default function Details({ blogs }){
    const { id } = useParams()

    const stock = blogs.find((item)=>(
        item.id === Number(id)
    ))

    return(
        <>
            <h2>{stock.text}</h2>
            <h3>{stock.detail}</h3>
            <Link to={"/view"}>Go Back</Link>
        </>
    )
}