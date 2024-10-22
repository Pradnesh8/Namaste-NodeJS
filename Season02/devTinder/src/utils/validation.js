const validator = require('validator')

const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;

    if (!firstName || !lastName) {
        throw new Error("Name is not valid!")
    }
    else if ((firstName.length < 3 || firstName.length > 50) || (lastName.length < 3 || lastName.length > 50)) {
        throw new Error("Name supports only 3-50 characters")
    }

    if (!validator.isEmail(emailId)) {
        throw new Error("Invalid email ID!")
    }
    if (!validator.isStrongPassword(password)) {
        throw new Error("Please enter strong password, it should atlest be 8 char - 1 upper, 1 lower, 1 special char")
    }
}


const validateProfileEditData = (req) => {
    const validateFields = ["firstName", "lastName", "age", "about", "skill", "photo_url"]
    const isValid = Object.keys(req.body).every(field => validateFields.includes(field));
    if (!isValid) {
        throw new Error("Invalid input request")
    }
}
module.exports = { validateSignUpData, validateProfileEditData }