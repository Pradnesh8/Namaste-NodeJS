const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    'firstName': {
        type: String,
        minLength: 3,
        maxLength: 20,
        required: true
    },
    'lastName': {
        type: String,
    },
    'emailId': {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    'password': {
        type: String,
        minLength: 6,
        required: true
    },
    'age': {
        type: Number,
        min: 18
    },
    'gender': {
        type: String,
        validate(value) {
            if (!["male", "female", "other"].includes(value)) {
                throw new Error("Invalid Gender value")
            }
        }
    },
    'photo_url': {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA6g9BWr61gs6KYIq3zjFEy36Z8OuOIJQ75A&s",
    },
    'about': {
        type: String,
        default: "Hi I'm Software developer",
    },
    'skill': {
        type: [String]
    }

}, { timestamps: true })
// timestamps adds created_at, updated_at

const User = mongoose.model('user', userSchema)

module.exports = User;