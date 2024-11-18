import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { addFeed } from '../utils/feedSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Feed = () => {
    const dispatch = useDispatch()
    const feed = useSelector(store => store.feed)
    const navigate = useNavigate()
    const getFeed = async () => {
        try {
            if (feed) {
                console.log("already fetched", feed)
                return
            }
            const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
            console.log(res?.data);
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
    return (
        <div className='text-center text-4xl my-16'>Feed</div>
    )
}

export default Feed