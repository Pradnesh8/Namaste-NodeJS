import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BASE_URL } from '../utils/constants';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const user = useSelector(store => store.user)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [emailId, setEmailId] = useState("")
    const [password, setPassword] = useState("")
    const [errMsg, setErrMsg] = useState("")
    const [isLoginForm, setIsLoginForm] = useState(true)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const submitHandler = async () => {
        try {
            const res = await axios.post(BASE_URL + "/login", {
                emailId, password
            }, { withCredentials: true })
            console.log("Login Successful");
            dispatch(addUser(res.data));
            navigate("/")
        } catch (err) {
            setErrMsg(err?.response?.data || "Something went wrong")
            console.error(err)
        }
    }
    const signUpHandler = async () => {
        try {
            const res = await axios.post(BASE_URL + "/signup", {
                firstName, lastName, emailId, password
            }, { withCredentials: true })
            console.log("Sign up Successful");
            dispatch(addUser(res?.data?.data));
            navigate("/profile")
        } catch (err) {
            setErrMsg(err?.response?.data || "Something went wrong")
            console.error(err)
        }
    }
    const checkIfLoggedIn = () => {
        if (user) {
            isLoginForm ?
                navigate("/") :
                navigate("/profile")
        }
    }
    useEffect(() => {
        checkIfLoggedIn();
    }, [user])
    return (
        <div className='flex justify-center my-32'>
            <div className="card bg-base-300 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title justify-center">{isLoginForm ? "Login" : "Sign Up"}</h2>
                    {
                        !isLoginForm &&
                        (
                            <>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">First Name</span>
                                    </div>
                                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="input input-bordered w-full max-w-xs" />
                                </label>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Last Name</span>
                                    </div>
                                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="input input-bordered w-full max-w-xs" />
                                </label>
                            </>
                        )
                    }
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Email ID</span>
                        </div>
                        <input type="text" value={emailId} onChange={(e) => setEmailId(e.target.value)} className="input input-bordered w-full max-w-xs" />
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Password</span>
                        </div>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input input-bordered w-full max-w-xs" />
                    </label>
                    <div className='text-error'>{errMsg}</div>
                    <div className="card-actions justify-center mt-4">
                        <button className="btn btn-primary w-1/3" onClick={isLoginForm ? submitHandler : signUpHandler}>Submit</button>
                    </div>
                    <p className="text-center cursor-pointer my-2" onClick={() => setIsLoginForm(!isLoginForm)}>
                        {
                            isLoginForm ?
                                "New user? Sign up here" :
                                "Already an user? Login here"
                        }
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login