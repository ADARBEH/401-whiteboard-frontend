import axios from "axios";

export const getallPostsfun = (dispatch, payload) => {
    axios.get('https://whiteboard-backend-ad.herokuapp.com/post',
        {
            headers: {
                Authorization: `Bearer ${payload}`
            }
        }).then(res => {
            dispatch({
                type: 'GET_ALL_POSTS',
                payload: res.data
            })
        })
}

export const Addpostfun = (dispatch, payload) => {

    axios.post('https://whiteboard-backend-ad.herokuapp.com/post', payload,
        {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('User')).token}`
            }
        }
    ).then(res => {
        dispatch({
            type: 'ADD_POST',
            payload: res.data
        })

    }
    )
}

export const Deletepostfun = (dispatch, payload) => {
    axios.delete(`https://whiteboard-backend-ad.herokuapp.com/post/${payload}`,
        {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('User')).token}`
            }
        }).then(res => {
            dispatch({
                type: 'DELETE_POST',
                payload: payload
            })
        })
}

