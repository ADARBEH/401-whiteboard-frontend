
import Datauser from './Datauser';
import { When } from 'react-if';
import { useAuth } from '../context/AuthContext';
import PostontextProvider from '../context/PostContext';



function Auth() {
    const { login, handleSignup, handleLogin, logout } = useAuth();
    return (
        <>
            <PostontextProvider>
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
            </PostontextProvider>

        </>
    );
}

export default Auth;
