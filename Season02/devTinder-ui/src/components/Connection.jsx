import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'

const Connection = () => {
    const connections = useSelector(store => store.connections)
    const dispatch = useDispatch()
    const getConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true })
            dispatch(addConnections(res?.data?.data))
        } catch (err) {
            console.error(err)
        }
    }
    useEffect(() => {
        getConnections()
    }, [])
    if (!connections) return
    if (connections?.length === 0) return (
        <h1 className='text-3xl font-bold text-center my-10'>You don't have any connections</h1>
    )
    return (
        <div>
            <h1 className='text-3xl font-bold text-center my-10'>Connections</h1>
            <div>
                {
                    connections.map(connection => {
                        const { _id, firstName, lastName, about, age, skill, gender, photo_url } = connection
                        return (
                            <div key={_id} className='flex my-2 gap-8 w-1/3 items-center mx-auto bg-base-300 p-2 rounded-lg'>
                                <img className='w-20 ml-2 h-20 bg-cover rounded-full' src={photo_url} alt="photo" />
                                <div>
                                    <h3 className='text-xl font-semibold'>{firstName}</h3>
                                    {
                                        age && gender &&
                                        <p className='text-sm'>{age + ", " + gender}</p>
                                    }
                                    <p className='text-sm'>{about}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Connection