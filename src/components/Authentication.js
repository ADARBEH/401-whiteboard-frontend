import React, { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { useAuth } from '../context/AuthContext';
import Datauser from './Datauser';






function Authtest() {

    const { login , handleSignup, handleLogin } = useAuth();


    let [authMode, setAuthMode] = useState("signin")

    const changeAuthMode = () => {
        setAuthMode(authMode === "signin" ? "signup" : "signin")
    }

    if (!login) {
        if (authMode === "signin") {
            return (
                <>

                    <h1 className='welcome'>Welcome To My Site 👋</h1>
                    <p className='parg'>You shoud Sign In to see our post and comment 😊</p>

                    <div className="Auth-form-container">
                        <form className="Auth-form" onSubmit={handleLogin}>
                            <div className="Auth-form-content">
                                <h3 className="Auth-form-title">Sign In</h3>
                                <div className="text-center">
                                    Not registered yet?{" "}
                                    <span className="link-primary" onClick={changeAuthMode}>
                                        Sign Up
                                    </span>
                                </div>
                                <div className="form-group mt-3">
                                    <label>Email address</label>
                                    <input
                                        type="email"
                                        className="form-control mt-1"
                                        placeholder="Enter email"
                                        name="email"
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        className="form-control mt-1"
                                        placeholder="Enter password"
                                        name="password"
                                    />
                                </div>
                                <div className="d-grid gap-2 mt-3">
                                    <button type="submit" className="btn btn-primary">
                                        Submit
                                    </button>
                                </div>

                            </div>
                        </form>
                    </div>
                </>
            )
        }
    }

    if (!login) {
        return (
            <>
                <h1 className='welcome'>Welcome To My Site 👋</h1>
                <p className='parg'>You shoud Sign In to see our post and comment 😊</p>

                <div className="Auth-form-container">
                    <form className="Auth-form" onSubmit={handleSignup}>
                        <div className="Auth-form-content">
                            <h3 className="Auth-form-title">Sign In</h3>
                            <div className="text-center">
                                Already registered?{" "}
                                <span className="link-primary" onClick={changeAuthMode}>
                                    Sign In
                                </span>
                            </div>
                            <div className="form-group mt-3">
                                <label>Full Name</label>
                                <input
                                    type="test"
                                    className="form-control mt-1"
                                    placeholder="e.g Jane Doe"
                                    name="username"
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label>Email address</label>
                                <input
                                    type="email"
                                    className="form-control mt-1"
                                    placeholder="Email Address"
                                    name="email"
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-control mt-1"
                                    placeholder="Password"
                                    name="password"
                                />
                            </div>

                            <div className="d-grid gap-2 mt-3">
                                <label>Role</label>
                                <select class="form-select" aria-label="Default select example" name="role" id="role">
                                    <option selected>Choose your Role</option>
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            <div className="d-grid gap-2 mt-3">
                                <button type="submit" className="btn btn-primary">
                                    Submit
                                </button>
                            </div>
                            <p className="text-center mt-2">
                                Forgot password?
                            </p>
                        </div>
                    </form>
                </div>
            </>
        )
    }

    if (login) {
        return (
            <div>
                <Datauser />
            </div>
        )
    }
}

export default Authtest;
