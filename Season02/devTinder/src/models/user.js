const mongoose = require('mongoose')
const validator = require('validator')

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
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email ID: " + value)
            }
        }
    },
    'password': {
        type: String,
        minLength: 8,
        required: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Enter Strong password")
            }
        }
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
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("URL is not correct")
            }
        }
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