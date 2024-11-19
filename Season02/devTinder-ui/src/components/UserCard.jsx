import React from 'react'

const UserCard = ({ user }) => {
    const { firstName, lastName, about, age, skill, gender, photo_url } = user
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
                    <button className="btn btn-error btn-outline">Ignore</button>
                    <button className="btn btn-primary btn-outline">Interested</button>
                </div>
            </div>
        </div>
    )
}

export default UserCard