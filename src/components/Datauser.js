import axios from 'axios';
import { useState, useEffect } from 'react';
import Posts from './Posts';
import cookies from "react-cookies";


function Datauser() {
  const [posts, setPosts] = useState([]);
  const [showdata, setShowdata] = useState(false);


  const getallPosts = async () => {
    const allpost = await axios.get('https://whiteboard-backend-ad.herokuapp.com/post',
      {
        headers: {
          Authorization: `Bearer ${cookies.load('token')}`
        }
      });
    setPosts(allpost.data);
    setShowdata(true)

  }


  const Addpost = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const content = e.target.content.value;
    const newPost = {
      title: title,
      content: content
    }
    await axios.post('https://whiteboard-backend-ad.herokuapp.com/post', newPost,
      {
        headers: {
          Authorization: `Bearer ${cookies.load('token')}`
        }
      }
    );
    getallPosts();
  }

  useEffect(() => {
    getallPosts();
  });

  return (
    <div>

      <h1 className='welcome'>Give Me Post</h1>

      <form onSubmit={Addpost} className='form'>
        <label htmlFor="" className='yorttit'>YOR TITEL</label>
        <input type="text" name='title' className='input' />

        <label htmlFor="" className='yorttit'>YOUR CONTENT</label>
        <input type="text" name='content' className='input' />

        <input type="submit" value="Add post" className='sub' />
      </form>
      {
        showdata &&
        <Posts posts={posts} />

      }


    </div>

  );
}

export default Datauser;