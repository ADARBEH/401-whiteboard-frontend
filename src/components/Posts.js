
import React, { useEffect } from 'react'
import axios from 'axios';


export default function Posts(props) {

  const handleDelete = async (id) => {
  await axios.delete(`https://adarbeh-api.herokuapp.com/post/${id}`);
  }
  useEffect(() => {
    handleDelete();
    handleaddcomment();
  }, [])

  const handleaddcomment = async (e,id) => {
    e.preventDefault();
    const comment = e.target.comment.value;
    const newcomment = {
      petName: comment,
      ownerID:id
    }
    const addcomment = await axios.post(`https://adarbeh-api.herokuapp.com/comment/`, newcomment);
    console.log(addcomment);
  }
  
  
  return (
    <>
      <div>
        {
          props.posts.map((post, idx) => {
            return (
              <div key={idx} className='card-data'>
                <p className='titel'>Title  :  {post.title}</p>
                <p className='comments'>Content  :  {post.content}</p>
                <button className='botempost' onClick={() => { handleDelete(post.id).reload()}}>Delete Posts</button>
                <form onSubmit={(e) => { handleaddcomment(e,post.id) }} className='formcomment'>
                  <label htmlFor="" className='yorttit'>YOR COMMENT</label>
                  <input type="text" name='comment' className='input' />
                  <input type="submit" value="Add comment" className='sub' />
                </form>


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
            )
          })
        }
      </div>
    </>
  )
}

