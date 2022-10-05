
import React, { useEffect } from 'react'
import axios from 'axios';
import cookies from "react-cookies";
import { useAuth } from '../context/AuthContext';
import { usePost } from '../context/PostContext';
import Model from './Model'




export default function PostCard(props) {

    const { capabilities  } = useAuth();
    const { getallPosts } = usePost();




    const handleDelete = async (id) => {
        await axios.delete(`https://whiteboard-backend-ad.herokuapp.com/post/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${cookies.load('token')}`
                }
            }
        );
        getallPosts()
    }



    useEffect(() => {
        handleaddcomment();
    },)

    const handleaddcomment = async (e, id) => {
        if (e && e.preventDefault) {
            e.preventDefault();
            const comment = e.target.comment.value;
            const newcomment = {
                petName: comment,
                ownerID: id
            }
            const addcomment = await axios.post(`https://whiteboard-backend-ad.herokuapp.com/comment/`, newcomment);
            console.log(addcomment);
            getallPosts()
        }
    }

  
    return (
        
        <>

            {
                props.posts.map((post, idx) => {
                    return (
                        <div className='div_for_article' key={idx} >
                            <article class="postcard light green">
                                <p className="postcard__img_link">
                                    <img class="postcard__img" src="https://picsum.photos/500/501" alt="Image Title" />
                                </p>
                                <div class="postcard__text t-dark">
                                    <h1 class="postcard__title green">{post.title}</h1>
                                    <div class="postcard__subtitle small">
                                        <time datetime="2020-05-25 12:00:00">
                                            <i class="fas fa-calendar-alt mr-2"></i>{post.createdAt}
                                        </time>
                                    </div>
                                    <div class="postcard__bar"></div>
                                    <div class="postcard__preview-txt">{post.content}</div>
                                    <div>
                                        {post.Comments[0] &&
                                            <div>
                                                <p>Comments</p>
                                                {post.Comments.map((comment, idx) => {
                                                    return (
                                                        <div key={idx} className='comment'>
                                                            <p>{comment.petName}</p>
                                                        </div>
                                                    )
                                                }
                                                )}
                                            </div>
                                        }
                                    </div>


                                    {(capabilities || cookies.load('id') === `${post.postid}`) &&
                                        <>
                                            <ul class="postcard__tagbox">
                                                <button className='btn btn-primary' onClick={() => { handleDelete(post.id) }}>Delete Posts</button>
                                                <Model id={post.id} />
                                            </ul>
                                        </>
                                    }

                                </div>

                            </article>




                            <form onSubmit={(e) => { handleaddcomment(e, post.id) }} className='formcomment'>
                                <label htmlFor="" className='comment'>Put Comment</label>
                                <input type="text" name='comment' className='input' />
                                <input type="submit" value="Add comment" className='sub' />
                            </form>




                        </div>
                    )
                })
            }
        </>
    )
}

