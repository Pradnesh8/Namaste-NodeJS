import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../utils/userSlice'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { deleteCookie } from '../utils/helper'

const NavBar = () => {
    const user = useSelector(store => store.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logoutHandler = async () => {
        try {
            const res = await axios.post(BASE_URL + "/logout")
            deleteCookie('token')
            dispatch(removeUser())
            navigate("/login")
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <div className="navbar bg-base-300">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">🧑‍💻 DevTinder</a>
            </div>
            {
                !user &&
                <div className="card-actions justify-center mr-4">
                    <button className="btn btn-outline" onClick={() => navigate("/login")}>Login</button>
                </div>
            }
            {
                user &&
                <div className="flex-none gap-2">
                    <div className="form-control">
                        Hi, {user.firstName}
                    </div>

                    <div className="dropdown dropdown-end mr-5">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src={user?.photo_url || DEFAULT_PROFILE_URL} />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li onClick={() => navigate("/profile")}>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li onClick={logoutHandler}><a>Logout</a></li>
                        </ul>
                    </div>
                </div>
            }
        </div>
    )
}

export default NavBar