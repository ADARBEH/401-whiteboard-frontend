import { createContext, useReducer, useEffect, useContext, useState } from "react";
import { intialStatePost, PostReducer } from '../Reducers/PostReducer';
import { getallPostsfun, Addpostfun } from "../Action/PostAction";






const PostContext = createContext();
export const usePost = () => useContext(PostContext);

const PostontextProvider = props => {

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [lodning, setlodning] = useState(false);


    const [posts, dispatch] = useReducer(PostReducer, intialStatePost);



    const getallPosts = async () => {

        getallPostsfun(dispatch, localStorage.getItem('token'));

    }


    const Addpost = async (e) => {
        e.preventDefault();

        const newPost = {
            title: title,
            content: content,
            postid: JSON.parse(localStorage.getItem('User')).id
        }

        Addpostfun(dispatch, newPost);

        setlodning(true);

        setTimeout(() => {
            setlodning(false);
        }, "3400")
    }



    //  value of the input and the function to change the value  

    const handleChangetitle = (event) => {
        setTitle(event.target.value)
    }
    const handleChangecontent = (event) => {
        setContent(event.target.value)
    }


    useEffect(() => {
        getallPosts();
    }, [posts])





    const value = { getallPosts, Addpost, posts, lodning,title,content, setlodning, handleChangetitle, handleChangecontent};
    return (
        <PostContext.Provider value={value}>
            {props.children}
        </PostContext.Provider>
    )
}

export default PostontextProvider;
