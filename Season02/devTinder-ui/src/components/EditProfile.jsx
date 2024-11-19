import React, { useState } from 'react'
import UserCard from './UserCard'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'

const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user?.firstName)
    const [lastName, setLastName] = useState(user?.lastName || "")
    const [about, setAbout] = useState(user?.about || "")
    const [skill, setSkill] = useState(user?.skill || [])
    const [age, setAge] = useState(user?.age || "")
    const [gender, setGender] = useState(user?.gender || "")
    const [photoUrl, setPhotoUrl] = useState(user?.photo_url || "")
    const [errMsg, setErrMsg] = useState("")
    const [showSuccessToast, setShowSuccessToast] = useState(false)
    const [showErrToast, setShowErrToast] = useState(false)
    const dispatch = useDispatch()
    const updateProfileData = async () => {
        // clear error message
        setErrMsg("")
        try {
            const res = await axios.patch(BASE_URL + "/profile/edit", { firstName, lastName, about, age, skill, gender, photo_url: photoUrl }, { withCredentials: true })
            dispatch(addUser(res?.data?.data))
            setShowSuccessToast(true)
            setTimeout(() => {
                setShowSuccessToast(false)
            }, 3000)
        } catch (err) {
            setErrMsg(err?.response?.data || "Something went wrong")
            setShowErrToast(true)
            setTimeout(() => {
                setShowErrToast(false)
            }, 3000)
        }
    }
    return (
        <>
            <div className='flex justify-center my-16 gap-8'>
                <div className="card bg-base-300 w-96 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title justify-center">Edit Profile</h2>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">First Name:</span>
                            </div>
                            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="input input-bordered w-full max-w-xs" />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Last Name:</span>
                            </div>
                            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="input input-bordered w-full max-w-xs" />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Photo URL:</span>
                            </div>
                            <input type="text" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} className="input input-bordered w-full max-w-xs" />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Gender</span>
                            </div>
                            <select className="select select-bordered" value={gender} onChange={(e) => setGender(e.target.value)}>
                                <option disabled value={""}>Pick one</option>
                                <option value={"male"}>Male</option>
                                <option value={"female"}>Female</option>
                                <option value={"other"}>Other</option>
                            </select>
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Age:</span>
                            </div>
                            <input type="number" min={18} max={100} value={age} onChange={(e) => setAge(e.target.value)} className="input input-bordered w-full max-w-xs" />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">About:</span>
                            </div>
                            <textarea value={about} onChange={(e) => setAbout(e.target.value)} className="textarea textarea-bordered h-24 w-full max-w-xs" placeholder="Bio"></textarea>
                        </label>
                        <div className='text-error'>{errMsg}</div>
                        <div className="card-actions justify-center mt-4">
                            <button className="btn btn-primary w-1/2" onClick={updateProfileData}>Save Profile</button>
                        </div>
                    </div>
                </div>
                <UserCard user={{ firstName, lastName, about, age, skill, gender, photo_url: photoUrl }} />
            </div>
            {
                showSuccessToast &&
                <div className="toast toast-top toast-center">
                    <div className="alert alert-success">
                        <span>Profile updated successfully</span>
                    </div>
                </div>
            }
            {
                showErrToast &&
                <div className="toast toast-top toast-center">
                    <div className="alert alert-error">
                        <span>{errMsg}</span>
                    </div>
                </div>
            }
        </>
    )
}

export default EditProfile