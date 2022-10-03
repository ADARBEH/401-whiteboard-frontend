import Posts from './Posts';
import { usePost } from '../context/PostContext';



function Datauser() {

  const {  Addpost , posts , showdata} = usePost();

  

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
