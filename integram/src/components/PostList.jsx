function PostList({ posts }) {
    return (
        <div>
            <h2>Lista de Posts</h2>
            {/* <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <div>{post.title}</div>
                        <div>{post.content}</div>
                        {post.imageUrl && <img src={post.imageUrl} alt="Post" />}
                        <div>Usuario: {post.userId}</div>
                    </li>
                ))}
            </ul> */}
        </div>
    );
}

export default PostList;
