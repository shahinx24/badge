export default function ViewBlog({ blogs }){
    return(
        <>
            {blogs.map((item)=>(
                <div key={item.id}>
                    <h2>{item.text}</h2>
                </div>
            ))}
        </>
    )
}