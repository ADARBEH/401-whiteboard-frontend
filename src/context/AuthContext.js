import { createContext , useEffect, useContext, useReducer } from "react";
import base64 from 'base-64';
import { AuthReducer, intialStateAuth } from "../Reducers/AuthReducer";
import { loginfun, logoutfun, signupfun, refreshfun } from "../Action/AuthAction";


const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthContextProvider = props => {


    const [user, dispatch] = useReducer(AuthReducer, intialStateAuth);

    const handleSignup = async (e) => {
        e.preventDefault();

        const data = {
            userName: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value,
            role: e.target.role.value
        };

        signupfun(dispatch, data);

    }

    const handleLogin = (e) => {
        e.preventDefault();
        const data = {
            username: e.target.email.value,
            password: e.target.password.value
        };

        const encodedCredintial = base64.encode(`${data.username}:${data.password}`);

        loginfun(dispatch, encodedCredintial);

    }

    const logout = () => {
        logoutfun(dispatch);
    }

    const refresh = async () => {
        refreshfun(dispatch);
    }


    useEffect(() => {
        if (localStorage.getItem('token')) {
            refresh();
            console.log('refresh');
        }
    }, [user.login])
    

    const value = { user, handleSignup, handleLogin, logout };
    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;
