import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { addFeed } from '../utils/feedSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import UserCard from './UserCard'

const Feed = () => {
    const dispatch = useDispatch()
    const feed = useSelector(store => store.feed)
    const navigate = useNavigate()
    const getFeed = async () => {
        try {
            if (feed) {
                // console.log("already fetched", feed)
                return
            }
            const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
            dispatch(addFeed(res?.data));
        } catch (err) {
            console.error(err);
            if (err.status === 401)
                navigate("/login")
            else {
                // TODO: redirect to error page
            }
        }
    }
    useEffect(() => {
        getFeed()
    }, [])
    if (!feed) return
    if (feed?.length === 0) return (
        <h1 className='text-3xl font-bold text-center my-10'>No new user found</h1>
    )
    return feed?.length > 0 && (
        <div className='flex justify-center my-4'>
            <UserCard user={feed[0]} />
        </div>
    )
}

export default Feed