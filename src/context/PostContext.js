import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import cookies from "react-cookies";




const PostContext = createContext();
export const usePost = () => useContext(PostContext);

const PostontextProvider = props => {

    const [posts, setPosts] = useState([]);
    const [showdata, setShowdata] = useState(false);


    const getallPosts = async () => {
        const allpost = await axios.get('https://whiteboard-backend-ad.herokuapp.com/post',
            {
                headers: {
                    Authorization: `Bearer ${cookies.load('token')}`
                }
            });
        setShowdata(true)
        setPosts(allpost.data);
        console.log(allpost.data);

    }


    const Addpost = async (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const content = e.target.content.value;
        const newPost = {
            title: title,
            content: content,
            postid: cookies.load('id')
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

    });



    const value = { getallPosts, Addpost, posts, showdata };
    return (
        <PostContext.Provider value={value}>
            {props.children}
        </PostContext.Provider>
    )
}

export default PostontextProvider;
