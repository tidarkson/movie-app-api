const mongoose = require("mongoose")

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },

    desc: {
        type: String,
    },

    duration: {
        type: Number,
        required: true,
        default: ""
    },

    categories: {
        type: Array,
        required: true
    },

    releaseDate: {
        type: String,
    },

    image: {
        type: String
    },

    trailer: {
        type: String
    },

    video: {
        type: String
    },

})

module.exports = mongoose.model("Movie", movieSchema)