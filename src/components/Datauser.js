import { usePost } from '../context/PostContext';
import { useAuth } from '../context/AuthContext';
import "bootstrap/dist/css/bootstrap.min.css"
import PostCard from './PostCard';
import {useEffect, } from 'react';





function Datauser() {

  const { Addpost, posts } = usePost();
  const { logout , user } = useAuth();
  const { getallPosts } = usePost();


  
  useEffect(() => {
    getallPosts();


  });





  return (

    <div>
      <nav className="navbar navbar-light bg-light">
        
          <img src="https://i.ibb.co/JkwNbbT/chat-logo-design-93835-108-removebg-preview.png" width="50" height="50" className="d-inline-block align-top" alt=''></img>
          <h1 className='parg-login'>Give Me Post Mr {user.userName}</h1>
          <button  className="btn btn-primary" onClick={logout}>Logout</button>
      </nav>

      <form onSubmit={Addpost} className='form'>
        <label htmlFor="" className='yorttit'>Your Title</label>
        <input type="text" name='title' className='input' />

        <label htmlFor="" className='yorttit'>Your Content</label>
        <input type="text" name='content' className='input' />

        <input type="submit" value="Add post" className='sub' />
      </form>

     
      {
        (posts.length > 0)  &&
        <PostCard posts={posts} />
      }
      
    </div>

  );
}

export default Datauser;
