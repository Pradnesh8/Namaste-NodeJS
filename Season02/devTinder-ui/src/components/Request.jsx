import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequest } from '../utils/requestSlice'

const Request = () => {
    const requests = useSelector(store => store.requests)
    const dispatch = useDispatch()
    const getRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/requests/received", { withCredentials: true })
            dispatch(addRequests(res?.data?.data))
        } catch (err) {
            console.error(err)
        }
    }
    const reviewRequest = async (status, _id) => {
        try {
            const res = await axios.post(BASE_URL + "/request/review/" + status + "/" + _id, {}, { withCredentials: true })
            dispatch(removeRequest(_id))
        } catch (err) {
            console.error(err)
        }
    }
    useEffect(() => {
        getRequests()
    }, [])
    if (!requests) return
    if (requests?.length === 0) return (
        <h1 className='text-3xl font-bold text-center my-10'>You don't have any requests</h1>
    )
    return requests?.length > 0 && (
        <div>
            <h1 className='text-3xl font-bold text-center my-10'>Pending Requests</h1>
            <div>
                {
                    requests?.map(request => {
                        const { firstName, lastName, about, age, skill, gender, photo_url } = request?.fromUserId
                        return (
                            <div key={request?._id} className='flex my-2 gap-4 w-1/2 justify-around items-center mx-auto bg-base-300 p-2 rounded-lg'>
                                <img className='w-20 ml-2 h-20 object-fill rounded-full' src={photo_url} alt="photo" />
                                <div>
                                    <h3 className='text-xl font-semibold'>{firstName + " " + lastName}</h3>
                                    {
                                        age && gender &&
                                        <p className='text-sm'>{age + ", " + gender}</p>
                                    }
                                    <p className='text-sm'>{about}</p>
                                </div>
                                <div className='flex gap-2'>
                                    <button className="btn btn-error btn-outline" onClick={() => reviewRequest("rejected", request?.fromUserId?._id)}>Reject</button>
                                    <button className="btn btn-primary btn-outline" onClick={() => reviewRequest("accepted", request?.fromUserId?._id)}>Accept</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Request