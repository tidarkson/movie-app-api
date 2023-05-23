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
        type: String,
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

    isTrailer: {
        type: String,
        default: false
    },

    file: {
        type: String
    },

})

module.exports = mongoose.model("Movie", movieSchema)