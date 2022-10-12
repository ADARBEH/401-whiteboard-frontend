import axios from "axios";


export const loginfun = (dispatch, payload) => {

    try {
        axios.post('https://whiteboard-backend-ad.herokuapp.com/login', {}, {
            headers: {
                Authorization: `Basic ${payload}`
            }

        }).then(res => {

            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: res.data
            })
            localStorage.setItem('User', JSON.stringify(res.data));
            localStorage.setItem('token', res.data.token);
        })

    }
    catch (err) {
        console.log(err);
    }
}



export const signupfun = (dispatch, payload) => {
    try {
        axios.post('https://whiteboard-backend-ad.herokuapp.com/signup', payload)

            .then(res => {
                dispatch({
                    type: 'SIGNUP_SUCCESS',
                    payload: res.data
                })

                localStorage.setItem('User', JSON.stringify(res.data));
                localStorage.setItem('token', res.data.token);
            })
    }
    catch (err) {
        console.log(err);
    }
}

export const logoutfun = (dispatch) => {
    localStorage.removeItem('token');
    localStorage.removeItem('User');

    dispatch({
        type: 'LOGOUT'
    })

}

export const refreshfun = (dispatch) => {
    const token = localStorage.getItem('token');

    if (token) {
        dispatch({
            type: 'LOGIN_TRUE',
        })
    }
}