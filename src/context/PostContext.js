import { createContext, useReducer, useEffect, useContext } from "react";
import { intialStatePost, PostReducer } from '../Reducers/PostReducer';
import { getallPostsfun, Addpostfun } from "../Action/PostAction";




const PostContext = createContext();
export const usePost = () => useContext(PostContext);

const PostontextProvider = props => {


    const [posts, dispatch] = useReducer(PostReducer, intialStatePost);


    const getallPosts = async () => {

        getallPostsfun(dispatch, localStorage.getItem('token'));

    }


    const Addpost = async (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const content = e.target.content.value;
        const newPost = {
            title: title,
            content: content,
            postid: JSON.parse(localStorage.getItem('User')).id
        }

        Addpostfun(dispatch, newPost);


    }

    useEffect(() => {
        getallPosts();
    }, [posts])

 



    const value = { getallPosts, Addpost, posts };
    return (
        <PostContext.Provider value={value}>
            {props.children}
        </PostContext.Provider>
    )
}

export default PostontextProvider;
