
import './App.css';
import React, { useEffect } from 'react';
import Datauser from './components/Datauser';
import base64 from 'base-64';
import { When } from 'react-if';
import axios from 'axios';
import { useState } from 'react';
import { useCookies } from 'react-cookie';


function App() {
  const [login, setLogin] = useState(false);
  const [cookies, setCookie] = useCookies(['user']);



  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const data = {
        userName: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value
      };
      const signup = await axios.post('https://whiteboard-backend-ad.herokuapp.com/signup', data);
      console.log(signup.data);
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
    // console.log(`Basic ${encodedCredintial}`)
    axios.post('https://whiteboard-backend-ad.herokuapp.com/login', {}, {
      headers: {
        Authorization: `Basic ${encodedCredintial}`
      }
    })
      .then(res => {
        // console.log(res.data)
        setCookie('token', res.data.token, { path: '/' });
        setLogin(true);
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    if (cookies.token) {
      setLogin(true);
    }
  }, [cookies.token]);

  const logout = () => {
    setCookie('token', '', { path: '/' });
    setLogin(false);
  }


  return (
    <>

      <When condition={!login}>
        <h1 className='welcome'>Welcome To My Site 👋</h1>
        <p className='parg'>You shoud login to see our post and comment 😊</p>

        <div className='div-sing'>

          <div className='Signup'>
            <h1>Signup</h1>
            <form action='' onSubmit={handleSignup} >
              <input type="text" name='username' placeholder='userName' />
              <input type="text" name='email' placeholder='email' />
              <input type="text" name='password' placeholder='password' />
              <input type="submit" value='signup' />
            </form>
          </div>

          <div className='Login'>
            <h1>Login</h1>
            <form action='' onSubmit={handleLogin}>
              <input type="text" name='email' placeholder='email' />
              <input type="text" name='password' placeholder='password' />
              <input type="submit" value='login' />
            </form>
          </div>

        </div>

      </When>

      <When condition={login}>
        <button className='button-logout' onClick={logout}>Logout</button>
        <Datauser />
      </When>

    </>

  );
}

export default App;
