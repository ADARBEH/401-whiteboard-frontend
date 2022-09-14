
import React, { useEffect } from 'react'
import axios from 'axios';


export default function Posts(props) {

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:3000/post/${id}`);
    }
    useEffect(() => {
        handleDelete();
    }, [])

    const handleaddcomment = async (e, id) => {
        e.preventDefault();
        const comment = e.target.comment.value;
        const newcomment = {
            petName: comment,
            ownerID: id
        }
        const addcomment = await axios.post(`http://localhost:3000/comment/`, newcomment);
        console.log(addcomment);
    }
    const handleupdate = async (e, id) => {
        e.preventDefault();
        const title = e.target.title.value;
        const content = e.target.content.value;
        const newPost = {
            title: title,
            content: content
        }
        const updatepost = await axios.put(`http://localhost:3000/post/${id}`, newPost);
        console.log(updatepost);
    }


    return (
        <>
            <ul class="cards">
                {
                    props.posts.map((post, idx) => {
                        return (
                            <li class="cards__item" key={idx}>
                                <div class="card">
                                    <div class="card__image card__image--fence"></div>
                                    <div class="card__content">
                                        <div class="card__title">{post.title}</div>
                                        <p class="card__text">{post.content}</p>
                                        <button class="btn btn--block card__btn">Button</button>
                                    </div>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>

        </>
    )
}
