import React, { useState } from 'react'

const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user?.firstName)
    const [lastName, setLastName] = useState(user?.lastName || "")
    const [about, setAbout] = useState(user?.about || "")
    const [age, setAge] = useState(user?.age || "")
    const [gender, setGender] = useState(user?.gender || "")
    const [photoUrl, setPhotoUrl] = useState(user?.photo_url || "")
    const [errMsg, setErrMsg] = useState("")
    return (
        <div className='flex justify-center my-16'>
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
                            <span className="label-text">Gender:</span>
                        </div>
                        <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} className="input input-bordered w-full max-w-xs" />
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Age:</span>
                        </div>
                        <input type="text" value={age} onChange={(e) => setAge(e.target.value)} className="input input-bordered w-full max-w-xs" />
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">About:</span>
                        </div>
                        <input type="text" value={about} onChange={(e) => setAbout(e.target.value)} className="input input-bordered w-full max-w-xs" />
                    </label>
                    <div className='text-error'>{errMsg}</div>
                    <div className="card-actions justify-center mt-4">
                        <button className="btn btn-primary w-1/2">Save Profile</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile