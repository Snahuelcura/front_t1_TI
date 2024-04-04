import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

function PostForm({ onCreatePost }) {
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState(null);

    const onSubmit = async (data) => {
        try {
            await onCreatePost(data);
        } catch (error) {
            setError('Error al crear el post. Inténtalo de nuevo.');
        }
    };

    return (
        <div>
            <h2>Crear un nuevo post</h2>
            {error && <div>{error}</div>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="title">Título:</label>
                    <input type="text" id="title" name="title" ref={register({ required: true })} />
                </div>
                <div>
                    <label htmlFor="content">Contenido:</label>
                    <textarea id="content" name="content" ref={register({ required: true })}></textarea>
                </div>
                <div>
                    <label htmlFor="imageUrl">URL de la foto:</label>
                    <input type="text" id="imageUrl" name="imageUrl" ref={register} />
                </div>
                <div>
                    <label htmlFor="userId">ID de usuario:</label>
                    <input type="number" id="userId" name="userId" ref={register({ required: true })} />
                </div>
                <button type="submit">Crear Post</button>
            </form>
        </div>
    );
}

export default PostForm;
