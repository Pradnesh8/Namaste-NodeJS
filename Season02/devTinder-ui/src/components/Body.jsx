import React, { useEffect } from 'react'
import NavBar from './NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'

const Body = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(store => store.user)
    const fetchLoggedInUser = async () => {
        try {
            if (user) return
            const res = await axios.get(BASE_URL + "/profile/view", { withCredentials: true });
            dispatch(addUser(res.data))
        } catch (err) {
            navigate("/login")
            console.error(err);
        }
    }
    useEffect(() => {
        fetchLoggedInUser();
    }, [])
    return (
        <>
            <NavBar />
            {/* Renders child components based on route */}
            <Outlet />
            <Footer />
        </>
    )
}

export default Body