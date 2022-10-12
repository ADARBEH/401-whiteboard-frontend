

export const intialStateAuth = {
    user: null,
    login: false,
    token: null,
};

export const AuthReducer = (state, action) => {
    switch (action.type) {

        case 'LOGIN_TRUE':
            return {
                ...state,
                login: true,
                user: localStorage.getItem('User'),
                token: localStorage.getItem('token')
            };

        case 'LOGIN_SUCCESS':
            return {
                ...state,
                login: true,
                user: action.payload,
                token: action.payload.token,
            };

        case 'LOGOUT':
            return {
                ...state,
                login: false,
                user: null,
                token: null,
            };

        case 'SIGNUP_SUCCESS':
            return {
                ...state,
                login: true,
                user: action.payload,
                token: action.payload.token,
            };

        default:
            return state;
    }
};
