import { createContext, useState, useEffect, useContext } from "react";
import axios from 'axios';
import cookies from "react-cookies";
import base64 from 'base-64';


const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthContextProvider = props => {


    const [login, setLogin] = useState(false);
    const [user, setUser] = useState([]);
    const [capabilities, setCapabilities] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const data = {
                userName: e.target.username.value,
                email: e.target.email.value,
                password: e.target.password.value,
                role: e.target.role.value
            };
            const signup = await axios.post('https://whiteboard-backend-ad.herokuapp.com/signup', data);
            console.log(signup.data);
            setLogin(true);
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleLogin = (e) => {
        e.preventDefault();
        const data = {
            username: e.target.email.value,
            password: e.target.password.value
        };

        const encodedCredintial = base64.encode(`${data.username}:${data.password}`);

        axios.post('https://whiteboard-backend-ad.herokuapp.com/login', {}, {
            headers: {
                Authorization: `Basic ${encodedCredintial}`
            }

        }).then(res => {
            cookies.save('token', res.data.token);
            cookies.save('id', res.data.id);
            if (res.data.capabilities.includes('delete')) {
                setCapabilities(true);
            }
            setLogin(true);

        })
            .catch(err => console.log(err));
    }
  
        useEffect(() => {
            if (cookies.load('token')) {
                setLogin(true);
            }
            
        }, [
            login
        ]);




        function logout() {
            cookies.remove('token');
            cookies.remove('id');
            setUser({});
            setLogin(false);
            setCapabilities(false);
        }

        const value = { login, setLogin, user,capabilities , handleSignup, handleLogin, logout };
        return (
            <AuthContext.Provider value={value}>
                {props.children}
            </AuthContext.Provider>
        )
    }

    export default AuthContextProvider;
