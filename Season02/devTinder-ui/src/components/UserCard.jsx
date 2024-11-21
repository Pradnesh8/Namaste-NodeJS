import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { removeUserFromFeed } from '../utils/feedSlice'

const UserCard = ({ user }) => {
    const { _id, firstName, lastName, about, age, skill, gender, photo_url } = user
    const dispatch = useDispatch()
    const handleRequest = async (status, userId) => {
        try {
            const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {}, { withCredentials: true })
            dispatch(removeUserFromFeed(userId));
        } catch (err) {
            console.error(err)
        }
    }
    return (
        <div className="card bg-base-300 w-80 shadow-xl">
            <figure>
                <img
                    src={photo_url}
                    alt="profile photo" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                {
                    age && gender &&
                    (
                        <p>{age + ", " + gender} </p>
                    )
                }
                {
                    skill &&
                    (
                        <p>{skill?.join(", ")}</p>
                    )
                }
                <p>{about}</p>
                <div className="card-actions justify-between my-1">
                    <button className="btn btn-error btn-outline" onClick={() => handleRequest("ignored", _id)}>Ignore</button>
                    <button className="btn btn-primary btn-outline" onClick={() => handleRequest("interested", _id)}>Interested</button>
                </div>
            </div>
        </div>
    )
}

export default UserCard