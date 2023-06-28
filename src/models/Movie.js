const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/movie-app-api", {
    useNewUrlParser: true,
})

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
        type: Boolean,
        default: false
    },

    file: {
        type: String
    },

    author: {
        type: mongoose.Schema.Types.String, 
        ref: "User"
    }

})

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie