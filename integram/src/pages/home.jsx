
import React, { useState, useEffect } from 'react';

import axios from 'axios';
import './home.css';
import API_URL from '../config';
import { Link } from 'react-router-dom';


function Home() {
    const [comments, setComments] = useState({});
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [postData, setpostData] = useState({
        title: '',
        content: '',
        image: '',
        userId: ''
    });

    const [newUser, setNewUser] = useState({
        username: '',
        password: '',
        avatar: ''
    });
    const userOptions = users.map((user) => (
        <option key={user.id} value={user.id}>{user.username}</option>
    ));




    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`${API_URL}/posts`);
                setPosts(response.data);
            } catch (error) {
                console.error('Error al intentar obtener los posts:', error);
            }
        };

        fetchPosts();

        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${API_URL}/users`);
                setUsers(response.data);
            } catch (error) {
                console.error('Error al intentar obtener los usuarios:', error);
            }
        };



        fetchUsers();

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
                console.error('Error al intentar obtener los comentarios:', error);
            }
        };

        fetchComments();

    }, []);


    const getUsernamebyId = (userId) => {
        const user = users.find((user) => user.id === userId);
        return user ? user.username : 'Usuario desconocido';
    };



    const handlePopulate = async () => {
        // Lógica para enviar una solicitud a '/populate' y actualizar los datos
    try{
        await axios.post( `${API_URL}/populate` );
        fetchPosts();

    } catch (error) {
        console.error(error.response.data.message);
    }
    
    };

    const handleReset = async () => {
        // Lógica para enviar una solicitud a '/reset' y limpiar los datos

        try {
            await axios.post(`${API_URL}/reset`);
            setPosts([]);
        } catch (error) {
            console.error(error.response.data.message);
        } 
    };

    const onCreatePost = async () => {
        try {

            const postData = {
                title: document.getElementById('title').value,
                content: document.getElementById('content').value,
                image: document.getElementById('image').value,
                userId: parseInt(document.getElementById('userId').value)
            };


            // Verificar que los campos no estén vacíos antes de crear el post
            if (!postData.title || !postData.content || !postData.userId) {
                console.error('Por favor completa todos los campos antes de crear un nuevo post.');
                return;
            }
    
            await axios.post(`${API_URL}/posts`, postData);
            setPosts([...posts, postData]); // Agregar el nuevo post al estado local
            setpostData({ // Limpiar los campos del formulario después de crear el post
                title: '',
                content: '',
                image: '',
                userId: ''
            });
        } catch (error) {
            console.error('Error al intentar crear un nuevo post:', error);
        }
    };

    const onCreateUser = (userData) => {
        try {
            const newUser = {
                username: document.getElementById('username').value,
                password: document.getElementById('password').value,
                avatar: document.getElementById('avatar').value
            };

            // Verificar que los campos no estén vacíos antes de crear el usuario
            if (!newUser.username || !newUser.password || !newUser.avatar) {
                console.error('Por favor completa todos los campos antes de crear un nuevo usuario.');
                return;
            }

            axios.post(`${API_URL}/users`, newUser);
            setUsers([...users, newUser]); // Agregar el nuevo usuario al estado local
            setNewUser({ // Limpiar los campos del formulario después de crear el usuario
                username: '',
                password: '',
                avatar: ''
            });
        } catch (error) {
            console.error('Error al intentar crear un nuevo usuario:', error);
        }
        
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

    return (
        <div className="centered-container">
            <div className="form-container">
                <h2>Crear un nuevo usuario</h2>
                <form>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" />
                    </div>
                    <div>
                        <label htmlFor="password">Contraseña:</label>
                        <input type="password" id="password" name="password" />
                    </div>
                    <div>
                        <label htmlFor="avatar">Avatar:</label>
                        <input type="text" id="avatar" name="avatar" />
                    </div>
                    <button type="button" onClick={onCreateUser}>Crear Usuario</button>
                </form>
            </div>
            <div className="form-container">
                <h2>Crear un nuevo post</h2>
                <form>
                    <div>
                        <label htmlFor="title">Título:</label>
                        <input type="text" id="title" name="title" />
                    </div>
                    <div>
                        <label htmlFor="content">Contenido:</label>
                        <textarea id="content" name="content"></textarea>
                    </div>
                    <div>
                        <label htmlFor="image">URL de la foto:</label>
                        <input type="text" id="image" name="image" />
                    </div>
                    <div>
                        <label htmlFor="userId">Creador del post:</label>
                            <select id="userId" name="userId">
                                {userOptions}
                            </select>
                    </div>
                    <button type="button" onClick={onCreatePost}>Crear Post</button>
                </form>
            
            </div>
            <div className="button-container">
                <button onClick={handlePopulate}>Populate</button>
                <button onClick={handleReset}>Reset</button>
            </div>
            <div className="posts-container">
                <h2>Posts:</h2>
                <ul>
                    {posts.map((post) => (
                        <li key={post.id}>
                            <h1>{post.title}</h1>
                            <p>{post.content}</p>
                            {post.image && <img src={post.image} alt="Post" />}
                             <div className="post-details">
                                <div className='usuario-imagen'> 
                                    {users.length > 0 && (
                                            <img src={users.find(user => user.id === post.userId).avatar} alt="Avatar" />
                                        )}
                                    <strong>Usuario:</strong> 
                                    <Link to={`/perfil/${post.userId}`}>
                                        {getUsernamebyId(post.userId)}
                                    </Link>
                                    
                                </div>
                                <div>
                                    <strong>Fecha de creación:</strong> {new Date(post.created).toLocaleString()}
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

export default Home;
