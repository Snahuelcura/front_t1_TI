import  { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './perfil.css';
import API_URL from '../config';


function Perfil() {
    const { userId } = useParams();
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState({});
    const [users, setUsers] = useState([]);
    const [userOptions, setUserOptions] = useState([]);

    const getUsernamebyId = (userId) => {
        const user = users.find(user => user.id === userId);
        return user ? user.username : 'Usuario desconocido';
    };

    const onCreateComment = async (postId) => {
        try {
            const commentData = {
                content: document.getElementById(`commentContent-${postId}`).value,
                userId: parseInt(document.getElementById(`commentUserId-${postId}`).value),
                postId: postId
            };

            // Verificar que los campos no estén vacíos antes de crear el comentario
            if (!commentData.content || !commentData.userId) {
                console.error('Por favor completa todos los campos antes de publicar un comentario.');
                return;
            }

            await axios.post(`${API_URL}/comments`, commentData);
            setComments({...comments, [postId]: [...(comments[postId] || []), commentData]}); // Agregar el nuevo comentario al estado local
        } catch (error) {
            console.error('Error al intentar crear un nuevo comentario:', error);
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${API_URL}/users/${userId}`);
                setUser(response.data);
            } catch (error) {
                console.error('Error al obtener el usuario:', error);
            }
        };

        const fetchPosts = async () => {
            try {
                const response = await axios.get(`${API_URL}/posts/${userId}`);
                setPosts(response.data);
                console.log('Posts:', response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error al obtener los posts:', error);
            }
        };

        const fetchComments = async () => {
            try {
                const response = await axios.get(`${API_URL}/comments`);
                const commentsMap = response.data.reduce((acc, comment) => {
                    if (!acc[comment.postId]) {
                        acc[comment.postId] = [];
                    }
                    acc[comment.postId].push(comment);
                    return acc;
                }, {});
                setComments(commentsMap);
            } catch (error) {
                console.error('Error al obtener los comentarios:', error);
            }
        };

        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${API_URL}/users`);
                setUsers(response.data);
            } catch (error) {
                console.error('Error al obtener los usuarios:', error);
            }
        };

        fetchUser();
        fetchPosts();
        fetchComments();
        fetchUsers();
    }, [userId]);

    useEffect(() => {
        setUserOptions(users.map(user => (
            <option key={user.id} value={user.id}>{user.username}</option>
        )));
    }, [users]);

    return (
        <div className="user-profile">
            <Link to="/">Ir a la página principal</Link>
            <div className="user-info">
                <h2>{user.username}</h2>
                <h3>Foto de Perfil</h3>
                <img src={user.avatar} alt="Avatar" />
                
            </div>
            <div className="user-posts">
                <h2>Posts de {user.username}:</h2>
                <ul>
                    {posts.map((post) => (
                        <li key={post.id}>
                            <h1>{post.title}</h1>
                            <p>{post.content}</p>
                            {post.image && <img className='post-image' src={post.image} alt="Post" />}
                            <div className="post-details">
                                <div className='usuario-imagen'>
                                    <img src={user.avatar} alt="Avatar" />
                                    <strong>Usuario:</strong> {user.username}
                                </div>
                                <div>
                                    <strong>Fecha de creación:</strong> {new Date(post.createdAt).toLocaleString()}
                                </div>
                            </div>
                            <h3>Comentarios:</h3>
                            <ul>
                            {comments[post.id] && comments[post.id].map((comment) => (
                                    <li key={comment.id}>
                                        <div className="comment-details">
                                            {users.length > 0 && (
                                                    <img src={users.find(user => user.id === comment.userId).avatar} alt="Avatar" />
                                                )}
                                            <strong><Link to={`/perfil/${comment.userId}`}>
                                                {getUsernamebyId(comment.userId)}
                                            </Link>
                                            </strong>: {comment.content}
                                            <span className="comment-date">- {new Date(comment.createdAt).toLocaleString()}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className="comment-form">
                                <h3>Publicar comentario:</h3>
                                <form>
                                    <div>
                                        <label htmlFor={`commentContent-${post.id}`}>Contenido:</label>
                                        <textarea id={`commentContent-${post.id}`} name={`commentContent-${post.id}`}></textarea>
                                    </div>
                                    <div>
                                        <label htmlFor={`commentUserId-${post.id}`}>Usuario que comenta:</label>
                                        <select id={`commentUserId-${post.id}`} name={`commentUserId-${post.id}`}>
                                            {userOptions}
                                        </select>
                                    </div>
                                    <button type="button" onClick={() => onCreateComment(post.id)}>Publicar Comentario</button>
                                </form>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Perfil;