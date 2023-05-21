const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    phoneNumber: {
        type: Number
    },

    profilePicture: {
        type: String,
        default: ""
    },

    isAdmin: {
        type: Boolean,
        default: false
    }

})

module.exports = mongoose.model("User", userSchema)