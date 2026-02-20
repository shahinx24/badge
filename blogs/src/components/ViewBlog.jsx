export default function ViewBlog({ blog }){
    return(
        <>
            {blog.map((item)=>(
                <p key={item.id}>
                    <h2>{item.text}</h2>
                </p>
            ))}
        </>
    )
}