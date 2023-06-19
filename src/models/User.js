const mongoose = require("mongoose")
var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")


mongoose.connect("mongodb://127.0.0.1:27017/movie-app-api", {
    useNewUrlParser: true,
}) 
 
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    username: {
        type: String,
        required: true,
        unique: true,
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

    isAdmin: {
        type: Boolean,
        default: false
    },

    tokens: [
        {
            token: {
                type: String,
                reuired: true
            }
        }
    ]

})
 
userSchema.virtual("movie", {
    ref: "Movie",
    localField: "_id",
    foreignField: "author"
})

// ENCRYPTING USER PASSWORD  

userSchema.pre('save', async function(next) {
    const user = this 
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

// DECRYPTING USER PASSWORD 

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})

    if(!user) throw new Error("Unable to login")

    const decrypt = await bcrypt.compare(password, user.password)

    if (!decrypt) throw new Error("Unable to login")

    return user
}

// AUTHENTICATING USER WITH ACCESS TOKEN 

userSchema.methods.accessToken = function () {
    const user = this

    const token = jwt.sign({_id: user._id.toString()}, "access_token")

    user.tokens = user.tokens.concat({token})

    user.save()
    return token
}


const User = mongoose.model('User', userSchema)

module.exports = User