
import './App.css';
import Datauser from './components/Datauser';
import base64 from 'base-64';
import { When } from 'react-if';
import axios from 'axios';
import cookies from "react-cookies";
import React, { useEffect, useState } from 'react';


function App() {
  const [login, setLogin] = useState(false);

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
      cookies.save('role', res.data.role);
      cookies.save('username', res.data.userName);
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
    cookies.remove('role');
    cookies.remove('username');
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
              <label for="cars">Choose a car:</label>
              <select name="role" id="role">
                <option value="user">user</option>
                <option value="admin">admin</option>
              </select>
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
