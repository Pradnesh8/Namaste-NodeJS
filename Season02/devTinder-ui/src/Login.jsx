import React, { useState } from 'react'
import axios from 'axios';

const Login = () => {
    const [emailId, setEmailId] = useState("")
    const [password, setPassword] = useState("")

    const submitHandler = async () => {
        try {
            const res = await axios.post("http://localhost:7777/login", {
                emailId, password
            }, { withCredentials: true })
            console.log("Login Successful");
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className='flex justify-center my-32'>
            <div className="card bg-base-300 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title justify-center">Login</h2>
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
                    <div className="card-actions justify-center mt-4">
                        <button className="btn btn-primary w-1/3" onClick={submitHandler}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login